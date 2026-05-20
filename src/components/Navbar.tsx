import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import logo from "@/assets/rowaad-logo-new.png";
import { ContactModal } from "./ContactModal";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "@/i18n/LanguageContext";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/work", key: "nav.work" },
  { to: "/intelligence", key: "nav.intelligence" },
  { to: "/blog", key: "nav.blog" },
  { to: "/about", key: "nav.about" },
  { to: "/invest", key: "nav.invest" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const loc = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            className={`flex items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-all duration-500 ${
              scrolled ? "glass-dark shadow-2xl" : "bg-transparent"
            }`}
          >
            <Link to="/" aria-label="Rowaad — Home" className="flex shrink-0 items-center pl-1">
              <img src={logo} alt="Rowaad" className="h-16 w-auto md:h-20" loading="eager" decoding="async" />
            </Link>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-orange"
                    activeProps={{ className: "text-orange" }}
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-3 md:flex">
              <LanguageToggle />
              <MagneticButton onClick={() => setModal(true)} className="!px-5 !py-2.5 text-xs">
                {t("nav.bookCall")}
              </MagneticButton>
            </div>

            <button
              className="rounded-full border border-white/15 p-2 text-foreground md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-onyx/95 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between p-5">
            <img src={logo} alt="Rowaad" className="h-10 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full border border-white/15 p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-5">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display text-4xl uppercase tracking-wider text-foreground transition-colors hover:text-orange"
                style={{ animation: `fadeUp 0.6s ${i * 0.06}s both` }}
              >
                {t(l.key)}
              </Link>
            ))}
            <div className="mt-4 flex flex-col items-center gap-4">
              <LanguageToggle />
              <MagneticButton onClick={() => { setOpen(false); setModal(true); }}>
                {t("hero.cta1")}
              </MagneticButton>
            </div>
          </nav>
          <style>{`@keyframes fadeUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform:none } }`}</style>
        </div>
      )}

      <ContactModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
