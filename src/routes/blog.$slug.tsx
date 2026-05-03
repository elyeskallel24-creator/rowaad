import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { BlogPostView } from "@/components/BlogPostView";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Rowaad Blog` },
      { name: "description", content: "An article from the Rowaad Blog." },
    ],
  }),
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  return (
    <PageWrap>
      <BlogPostView slug={slug} />
    </PageWrap>
  );
}
