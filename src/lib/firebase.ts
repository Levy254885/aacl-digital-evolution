/**
 * Firebase integration — AACL main-aacl project.
 *
 * The Firebase Web `apiKey` is a public identifier for the project and is
 * safe to include in client bundles (Firebase docs). Security is enforced
 * server-side by Firebase Security Rules, App Check and Auth.
 *
 * Any privileged Firebase Admin work MUST live in a server function
 * (see src/lib/*.functions.ts) and read a service-account key from
 * process.env, never here.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported as analyticsSupported, type Analytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyAQYOxI8fQAnFWW3-y4oSG_10BH_PQ5kHQ",
  authDomain: "main-aacl.firebaseapp.com",
  projectId: "main-aacl",
  storageBucket: "main-aacl.firebasestorage.app",
  messagingSenderId: "536810084839",
  appId: "1:536810084839:web:7f08e799e459080ee90542",
  measurementId: "G-T6HEWGXKYG",
} as const;

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let _app: FirebaseApp | null = null;
export function getFirebaseApp(): FirebaseApp {
  if (_app) return _app;
  _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return _app;
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function getFirebaseStorageBucket(): FirebaseStorage {
  return getStorage(getFirebaseApp());
}

let _analytics: Analytics | null = null;
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (_analytics) return _analytics;
  const supported = await analyticsSupported().catch(() => false);
  if (!supported) return null;
  _analytics = getAnalytics(getFirebaseApp());
  return _analytics;
}
