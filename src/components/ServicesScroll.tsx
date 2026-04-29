import { Crown, GitBranch, Cpu, Layers, Maximize2, Gem } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    icon: Crown,
    title: "Fractional Chief Growth Officer",
    body:
      "We embed directly into your company as your senior growth leadership — with a special-forces execution team built to hit revenue targets fast.",
  },
  {
    icon: GitBranch,
    title: "Revenue Systems Design",
    body:
      "We architect the 'pipes' that move money through your operation without friction — CRM flows, automation, conversion systems, all wired together.",
  },
  {
    icon: Cpu,
    title: "Total Ecosystem Overhaul",
    body:
      "Tech stack + strategy rebuilt simultaneously. We don't patch problems. We replace the foundation and install a high-performance growth engine.",
  },
  {
    icon: Layers,
    title: "Custom Growth Stack™",
    body:
      "We build the exact combination of AI tools, integrations, and tactical frameworks your company needs — turning stagnant operations into high-yield assets.",
  },
  {
    icon: Maximize2,
    title: "Scale Architecture",
    body:
      "We identify every technical and operational bottleneck in your business and replace them with high-leverage AI systems — moving you toward 100% capacity.",
  },
  {
    icon: Gem,
    title: "Invest in Rowaad Projects",
    body:
      "We build businesses we own entirely. As an investor, you can participate and receive monthly revenue. Exclusive access to curated high-potential ventures.",
  },
];

export function ServicesScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? passed / total : 0;
      setProgress(p);
      const maxX = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-(maxX * p)}px, 0, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="services" ref={wrapRef} className="relative" style={{ height: `${SERVICES.length * 80}vh` }}>
      <div className="ambient-orb left-1/3 top-1/4 h-[500px] w-[500px]" style={{ background: "var(--brand-orange)", opacity: 0.18 }} />
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-onyx">
        <div className="mx-auto w-full max-w-7xl px-6 pt-28 md:pt-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-orange">What we actually do</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl lg:text-8xl">
              The <span className="text-gradient-fire">Growth Stack</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-1 items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-6 px-6 will-change-transform md:gap-8 md:px-12">
            {SERVICES.map((s, i) => (
              <article
                key={i}
                className="glass relative flex h-[420px] w-[85vw] max-w-[420px] shrink-0 flex-col justify-between rounded-3xl p-8 md:h-[480px] md:w-[420px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-fire text-onyx">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <span className="font-display text-3xl text-orange/40">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl uppercase leading-tight md:text-4xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* progress bar */}
        <div className="relative mx-auto mb-10 h-[2px] w-[80%] max-w-3xl overflow-hidden bg-white/10">
          <div className="h-full bg-gradient-fire transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
