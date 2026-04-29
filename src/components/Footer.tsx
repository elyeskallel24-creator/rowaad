import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useState } from "react";
import { ContactModal } from "./ContactModal";
import logo from "@/assets/rowaad-logo.png";

export function Footer() {
  const [modal, setModal] = useState(false);
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-onyx">
      <div className="ambient-orb -top-40 left-1/2 h-96 w-96 -translate-x-1/2" style={{ background: "var(--brand-orange)", opacity: 0.15 }} />

      {/* Final CTA strip */}
      <div className="relative border-b border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-16 md:flex-row">
          <h3 className="font-display text-4xl uppercase leading-none md:text-6xl">
            Ready to build your <span className="text-gradient-fire">growth machine?</span>
          </h3>
          <MagneticButton onClick={() => setModal(true)}>Book a Strategy Call</MagneticButton>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <img src={logo} alt="Rowaad" className="h-10" style={{ filter: "invert(1)" }} />
          <p className="mt-4 text-sm text-muted-foreground">© 2026 Rowaad. All rights reserved.</p>
        </div>

        <div className="flex flex-col gap-2 md:items-center">
          <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Navigate</h4>
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Services" },
            { to: "/work", label: "Our Work" },
            { to: "/about", label: "About" },
            { to: "/invest", label: "Invest" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-foreground/80 hover:text-orange">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="md:text-right">
          <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Origin</h4>
          <p className="text-sm text-foreground/80">Initiated 28 April 2026</p>
          <p className="text-sm text-foreground/80">Tunis, Tunisia</p>
          <div className="mt-4 flex gap-3 md:justify-end">
            {[Linkedin, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground/70 transition-colors hover:border-orange hover:text-orange"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <ContactModal open={modal} onClose={() => setModal(false)} />
    </footer>
  );
}
