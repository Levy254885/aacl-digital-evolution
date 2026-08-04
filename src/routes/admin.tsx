import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { AuthProvider, useAuth, roleAtLeast, ROLE_LABELS } from "@/lib/auth";
import { CMS_COLLECTIONS } from "@/lib/cms";
import { isFirebaseConfigured } from "@/lib/firebase";
import { LayoutDashboard, Users, FileStack, LogOut, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "AACL Admin — Content & Team Management" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private AACL administration dashboard." },
    ],
  }),
  component: AdminLayout,
});

function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--navy)] p-6">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError(null);
          try {
            await signIn(email, password);
          } catch {
            setError("Sign-in failed. Check your email and password.");
          } finally {
            setBusy(false);
          }
        }}
        className="w-full max-w-md rounded-[20px] bg-background p-8 md:p-10"
      >
        <h1 className="font-display text-2xl font-extrabold">AACL Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your AACL account to manage website content.
        </p>

        <label className="mt-7 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm normal-case tracking-normal text-foreground"
          />
        </label>

        <label className="mt-5 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm normal-case tracking-normal text-foreground"
          />
        </label>

        {error && <p className="mt-5 text-sm text-[var(--red)]">{error}</p>}

        <button type="submit" disabled={busy} className="btn-gold mt-7 w-full justify-center">
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <Link to="/" className="mt-6 block text-center text-sm text-muted-foreground underline">
          Back to website
        </Link>
      </form>
    </div>
  );
}

function Shell() {
  const { ready, user, role, signOutUser } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <p className="max-w-md text-sm text-muted-foreground">
          The admin dashboard needs the Firebase Web API key. Set{" "}
          <code>VITE_FIREBASE_API_KEY</code> in your environment and redeploy.
        </p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading dashboard…</span>
      </div>
    );
  }

  if (!user) return <SignInScreen />;

  if (!roleAtLeast(role, "editor")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 p-8 text-center">
        <ShieldAlert className="text-[var(--red)]" size={34} aria-hidden="true" />
        <h1 className="font-display text-2xl font-extrabold">No dashboard access</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Your account ({user.email}) is signed in as{" "}
          {ROLE_LABELS[role ?? "client"]}. Ask a Super Admin to grant you Editor access or higher.
        </p>
        <button type="button" onClick={signOutUser} className="btn-outline-navy">
          Sign out
        </button>
      </div>
    );
  }

  const navItems = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    ...(roleAtLeast(role, "admin")
      ? [{ to: "/admin/team", label: "Team & roles", icon: Users, exact: false }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[var(--grey)] text-foreground">
      <header className="bg-[var(--navy)] text-white">
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link to="/admin" className="font-display text-lg font-extrabold text-white">
            AACL Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-white/70 sm:block">
              {user.email} · {ROLE_LABELS[role ?? "client"]}
            </span>
            <Link to="/" className="text-sm text-white/80 underline">
              View site
            </Link>
            <button
              type="button"
              onClick={signOutUser}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm"
            >
              <LogOut size={15} aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <nav aria-label="Admin sections" className="space-y-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm ${
                      active ? "bg-[var(--navy)] text-white" : "hover:bg-background"
                    }`}
                  >
                    <item.icon size={16} aria-hidden="true" /> {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div>
            <div className="px-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Content collections
            </div>
            <ul className="mt-2 space-y-1">
              {CMS_COLLECTIONS.filter((c) => roleAtLeast(role, c.editableBy)).map((c) => {
                const to = `/admin/content/${c.key}`;
                const active = pathname === to;
                return (
                  <li key={c.key}>
                    <Link
                      to="/admin/content/$key"
                      params={{ key: c.key }}
                      className={`flex items-center gap-3 rounded-[12px] px-4 py-2.5 text-sm ${
                        active ? "bg-[var(--navy)] text-white" : "hover:bg-background"
                      }`}
                    >
                      <FileStack size={15} aria-hidden="true" /> {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <main className="min-w-0 rounded-[20px] bg-background p-6 md:p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminLayout() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
