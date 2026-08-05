import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, RotateCcw } from "lucide-react";
import { getCmsCollection, loadCmsDoc, saveCmsDoc } from "@/lib/cms";
import { useAuth, roleAtLeast } from "@/lib/auth";

export const Route = createFileRoute("/admin/content/$key")({
  ssr: false,
  component: ContentEditor,
});

type Row = Record<string, unknown>;

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

function FieldInput({
  name,
  value,
  onChange,
}: {
  name: string;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  const label = name.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase());

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 text-sm normal-case tracking-normal text-foreground"
        />
      </label>
    );
  }

  if (typeof value === "string") {
    const long = value.length > 90;
    return (
      <label className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
        {long ? (
          <textarea
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 text-sm normal-case tracking-normal leading-relaxed text-foreground"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 text-sm normal-case tracking-normal text-foreground"
          />
        )}
      </label>
    );
  }

  // Nested object / array — edit as JSON.
  return (
    <label className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      {label} (JSON)
      <textarea
        rows={4}
        defaultValue={JSON.stringify(value, null, 2)}
        onBlur={(e) => {
          try {
            onChange(JSON.parse(e.target.value));
          } catch {
            toast.error(`${label}: invalid JSON — change discarded`);
          }
        }}
        className="mt-1.5 w-full rounded-[10px] border border-border px-3 py-2 font-mono text-[12px] normal-case tracking-normal text-foreground"
      />
    </label>
  );
}

function ContentEditor() {
  const { key } = Route.useParams();
  const { user, role } = useAuth();
  const queryClient = useQueryClient();
  const def = getCmsCollection(key);

  const [value, setValue] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [raw, setRaw] = useState(false);
  const [rawText, setRawText] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    if (!def) return;
    loadCmsDoc(key)
      .then((stored) => {
        if (cancelled) return;
        setValue(clone(stored ?? def.fallback));
      })
      .catch(() => {
        if (!cancelled) setValue(clone(def.fallback));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [key, def]);

  const rows = useMemo<Row[]>(
    () => (def?.kind === "list" && Array.isArray(value) ? (value as Row[]) : []),
    [def, value],
  );

  if (!def) {
    return (
      <div>
        <h1 className="font-display text-2xl font-extrabold">Unknown collection</h1>
        <Link to="/admin" className="btn-outline-navy mt-6 inline-flex">
          Back to overview
        </Link>
      </div>
    );
  }

  if (!roleAtLeast(role, def.editableBy)) {
    return (
      <div>
        <h1 className="font-display text-2xl font-extrabold">{def.label}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your role cannot edit this collection. Ask an Admin for access.
        </p>
      </div>
    );
  }

  async function save(next: unknown) {
    if (!user) return;
    setSaving(true);
    try {
      await saveCmsDoc(key, next, user.uid, user.email);
      await queryClient.invalidateQueries({ queryKey: ["cms", key] });
      toast.success(`${def!.label} published`);
    } catch {
      toast.error("Save failed — check your role permissions and try again.");
    } finally {
      setSaving(false);
    }
  }

  const template: Row = rows[0] ? Object.fromEntries(
    Object.entries(clone(rows[0])).map(([k, v]) => [
      k,
      typeof v === "string" ? "" : typeof v === "number" ? 0 : typeof v === "boolean" ? false : v,
    ]),
  ) : {};

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold">{def.label}</h1>
          <p className="mt-2 max-w-xl text-sm leading-[1.8] text-muted-foreground">
            {def.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setRawText(JSON.stringify(value, null, 2));
              setRaw((r) => !r);
            }}
            className="btn-outline-navy"
          >
            {raw ? "Form editor" : "Raw JSON"}
          </button>
          <button
            type="button"
            onClick={() => setValue(clone(def.fallback))}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm"
          >
            <RotateCcw size={15} aria-hidden="true" /> Reset to default
          </button>
          <button
            type="button"
            disabled={saving || loading}
            onClick={() => {
              if (raw) {
                try {
                  const parsed = JSON.parse(rawText);
                  setValue(parsed);
                  void save(parsed);
                } catch {
                  toast.error("Invalid JSON — fix it before publishing.");
                }
                return;
              }
              void save(value);
            }}
            className="btn-gold inline-flex items-center gap-2"
          >
            <Save size={15} aria-hidden="true" /> {saving ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading content…</p>
      ) : raw ? (
        <textarea
          rows={26}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          spellCheck={false}
          className="mt-8 w-full rounded-[14px] border border-border p-4 font-mono text-[12px] leading-relaxed"
        />
      ) : def.kind === "object" ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {Object.entries((value ?? {}) as Row).map(([k, v]) => (
            <FieldInput
              key={k}
              name={k}
              value={v}
              onChange={(next) => setValue({ ...(value as Row), [k]: next })}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {rows.map((row, i) => (
            <div key={i} className="rounded-[16px] border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Item {i + 1}
                </span>
                <span className="flex gap-2">
                  <button
                    type="button"
                    aria-label={`Move item ${i + 1} up`}
                    disabled={i === 0}
                    onClick={() => {
                      const next = clone(rows);
                      [next[i - 1], next[i]] = [next[i]!, next[i - 1]!];
                      setValue(next);
                    }}
                    className="rounded-full border border-border p-2 disabled:opacity-40"
                  >
                    <ArrowUp size={14} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move item ${i + 1} down`}
                    disabled={i === rows.length - 1}
                    onClick={() => {
                      const next = clone(rows);
                      [next[i + 1], next[i]] = [next[i]!, next[i + 1]!];
                      setValue(next);
                    }}
                    className="rounded-full border border-border p-2 disabled:opacity-40"
                  >
                    <ArrowDown size={14} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete item ${i + 1}`}
                    onClick={() => setValue(rows.filter((_, idx) => idx !== i))}
                    className="rounded-full border border-border p-2 text-[var(--red)]"
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(row).map(([k, v]) => (
                  <FieldInput
                    key={k}
                    name={k}
                    value={v}
                    onChange={(next) => {
                      const copy = clone(rows);
                      copy[i] = { ...copy[i], [k]: next };
                      setValue(copy);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setValue([...rows, clone(template)])}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm"
          >
            <Plus size={15} aria-hidden="true" /> Add item
          </button>
        </div>
      )}
    </div>
  );
}
