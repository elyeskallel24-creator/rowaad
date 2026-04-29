import { useEffect, useState } from "react";
import { store, useStoreSubscription, type Project } from "@/lib/store";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, X } from "lucide-react";

const TAGS = ["Revenue Systems", "B2B", "AI Stack", "Venture", "Strategy", "Fractional CGO"];

export function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => {
    const refresh = () => setItems(store.getProjects());
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const newProject = (): Project => ({
    id: crypto.randomUUID(),
    title: "",
    shortDescription: "",
    longDescription: "",
    coverImage: "",
    tags: [],
    status: "draft",
    date: new Date().toISOString().slice(0, 10),
    order: items.length,
  });

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    next.forEach((p, i) => store.saveProject({ ...p, order: i }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your "Our Work" portfolio.</p>
        </div>
        <button
          onClick={() => setEditing(newProject())}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-fire px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-onyx"
        >
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
            No projects yet. Click "New Project" to add one.
          </div>
        )}
        {items.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card p-3">
            <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-onyx">
              {p.coverImage ? <img src={p.coverImage} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center font-display text-orange/40">{p.title[0] || "?"}</div>}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${p.status === "published" ? "bg-orange text-onyx" : "bg-white/10 text-foreground/60"}`}>{p.status}</span>
                <p className="truncate font-medium">{p.title || "Untitled"}</p>
              </div>
              <p className="truncate text-xs text-muted-foreground">{p.shortDescription}</p>
            </div>
            <div className="flex items-center gap-1">
              <IconBtn onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></IconBtn>
              <IconBtn onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></IconBtn>
              <IconBtn onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></IconBtn>
              <IconBtn destructive onClick={() => { if (confirm("Delete project?")) store.deleteProject(p.id); }}><Trash2 className="h-4 w-4" /></IconBtn>
            </div>
          </div>
        ))}
      </div>

      {editing && <ProjectEditor project={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function IconBtn({ children, onClick, destructive }: { children: React.ReactNode; onClick: () => void; destructive?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:${
        destructive ? "border-destructive text-destructive" : "border-orange text-orange"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectEditor({ project, onClose }: { project: Project; onClose: () => void }) {
  const [p, setP] = useState<Project>(project);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setP({ ...p, coverImage: reader.result as string });
    reader.readAsDataURL(f);
  };

  const toggleTag = (t: string) => {
    setP({ ...p, tags: p.tags.includes(t) ? p.tags.filter((x) => x !== t) : [...p.tags, t] });
  };

  const save = () => {
    if (!p.title.trim()) return alert("Title is required");
    store.saveProject(p);
    onClose();
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-orange focus:outline-none";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-onyx/85 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-dark relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-onyx/60 hover:bg-orange hover:text-onyx"><X className="h-4 w-4" /></button>
        <h2 className="font-display text-3xl uppercase">{project.title ? "Edit" : "New"} Project</h2>

        <div className="mt-6 space-y-4">
          <Field label="Title"><input className={inputCls} value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} /></Field>
          <Field label="Short Description"><input className={inputCls} value={p.shortDescription} onChange={(e) => setP({ ...p, shortDescription: e.target.value })} /></Field>
          <Field label="Long Description"><textarea className={inputCls + " min-h-[120px]"} value={p.longDescription} onChange={(e) => setP({ ...p, longDescription: e.target.value })} /></Field>

          <Field label="Cover Image">
            <input type="file" accept="image/*" onChange={onFile} className="text-xs text-muted-foreground" />
            {p.coverImage && <img src={p.coverImage} alt="" className="mt-2 h-32 w-full rounded-xl object-cover" />}
          </Field>

          <Field label="Tags">
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`rounded-full border px-3 py-1 text-xs ${p.tags.includes(t) ? "border-orange bg-orange text-onyx" : "border-white/15 text-foreground/70"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select className={inputCls} value={p.status} onChange={(e) => setP({ ...p, status: e.target.value as Project["status"] })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
            <Field label="Date"><input type="date" className={inputCls} value={p.date} onChange={(e) => setP({ ...p, date: e.target.value })} /></Field>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full border border-white/15 px-5 py-2 text-xs uppercase tracking-wider hover:border-orange hover:text-orange">Cancel</button>
          <button onClick={save} className="rounded-full bg-gradient-fire px-6 py-2 text-xs font-semibold uppercase tracking-wider text-onyx">Save</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
