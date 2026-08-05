import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { useAuth, roleAtLeast } from "@/lib/auth";
import { listAudit, AUDIT_ACTION_LABELS, type AuditEntry } from "@/lib/audit";

export const Route = createFileRoute("/admin/audit")({
  ssr: false,
  component: AuditPage,
});

function formatWhen(at: Date | null) {
  if (!at) return "—";
  return at.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AuditPage() {
  const { role } = useAuth();
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "content" | "roles">("all");

  const canView = roleAtLeast(role, "admin");

  async function refresh() {
    setLoading(true);
    try {
      setEntries(await listAudit(200));
    } catch {
      toast.error("Could not load the audit log.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (canView) void refresh();
    else setLoading(false);
  }, [canView]);

  const rows = useMemo(
    () =>
      entries.filter((e) =>
        filter === "all"
          ? true
          : filter === "content"
            ? e.action.startsWith("content.")
            : e.action.startsWith("role."),
      ),
    [entries, filter],
  );

  if (!canView) {
    return (
      <div>
        <h1 className="font-display text-2xl font-extrabold">Audit log</h1>
        <p className="mt-3 text-sm text-muted-foreground">Admins and Super Admins only.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold">Audit log</h1>
          <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-muted-foreground">
            An append-only record of every content publish and role change — who did it, what
            changed and when. Entries cannot be edited or deleted by anyone, including Super Admins.
          </p>
        </div>
        <button type="button" onClick={() => void refresh()} className="btn-outline-navy inline-flex items-center gap-2">
          <RefreshCw size={15} aria-hidden="true" /> Refresh
        </button>
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {(
          [
            ["all", "Everything"],
            ["content", "Content changes"],
            ["roles", "Role changes"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] ${
              filter === value
                ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                : "border-border text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading audit log…</p>
      ) : rows.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No activity recorded yet. Publishing content or assigning a role will appear here.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <th scope="col" className="py-3 pr-4 font-semibold">When</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Who</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Action</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Target</th>
                <th scope="col" className="py-3 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-b border-border/60 align-top">
                  <td className="py-4 pr-4 whitespace-nowrap text-muted-foreground">
                    {formatWhen(e.at)}
                  </td>
                  <td className="py-4 pr-4">
                    <span className="block">{e.actorEmail || "Unknown"}</span>
                    <span className="block text-[11px] text-muted-foreground">{e.actorUid}</span>
                  </td>
                  <td className="py-4 pr-4 whitespace-nowrap font-semibold">
                    {AUDIT_ACTION_LABELS[e.action] ?? e.action}
                  </td>
                  <td className="py-4 pr-4">{e.targetLabel || e.target}</td>
                  <td className="py-4 text-muted-foreground">{e.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
