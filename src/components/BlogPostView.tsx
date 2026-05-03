import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { store, useStoreSubscription, type BlogPost } from "@/lib/store";
import { useTranslation } from "@/i18n/LanguageContext";

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function BlogPostView({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const refresh = () => {
      const found = store.getBlogPosts().find((p) => p.slug === slug && p.status === "published") || null;
      setPost(found);
    };
    refresh();
    return useStoreSubscription(refresh);
  }, [slug]);

  if (!post) {
    return (
      <section className="relative min-h-screen bg-onyx px-6 pt-40 pb-32">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">404</p>
          <h1 className="mt-4 font-display text-5xl uppercase">Post not found</h1>
          <Link to="/blog" className="mt-8 inline-block text-orange">
            {t("blog.back")}
          </Link>
        </div>
      </section>
    );
  }

  const paragraphs = (post.body || "").split(/\n{2,}/);

  return (
    <section className="relative min-h-screen overflow-hidden bg-onyx px-6 pt-36 pb-32">
      <div className="ambient-orb left-[10%] top-[10%] h-[600px] w-[600px]" style={{ background: "var(--brand-orange)", opacity: 0.04 }} />
      <div className="ambient-orb right-[5%] bottom-[10%] h-[600px] w-[600px]" style={{ background: "var(--brand-amber)", opacity: 0.04 }} />

      <article className="relative mx-auto max-w-[760px]">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full object-cover"
            style={{ aspectRatio: "16/9", borderRadius: 12 }}
          />
        )}
        <h1 className="mt-10 font-display uppercase leading-[1] text-foreground" style={{ fontSize: "clamp(44px, 7vw, 72px)" }}>
          {post.title}
        </h1>
        <div className="mt-6 flex items-center gap-3">
          {post.author?.photo ? (
            <img
              src={post.author.photo}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
              style={{ boxShadow: "0 0 0 2px var(--brand-orange)" }}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/20 font-display text-orange">
              {(post.author?.name || "R")[0]}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight text-foreground">{post.author?.name || "Rowaad"}</p>
            <p className="text-[13px] text-foreground/50">{post.author?.role} · {formatDate(post.publishDate)}</p>
          </div>
        </div>

        <div className="my-6 h-px w-full" style={{ background: "rgba(255,122,32,0.25)" }} />

        <div className="space-y-6 text-foreground/85" style={{ fontSize: 16, lineHeight: 1.9 }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{ whiteSpace: "pre-wrap" }}>{para}</p>
          ))}
        </div>

        {post.bodyImage && (
          <img
            src={post.bodyImage}
            alt=""
            className="w-full object-cover"
            style={{ borderRadius: 10, margin: "32px 0" }}
          />
        )}

        <div className="mt-12">
          <Link to="/blog" className="text-[14px] font-medium text-orange hover:opacity-80">
            {t("blog.back")}
          </Link>
        </div>
      </article>
    </section>
  );
}
