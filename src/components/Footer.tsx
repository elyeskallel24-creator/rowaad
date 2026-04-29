import { Link } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { useState } from "react";
import { ContactModal } from "./ContactModal";
import logo from "@/assets/rowaad-logo.png";
import { useTranslation } from "@/i18n/LanguageContext";

export function Footer() {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { to: "/", key: "nav.home" },
    { to: "/services", key: "nav.services" },
    { to: "/work", key: "nav.work" },
    { to: "/intelligence", key: "nav.intelligence" },
    { to: "/about", key: "nav.about" },
    { to: "/invest", key: "nav.invest" },
    { to: "/contact", key: "nav.contact" },
  ] as const;

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-onyx">
      <div className="ambient-orb -top-40 left-1/2 h-96 w-96 -translate-x-1/2" style={{ background: "var(--brand-orange)", opacity: 0.15 }} />

      <div className="relative border-b border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-16 md:flex-row">
          <h3 className="font-display text-4xl uppercase leading-none md:text-6xl">
            {t("footer.cta")}
          </h3>
          <MagneticButton onClick={() => setModal(true)}>{t("hero.cta1")}</MagneticButton>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <img src={logo} alt="Rowaad" className="h-10" />
          <p className="mt-4 text-sm text-muted-foreground">{t("footer.copy")}</p>
        </div>

        <div className="flex flex-col gap-2 md:items-center">
          <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("footer.navigate")}</h4>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-foreground/80 hover:text-orange">
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="md:text-right">
          <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("footer.origin")}</h4>
          <p className="text-sm text-foreground/80">{t("footer.founded")}</p>
          <p className="text-sm text-foreground/80">{t("footer.location")}</p>
        </div>
      </div>

      <ContactModal open={modal} onClose={() => setModal(false)} />
    </footer>
  );
}
