import { useEffect, useState } from "react";
import { store, useStoreSubscription } from "@/lib/store";
import { Inbox, FolderKanban, Users, Sparkles } from "lucide-react";

export function AdminHome() {
  const [stats, setStats] = useState({ contacts: 0, projects: 0, partners: 0, latest: null as null | { name: string; submittedAt: string; description: string } });

  useEffect(() => {
    const refresh = () => {
      const c = store.getContacts();
      setStats({
        contacts: c.length,
        projects: store.getProjects().filter((p) => p.status === "published").length,
        partners: store.getPartners().filter((p) => p.visible).length,
        latest: c[0] ? { name: c[0].name, submittedAt: c[0].submittedAt, description: c[0].description } : null,
      });
    };
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  const cards = [
    { label: "Contact Requests", value: stats.contacts, Icon: Inbox },
    { label: "Published Projects", value: stats.projects, Icon: FolderKanban },
    { label: "Active Partners", value: stats.partners, Icon: Users },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back to the Rowaad control room.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.label}</p>
              <c.Icon className="h-5 w-5 text-orange" />
            </div>
            <p className="mt-3 font-display text-5xl text-gradient-fire">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 glass-dark rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-orange" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Latest Request</h2>
        </div>
        {stats.latest ? (
          <div className="mt-4">
            <p className="font-display text-2xl">{stats.latest.name}</p>
            <p className="text-xs text-muted-foreground">{new Date(stats.latest.submittedAt).toLocaleString()}</p>
            <p className="mt-3 line-clamp-3 text-sm text-foreground/80">{stats.latest.description}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No requests yet.</p>
        )}
      </div>
    </div>
  );
}
