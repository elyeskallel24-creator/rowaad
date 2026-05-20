import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { Intelligence } from "@/components/Intelligence";

export const Route = createFileRoute("/intelligence")({
  component: IntelligencePage,
  head: () => ({
    meta: [
      { title: "Intelligence — Rowaad" },
      { name: "description", content: "Rowaad Intelligence: live, illustrative views of the market signals we track to architect revenue systems." },
      { property: "og:title", content: "Rowaad Intelligence — We don't guess. We measure." },
      { property: "og:description", content: "Public-source data, internal modeling. Six live views into the market signals behind Rowaad's growth systems." },
      { property: "og:url", content: "https://rowaad.lovable.app/intelligence" },
    ],
    links: [{ rel: "canonical", href: "https://rowaad.lovable.app/intelligence" }],
  }),
});

function IntelligencePage() {
  return (
    <PageWrap>
      <Intelligence />
    </PageWrap>
  );
}
