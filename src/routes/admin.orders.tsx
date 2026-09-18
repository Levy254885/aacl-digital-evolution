import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth, roleAtLeast } from "@/lib/auth";
import {
  listOrders,
  markOrderPaid,
  updateOrderStatus,
  type OrderRecord,
} from "@/lib/orders";
import { recordAudit } from "@/lib/audit";

export const Route = createFileRoute("/admin/orders")({
  ssr: false,
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const { user, role } = useAuth();
  const [orders, setOrders] = useState<(OrderRecord & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const canManage = roleAtLeast(role, "admin");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await listOrders(150);
      setOrders(rows);
    } catch {
      toast.error("Could not load orders. Check Firestore rules and your role.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function confirmPaid(order: OrderRecord & { id: string }) {
    if (!canManage || !user) return;
    try {
      await markOrderPaid(order.id, { provider: "manual" });
      await recordAudit({
        action: "content.publish",
        target: order.id,
        targetLabel: order.reference,
        summary: `Marked order ${order.reference} as paid (${order.kind}, ${order.amount} ${order.currency})`,
        actorUid: user.uid,
        actorEmail: user.email,
      });
      toast.success(`Order ${order.reference} marked paid`);
      await refresh();
    } catch {
      toast.error("Failed to update order");
    }
  }

  async function setFailed(order: OrderRecord & { id: string }) {
    if (!canManage) return;
    try {
      await updateOrderStatus(order.id, "failed");
      toast.success("Order marked failed");
      await refresh();
    } catch {
      toast.error("Failed to update order");
    }
  }

  if (!canManage) {
    return (
      <div>
        <h1 className="font-display text-2xl font-extrabold">Orders</h1>
        <p className="mt-3 text-sm text-muted-foreground">Admin role required to view payments.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold">Orders & payments</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
            Template downloads and eCompliance subscriptions. Confirm bank/M-Pesa/PayPal receipts here
            when live gateway keys are not yet connected, or after webhook lag.
          </p>
        </div>
        <button type="button" className="btn-outline-navy text-sm" onClick={() => void refresh()}>
          Refresh
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[16px] border border-border bg-background">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-[var(--grey)] text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Kind</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  Loading orders…
                </td>
              </tr>
            )}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  No orders yet. Payments from Templates and eCompliance will appear here.
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{o.reference}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{o.kind}</div>
                  <div className="text-xs text-muted-foreground">
                    {o.templateName || o.planTier || "—"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>{o.customerName}</div>
                  <div className="text-xs text-muted-foreground">{o.email}</div>
                  {o.phone && <div className="text-xs text-muted-foreground">{o.phone}</div>}
                </td>
                <td className="px-4 py-3">
                  {o.currency} {Number(o.amount).toLocaleString()}
                </td>
                <td className="px-4 py-3 uppercase text-xs">{o.paymentMethod}</td>
                <td className="px-4 py-3">
                  <StatusPill status={o.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {o.status !== "paid" && (
                      <button
                        type="button"
                        className="text-xs rounded-md bg-[var(--navy)] text-white px-3 py-1.5"
                        onClick={() => void confirmPaid(o)}
                      >
                        Mark paid
                      </button>
                    )}
                    {o.status === "pending" || o.status === "awaiting_payment" ? (
                      <button
                        type="button"
                        className="text-xs rounded-md border border-border px-3 py-1.5"
                        onClick={() => void setFailed(o)}
                      >
                        Fail
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const color =
    status === "paid"
      ? "bg-emerald-100 text-emerald-800"
      : status === "failed" || status === "cancelled"
        ? "bg-red-100 text-red-800"
        : "bg-amber-100 text-amber-900";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase ${color}`}>
      {status}
    </span>
  );
}
