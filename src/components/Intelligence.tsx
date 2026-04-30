import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area,
  LineChart, Line,
  RadialBarChart, RadialBar, PolarAngleAxis,
  ScatterChart, Scatter, ZAxis,
} from "recharts";
import { Reveal } from "./Reveal";
import { useTranslation } from "@/i18n/LanguageContext";

const ORANGE = "oklch(0.72 0.19 45)";
const AMBER = "oklch(0.81 0.15 65)";
const GOLD = "oklch(0.9 0.13 90)";
const GRID = "oklch(1 0 0 / 0.06)";
const AXIS = "oklch(0.65 0 0)";

const tooltipStyle = {
  background: "oklch(0.08 0 0)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "white",
};

// Datasets — public-source anchored, illustrative
const adoptionData = [
  { y: "2019", v: 8 },
  { y: "2020", v: 14 },
  { y: "2021", v: 22 },
  { y: "2022", v: 33 },
  { y: "2023", v: 50 },
  { y: "2024", v: 71 },
  { y: "2025", v: 78 },
];

const revPerOpData = [
  { c: "Series A SaaS", v: 180 },
  { c: "Mid-Market", v: 320 },
  { c: "Lean B2B", v: 540 },
  { c: "AI-Native", v: 980 },
];

const maturityData = [
  { name: "Score", value: 73, fill: ORANGE },
];

const timeToRevenue = [
  { w: "W0", v: 0 }, { w: "W2", v: 5 }, { w: "W4", v: 14 },
  { w: "W6", v: 28 }, { w: "W8", v: 46 }, { w: "W10", v: 64 },
  { w: "W12", v: 78 }, { w: "W16", v: 92 },
];

const ramp12 = [
  { m: "M1", base: 100, ramped: 100 },
  { m: "M2", base: 105, ramped: 130 },
  { m: "M3", base: 110, ramped: 175 },
  { m: "M4", base: 115, ramped: 230 },
  { m: "M5", base: 121, ramped: 295 },
  { m: "M6", base: 127, ramped: 370 },
  { m: "M7", base: 133, ramped: 445 },
  { m: "M8", base: 140, ramped: 520 },
  { m: "M9", base: 147, ramped: 600 },
  { m: "M10", base: 154, ramped: 685 },
  { m: "M11", base: 162, ramped: 770 },
  { m: "M12", base: 170, ramped: 860 },
];

const channelEff = [
  { x: 280, y: 1.2, z: 240, name: "Paid Search" },
  { x: 110, y: 3.4, z: 180, name: "Organic" },
  { x: 60, y: 5.1, z: 120, name: "Partnerships" },
  { x: 420, y: 1.8, z: 280, name: "Paid Social" },
  { x: 90, y: 4.2, z: 160, name: "Lifecycle" },
  { x: 30, y: 6.8, z: 90, name: "Founder-led" },
];

const TICKER_QUOTES = [
  { q: "AI will be the most important technology humanity has ever worked on.", a: "Sundar Pichai" },
  { q: "Software is eating the world.", a: "Marc Andreessen" },
  { q: "The best way to predict the future is to invent it.", a: "Alan Kay" },
  { q: "Move fast and build things.", a: "Mark Zuckerberg" },
  { q: "Speed is the ultimate weapon in business.", a: "Reid Hoffman" },
  { q: "The most powerful person in the world is the storyteller.", a: "Steve Jobs" },
];

function Card({ title, note, children, large }: { title: string; note: string; children: React.ReactNode; large?: boolean }) {
  return (
    <div className={`glass relative overflow-hidden rounded-3xl p-6 md:p-8 ${large ? "lg:col-span-2" : ""}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl uppercase leading-tight">{title}</h3>
        <span className="shrink-0 rounded-full border border-orange/30 bg-orange/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-orange">Live Model</span>
      </div>
      <div className="h-[260px] w-full md:h-[300px]">{children}</div>
      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

function Terminal() {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TICKER_QUOTES.length), 5500);
    return () => clearInterval(id);
  }, []);
  const cur = TICKER_QUOTES[idx];
  return (
    <div className="glass-dark mt-12 overflow-hidden rounded-2xl border border-orange/30 p-5 font-mono text-sm">
      <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-orange">
        <span className="h-2 w-2 animate-pulse rounded-full bg-orange shadow-[0_0_10px_oklch(0.72_0.19_45)]" />
        {t("intel.terminal.title")}
      </div>
      <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-foreground/90">"{cur.q}"</p>
        <p className="mt-2 text-xs text-muted-foreground">— {cur.a}</p>
      </motion.div>
    </div>
  );
}

export function Intelligence() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-onyx pb-32 pt-24">
      {/* scrollytelling progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-40 h-[2px] origin-left bg-gradient-fire"
        style={{ scaleX: progress }}
      />

      <div className="ambient-orb -left-40 top-40 h-[520px] w-[520px]" style={{ background: ORANGE, opacity: 0.18 }} />
      <div className="ambient-orb -right-40 top-[60%] h-[520px] w-[520px]" style={{ background: GOLD, opacity: 0.16 }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-orange">{t("intel.eyebrow")}</p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.92] md:text-8xl">
            {t("intel.title1")} <br />
            <span className="text-gradient-fire">{t("intel.title2")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">{t("intel.sub")}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
            {t("intel.disclaimer")}
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <Card title={t("intel.b1.title")} note={t("intel.b1.note")}>
              <ResponsiveContainer>
                <AreaChart data={adoptionData} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ORANGE} stopOpacity={0.7} />
                      <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis dataKey="y" stroke={AXIS} fontSize={11} />
                  <YAxis stroke={AXIS} fontSize={11} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="v" stroke={ORANGE} strokeWidth={2.5} fill="url(#g1)" animationDuration={1400} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card title={t("intel.b2.title")} note={t("intel.b2.note")}>
              <ResponsiveContainer>
                <BarChart data={revPerOpData} margin={{ left: -10, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GOLD} />
                      <stop offset="100%" stopColor={ORANGE} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis dataKey="c" stroke={AXIS} fontSize={10} />
                  <YAxis stroke={AXIS} fontSize={11} unit="k" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${v}k`} />
                  <Bar dataKey="v" fill="url(#g2)" radius={[8, 8, 0, 0]} animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>

          <Reveal>
            <Card title={t("intel.b3.title")} note={t("intel.b3.note")}>
              <ResponsiveContainer>
                <RadialBarChart innerRadius="60%" outerRadius="100%" data={maturityData} startAngle={210} endAngle={-30}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background={{ fill: "oklch(1 0 0 / 0.05)" }} dataKey="value" cornerRadius={20} animationDuration={1600} />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-display" fill={GOLD} fontSize={56}>73</text>
                  <text x="50%" y="68%" textAnchor="middle" fill={AXIS} fontSize={11}>/ 100 maturity index</text>
                </RadialBarChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card title={t("intel.b4.title")} note={t("intel.b4.note")}>
              <ResponsiveContainer>
                <LineChart data={timeToRevenue} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis dataKey="w" stroke={AXIS} fontSize={11} />
                  <YAxis stroke={AXIS} fontSize={11} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="v" stroke={AMBER} strokeWidth={3} dot={{ fill: AMBER, r: 4 }} animationDuration={1400} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>

          <Reveal>
            <Card large title={t("intel.b5.title")} note={t("intel.b5.note")}>
              <ResponsiveContainer>
                <AreaChart data={ramp12} margin={{ left: -10, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="g5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ORANGE} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis dataKey="m" stroke={AXIS} fontSize={11} />
                  <YAxis stroke={AXIS} fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="base" stroke={AXIS} strokeDasharray="4 4" fill="transparent" name="Without system" />
                  <Area type="monotone" dataKey="ramped" stroke={ORANGE} strokeWidth={2.5} fill="url(#g5)" name="With Rowaad" animationDuration={1800} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card large title={t("intel.b6.title")} note={t("intel.b6.note")}>
              <ResponsiveContainer>
                <ScatterChart margin={{ left: -10, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid stroke={GRID} />
                  <XAxis type="number" dataKey="x" name="CAC" unit="$" stroke={AXIS} fontSize={11} />
                  <YAxis type="number" dataKey="y" name="LTV/CAC" stroke={AXIS} fontSize={11} />
                  <ZAxis type="number" dataKey="z" range={[80, 400]} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={channelEff} fill={GOLD} animationDuration={1400} />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
