import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { ServicesScroll } from "@/components/ServicesScroll";
import { WhyRowaad } from "@/components/WhyRowaad";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Rowaad Growth Stack" },
      { name: "description", content: "The Rowaad Growth Stack: Fractional CGO, Revenue Systems, Ecosystem Overhaul, Custom AI Stacks, Scale Architecture, and Ventures." },
      { property: "og:title", content: "Services — Rowaad Growth Stack" },
      { property: "og:description", content: "Fractional CGO, Revenue Systems, Ecosystem Overhaul, AI Stacks, Scale Architecture, and Ventures." },
      { property: "og:url", content: "https://rowaad.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://rowaad.lovable.app/services" }],
  }),
});

function ServicesPage() {
  return (
    <PageWrap>
      <div className="pt-32" />
      <ServicesScroll />
      <WhyRowaad />
    </PageWrap>
  );
}
