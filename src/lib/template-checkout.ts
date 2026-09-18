import { toast } from "sonner";
import { initiatePayment, verifyPayment } from "@/lib/payments";
import { saveDocumentRequest, uploadCompanyLogo } from "@/lib/document-requests";
import type { CompanyDetails, DocTemplate } from "@/lib/doc-generator";

export async function runTemplateCheckout(opts: {
  template: DocTemplate;
  details: CompanyDetails;
  logoFile: File | null;
  paymentMethod: string;
  phone: string;
}): Promise<{ reference: string; redirected: boolean } | null> {
  const { template, details, logoFile, paymentMethod, phone } = opts;
  if (paymentMethod === "mpesa" && !/^[0-9+\s-]{9,15}$/.test(phone)) {
    toast.error("Enter the mobile number to receive the M-Pesa prompt.");
    return null;
  }

  let logoUrl: string | null = null;
  if (logoFile) {
    try {
      logoUrl = await uploadCompanyLogo(logoFile, details.companyName);
    } catch {
      logoUrl = null;
    }
  }

  const result = await initiatePayment({
    kind: "template",
    amount: template.price,
    currency: paymentMethod === "mpesa" ? "KES" : "USD",
    paymentMethod: paymentMethod as "mpesa" | "card" | "paypal",
    email: details.email,
    customerName: details.contactName,
    companyName: details.companyName,
    phone: paymentMethod === "mpesa" ? phone : undefined,
    templateSlug: template.slug,
    templateName: template.name,
    standard: template.standard,
    returnPath: "/templates",
    metadata: logoUrl ? { logoUrl } : undefined,
  });

  try {
    await saveDocumentRequest({
      templateSlug: template.slug,
      templateName: template.name,
      standard: template.standard,
      ...details,
      amount: template.price,
      currency: paymentMethod === "mpesa" ? "KES" : "USD",
      paymentMethod,
      paymentReference: result.reference,
      logoUrl,
    });
  } catch {
    /* order already stored */
  }

  if (result.checkoutUrl) {
    toast.message("Redirecting to secure checkout…");
    window.location.href = result.checkoutUrl;
    return { reference: result.reference, redirected: true };
  }

  if (result.manualMode) {
    toast.success("Order received", {
      description: `Reference ${result.reference}. Complete payment offline or wait for Admin confirmation, then download.`,
    });
  } else {
    toast.success(result.message || "Payment started", {
      description: `Reference: ${result.reference}`,
    });
  }
  return { reference: result.reference, redirected: false };
}

/** Call on /templates when returning from Paystack/PayPal (?paid=1&ref=). */
export function resumeTemplatePaymentFromUrl(
  setReference: (r: string) => void,
  setStep: (n: number) => void,
) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const paid = params.get("paid");
  const ref = params.get("ref");
  if (!ref) return;
  setReference(ref);
  if (paid === "1") {
    void verifyPayment(ref).then((v) => {
      setStep(5);
      if (v.paid) {
        toast.success("Payment confirmed", {
          description: `Reference ${ref}. Your document is ready.`,
        });
      } else {
        toast.message("Payment pending verification", {
          description: `Reference ${ref}. If you paid, Admin will confirm shortly.`,
        });
      }
    });
  }
}
