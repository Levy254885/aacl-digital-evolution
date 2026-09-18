import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * POST /api/payments/create
 * Starts Paystack (card), PayPal, or M-Pesa STK when secrets are present.
 * Without secrets → { manualMode: true } so Admin can mark the order paid.
 */
export const Route = createFileRoute("/api/payments/create")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            orderId: string;
            reference: string;
            amount: number;
            currency: string;
            paymentMethod: "mpesa" | "card" | "paypal";
            email: string;
            customerName: string;
            phone?: string;
            kind: string;
            returnPath?: string;
          };

          if (!body?.orderId || !body.reference || !body.amount || !body.email || !body.paymentMethod) {
            return json({ error: "Missing required fields" }, 400);
          }

          const origin = new URL(request.url).origin;
          const returnUrl = `${origin}${body.returnPath ?? "/"}?paid=1&ref=${encodeURIComponent(body.reference)}`;

          if (body.paymentMethod === "card") {
            const paystack = await startPaystack(body, returnUrl);
            if (paystack) return json(paystack);
          }

          if (body.paymentMethod === "paypal") {
            const paypal = await startPaypal(body, returnUrl);
            if (paypal) return json(paypal);
          }

          if (body.paymentMethod === "mpesa") {
            const mpesa = await startMpesa(body);
            if (mpesa) return json(mpesa);
            // Prefer Paystack mobile money if Daraja not configured
            const viaPaystack = await startPaystack(body, returnUrl, true);
            if (viaPaystack) return json(viaPaystack);
          }

          return json({
            status: "pending",
            manualMode: true,
            message:
              "Live payment keys are not configured on this environment. Order saved as pending — confirm in Admin → Orders after receiving funds.",
          });
        } catch (e) {
          console.error("[payments/create]", e);
          return json({ error: "Payment initiation failed", manualMode: true }, 500);
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

async function startPaystack(
  body: {
    amount: number;
    currency: string;
    email: string;
    reference: string;
    orderId: string;
  },
  callbackUrl: string,
  mobileMoneyHint = false,
) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return null;

  // Paystack expects amount in smallest currency unit (kobo for NGN, cents for USD/KES often *100)
  const amountMinor = Math.round(body.amount * 100);
  const payload: Record<string, unknown> = {
    email: body.email,
    amount: amountMinor,
    currency: body.currency === "KES" ? "KES" : body.currency === "USD" ? "USD" : body.currency,
    reference: body.reference,
    callback_url: callbackUrl,
    metadata: { orderId: body.orderId, source: "aacl-website" },
  };
  if (mobileMoneyHint) {
    payload.channels = ["mobile_money", "card"];
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("[paystack]", await res.text());
    return null;
  }

  const data = (await res.json()) as { data?: { authorization_url?: string; reference?: string } };
  const url = data.data?.authorization_url;
  if (!url) return null;

  return {
    status: "awaiting_payment" as const,
    checkoutUrl: url,
    manualMode: false,
    message: "Redirecting to card checkout…",
    provider: "paystack",
  };
}

async function startPaypal(
  body: { amount: number; currency: string; reference: string; orderId: string },
  returnUrl: string,
) {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const base =
    process.env.PAYPAL_MODE === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

  const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!tokenRes.ok) {
    console.error("[paypal token]", await tokenRes.text());
    return null;
  }
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const orderRes = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: body.reference,
          custom_id: body.orderId,
          amount: {
            currency_code: body.currency === "KES" ? "USD" : body.currency,
            value: body.amount.toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: returnUrl,
        cancel_url: returnUrl.replace("paid=1", "paid=0"),
        brand_name: "AACL Global",
        user_action: "PAY_NOW",
      },
    }),
  });

  if (!orderRes.ok) {
    console.error("[paypal order]", await orderRes.text());
    return null;
  }

  const order = (await orderRes.json()) as {
    id?: string;
    links?: { rel: string; href: string }[];
  };
  const approve = order.links?.find((l) => l.rel === "approve")?.href;
  if (!approve) return null;

  return {
    status: "awaiting_payment" as const,
    checkoutUrl: approve,
    manualMode: false,
    message: "Redirecting to PayPal…",
    provider: "paypal",
    providerReference: order.id,
  };
}

async function startMpesa(body: {
  amount: number;
  phone?: string;
  reference: string;
  orderId: string;
}) {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  if (!key || !secret || !shortcode || !passkey) return null;
  if (!body.phone) {
    return {
      status: "pending" as const,
      manualMode: true,
      message: "Phone number required for M-Pesa STK push.",
    };
  }

  const env = process.env.MPESA_ENV === "production" ? "production" : "sandbox";
  const base =
    env === "production"
      ? "https://api.safaricom.co.ke"
      : "https://sandbox.safaricom.co.ke";

  const tokenRes = await fetch(
    `${base}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
      },
    },
  );
  if (!tokenRes.ok) {
    console.error("[mpesa token]", await tokenRes.text());
    return null;
  }
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
  const phone = body.phone.replace(/\D/g, "").replace(/^0/, "254").replace(/^\+/, "");
  const amountKes = Math.max(1, Math.round(body.amount)); // assume amount already KES for mpesa path

  const stkRes = await fetch(`${base}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amountKes,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL || "https://www.aaclglobal.com/api/payments/webhook",
      AccountReference: body.reference.slice(0, 12),
      TransactionDesc: "AACL payment",
    }),
  });

  if (!stkRes.ok) {
    console.error("[mpesa stk]", await stkRes.text());
    return null;
  }

  return {
    status: "awaiting_payment" as const,
    manualMode: false,
    message: "M-Pesa prompt sent. Enter your PIN on your phone to complete payment.",
    provider: "mpesa",
  };
}
