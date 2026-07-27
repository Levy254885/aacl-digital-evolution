/**
 * Firebase integration — scaffolding only.
 *
 * The codebase is prepared for Firebase but the SDK is intentionally NOT
 * initialised yet. When you're ready to enable it:
 *
 *   1. Install the SDK:
 *        bun add firebase
 *   2. Populate these env vars (client-safe, exposed via Vite):
 *        VITE_FIREBASE_API_KEY
 *        VITE_FIREBASE_AUTH_DOMAIN
 *        VITE_FIREBASE_PROJECT_ID
 *        VITE_FIREBASE_STORAGE_BUCKET
 *        VITE_FIREBASE_MESSAGING_SENDER_ID
 *        VITE_FIREBASE_APP_ID
 *   3. Uncomment the block below and import { getFirebaseApp } from "@/lib/firebase".
 *
 * Any privileged Firebase Admin usage MUST live in a server function
 * (see src/lib/*.functions.ts) and read secrets from process.env, never here.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
} as const;

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

// import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
// let app: FirebaseApp | null = null;
// export function getFirebaseApp(): FirebaseApp {
//   if (!isFirebaseConfigured) {
//     throw new Error("Firebase env vars are not configured.");
//   }
//   if (app) return app;
//   app = getApps().length ? getApp() : initializeApp(firebaseConfig);
//   return app;
// }
