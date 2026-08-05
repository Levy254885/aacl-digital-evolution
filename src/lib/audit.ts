/**
 * Admin audit trail (Firestore `auditLog`).
 *
 * Every content publish and role change appends an immutable entry recording
 * who did it, what changed and when. Entries are append-only: Firestore rules
 * block updates and deletes, and only Admins/Super Admins can read them.
 */

import {
  addDoc,
  collection,
  getDocs,
  limit as fsLimit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";

export type AuditAction = "content.publish" | "content.reset" | "role.assign" | "role.remove";

export type AuditEntry = {
  id: string;
  action: AuditAction;
  target: string;
  targetLabel: string;
  summary: string;
  actorUid: string;
  actorEmail: string;
  at: Date | null;
};

export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
  "content.publish": "Content published",
  "content.reset": "Content reset",
  "role.assign": "Role assigned",
  "role.remove": "Access removed",
};

/**
 * Append an audit entry. Never throws: a failed log must not block the action
 * the user actually asked for.
 */
export async function recordAudit(input: {
  action: AuditAction;
  target: string;
  targetLabel: string;
  summary: string;
  actorUid: string;
  actorEmail?: string | null;
}) {
  if (!isFirebaseConfigured || typeof window === "undefined") return;
  try {
    await addDoc(collection(getFirebaseDb(), "auditLog"), {
      action: input.action,
      target: input.target.slice(0, 120),
      targetLabel: input.targetLabel.slice(0, 160),
      summary: input.summary.slice(0, 500),
      actorUid: input.actorUid,
      actorEmail: (input.actorEmail ?? "").toLowerCase().slice(0, 160),
      at: serverTimestamp(),
    });
  } catch {
    /* audit logging is best-effort */
  }
}

export async function listAudit(max = 200): Promise<AuditEntry[]> {
  const snap = await getDocs(
    query(collection(getFirebaseDb(), "auditLog"), orderBy("at", "desc"), fsLimit(max)),
  );
  return snap.docs.map((d) => {
    const data = d.data() as Record<string, unknown>;
    const at = data.at;
    return {
      id: d.id,
      action: (data.action as AuditAction) ?? "content.publish",
      target: (data.target as string) ?? "",
      targetLabel: (data.targetLabel as string) ?? "",
      summary: (data.summary as string) ?? "",
      actorUid: (data.actorUid as string) ?? "",
      actorEmail: (data.actorEmail as string) ?? "",
      at: at instanceof Timestamp ? at.toDate() : null,
    };
  });
}
