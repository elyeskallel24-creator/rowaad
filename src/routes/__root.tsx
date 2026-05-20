import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#000000" },
      { title: "Rowaad — Revenue Architecture. Scale by Design." },
      { name: "description", content: "Rowaad is the elite growth agency for high-end B2B companies. We don't sell advice, we install systems that move money." },
      { name: "author", content: "Rowaad" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Rowaad" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Rowaad — Revenue Architecture. Scale by Design." },
      { name: "twitter:title", content: "Rowaad — Revenue Architecture. Scale by Design." },
      { property: "og:description", content: "Rowaad is the elite growth agency for high-end B2B companies. We don't sell advice, we install systems that move money." },
      { name: "twitter:description", content: "Rowaad is the elite growth agency for high-end B2B companies. We don't sell advice, we install systems that move money." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c051dccc-6909-4534-847c-26f439c7dd27/id-preview-d54ee35d--6874d580-8f90-439a-bb78-d546d064fb34.lovable.app-1777485013937.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c051dccc-6909-4534-847c-26f439c7dd27/id-preview-d54ee35d--6874d580-8f90-439a-bb78-d546d064fb34.lovable.app-1777485013937.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/rowaad-logo.png" },
      { rel: "apple-touch-icon", href: "/rowaad-logo.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Rowaad",
          url: "https://rowaad.lovable.app",
          logo: "https://rowaad.lovable.app/rowaad-logo.png",
          description: "Rowaad is the elite growth agency for high-end B2B companies. We install revenue systems that move money.",
          founder: { "@type": "Person", name: "Elyes Kallel" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
