import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, UserPlus } from "lucide-react";
import { useAuth, roleAtLeast, ROLES, ROLE_LABELS, type Role } from "@/lib/auth";
import { listTeam, removeTeamMember, upsertTeamMember, type TeamMember } from "@/lib/team";

export const Route = createFileRoute("/admin/team")({
  ssr: false,
  component: TeamPage,
});

function TeamPage() {
  const { user, role } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<TeamMember>({ uid: "", email: "", name: "", role: "editor" });

  const canManage = roleAtLeast(role, "admin");
  const canAssignSuper = role === "super_admin";

  async function refresh() {
    setLoading(true);
    try {
      setMembers(await listTeam());
    } catch {
      toast.error("Could not load team members.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  if (!canManage) {
    return (
      <div>
        <h1 className="font-display text-2xl font-extrabold">Team & roles</h1>
        <p className="mt-3 text-sm text-muted-foreground">Admins and Super Admins only.</p>
      </div>
    );
  }

  const options = ROLES.filter((r) => canAssignSuper || r !== "super_admin");

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-extrabold">Team & roles</h1>
      <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-muted-foreground">
        Create the account in Firebase Authentication first, then paste its User UID here and assign
        a role. Roles: Super Admin (full control incl. roles), Admin (all content + team),
        Consultant, Editor (content), Support and Client (portal access only).
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!user) return;
          try {
            await upsertTeamMember(draft, user.uid, user.email);
            toast.success("Role saved");
            setDraft({ uid: "", email: "", name: "", role: "editor" });
            await refresh();
          } catch {
            toast.error("Save failed. Super Admin rights may be required.");
          }
        }}
        className="mt-8 grid gap-4 rounded-[16px] border border-border p-6 sm:grid-cols-4"
      >
        <label className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          User UID
          <input
            required
            value={draft.uid}
            onChange={(e) => setDraft({ ...draft, uid: e.target.value })}
            className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 text-sm normal-case tracking-normal"
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Email
          <input
            type="email"
            required
            value={draft.email}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 text-sm normal-case tracking-normal"
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Name
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 text-sm normal-case tracking-normal"
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Role
          <select
            value={draft.role}
            onChange={(e) => setDraft({ ...draft, role: e.target.value as Role })}
            className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 text-sm normal-case tracking-normal"
          >
            {options.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn-gold inline-flex items-center gap-2 sm:col-span-4">
          <UserPlus size={15} aria-hidden="true" /> Save role
        </button>
      </form>

      <div className="mt-10 overflow-hidden rounded-[16px] border border-border">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">AACL dashboard users and roles</caption>
          <thead className="bg-[var(--navy)] text-white">
            <tr>
              <th scope="col" className="p-4 text-[11px] uppercase tracking-[0.12em]">Email</th>
              <th scope="col" className="p-4 text-[11px] uppercase tracking-[0.12em]">Name</th>
              <th scope="col" className="p-4 text-[11px] uppercase tracking-[0.12em]">Role</th>
              <th scope="col" className="p-4 text-[11px] uppercase tracking-[0.12em]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="p-4 text-muted-foreground">Loading…</td>
              </tr>
            )}
            {!loading && members.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-muted-foreground">No roles assigned yet.</td>
              </tr>
            )}
            {members.map((m) => (
              <tr key={m.uid} className="border-t border-border">
                <td className="p-4">{m.email}</td>
                <td className="p-4">{m.name || "N/A"}</td>
                <td className="p-4">
                  <select
                    value={m.role}
                    onChange={async (e) => {
                      if (!user) return;
                      try {
                        await upsertTeamMember({ ...m, role: e.target.value as Role }, user.uid, user.email);
                        toast.success("Role updated");
                        await refresh();
                      } catch {
                        toast.error("Update failed.");
                      }
                    }}
                    className="rounded-[10px] border border-border px-3 py-2"
                  >
                    {options.map((r) => (
                      <option key={r} value={r}>
                        {ROLE_LABELS[r]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    aria-label={`Remove ${m.email}`}
                    onClick={async () => {
                      try {
                        await removeTeamMember(m.uid, user?.uid, user?.email);
                        toast.success("Access removed");
                        await refresh();
                      } catch {
                        toast.error("Remove failed.");
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[var(--red)]"
                  >
                    <Trash2 size={14} aria-hidden="true" /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
