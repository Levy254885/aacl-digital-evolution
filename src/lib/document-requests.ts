import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorageBucket } from "@/lib/firebase";
import { createOrder, type PaymentMethodId } from "@/lib/orders";

export type DocumentRequestInput = {
  templateSlug: string;
  templateName: string;
  standard: string;
  companyName: string;
  contactName: string;
  email: string;
  country: string;
  scope: string;
  requirements: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentReference: string;
  logoUrl: string | null;
};

/**
 * Uploads the company logo to Cloud Storage and returns its storage path.
 * The bucket is private (see storage.rules), no public download URL is
 * created, so uploaded artwork is never exposed on the internet.
 */
export async function uploadCompanyLogo(file: File, companyName: string): Promise<string> {
  const slug = (companyName || "company").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const ext = (file.name.split(".").pop() ?? "png").toLowerCase();
  const path = `documentRequests/${slug}/${Date.now()}-logo.${ext}`;
  const storageRef = ref(getFirebaseStorageBucket(), path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return path;
}

/** Stores document-request metadata and a matching commerce order (pending until paid). */
export async function saveDocumentRequest(input: DocumentRequestInput) {
  await addDoc(collection(getFirebaseDb(), "documentRequests"), {
    templateSlug: input.templateSlug,
    templateName: input.templateName,
    standard: input.standard,
    companyName: input.companyName.trim(),
    contactName: input.contactName.trim(),
    email: input.email.trim().toLowerCase(),
    country: input.country.trim(),
    scope: input.scope.trim(),
    requirements: input.requirements.trim(),
    amount: input.amount,
    currency: input.currency,
    paymentMethod: input.paymentMethod,
    paymentReference: input.paymentReference,
    logoUrl: input.logoUrl,
    status: "pending",
    timestamp: serverTimestamp(),
    source: "aacl-website",
  });

  const method = (["mpesa", "card", "paypal"].includes(input.paymentMethod)
    ? input.paymentMethod
    : "card") as PaymentMethodId;

  try {
    await createOrder({
      kind: "template",
      amount: input.amount,
      currency: input.currency,
      paymentMethod: method,
      reference: input.paymentReference,
      email: input.email.trim().toLowerCase(),
      customerName: input.contactName.trim(),
      companyName: input.companyName.trim(),
      templateSlug: input.templateSlug,
      templateName: input.templateName,
      standard: input.standard,
      status: "pending",
      metadata: input.logoUrl ? { logoUrl: input.logoUrl } : undefined,
    });
  } catch {
    // Order collection may fail if rules not yet deployed; document request still saved.
  }
}
