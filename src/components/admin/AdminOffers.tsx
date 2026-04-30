import { useEffect, useState } from "react";
import { store, useStoreSubscription, type Offer } from "@/lib/store";
import { Plus, Trash2, ArrowUp, ArrowDown, Pencil, X, Eye, EyeOff } from "lucide-react";

const empty = (): Offer => ({
  id: "",
  title: "",
  description: "",
  images: [],
  ctaLabel: "",
  ctaUrl: "",
  status: "draft",
  order: 0,
});

export function AdminOffers() {
  const [items, setItems] = useState<Offer[]>([]);
  const [editing, setEditing] = useState<Offer | null>(null);

  useEffect(() => {
    const refresh = () => setItems(store.getOffers());
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    next.forEach((p, i) => store.saveOffer({ ...p, order: i }));
  };

  const startNew = () => setEditing({ ...empty(), id: crypto.randomUUID(), order: items.length });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase">We Offer</h1>
          <p className="text-sm text-muted-foreground">Manage offer cards displayed on the homepage.</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-gradient-fire px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-onyx">
          <Plus className="h-4 w-4" /> New Offer
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
            No offers yet.
          </div>
        )}
        {items.map((o, i) => (
          <div key={o.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card p-3">
            {o.images[0] ? (
              <img src={o.images[0]} alt="" className="h-12 w-20 rounded-lg object-cover" />
            ) : (
              <div className="h-12 w-20 rounded-lg bg-white/5" />
            )}
            <div className="flex-1">
              <p className="font-medium">{o.title || <span className="text-muted-foreground">Untitled</span>}</p>
              <p className="text-xs text-muted-foreground">{o.images.length}/6 images</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${o.status === "published" ? "bg-orange/20 text-orange" : "bg-white/5 text-muted-foreground"}`}>
              {o.status}
            </span>
            <button onClick={() => store.saveOffer({ ...o, status: o.status === "published" ? "draft" : "published" })} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange" title="Toggle status">
              {o.status === "published" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button onClick={() => move(i, -1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowUp className="h-4 w-4" /></button>
            <button onClick={() => move(i, 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowDown className="h-4 w-4" /></button>
            <button onClick={() => setEditing(o)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => { if (confirm("Delete offer?")) store.deleteOffer(o.id); }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>

      {editing && <OfferEditor offer={editing} onClose={() => setEditing(null)} onSave={(o) => { store.saveOffer(o); setEditing(null); }} />}
    </div>
  );
}

function OfferEditor({ offer, onClose, onSave }: { offer: Offer; onClose: () => void; onSave: (o: Offer) => void }) {
  const [draft, setDraft] = useState<Offer>(offer);
  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-orange focus:outline-none";

  const onFile = (slot: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const next = [...draft.images];
      next[slot] = r.result as string;
      setDraft({ ...draft, images: next.filter(Boolean).slice(0, 6) });
    };
    r.readAsDataURL(f);
  };

  const removeImg = (idx: number) => {
    setDraft({ ...draft, images: draft.images.filter((_, i) => i !== idx) });
  };

  const moveImg = (idx: number, dir: -1 | 1) => {
    const next = [...draft.images];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    setDraft({ ...draft, images: next });
  };

  const slots = Array.from({ length: 6 }, (_, i) => draft.images[i]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-6" onClick={onClose}>
      <div className="mx-auto my-6 max-w-2xl rounded-2xl border border-white/10 bg-card p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl uppercase">{offer.title ? "Edit Offer" : "New Offer"}</h2>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/5"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Title</label>
            <input className={inputCls} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Description</label>
            <textarea className={inputCls + " min-h-[160px] resize-y"} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Images (6 slots)</label>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  {src ? (
                    <>
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-x-1 bottom-1 flex items-center justify-between gap-1">
                        <button onClick={() => moveImg(i, -1)} className="rounded bg-black/70 px-1.5 text-xs text-white">←</button>
                        <button onClick={() => removeImg(i)} className="rounded bg-black/70 px-1.5 text-xs text-white">✕</button>
                        <button onClick={() => moveImg(i, 1)} className="rounded bg-black/70 px-1.5 text-xs text-white">→</button>
                      </div>
                    </>
                  ) : (
                    <label className="flex h-full w-full cursor-pointer items-center justify-center text-xs text-muted-foreground hover:text-orange">
                      <input type="file" accept="image/*" onChange={onFile(i)} className="hidden" />
                      + Slot {i + 1}
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">CTA Label</label>
              <input className={inputCls} value={draft.ctaLabel} onChange={(e) => setDraft({ ...draft, ctaLabel: e.target.value })} placeholder="Book a Call" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">CTA URL</label>
              <input className={inputCls} value={draft.ctaUrl} onChange={(e) => setDraft({ ...draft, ctaUrl: e.target.value })} placeholder="https://..." />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Status</label>
            <select className={inputCls + " w-auto"} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Offer["status"] })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs uppercase tracking-wider hover:border-white/30">Cancel</button>
            <button onClick={() => onSave(draft)} className="rounded-xl bg-gradient-fire px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-onyx">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
