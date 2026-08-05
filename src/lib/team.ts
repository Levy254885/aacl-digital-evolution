/** Admin-side role management helpers (Firestore `roles/{uid}`). */

import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import type { Role } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";

export type TeamMember = { uid: string; email: string; name: string; role: Role };

export async function listTeam(): Promise<TeamMember[]> {
  const snap = await getDocs(query(collection(getFirebaseDb(), "roles"), orderBy("email")));
  return snap.docs.map((d) => {
    const data = d.data() as Partial<TeamMember>;
    return {
      uid: d.id,
      email: data.email ?? "",
      name: data.name ?? "",
      role: (data.role ?? "client") as Role,
    };
  });
}

export async function upsertTeamMember(
  member: TeamMember,
  actorUid: string,
  actorEmail?: string | null,
) {
  await setDoc(
    doc(getFirebaseDb(), "roles", member.uid.trim()),
    {
      email: member.email.trim().toLowerCase(),
      name: member.name.trim(),
      role: member.role,
      updatedAt: serverTimestamp(),
      updatedBy: actorUid,
    },
    { merge: true },
  );

  await recordAudit({
    action: "role.assign",
    target: member.uid.trim(),
    targetLabel: member.email.trim().toLowerCase() || member.uid.trim(),
    summary: `Role set to ${member.role}`,
    actorUid,
    actorEmail,
  });
}

export async function removeTeamMember(
  uid: string,
  actorUid?: string,
  actorEmail?: string | null,
) {
  await deleteDoc(doc(getFirebaseDb(), "roles", uid));
  await recordAudit({
    action: "role.remove",
    target: uid,
    targetLabel: uid,
    summary: "Access removed",
    actorUid: actorUid ?? "unknown",
    actorEmail,
  });
}
