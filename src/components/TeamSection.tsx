import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { store, useStoreSubscription, type TeamMember } from "@/lib/store";
import { Reveal } from "./Reveal";
import { useTranslation } from "@/i18n/LanguageContext";

export function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const refresh = () => setMembers(store.getTeam().filter((m) => m.status === "published"));
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  return (
    <section className="relative overflow-hidden bg-onyx py-28 md:py-36">
      <div className="ambient-orb -left-32 bottom-0 h-[480px] w-[480px]" style={{ background: "var(--brand-orange)", opacity: 0.15 }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-orange">{t("team.eyebrow")}</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">{t("team.title")}</h2>
        </Reveal>

        {members.length === 0 ? (
          <Reveal delay={0.15}>
            <div className="mt-12 flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-orange/40 p-10 text-center">
              <p className="font-display text-2xl uppercase text-orange">{t("team.empty")}</p>
            </div>
          </Reveal>
        ) : (
          <motion.div
            className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {members.map((m) => (
              <motion.div
                key={m.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="glass flex flex-col items-center rounded-3xl p-8 text-center"
              >
                <div className="relative mb-5">
                  <div className="absolute -inset-1 rounded-full bg-gradient-fire opacity-40 blur-md" />
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-orange/60">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-onyx font-display text-3xl text-orange">
                        {m.name[0]}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-lg font-bold text-foreground">{m.name}</p>
                <p className="mt-2 line-clamp-3 text-sm text-foreground/65">{m.role}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
