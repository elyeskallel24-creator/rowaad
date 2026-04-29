import { useEffect, useState } from "react";
import { store, useStoreSubscription, type Partner } from "@/lib/store";
import { Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";

export function AdminPartners() {
  const [items, setItems] = useState<Partner[]>([]);
  const [draft, setDraft] = useState<{ name: string; website: string; logo: string }>({ name: "", website: "", logo: "" });

  useEffect(() => {
    const refresh = () => setItems(store.getPartners());
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => setDraft((d) => ({ ...d, logo: r.result as string }));
    r.readAsDataURL(f);
  };

  const add = () => {
    if (!draft.name.trim() || !draft.logo) return alert("Name and logo required");
    store.savePartner({
      id: crypto.randomUUID(),
      name: draft.name,
      website: draft.website,
      logo: draft.logo,
      visible: true,
      order: items.length,
    });
    setDraft({ name: "", website: "", logo: "" });
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    next.forEach((p, i) => store.savePartner({ ...p, order: i }));
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-orange focus:outline-none";

  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Partners</h1>
      <p className="text-sm text-muted-foreground">Manage logos shown in the Partners section.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-card p-5 sm:grid-cols-[1fr_1fr_auto_auto]">
        <input className={inputCls} placeholder="Partner name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <input className={inputCls} placeholder="Website (optional)" value={draft.website} onChange={(e) => setDraft({ ...draft, website: e.target.value })} />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs">
          <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          {draft.logo ? "Change logo" : "Upload logo"}
        </label>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-gradient-fire px-4 text-xs font-semibold uppercase tracking-wider text-onyx">
          <Plus className="h-4 w-4" /> Add
        </button>
        {draft.logo && (
          <img src={draft.logo} alt="" className="col-span-full h-16 w-auto rounded-lg bg-white/5 p-2" />
        )}
      </div>

      <div className="mt-6 space-y-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
            No partners yet.
          </div>
        )}
        {items.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card p-3">
            <img src={p.logo} alt={p.name} className={`h-10 w-20 object-contain ${p.visible ? "" : "opacity-30"}`} />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              {p.website && <p className="truncate text-xs text-muted-foreground">{p.website}</p>}
            </div>
            <button
              onClick={() => store.savePartner({ ...p, visible: !p.visible })}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"
              title={p.visible ? "Hide" : "Show"}
            >
              {p.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button onClick={() => move(i, -1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowUp className="h-4 w-4" /></button>
            <button onClick={() => move(i, 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowDown className="h-4 w-4" /></button>
            <button onClick={() => { if (confirm("Delete partner?")) store.deletePartner(p.id); }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
