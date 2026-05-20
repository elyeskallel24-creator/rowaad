import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { InvestSection } from "@/components/InvestSection";
import { InvestArchitecture } from "@/components/InvestArchitecture";

export const Route = createFileRoute("/invest")({
  component: InvestPage,
  head: () => ({
    meta: [
      { title: "Invest — Rowaad Ventures" },
      { name: "description", content: "Rowaad Ventures: invest in 100%-owned Rowaad-built businesses and receive monthly revenue distributions." },
      { property: "og:title", content: "Invest — Rowaad Ventures" },
      { property: "og:description", content: "Invest in 100%-owned Rowaad-built businesses. Monthly revenue distributions." },
      { property: "og:url", content: "https://rowaad.lovable.app/invest" },
    ],
    links: [{ rel: "canonical", href: "https://rowaad.lovable.app/invest" }],
  }),
});

function InvestPage() {
  return (
    <PageWrap>
      <div className="pt-24" />
      <InvestSection />
      <InvestArchitecture />
    </PageWrap>
  );
}
