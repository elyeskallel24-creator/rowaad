import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { WordReveal } from "./Reveal";
import { useState } from "react";
import { ContactModal } from "./ContactModal";
import portrait from "@/assets/elyes-portrait.png";

export function Hero() {
  const [modal, setModal] = useState(false);

  const scrollToWork = () => {
    document.getElementById("our-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-32">
      {/* Ambient orbs */}
      <div className="ambient-orb -bottom-40 -left-40 h-[600px] w-[600px]" style={{ background: "var(--brand-orange)" }} />
      <div className="ambient-orb -top-40 -right-32 h-[520px] w-[520px]" style={{ background: "var(--brand-gold)", opacity: 0.35 }} />

      {/* Mesh gradient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 30%, oklch(0.72 0.19 45 / 0.25) 0px, transparent 50%), radial-gradient(at 80% 70%, oklch(0.9 0.13 90 / 0.18) 0px, transparent 50%)",
          animation: "meshShift 20s ease-in-out infinite alternate",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-orange"
          >
            <span className="h-px w-10 bg-orange" />
            Revenue Architecture. Scale by Design.
          </motion.p>

          <h1 className="font-display text-[16vw] leading-[0.85] tracking-tight sm:text-[12vw] lg:text-[8.5vw] xl:text-[140px]">
            <span className="block">
              <WordReveal text="WE BUILD" />
            </span>
            <span className="block text-gradient-fire">
              <WordReveal text="GROWTH MACHINES." delay={0.15} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-[560px] text-base text-foreground/70 md:text-lg"
          >
            Rowaad is the elite growth agency for individuals, professionals, and B2B companies who are
            done with average results. We don't sell advice — we install systems that move money.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => setModal(true)}>Book a Strategy Call</MagneticButton>
            <MagneticButton variant="ghost" onClick={scrollToWork}>
              Explore Our Work
            </MagneticButton>
          </motion.div>
        </div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-orange/30 glow-orange">
            <div className="absolute inset-0 bg-gradient-to-tr from-onyx via-transparent to-orange/30" />
            <img src={portrait} alt="Elyes Kallel" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-onyx via-onyx/70 to-transparent p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-orange">Founder & CEO</p>
              <p className="font-display text-2xl">Elyes Kallel</p>
            </div>
          </div>
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-fire opacity-20 blur-2xl" />
        </motion.div>
      </div>

      <style>{`
        @keyframes meshShift {
          0% { transform: translate(0,0) scale(1); }
          100% { transform: translate(-3%, 2%) scale(1.05); }
        }
      `}</style>

      <ContactModal open={modal} onClose={() => setModal(false)} />
    </section>
  );
}
