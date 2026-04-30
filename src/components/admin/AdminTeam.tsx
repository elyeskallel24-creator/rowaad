import { useEffect, useState } from "react";
import { store, useStoreSubscription, type TeamMember } from "@/lib/store";
import { Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";

export function AdminTeam() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [draft, setDraft] = useState<{ name: string; role: string; photo: string }>({ name: "", role: "", photo: "" });

  useEffect(() => {
    const refresh = () => setItems(store.getTeam());
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => setDraft((d) => ({ ...d, photo: r.result as string }));
    r.readAsDataURL(f);
  };

  const add = () => {
    if (!draft.name.trim() || !draft.role.trim()) return alert("Name and role required");
    store.saveTeamMember({
      id: crypto.randomUUID(),
      name: draft.name,
      role: draft.role,
      photo: draft.photo,
      status: "published",
      order: items.length,
    });
    setDraft({ name: "", role: "", photo: "" });
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    next.forEach((m, i) => store.saveTeamMember({ ...m, order: i }));
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-orange focus:outline-none";

  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Team</h1>
      <p className="text-sm text-muted-foreground">Manage members shown in the public Team section.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-card p-5 sm:grid-cols-[1fr_1fr_auto_auto]">
        <input className={inputCls} placeholder="Full name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <input className={inputCls} placeholder="Role / title" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs">
          <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          {draft.photo ? "Change photo" : "Upload photo"}
        </label>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-gradient-fire px-4 text-xs font-semibold uppercase tracking-wider text-onyx">
          <Plus className="h-4 w-4" /> Add
        </button>
        {draft.photo && (
          <img src={draft.photo} alt="" className="col-span-full h-20 w-20 rounded-full object-cover" />
        )}
      </div>

      <div className="mt-6 space-y-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
            No team members yet.
          </div>
        )}
        {items.map((m, i) => (
          <div key={m.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card p-3">
            {m.photo ? (
              <img src={m.photo} alt={m.name} className={`h-12 w-12 rounded-full object-cover ${m.status === "published" ? "" : "opacity-30"}`} />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-onyx font-display text-orange">{m.name[0]}</div>
            )}
            <div className="flex-1">
              <p className="font-medium">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
            <button
              onClick={() => store.saveTeamMember({ ...m, status: m.status === "published" ? "draft" : "published" })}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"
              title={m.status === "published" ? "Hide" : "Show"}
            >
              {m.status === "published" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button onClick={() => move(i, -1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowUp className="h-4 w-4" /></button>
            <button onClick={() => move(i, 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowDown className="h-4 w-4" /></button>
            <button onClick={() => { if (confirm("Delete member?")) store.deleteTeamMember(m.id); }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
