import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type ContactLeadInput = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export async function submitContactLead(input: ContactLeadInput) {
  const lead = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    service: input.service.trim(),
    message: input.message.trim(),
    timestamp: serverTimestamp(),
    source: "aacl-website",
  };

  await addDoc(collection(getFirebaseDb(), "contactLeads"), lead);
}