import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { store, useStoreSubscription, type Offer } from "@/lib/store";
import { Reveal } from "./Reveal";

export function WeOffer() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [active, setActive] = useState<Offer | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => setOffers(store.getOffers().filter((o) => o.status === "published"));
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else if (active) setActive(null);
      }
      if (active && lightbox !== null) {
        if (e.key === "ArrowRight") setLightbox((i) => (i === null ? 0 : Math.min(active.images.length - 1, i + 1)));
        if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? 0 : Math.max(0, i - 1)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, lightbox]);

  return (
    <section id="we-offer" className="relative overflow-hidden bg-onyx py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-orange">What's inside the stack.</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] md:text-7xl">We Offer</h2>
        </Reveal>

        {offers.length === 0 ? (
          <div className="mt-12 rounded-2xl border-2 border-dashed border-orange/40 p-16 text-center">
            <p className="font-display text-2xl uppercase text-orange">Offers coming soon.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {offers.map((o) => (
              <motion.button
                key={o.id}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                onClick={() => setActive(o)}
                className="glass group flex flex-col overflow-hidden rounded-2xl border border-orange/20 text-left transition-all hover:border-orange/60 hover:shadow-[0_30px_80px_-30px_oklch(0.72_0.19_45/0.5)]"
              >
                <div className="relative grid grid-cols-2 gap-1 overflow-hidden" style={{ aspectRatio: "16/5" }}>
                  {o.images.slice(0, 2).map((src, i) => (
                    <img key={i} src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ))}
                  {o.images.length === 0 && <div className="col-span-2 h-full w-full bg-white/5" />}
                  {o.images.length > 2 && (
                    <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-orange">
                      +{o.images.length - 2} more
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl uppercase text-foreground">{o.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground/65">{o.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-orange">
                    See full details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto my-10 max-w-[860px] rounded-3xl border border-white/10 bg-card p-6 md:p-10"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {active.images.map((src, i) => (
                  <button key={i} onClick={() => setLightbox(i)} className="overflow-hidden rounded-xl">
                    <img src={src} alt="" className="aspect-[4/3] h-full w-full object-cover transition-transform hover:scale-105" />
                  </button>
                ))}
              </div>

              <h3 className="mt-8 font-display text-4xl uppercase text-white md:text-5xl">{active.title}</h3>
              <p className="mt-5 whitespace-pre-line text-[15px] leading-[1.8] text-white/80">{active.description}</p>

              {active.ctaUrl && (
                <div className="mt-8">
                  <a
                    href={active.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-fire px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-onyx shadow-[0_20px_60px_-20px_oklch(0.72_0.19_45/0.6)] transition-transform hover:scale-105"
                  >
                    {active.ctaLabel || "Learn more"}
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : Math.max(0, i - 1))); }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <img src={active.images[lightbox]} alt="" className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : Math.min(active.images.length - 1, i + 1))); }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
