/**
 * Firebase integration — AACL (project: aacl-ltd).
 *
 * No credentials are hardcoded. The Web API key is supplied at build time via
 * the VITE_FIREBASE_API_KEY environment variable, and every privileged
 * operation (Admin SDK, service accounts, payment secrets) must live in a
 * server function reading process.env — never in this file.
 *
 * Access control is enforced by Firestore/Storage Security Rules and App Check.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from "firebase/app-check";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported as analyticsSupported, type Analytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: "aacl-ltd.firebaseapp.com",
  projectId: "aacl-ltd",
  storageBucket: "aacl-ltd.firebasestorage.app",
  messagingSenderId: "371824774824",
  appId: "1:371824774824:web:137d29ffca457f2fe1bc9d",
} as const;

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let _app: FirebaseApp | null = null;
export function getFirebaseApp(): FirebaseApp {
  if (_app) return _app;
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured: VITE_FIREBASE_API_KEY is missing.");
  }
  _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return _app;
}


let _appCheck: AppCheck | null = null;
export function getFirebaseAppCheck(): AppCheck | null {
  if (typeof window === "undefined") return null;
  if (_appCheck) return _appCheck;
  const siteKey = import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY;
  if (!siteKey) return null;

  _appCheck = initializeAppCheck(getFirebaseApp(), {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });

  return _appCheck;
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getFirebaseDb(): Firestore {
  getFirebaseAppCheck();
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
