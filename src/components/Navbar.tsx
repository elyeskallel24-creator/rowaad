import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import logo from "@/assets/rowaad-logo.png";
import { ContactModal } from "./ContactModal";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/about", label: "About" },
  { to: "/invest", label: "Invest" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const loc = useLocation();

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
            className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
              scrolled ? "glass-dark shadow-2xl" : "bg-transparent"
            }`}
          >
            <Link to="/" className="flex items-center gap-2 pl-2">
              <img src={logo} alt="Rowaad" className="h-9 w-auto invert brightness-0" style={{ filter: "invert(1)" }} />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-orange"
                    activeProps={{ className: "text-orange" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <MagneticButton onClick={() => setModal(true)} className="!px-5 !py-2.5 text-xs">
                Book a Call
              </MagneticButton>
            </div>

            <button
              className="md:hidden rounded-full border border-white/15 p-2 text-foreground"
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
            <img src={logo} alt="Rowaad" className="h-9" style={{ filter: "invert(1)" }} />
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full border border-white/15 p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-6">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display text-5xl uppercase tracking-wider text-foreground transition-colors hover:text-orange"
                style={{ animation: `fadeUp 0.6s ${i * 0.06}s both` }}
              >
                {l.label}
              </Link>
            ))}
            <MagneticButton onClick={() => { setOpen(false); setModal(true); }} className="mt-4">
              Book a Strategy Call
            </MagneticButton>
          </nav>
          <style>{`@keyframes fadeUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform:none } }`}</style>
        </div>
      )}

      <ContactModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
