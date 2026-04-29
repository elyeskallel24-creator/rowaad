import { useEffect, useState } from "react";
import { store, useStoreSubscription, type ContactRequest } from "@/lib/store";
import { ChevronDown, Download, Trash2 } from "lucide-react";

export function AdminInbox() {
  const [items, setItems] = useState<ContactRequest[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => setItems(store.getContacts());
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const exportCsv = () => {
    const headers = ["Name", "Email", "WhatsApp", "Description", "Date", "Time", "SubmittedAt", "Status"];
    const rows = items.map((c) => [c.name, c.email, c.whatsapp, c.description.replace(/\n/g, " "), c.date, c.time, c.submittedAt, c.status]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = `rowaad-contacts-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl uppercase">Inbox</h1>
          <p className="text-sm text-muted-foreground">{items.length} request{items.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 rounded-full border border-orange/40 px-4 py-2 text-xs uppercase tracking-[0.14em] text-orange hover:bg-orange hover:text-onyx"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="mt-8 space-y-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
            No requests yet.
          </div>
        )}

        {items.map((c) => {
          const isOpen = open === c.id;
          return (
            <div key={c.id} className="overflow-hidden rounded-2xl border border-white/10 bg-card">
              <button
                onClick={() => setOpen(isOpen ? null : c.id)}
                className="flex w-full items-center gap-4 p-4 text-left hover:bg-white/5"
              >
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  c.status === "new" ? "bg-orange text-onyx" : "bg-white/10 text-foreground/60"
                }`}>
                  {c.status}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{c.name} · <span className="text-muted-foreground">{c.email}</span></p>
                  <p className="truncate text-xs text-muted-foreground">{c.description}</p>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">{new Date(c.submittedAt).toLocaleDateString()}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="border-t border-white/5 p-5 text-sm">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Detail label="WhatsApp" value={c.whatsapp} />
                    <Detail label="Email" value={c.email} />
                    <Detail label="Preferred Date" value={c.date || "—"} />
                    <Detail label="Preferred Time" value={c.time || "—"} />
                    <Detail label="Submitted" value={new Date(c.submittedAt).toLocaleString()} />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Description</p>
                    <p className="mt-1 whitespace-pre-line text-foreground/90">{c.description}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      onClick={() => store.updateContact(c.id, { status: c.status === "new" ? "reviewed" : "new" })}
                      className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-wider hover:border-orange hover:text-orange"
                    >
                      Mark as {c.status === "new" ? "Reviewed" : "New"}
                    </button>
                    <button
                      onClick={() => { if (confirm("Delete this request?")) store.deleteContact(c.id); }}
                      className="inline-flex items-center gap-1 rounded-full border border-destructive/40 px-4 py-1.5 text-xs uppercase tracking-wider text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-foreground/90">{value}</p>
    </div>
  );
}
