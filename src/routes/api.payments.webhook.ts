import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * POST /api/payments/webhook
 * Receives Paystack webhooks and M-Pesa STK callbacks.
 * Marks orders paid via Admin Firebase Admin would be ideal;
 * this endpoint acknowledges the provider and logs the event.
 * Full auto-mark requires FIREBASE_SERVICE_ACCOUNT or client-side verify + admin confirm.
 */
export const Route = createFileRoute("/api/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") || "";
          const raw = await request.text();
          console.info("[payments/webhook]", contentType, raw.slice(0, 2000));

          // Paystack signature verification when secret is set
          const paystackSig = request.headers.get("x-paystack-signature");
          if (paystackSig && process.env.PAYSTACK_SECRET_KEY) {
            // Signature check can be added with crypto.createHmac('sha512', secret).update(raw)
            // Parse event and look up order by reference in a future Admin SDK step.
          }

          return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          console.error("[payments/webhook]", e);
          return new Response(JSON.stringify({ received: false }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
