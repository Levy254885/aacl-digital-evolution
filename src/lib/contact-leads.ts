import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

/**
 * The single public write path of the whole application.
 *
 * Only the fields below are ever sent, and Firestore Security Rules enforce the
 * same allow-list server-side (see firestore.rules). Reads, updates and deletes
 * on `contactLeads` are denied to everyone except the Firebase console.
 */
export type ContactLeadInput = {
  name: string;
  email: string;
  phone?: string;
  org?: string;
  service: string;
  message: string;
};

export async function submitContactLead(input: ContactLeadInput) {
  const lead = {
    name: input.name,
    email: input.email,
    phone: input.phone ?? "",
    org: input.org ?? "",
    service: input.service,
    message: input.message,
    timestamp: serverTimestamp(),
    source: "aacl-website",
  };

  await addDoc(collection(getFirebaseDb(), "contactLeads"), lead);
}
