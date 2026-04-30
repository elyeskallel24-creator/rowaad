import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, FolderKanban, Users, LayoutDashboard, LogOut, Lock, UserSquare2, Sparkles, Crown } from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";
import { AdminInbox } from "@/components/admin/AdminInbox";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminPartners } from "@/components/admin/AdminPartners";
import { AdminTeam } from "@/components/admin/AdminTeam";
import { AdminOffers } from "@/components/admin/AdminOffers";
import { AdminVipBookings } from "@/components/admin/AdminVipBookings";
import { AdminHome } from "@/components/admin/AdminHome";

const PIN = "3693";
const SESSION_KEY = "rowaad:admin:session";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Rowaad Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"home" | "inbox" | "projects" | "partners" | "team" | "offers" | "vip">("home");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <>
        <CustomCursor />
        <PinGate
          onSuccess={() => {
            sessionStorage.setItem(SESSION_KEY, "1");
            setAuthed(true);
          }}
        />
      </>
    );
  }

  const tabs = [
    { id: "home", label: "Dashboard", Icon: LayoutDashboard },
    { id: "inbox", label: "Inbox", Icon: Inbox },
    { id: "projects", label: "Projects", Icon: FolderKanban },
    { id: "partners", label: "Partners", Icon: Users },
    { id: "team", label: "Team", Icon: UserSquare2 },
    { id: "offers", label: "We Offer", Icon: Sparkles },
    { id: "vip", label: "VIP Bookings", Icon: Crown },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="glass-dark flex shrink-0 flex-col border-b border-white/5 p-4 md:h-screen md:w-64 md:border-b-0 md:border-r">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-fire text-onyx">
              <span className="font-display text-xl">R</span>
            </div>
            <div>
              <p className="font-display text-lg uppercase leading-none">Rowaad</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Admin</p>
            </div>
          </div>
          <nav className="flex gap-2 md:flex-col">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all md:flex-none ${
                  tab === t.id
                    ? "bg-gradient-fire text-onyx"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <t.Icon className="h-4 w-4" />
                <span className="hidden md:inline">{t.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto hidden md:block">
            <button
              onClick={() => {
                sessionStorage.removeItem(SESSION_KEY);
                setAuthed(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-orange"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "home" && <AdminHome />}
              {tab === "inbox" && <AdminInbox />}
              {tab === "projects" && <AdminProjects />}
              {tab === "partners" && <AdminPartners />}
              {tab === "team" && <AdminTeam />}
              {tab === "offers" && <AdminOffers />}
              {tab === "vip" && <AdminVipBookings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function PinGate({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [fails, setFails] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);

  const locked = now < lockUntil;
  const remaining = Math.max(0, Math.ceil((lockUntil - now) / 1000));

  const press = (k: string) => {
    if (locked) return;
    if (k === "del") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    if (pin.length >= 4) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === PIN) {
          onSuccess();
        } else {
          setShake(true);
          setTimeout(() => setShake(false), 500);
          setPin("");
          const newFails = fails + 1;
          setFails(newFails);
          if (newFails >= 3) {
            setLockUntil(Date.now() + 30_000);
            setFails(0);
          }
        }
      }, 150);
    }
  };

  const keys = ["1","2","3","4","5","6","7","8","9","","0","del"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-onyx p-6">
      <div className="ambient-orb left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" style={{ background: "var(--brand-orange)", opacity: 0.2 }} />
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-card p-8 shadow-[0_30px_80px_-30px_oklch(0.72_0.19_45/0.6)]"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-fire text-onyx">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-center font-display text-3xl uppercase">Rowaad Vault</h2>
        <p className="mt-1 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Enter access PIN</p>

        <div className="my-7 flex justify-center gap-3">
          {[0,1,2,3].map((i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full transition-all ${
                pin.length > i ? "bg-orange shadow-[0_0_10px_oklch(0.72_0.19_45)]" : "bg-white/15"
              }`}
            />
          ))}
        </div>

        {locked ? (
          <p className="text-center text-sm text-destructive">Locked — try again in {remaining}s</p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {keys.map((k, i) =>
              k === "" ? (
                <div key={i} />
              ) : (
                <button
                  key={i}
                  onClick={() => press(k)}
                  className="h-14 rounded-xl border border-white/10 bg-white/5 font-display text-2xl text-foreground transition-all hover:border-orange hover:bg-orange/10 hover:text-orange active:scale-95"
                >
                  {k === "del" ? "←" : k}
                </button>
              )
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
