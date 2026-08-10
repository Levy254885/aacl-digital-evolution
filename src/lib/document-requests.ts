import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorageBucket } from "@/lib/firebase";

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


/** Stores document-request metadata in Firestore. */
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
    status: "paid",
    timestamp: serverTimestamp(),
    source: "aacl-website",
  });
}
