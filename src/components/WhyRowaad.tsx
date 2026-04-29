import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const POINTS = [
  "Systems-first, not campaign-first",
  "We take on limited clients — by qualification only",
  "We operate in the high-end B2B space exclusively",
  "Founded by Elyes Kallel — 28 April 2026",
];

export function WhyRowaad() {
  return (
    <section className="relative overflow-hidden bg-onyx py-28 md:py-40">
      <div className="ambient-orb -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2" style={{ background: "var(--brand-orange)", opacity: 0.25 }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-orange">Why Rowaad</p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
            NOT AN <br />
            AGENCY. <br />
            <span className="text-gradient-fire">A GROWTH OS.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg text-foreground/70">
            While others sell decks, we install engines. Built to hit revenue targets — not to fill calendars.
          </p>
        </Reveal>

        <div className="flex flex-col justify-center gap-4">
          {POINTS.map((p, i) => (
            <Reveal key={p} delay={i * 0.1}>
              <div className="glass flex items-center gap-4 rounded-full px-6 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-fire text-onyx">
                  <Check className="h-5 w-5" strokeWidth={3} />
                </span>
                <span className="text-base font-medium text-foreground md:text-lg">{p}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
