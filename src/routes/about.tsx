import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { FounderSection } from "@/components/FounderSection";
import { WhyRowaad } from "@/components/WhyRowaad";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Rowaad" },
      { name: "description", content: "Rowaad was founded by Elyes Kallel on 28 April 2026 to install growth systems, not sell advice." },
      { property: "og:title", content: "About — Rowaad" },
      { property: "og:description", content: "Founded by Elyes Kallel to install growth systems, not sell advice." },
      { property: "og:url", content: "https://rowaad.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://rowaad.lovable.app/about" }],
  }),
});

function AboutPage() {
  return (
    <PageWrap>
      <div className="pt-24" />
      <FounderSection />
      <WhyRowaad />
    </PageWrap>
  );
}
