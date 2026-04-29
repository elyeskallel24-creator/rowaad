import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { InvestSection } from "@/components/InvestSection";

export const Route = createFileRoute("/invest")({
  component: InvestPage,
  head: () => ({
    meta: [
      { title: "Invest — Rowaad Ventures" },
      { name: "description", content: "Rowaad Ventures: invest in 100%-owned Rowaad-built businesses and receive monthly revenue distributions." },
    ],
  }),
});

function InvestPage() {
  return (
    <PageWrap>
      <div className="pt-24" />
      <InvestSection />
    </PageWrap>
  );
}
