import { Gem } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { useTranslation } from "@/i18n/LanguageContext";

export function InvestSection() {
  const { t } = useTranslation();
  return (
    <section id="invest" className="relative overflow-hidden bg-onyx py-28 md:py-40">
      <div className="ambient-orb left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2" style={{ background: "var(--brand-gold)", opacity: 0.18 }} />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-amber text-onyx">
            <Gem className="h-8 w-8" />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.32em]" style={{ color: "var(--brand-gold)" }}>
            {t("invest.eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
            {t("invest.title1")} <br />
            <span style={{ background: "linear-gradient(135deg, var(--brand-gold), var(--brand-amber))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {t("invest.title2")}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-foreground/75">{t("invest.body")}</p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { k: t("invest.stat.owned"), v: t("invest.stat.ownedV") },
              { k: t("invest.stat.distribution"), v: t("invest.stat.distributionV") },
              { k: t("invest.stat.access"), v: t("invest.stat.accessV") },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.k}</p>
                <p className="mt-2 font-display text-3xl text-gradient-fire">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-12">
            <Link
              to="/invest"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-amber px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-onyx shadow-[0_20px_60px_-20px_oklch(0.9_0.13_90/0.5)] transition-transform hover:scale-105"
            >
              {t("invest.cta.full")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
