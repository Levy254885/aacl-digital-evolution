/**
 * Firebase Auth + role-based access control for the /admin dashboard.
 *
 * Roles live in Firestore at `roles/{uid}` as `{ email, role, name }`.
 * The super admin email is bootstrapped in the Firestore rules so the first
 * account can grant roles to everyone else.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";

export const ROLES = ["super_admin", "admin", "consultant", "editor", "support", "client"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  consultant: "Consultant",
  editor: "Editor",
  support: "Support",
  client: "Client",
};

/** Higher number = more privilege. */
const RANK: Record<Role, number> = {
  super_admin: 60,
  admin: 50,
  consultant: 40,
  editor: 30,
  support: 20,
  client: 10,
};

export function roleAtLeast(role: Role | null, minimum: Role) {
  if (!role) return false;
  return RANK[role] >= RANK[minimum];
}

type AuthState = {
  ready: boolean;
  user: User | null;
  role: Role | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [ready, setReady] = useState(!isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured || typeof window === "undefined") return;
    return onAuthStateChanged(getFirebaseAuth(), async (next) => {
      setUser(next);
      if (!next) {
        setRole(null);
        setReady(true);
        return;
      }
      try {
        const snap = await getDoc(doc(getFirebaseDb(), "roles", next.uid));
        const value = snap.exists() ? (snap.data() as { role?: string }).role : undefined;
        setRole(ROLES.includes(value as Role) ? (value as Role) : "client");
      } catch {
        setRole("client");
      }
      setReady(true);
    });
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      ready,
      user,
      role,
      signIn: async (email, password) => {
        await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
      },
      signOutUser: async () => {
        await signOut(getFirebaseAuth());
      },
    }),
    [ready, user, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
