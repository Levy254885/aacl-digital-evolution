import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/** GET /api/payments/verify?reference=… — checks Paystack when configured. */
export const Route = createFileRoute("/api/payments/verify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const reference = url.searchParams.get("reference");
        if (!reference) {
          return new Response(JSON.stringify({ paid: false, status: "missing_reference" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const secret = process.env.PAYSTACK_SECRET_KEY;
        if (secret) {
          const res = await fetch(
            `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
            { headers: { Authorization: `Bearer ${secret}` } },
          );
          if (res.ok) {
            const data = (await res.json()) as {
              data?: { status?: string };
            };
            const ok = data.data?.status === "success";
            return new Response(
              JSON.stringify({ paid: ok, status: data.data?.status ?? "unknown" }),
              { headers: { "Content-Type": "application/json" } },
            );
          }
        }

        return new Response(JSON.stringify({ paid: false, status: "unverified" }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
