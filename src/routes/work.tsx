import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { OurWork } from "@/components/OurWork";
import { Partners } from "@/components/Partners";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Our Work — Rowaad" },
      { name: "description", content: "Built. Shipped. Scaled. A curated portfolio of Rowaad ventures and client systems." },
      { property: "og:title", content: "Our Work — Rowaad" },
      { property: "og:description", content: "Built. Shipped. Scaled. A curated portfolio of Rowaad ventures and client systems." },
      { property: "og:url", content: "https://rowaad.lovable.app/work" },
    ],
    links: [{ rel: "canonical", href: "https://rowaad.lovable.app/work" }],
  }),
});

function WorkPage() {
  return (
    <PageWrap>
      <section className="grain relative overflow-hidden pt-40 pb-10">
        <div className="ambient-orb -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2" style={{ background: "var(--brand-orange)", opacity: 0.25 }} />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-orange">Built. Shipped. Scaled.</p>
          <h1 className="mt-3 font-display text-6xl uppercase leading-none md:text-8xl">Our <span className="text-gradient-fire">Work</span></h1>
        </div>
      </section>
      <OurWork />
      <Partners />
    </PageWrap>
  );
}
