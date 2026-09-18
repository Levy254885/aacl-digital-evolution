/** Commerce orders for template downloads and eCompliance subscriptions. */

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type PaymentMethodId = "mpesa" | "card" | "paypal";
export type OrderKind = "template" | "ecompliance";
export type OrderStatus = "pending" | "awaiting_payment" | "paid" | "failed" | "cancelled" | "refunded";

export type OrderRecord = {
  id?: string;
  kind: OrderKind;
  status: OrderStatus;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethodId;
  reference: string;
  email: string;
  customerName: string;
  companyName?: string;
  phone?: string;
  /** Template fields */
  templateSlug?: string;
  templateName?: string;
  standard?: string;
  /** eCompliance fields */
  planTier?: string;
  planInterval?: "month" | "year";
  provider?: "paystack" | "paypal" | "mpesa" | "manual";
  providerReference?: string;
  checkoutUrl?: string;
  metadata?: Record<string, string>;
  createdAt?: Timestamp;
  paidAt?: Timestamp;
  source: string;
};

export function makeOrderReference(prefix = "AACL"): string {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function createOrder(
  input: Omit<OrderRecord, "id" | "createdAt" | "status" | "source"> & {
    status?: OrderStatus;
  },
): Promise<{ id: string; reference: string }> {
  const reference = input.reference || makeOrderReference();
  const ref = await addDoc(collection(getFirebaseDb(), "orders"), {
    ...input,
    reference,
    status: input.status ?? "pending",
    source: "aacl-website",
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, reference };
}

export async function getOrderByReference(reference: string): Promise<(OrderRecord & { id: string }) | null> {
  const snap = await getDocs(
    query(collection(getFirebaseDb(), "orders"), where("reference", "==", reference), limit(1)),
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as OrderRecord) };
}

export async function getOrderById(id: string): Promise<(OrderRecord & { id: string }) | null> {
  const d = await getDoc(doc(getFirebaseDb(), "orders", id));
  if (!d.exists()) return null;
  return { id: d.id, ...(d.data() as OrderRecord) };
}

export async function listOrders(max = 100): Promise<(OrderRecord & { id: string })[]> {
  const snap = await getDocs(
    query(collection(getFirebaseDb(), "orders"), orderBy("createdAt", "desc"), limit(max)),
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as OrderRecord) }));
}

export async function markOrderPaid(
  orderId: string,
  extras?: { providerReference?: string; provider?: OrderRecord["provider"] },
) {
  await updateDoc(doc(getFirebaseDb(), "orders", orderId), {
    status: "paid",
    paidAt: serverTimestamp(),
    ...(extras?.providerReference ? { providerReference: extras.providerReference } : {}),
    ...(extras?.provider ? { provider: extras.provider } : {}),
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  extras?: Partial<Pick<OrderRecord, "providerReference" | "checkoutUrl" | "provider">>,
) {
  await updateDoc(doc(getFirebaseDb(), "orders", orderId), {
    status,
    ...extras,
  });
}
