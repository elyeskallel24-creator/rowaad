import { Gem } from "lucide-react";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { useState } from "react";
import { ContactModal } from "./ContactModal";

export function InvestSection() {
  const [modal, setModal] = useState(false);
  return (
    <section id="invest" className="relative overflow-hidden bg-onyx py-28 md:py-40">
      <div className="ambient-orb left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2" style={{ background: "var(--brand-gold)", opacity: 0.18 }} />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-amber text-onyx">
            <Gem className="h-8 w-8" />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.32em]" style={{ color: "var(--brand-gold)" }}>
            Rowaad Ventures
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
            Invest in <br />
            <span style={{ background: "linear-gradient(135deg, var(--brand-gold), var(--brand-amber))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              what we build.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-foreground/75">
            Rowaad doesn't just serve businesses — we build them. Every project we launch is owned entirely by Rowaad.
            Selected investors receive monthly revenue distributions from our portfolio of ventures.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { k: "Owned", v: "100%" },
              { k: "Distribution", v: "Monthly" },
              { k: "Access", v: "Curated" },
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
            <MagneticButton variant="gold" onClick={() => setModal(true)}>
              Explore Investment Opportunities
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      <ContactModal open={modal} onClose={() => setModal(false)} />
    </section>
  );
}
