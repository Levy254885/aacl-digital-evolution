# AACL Website Security Notes

The website is a Vite + React + TanStack Start app on Vercel, with Firebase Auth,
Cloud Firestore and Cloud Storage as the backend. There is no custom API server,
so **the real security boundary is Firebase Security Rules plus App Check**, not
client-side code.

## Layers

| Layer | Where | What it does |
| --- | --- | --- |
| Transport & browser headers | `vercel.json` | HSTS, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP and a strict Content-Security-Policy. `/admin*` also returns `X-Robots-Tag: noindex, nofollow`. |
| Public write path | `src/lib/contact-leads.ts` | The only public write in the app: `contactLeads`. A fixed field allow-list (`name`, `email`, `phone`, `org`, `service`, `message`, `timestamp`, `source`) is sent, nothing else. |
| Client hardening | `src/lib/contact-security.ts` | Trim + length caps, email format, spam keyword and link heuristics, honeypot field, minimum fill time and a per-browser sliding-window rate limit (3 per 10 minutes). |
| Bot verification | Firebase App Check (reCAPTCHA v3) | Set `VITE_FIREBASE_APPCHECK_SITE_KEY` and enforce App Check on Firestore. This is the CAPTCHA: it is verified by Google server-side, unlike any token the browser could self-report. |
| Authorisation | `firestore.rules`, `storage.rules` | Deny by default. Public read only on `cms`. Writes gated by the role stored at `roles/{uid}`. `contactLeads` and `documentRequests` are create-only, never readable from the client. |
| Admin area | `src/routes/admin.tsx` | Client-only route, `noindex, nofollow`, unauthenticated users see a clean sign-in screen, Editor rank or higher required, MFA notice shown at sign in. Role checks are re-applied per collection and per action, and the same checks exist in the rules. |

## Manual steps to complete outside the codebase

1. **Firebase App Check** — register the site with reCAPTCHA v3, then set
   `VITE_FIREBASE_APPCHECK_SITE_KEY` in Vercel (Production + Preview) and switch
   Firestore App Check enforcement to *Enforced*.
2. **Firestore rules** — deploy with `firebase deploy --only firestore:rules,storage`.
3. **API key restriction** — in Google Cloud console restrict the Firebase Web API
   key to HTTP referrers: `https://aacl.co.ke/*`, `https://www.aacl.co.ke/*`,
   `https://aacl-assurance.vercel.app/*`.
4. **MFA** — enable multi-factor authentication in Firebase Auth and enrol every
   staff account before granting a role of Editor or above.
5. **Authorised domains** — Firebase Auth → Settings → Authorized domains must list
   both `aacl.co.ke` and `aacl-assurance.vercel.app`.
6. **`VITE_SITE_URL`** — set to `https://aacl.co.ke` once the custom domain is live
   so canonicals, sitemap and Open Graph URLs follow the primary domain.
7. **Email alerts** — Firebase Auth → suspicious activity notifications on.

## Rules of the road for future changes

- Never add a second public write path. New public data collection must go through
  `contactLeads`-style create-only rules with a field allow-list.
- Never log form contents, tokens, emails or Firebase config to the console.
- Never trust a role read on the client for anything destructive: mirror it in
  `firestore.rules`.
- All `target="_blank"` links must carry `rel="noopener noreferrer"`.
