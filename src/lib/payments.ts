/**
 * Client-facing payment helpers.
 * Live rails: Paystack (Visa/Mastercard + often M-Pesa), PayPal, Safaricom Daraja (M-Pesa STK).
 * Without server env keys, create returns a pending order for manual confirmation in Admin.
 */

import type { OrderKind, PaymentMethodId } from "@/lib/orders";
import { createOrder, makeOrderReference } from "@/lib/orders";

export type InitiatePaymentInput = {
  kind: OrderKind;
  amount: number;
  currency?: string;
  paymentMethod: PaymentMethodId;
  email: string;
  customerName: string;
  companyName?: string;
  phone?: string;
  templateSlug?: string;
  templateName?: string;
  standard?: string;
  planTier?: string;
  planInterval?: "month" | "year";
  metadata?: Record<string, string>;
  /** Return URL after hosted checkout */
  returnPath?: string;
};

export type InitiatePaymentResult = {
  orderId: string;
  reference: string;
  status: "pending" | "awaiting_payment" | "paid";
  /** Hosted checkout URL (Paystack/PayPal) when available */
  checkoutUrl?: string;
  /** True when gateway keys are not configured — admin must confirm */
  manualMode: boolean;
  message: string;
};

/**
 * Creates a Firestore order, then asks the server to start the chosen rail.
 * Falls back to manual mode if the API is unavailable or keys are missing.
 */
export async function initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
  const reference = makeOrderReference(input.kind === "template" ? "TPL" : "ECP");
  const currency = input.currency ?? (input.paymentMethod === "mpesa" ? "KES" : "USD");

  const { id: orderId } = await createOrder({
    kind: input.kind,
    amount: input.amount,
    currency,
    paymentMethod: input.paymentMethod,
    reference,
    email: input.email.trim().toLowerCase(),
    customerName: input.customerName.trim(),
    companyName: input.companyName?.trim(),
    phone: input.phone?.trim(),
    templateSlug: input.templateSlug,
    templateName: input.templateName,
    standard: input.standard,
    planTier: input.planTier,
    planInterval: input.planInterval,
    metadata: input.metadata,
    status: "pending",
  });

  try {
    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        reference,
        amount: input.amount,
        currency,
        paymentMethod: input.paymentMethod,
        email: input.email,
        customerName: input.customerName,
        phone: input.phone,
        kind: input.kind,
        returnPath: input.returnPath ?? (input.kind === "template" ? "/templates" : "/ecompliance"),
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return {
        orderId,
        reference,
        status: "pending",
        manualMode: true,
        message:
          errText ||
          "Payment gateway is not fully configured. Your order was saved as pending — our team will confirm shortly.",
      };
    }

    const data = (await res.json()) as {
      checkoutUrl?: string;
      status?: InitiatePaymentResult["status"];
      manualMode?: boolean;
      message?: string;
    };

    return {
      orderId,
      reference,
      status: data.status ?? (data.checkoutUrl ? "awaiting_payment" : "pending"),
      checkoutUrl: data.checkoutUrl,
      manualMode: Boolean(data.manualMode),
      message:
        data.message ??
        (data.checkoutUrl
          ? "Redirecting to secure checkout…"
          : "Order created. Complete payment when prompted."),
    };
  } catch {
    return {
      orderId,
      reference,
      status: "pending",
      manualMode: true,
      message:
        "Could not reach the payment service. Your order was saved as pending. Contact info@aacl.co.ke with your reference.",
    };
  }
}

export async function verifyPayment(reference: string): Promise<{ paid: boolean; status: string }> {
  try {
    const res = await fetch(`/api/payments/verify?reference=${encodeURIComponent(reference)}`);
    if (!res.ok) return { paid: false, status: "unknown" };
    return (await res.json()) as { paid: boolean; status: string };
  } catch {
    return { paid: false, status: "error" };
  }
}
