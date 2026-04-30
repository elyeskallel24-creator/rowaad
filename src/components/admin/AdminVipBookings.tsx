import { useEffect, useMemo, useState } from "react";
import { store, useStoreSubscription, type VipBooking, type VipBookingStatus } from "@/lib/store";
import { Trash2, Download } from "lucide-react";

const STATUS_CYCLE: VipBookingStatus[] = ["new", "contacted", "confirmed", "declined"];
const STATUS_STYLE: Record<VipBookingStatus, string> = {
  new: "bg-[#FFE072]/20 text-[#FFE072]",
  contacted: "bg-orange/20 text-orange",
  confirmed: "bg-emerald-500/20 text-emerald-400",
  declined: "bg-white/5 text-muted-foreground",
};

export function AdminVipBookings() {
  const [items, setItems] = useState<VipBooking[]>([]);
  const [prevNewCount, setPrevNewCount] = useState(0);

  useEffect(() => {
    const refresh = () => setItems(store.getVipBookings());
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  // Title-bar notification
  useEffect(() => {
    const newCount = items.filter((b) => b.status === "new").length;
    if (typeof document !== "undefined") {
      if (newCount > prevNewCount && prevNewCount !== 0) {
        const orig = document.title;
        document.title = `(${newCount}) New VIP Booking — Rowaad Admin`;
        const reset = () => { document.title = orig; window.removeEventListener("focus", reset); };
        window.addEventListener("focus", reset);
      } else if (newCount > 0) {
        document.title = `(${newCount}) New VIP Booking — Rowaad Admin`;
      } else {
        document.title = "Rowaad Admin";
      }
    }
    setPrevNewCount(newCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const stats = useMemo(() => ({
    total: items.length,
    new: items.filter((b) => b.status === "new").length,
    confirmed: items.filter((b) => b.status === "confirmed").length,
  }), [items]);

  const cycleStatus = (b: VipBooking) => {
    const idx = STATUS_CYCLE.indexOf(b.status);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    store.updateVipBooking(b.id, { status: next });
  };

  const exportCsv = () => {
    const rows = [
      ["WhatsApp", "Email", "Date", "Time", "Submitted At", "Status"],
      ...items.map((b) => [
        b.whatsapp, b.email, b.date, b.time, b.submittedAt, b.status,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `vip-bookings-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fmtDate = (s: string) => {
    if (!s) return "—";
    const [y, m, d] = s.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase">VIP Bookings</h1>
          <p className="text-sm text-muted-foreground">Private briefing requests from the VIP Investors Club.</p>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs uppercase tracking-wider hover:border-orange hover:text-orange">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Bookings", value: stats.total },
          { label: "New / Unread", value: stats.new },
          { label: "Confirmed", value: stats.confirmed },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-5xl text-gradient-fire">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
            No VIP bookings yet.
          </div>
        )}
        {items.map((b) => (
          <div key={b.id} className="grid grid-cols-1 items-center gap-3 rounded-2xl border border-white/10 bg-card p-4 sm:grid-cols-[1.2fr_1.5fr_1fr_0.8fr_1fr_auto_auto]">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">WhatsApp</p>
              <p className="font-medium">{b.whatsapp}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</p>
              <p className="truncate">{b.email}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Date</p>
              <p>{fmtDate(b.date)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Time</p>
              <p>{b.time}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Submitted</p>
              <p className="text-xs">{new Date(b.submittedAt).toLocaleString()}</p>
            </div>
            <button onClick={() => cycleStatus(b)} className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLE[b.status]}`}>
              {b.status}
            </button>
            <button onClick={() => { if (confirm("Delete booking?")) store.deleteVipBooking(b.id); }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
