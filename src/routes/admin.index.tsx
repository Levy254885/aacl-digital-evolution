import { createFileRoute, Link } from "@tanstack/react-router";
import { CMS_COLLECTIONS } from "@/lib/cms";
import { useAuth, roleAtLeast, ROLE_LABELS } from "@/lib/auth";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  component: AdminOverview,
});

function AdminOverview() {
  const { user, role } = useAuth();
  const editable = CMS_COLLECTIONS.filter((c) => roleAtLeast(role, c.editableBy));

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-extrabold">Content dashboard</h1>
      <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-muted-foreground">
        Signed in as {user?.email} ({ROLE_LABELS[role ?? "client"]}). Everything below is published
        live to the website. If a collection has never been saved, the site falls back to the
        built-in content, so nothing can break by leaving it untouched.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {editable.map((c) => (
          <Link
            key={c.key}
            to="/admin/content/$key"
            params={{ key: c.key }}
            className="rounded-[16px] border border-border p-6 transition-colors hover:bg-[var(--grey)]"
          >
            <div className="font-display text-lg font-extrabold">{c.label}</div>
            <p className="mt-2 text-sm leading-[1.8] text-muted-foreground">{c.description}</p>
            <div className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {c.kind === "list" ? "List" : "Single record"} · min role{" "}
              {c.editableBy === "admin" ? "Admin" : "Editor"}
            </div>
          </Link>
        ))}
      </div>

      {roleAtLeast(role, "admin") && (
        <div className="mt-10 rounded-[16px] bg-[var(--grey)] p-6">
          <h2 className="font-display text-lg font-extrabold">Team & roles</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Grant Super Admin, Admin, Consultant, Editor, Support or Client access.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/admin/team" className="btn-outline-navy inline-flex">
              Manage team
            </Link>
            <Link to="/admin/audit" className="btn-outline-navy inline-flex">
              View audit log
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
