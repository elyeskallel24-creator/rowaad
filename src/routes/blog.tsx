import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { BlogList } from "@/components/BlogList";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — Rowaad" },
      { name: "description", content: "Insights. Systems. Signal. Raw thinking from the operators behind Rowaad's growth systems." },
      { property: "og:title", content: "The Rowaad Blog" },
      { property: "og:description", content: "Raw thinking from the operators behind the systems." },
      { property: "og:url", content: "https://rowaad.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://rowaad.lovable.app/blog" }],
  }),
});

function BlogPage() {
  return (
    <PageWrap>
      <BlogList />
    </PageWrap>
  );
}
