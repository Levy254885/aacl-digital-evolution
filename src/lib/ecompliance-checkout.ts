import { toast } from "sonner";
import { initiatePayment } from "@/lib/payments";
import type { PaymentMethodId } from "@/lib/orders";

export async function startEcomplianceCheckout(input: {
  tier: string;
  method: PaymentMethodId;
  name: string;
  email: string;
  phone: string;
}) {
  const amounts: Record<string, number> = { Essentials: 300, Growth: 800, Enterprise: 2000 };
  if (!input.name.trim() || !/\S+@\S+\.\S+/.test(input.email)) {
    toast.error("Enter your name and a valid work email.");
    return;
  }
  if (input.method === "mpesa" && !/^[0-9+\s-]{9,15}$/.test(input.phone)) {
    toast.error("Enter the M-Pesa phone number.");
    return;
  }
  const result = await initiatePayment({
    kind: "ecompliance",
    amount: amounts[input.tier] ?? 300,
    currency: input.method === "mpesa" ? "KES" : "USD",
    paymentMethod: input.method,
    email: input.email,
    customerName: input.name,
    phone: input.method === "mpesa" ? input.phone : undefined,
    planTier: input.tier,
    planInterval: "month",
    returnPath: "/ecompliance",
  });
  if (result.checkoutUrl) {
    toast.message("Redirecting to secure checkout…");
    window.location.href = result.checkoutUrl;
    return;
  }
  toast.success("Subscription request received", {
    description: `${result.message} Reference: ${result.reference}`,
  });
}
