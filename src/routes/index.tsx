import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ServicesScroll } from "@/components/ServicesScroll";
import { WeOffer } from "@/components/WeOffer";
import { WhyRowaad } from "@/components/WhyRowaad";
import { OurWork } from "@/components/OurWork";
import { FounderSection } from "@/components/FounderSection";
import { TeamSection } from "@/components/TeamSection";
import { Partners } from "@/components/Partners";
import { InvestSection } from "@/components/InvestSection";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Rowaad — Revenue Architecture. Scale by Design." },
      { name: "description", content: "Rowaad is the elite growth agency installing revenue systems for high-end B2B companies and operators ready to scale." },
      { property: "og:title", content: "Rowaad — Growth Machines, Engineered." },
      { property: "og:description", content: "We don't sell advice — we install systems that move money. Founded by Elyes Kallel." },
    ],
  }),
});

function Home() {
  return (
    <PageWrap>
      <Hero />
      <Marquee />
      <ServicesScroll />
      <WeOffer />
      <WhyRowaad />
      <OurWork />
      <FounderSection />
      <TeamSection />
      <Partners />
      <InvestSection />
    </PageWrap>
  );
}
