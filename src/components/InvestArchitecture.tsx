import { motion } from "framer-motion";
import { Hammer, Settings, HandCoins, Repeat, Eye, Layers, Building2, Crown } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { Reveal } from "./Reveal";
import { useTranslation } from "@/i18n/LanguageContext";

const ORANGE = "oklch(0.72 0.19 45)";
const GOLD = "oklch(0.9 0.13 90)";
const AXIS = "oklch(0.65 0 0)";
const GRID = "oklch(1 0 0 / 0.06)";

const ramp = [
  { m: "M1", v: 100 }, { m: "M2", v: 130 }, { m: "M3", v: 175 },
  { m: "M4", v: 230 }, { m: "M5", v: 295 }, { m: "M6", v: 370 },
  { m: "M7", v: 445 }, { m: "M8", v: 520 }, { m: "M9", v: 600 },
  { m: "M10", v: 685 }, { m: "M11", v: 770 }, { m: "M12", v: 860 },
];

export function InvestArchitecture() {
  const { t } = useTranslation();

  const steps = [
    { Icon: Hammer, t: t("invest.step1.t"), b: t("invest.step1.b") },
    { Icon: Settings, t: t("invest.step2.t"), b: t("invest.step2.b") },
    { Icon: HandCoins, t: t("invest.step3.t"), b: t("invest.step3.b") },
    { Icon: Repeat, t: t("invest.step4.t"), b: t("invest.step4.b") },
  ];

  const tiers = [
    { Icon: Eye, n: t("invest.tier1.n"), b: t("invest.tier1.b") },
    { Icon: Layers, n: t("invest.tier2.n"), b: t("invest.tier2.b") },
    { Icon: Building2, n: t("invest.tier3.n"), b: t("invest.tier3.b") },
    { Icon: Crown, n: t("invest.tier4.n"), b: t("invest.tier4.b") },
  ];

  return (
    <section className="relative overflow-hidden bg-onyx py-24">
      <div className="ambient-orb -right-40 top-20 h-[480px] w-[480px]" style={{ background: GOLD, opacity: 0.18 }} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Architecture */}
        <Reveal>
          <h2 className="font-display text-5xl uppercase leading-none md:text-6xl">{t("invest.arch.title")}</h2>
          <p className="mt-3 text-foreground/65">{t("invest.arch.sub")}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass relative h-full rounded-3xl p-7"
              >
                <div className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-fire font-display text-onyx">
                  {i + 1}
                </div>
                <s.Icon className="mt-2 h-7 w-7 text-orange" />
                <h3 className="mt-4 font-display text-2xl uppercase">{s.t}</h3>
                <p className="mt-2 text-sm text-foreground/65">{s.b}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Tiers */}
        <div className="mt-28">
          <Reveal>
            <h2 className="font-display text-5xl uppercase leading-none md:text-6xl">{t("invest.tiers.title")}</h2>
            <p className="mt-3 text-foreground/65">{t("invest.tiers.sub")}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier, i) => (
              <Reveal key={tier.n} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, borderColor: ORANGE }}
                  className="h-full rounded-3xl border border-white/10 bg-card/60 p-7 transition-colors"
                >
                  <tier.Icon className="h-7 w-7 text-gold" />
                  <h3 className="mt-4 font-display text-3xl uppercase">{tier.n}</h3>
                  <p className="mt-3 text-sm text-foreground/65">{tier.b}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Ramp chart */}
        <div className="mt-28">
          <Reveal>
            <h2 className="font-display text-4xl uppercase leading-none md:text-5xl">{t("invest.ramp.title")}</h2>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
              ILLUSTRATIVE PROJECTION MODEL
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass mt-8 h-[340px] rounded-3xl p-6">
              <ResponsiveContainer>
                <AreaChart data={ramp} margin={{ left: -10, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="invRamp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ORANGE} stopOpacity={0.7} />
                      <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis dataKey="m" stroke={AXIS} fontSize={11} />
                  <YAxis stroke={AXIS} fontSize={11} />
                  <Tooltip contentStyle={{ background: "oklch(0.08 0 0)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12, color: "white" }} />
                  <Area type="monotone" dataKey="v" stroke={ORANGE} strokeWidth={2.5} fill="url(#invRamp)" animationDuration={1800} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>

        {/* Disclaimer */}
        <Reveal delay={0.2}>
          <div className="mt-16 rounded-2xl border border-white/10 bg-card/60 p-6 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {t("invest.disclaimer")}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
