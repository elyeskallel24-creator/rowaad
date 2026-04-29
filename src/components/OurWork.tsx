import { useEffect, useMemo, useState } from "react";
import { store, useStoreSubscription, type Project } from "@/lib/store";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export function OurWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const refresh = () => setProjects(store.getProjects().filter((p) => p.status === "published"));
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="our-work" className="relative bg-onyx py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-orange">Built. Shipped. Scaled.</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Our Work</h2>
        </Reveal>

        {projects.length > 0 && (
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all ${
                    filter === t
                      ? "border-orange bg-orange text-onyx"
                      : "border-white/15 text-foreground/70 hover:border-orange hover:text-orange"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {filtered.length === 0 ? (
          <Reveal delay={0.2}>
            <div className="mt-12 flex min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-orange/40 p-10 text-center">
              <div>
                <p className="font-display text-3xl uppercase text-orange">Projects coming soon</p>
                <p className="mt-2 text-sm text-foreground/60">New ventures are being shipped from the lab.</p>
              </div>
            </div>
          </Reveal>
        ) : (
          <motion.div
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {filtered.map((p) => (
              <motion.button
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                onClick={() => setActive(p)}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card text-left transition-all hover:border-orange/50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange/20 to-amber/10">
                  {p.coverImage ? (
                    <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-5xl text-orange/30">{p.title[0]}</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-orange/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-orange">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-2xl uppercase">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground/65">{p.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                    View Project <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-onyx/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-onyx/60 text-foreground hover:bg-orange hover:text-onyx"
              >
                <X className="h-5 w-5" />
              </button>
              {active.coverImage && (
                <img src={active.coverImage} alt={active.title} className="h-72 w-full object-cover" />
              )}
              <div className="p-8">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span key={t} className="rounded-full border border-orange/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-orange">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-4xl uppercase">{active.title}</h3>
                <p className="mt-4 whitespace-pre-line text-foreground/80">{active.longDescription || active.shortDescription}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
