import { Reveal } from "./Reveal";
import portrait from "@/assets/elyes-portrait.png";
import { useTranslation } from "@/i18n/LanguageContext";

export function FounderSection() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-onyx py-28 md:py-40">
      <div className="ambient-orb right-0 top-1/3 h-[500px] w-[500px]" style={{ background: "var(--brand-amber)", opacity: 0.2 }} />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-orange/30">
              <img src={portrait} alt="Elyes Kallel" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent" />
            </div>
            <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-fire opacity-20 blur-3xl" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xs uppercase tracking-[0.32em] text-orange">{t("founder.eyebrow")}</p>
          <h2 className="mt-3 font-display text-6xl uppercase leading-none md:text-7xl">Elyes Kallel</h2>
          <p className="mt-2 text-lg text-orange">{t("founder.role")}</p>

          <p className="mt-8 text-lg leading-relaxed text-foreground/75">{t("founder.statement")}</p>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            <div className="rounded-2xl border border-white/10 p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("founder.founded")}</p>
              <p className="mt-1 font-display text-2xl">28.04.2026</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("founder.based")}</p>
              <p className="mt-1 font-display text-2xl">Tunis, TN</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
