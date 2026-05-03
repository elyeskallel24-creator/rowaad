import { useEffect, useState } from "react";
import { store, useStoreSubscription, type BlogPost, type BlogAuthor } from "@/lib/store";
import { Plus, Trash2, Pencil, ArrowUp, ArrowDown, X, Save, ChevronDown, ChevronUp } from "lucide-react";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const todayISO = () => new Date().toISOString().split("T")[0];

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-orange focus:outline-none";

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [author, setAuthor] = useState<BlogAuthor>({ name: "", role: "", photo: "" });
  const [authorOpen, setAuthorOpen] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  useEffect(() => {
    const refresh = () => {
      setPosts(store.getBlogPosts());
      const a = store.getBlogAuthor();
      setAuthor(a);
      if (a.name) setAuthorOpen(false);
    };
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const onAuthorPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => setAuthor((a) => ({ ...a, photo: r.result as string }));
    r.readAsDataURL(f);
  };

  const saveAuthor = () => {
    if (!author.name.trim() || !author.role.trim()) return alert("Name and role required");
    store.saveBlogAuthor(author);
    setAuthorOpen(false);
  };

  const newPost = () => {
    const a = store.getBlogAuthor();
    if (!a.name) return alert("Set up your Author Profile first.");
    setEditing({
      id: crypto.randomUUID(),
      title: "",
      slug: "",
      excerpt: "",
      body: "",
      coverImage: "",
      bodyImage: "",
      author: a,
      publishDate: todayISO(),
      status: "draft",
      order: posts.length,
      createdAt: new Date().toISOString(),
    });
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...posts];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    next.forEach((p, i) => store.saveBlogPost({ ...p, order: i }));
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase">Blog</h1>
          <p className="text-sm text-muted-foreground">Publish and manage Rowaad blog posts.</p>
        </div>
        <button onClick={newPost} className="inline-flex items-center gap-2 rounded-xl bg-gradient-fire px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-onyx">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {/* Author Profile */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
        <button onClick={() => setAuthorOpen((o) => !o)} className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {author.photo ? (
              <img src={author.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-onyx text-orange">A</div>
            )}
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-wider">{author.name || "Author Profile"}</p>
              <p className="text-xs text-muted-foreground">{author.role || "Set your identity before publishing"}</p>
            </div>
          </div>
          {authorOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {authorOpen && (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr_1fr_auto]">
            <label className="inline-flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-[10px] uppercase">
              <input type="file" accept="image/*" onChange={onAuthorPhoto} className="hidden" />
              {author.photo ? <img src={author.photo} alt="" className="h-full w-full object-cover" /> : "Photo"}
            </label>
            <input className={inputCls} placeholder="Full name" value={author.name} onChange={(e) => setAuthor({ ...author, name: e.target.value })} />
            <input className={inputCls} placeholder="Role / title" value={author.role} onChange={(e) => setAuthor({ ...author, role: e.target.value })} />
            <button onClick={saveAuthor} className="inline-flex items-center gap-2 rounded-xl bg-gradient-fire px-4 text-xs font-semibold uppercase tracking-wider text-onyx">
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        )}
      </div>

      {/* Post list */}
      <div className="mt-8 space-y-2">
        {posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
            No posts yet.
          </div>
        )}
        {posts.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card p-3">
            {p.coverImage ? (
              <img src={p.coverImage} alt="" className="h-12 w-12 rounded-md object-cover" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-onyx text-orange">B</div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.title || "Untitled"}</p>
              <p className="text-xs text-muted-foreground">{p.author?.name} · {p.publishDate}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
              p.status === "published" ? "bg-orange/15 text-orange" : "bg-white/5 text-muted-foreground"
            }`}>
              {p.status}
            </span>
            <button onClick={() => move(i, -1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowUp className="h-4 w-4" /></button>
            <button onClick={() => move(i, 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><ArrowDown className="h-4 w-4" /></button>
            <button onClick={() => setEditing(p)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => { if (confirm("Delete post?")) store.deleteBlogPost(p.id); }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>

      {editing && (
        <PostEditor
          post={editing}
          onClose={() => setEditing(null)}
          onSave={(p) => { store.saveBlogPost(p); setEditing(null); }}
        />
      )}
    </div>
  );
}

function PostEditor({ post, onClose, onSave }: { post: BlogPost; onClose: () => void; onSave: (p: BlogPost) => void }) {
  const [draft, setDraft] = useState<BlogPost>(post);
  const [slugDirty, setSlugDirty] = useState(!!post.slug);

  const onTitle = (v: string) => {
    setDraft((d) => ({ ...d, title: v, slug: slugDirty ? d.slug : slugify(v) }));
  };

  const onImage = (slot: "coverImage" | "bodyImage") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => setDraft((d) => ({ ...d, [slot]: r.result as string }));
    r.readAsDataURL(f);
  };

  const submit = () => {
    if (!draft.title.trim()) return alert("Title required");
    if (!draft.body.trim()) return alert("Body required");
    if (!draft.slug.trim()) return alert("Slug required");
    onSave({ ...draft, slug: slugify(draft.slug) });
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-card p-6">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:border-orange hover:text-orange">
          <X className="h-4 w-4" />
        </button>
        <h2 className="font-display text-2xl uppercase">{post.title ? "Edit Post" : "New Post"}</h2>

        <div className="mt-5 space-y-4">
          <Field label="Title">
            <input className={inputCls} value={draft.title} onChange={(e) => onTitle(e.target.value)} placeholder="Post title" />
          </Field>
          <Field label="Slug">
            <input
              className={inputCls}
              value={draft.slug}
              onChange={(e) => { setSlugDirty(true); setDraft({ ...draft, slug: e.target.value }); }}
              placeholder="post-url-slug"
            />
          </Field>
          <Field label="Excerpt (optional, max 200 chars)">
            <textarea
              className={inputCls + " min-h-[70px]"}
              maxLength={200}
              value={draft.excerpt}
              onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              placeholder="Short teaser shown in the card grid."
            />
          </Field>
          <Field label="Body">
            <textarea
              className={inputCls + " min-h-[260px]"}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              placeholder="Full post body. Line breaks are respected."
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImageSlot label="Cover Image (slot 1)" value={draft.coverImage} onChange={onImage("coverImage")} onClear={() => setDraft({ ...draft, coverImage: "" })} />
            <ImageSlot label="Body Image (slot 2)" value={draft.bodyImage} onChange={onImage("bodyImage")} onClear={() => setDraft({ ...draft, bodyImage: "" })} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Publish Date">
              <input type="date" className={inputCls} value={draft.publishDate} onChange={(e) => setDraft({ ...draft, publishDate: e.target.value })} />
            </Field>
            <Field label="Status">
              <select
                className={inputCls}
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value as BlogPost["status"] })}
              >
                <option value="draft" style={{ background: "#000" }}>Draft</option>
                <option value="published" style={{ background: "#000" }}>Published</option>
              </select>
            </Field>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-muted-foreground">
            Author: <span className="text-foreground">{draft.author?.name}</span> · {draft.author?.role}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs uppercase tracking-wider">Cancel</button>
          <button onClick={submit} className="inline-flex items-center gap-2 rounded-xl bg-gradient-fire px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-onyx">
            <Save className="h-4 w-4" /> Save Post
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function ImageSlot({ label, value, onChange, onClear }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onClear: () => void }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
        {value ? (
          <img src={value} alt="" className="h-16 w-24 rounded-md object-cover" />
        ) : (
          <div className="flex h-16 w-24 items-center justify-center rounded-md bg-onyx text-[10px] uppercase text-muted-foreground">No image</div>
        )}
        <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-wider">
          <input type="file" accept="image/*" onChange={onChange} className="hidden" />
          {value ? "Replace" : "Upload"}
        </label>
        {value && (
          <button onClick={onClear} className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-destructive">Clear</button>
        )}
      </div>
    </div>
  );
}
