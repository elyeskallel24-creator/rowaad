import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { store, useStoreSubscription, type BlogPost } from "@/lib/store";
import { useTranslation } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const refresh = () => {
      const all = store
        .getBlogPosts()
        .filter((p) => p.status === "published")
        .sort((a, b) => (b.publishDate || "").localeCompare(a.publishDate || ""));
      setPosts(all);
    };
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-onyx pb-32 pt-36">
      <div className="ambient-orb left-1/4 top-1/4 h-[500px] w-[500px]" style={{ background: "var(--brand-orange)", opacity: 0.12 }} />
      <div className="ambient-orb right-1/4 bottom-1/4 h-[500px] w-[500px]" style={{ background: "var(--brand-amber)", opacity: 0.08 }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-orange">{t("blog.eyebrow")}</p>
          <h1 className="mt-3 font-display uppercase leading-[0.95]" style={{ fontSize: "clamp(60px, 10vw, 100px)" }}>
            {t("blog.title")}
          </h1>
          <p className="mt-6 max-w-[560px] text-base leading-relaxed text-foreground/65">
            {t("blog.sub")}
          </p>
        </Reveal>

        <div className="mt-16">
          {posts.length === 0 ? (
            <div
              className="flex min-h-[200px] w-full items-center justify-center rounded-2xl border-2 border-dashed text-center text-sm text-foreground/50"
              style={{ borderColor: "rgba(255,122,32,0.4)" }}
            >
              {t("blog.empty")}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} t={t} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, t }: { post: BlogPost; t: (k: string) => string }) {
  const excerpt = post.excerpt?.trim() || (post.body || "").slice(0, 140) + ((post.body || "").length > 140 ? "..." : "");
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all hover:shadow-[0_20px_60px_-20px_oklch(0.72_0.19_45/0.4)]"
        style={{
          background: "oklch(1 0 0 / 4%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,122,32,0.2)",
        }}
      >
        {post.coverImage ? (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(255,122,32,0.18), transparent)" }} />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[22px] uppercase leading-tight text-foreground line-clamp-2">{post.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60 line-clamp-3">{excerpt}</p>
          <div className="mt-5 flex items-center gap-3">
            {post.author?.photo ? (
              <img
                src={post.author.photo}
                alt={post.author.name}
                className="h-8 w-8 rounded-full object-cover"
                style={{ boxShadow: "0 0 0 2px var(--brand-orange)" }}
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange/20 text-[11px] font-semibold uppercase text-orange">
                {(post.author?.name || "R")[0]}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold leading-none text-foreground">{post.author?.name || "Rowaad"}</p>
              <p className="mt-0.5 truncate text-[12px] leading-none text-foreground/50">{post.author?.role}</p>
            </div>
            <span className="text-[12px] text-foreground/40">· {formatDate(post.publishDate)}</span>
          </div>
          <div className="mt-5 text-right text-[13px] font-medium text-orange">
            {t("blog.readMore")}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
