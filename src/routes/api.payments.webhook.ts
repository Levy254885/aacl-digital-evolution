import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { createHmac, createSign, timingSafeEqual } from "node:crypto";

/**
 * POST /api/payments/webhook
 * Paystack charge.success → mark order paid when FIREBASE_SERVICE_ACCOUNT_JSON is set.
 * M-Pesa STK ResultCode 0 → same.
 * Without service account, events are acknowledged; Admin can Mark paid manually.
 */
export const Route = createFileRoute("/api/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const raw = await request.text();
          const paystackSig = request.headers.get("x-paystack-signature");

          if (paystackSig && process.env.PAYSTACK_SECRET_KEY) {
            const hash = createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
              .update(raw)
              .digest("hex");
            const a = Buffer.from(hash);
            const b = Buffer.from(paystackSig);
            if (a.length !== b.length || !timingSafeEqual(a, b)) {
              return json({ error: "invalid signature" }, 401);
            }
            const event = JSON.parse(raw) as {
              event?: string;
              data?: { reference?: string; status?: string; id?: number };
            };
            if (event.event === "charge.success" && event.data?.reference) {
              await markPaidByReference(
                event.data.reference,
                String(event.data.id ?? ""),
                "paystack",
              );
            }
            return json({ received: true });
          }

          try {
            const body = JSON.parse(raw) as {
              Body?: {
                stkCallback?: {
                  ResultCode?: number;
                  CheckoutRequestID?: string;
                  CallbackMetadata?: {
                    Item?: { Name: string; Value: string | number }[];
                  };
                };
              };
              reference?: string;
            };
            const stk = body.Body?.stkCallback;
            if (stk && stk.ResultCode === 0) {
              const items = stk.CallbackMetadata?.Item ?? [];
              const receipt = items.find((i) => i.Name === "MpesaReceiptNumber")?.Value;
              await markPaidByReference(
                String(stk.CheckoutRequestID ?? body.reference ?? ""),
                String(receipt ?? ""),
                "mpesa",
              );
            }
          } catch {
            console.info("[payments/webhook] unhandled", raw.slice(0, 500));
          }

          return json({ received: true });
        } catch (e) {
          console.error("[payments/webhook]", e);
          return json({ received: false }, 500);
        }
      },
    },
  },
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function markPaidByReference(
  reference: string,
  providerReference: string,
  provider: string,
) {
  if (!reference) return;
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const projectId =
    process.env.VITE_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT;
  if (!sa || !projectId) {
    console.info(
      `[payments/webhook] paid signal for ${reference} (${provider}) — set FIREBASE_SERVICE_ACCOUNT_JSON to auto-mark`,
    );
    return;
  }
  try {
    const cred = JSON.parse(sa) as {
      client_email: string;
      private_key: string;
    };
    const token = await getGoogleAccessToken(cred.client_email, cred.private_key);
    const queryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
    const qRes = await fetch(queryUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "orders" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "reference" },
              op: "EQUAL",
              value: { stringValue: reference },
            },
          },
          limit: 1,
        },
      }),
    });
    if (!qRes.ok) {
      console.error("[firestore query]", await qRes.text());
      return;
    }
    const rows = (await qRes.json()) as { document?: { name?: string } }[];
    const name = rows[0]?.document?.name;
    if (!name) {
      console.info("[payments/webhook] no order for", reference);
      return;
    }
    const patchUrl = `https://firestore.googleapis.com/v1/${name}?updateMask.fieldPaths=status&updateMask.fieldPaths=providerReference&updateMask.fieldPaths=provider&updateMask.fieldPaths=paidAt`;
    const now = new Date().toISOString();
    const patchRes = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          status: { stringValue: "paid" },
          providerReference: { stringValue: providerReference },
          provider: { stringValue: provider },
          paidAt: { timestampValue: now },
        },
      }),
    });
    if (!patchRes.ok) {
      console.error("[firestore patch]", await patchRes.text());
    } else {
      console.info("[payments/webhook] marked paid", reference);
    }
  } catch (e) {
    console.error("[markPaidByReference]", e);
  }
}

async function getGoogleAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/datastore",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const unsigned = `${header}.${claim}`;
  const sign = createSign("RSA-SHA256");
  sign.update(unsigned);
  const key = privateKey.includes("\\n") ? privateKey.replace(/\\n/g, "\n") : privateKey;
  const signature = sign.sign(key, "base64url");
  const jwt = `${unsigned}.${signature}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!tokenRes.ok) throw new Error(await tokenRes.text());
  const data = (await tokenRes.json()) as { access_token: string };
  return data.access_token;
}
