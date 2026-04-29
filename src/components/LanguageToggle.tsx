import { useTranslation } from "@/i18n/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useTranslation();
  return (
    <div className="relative inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
      <span
        className="absolute top-1 bottom-1 w-[44%] rounded-full transition-transform duration-300"
        style={{
          background: "var(--brand-orange)",
          transform: lang === "en" ? "translateX(4%)" : "translateX(118%)",
        }}
      />
      <button
        onClick={() => setLang("en")}
        className={`relative z-10 px-3 py-1 transition-colors ${
          lang === "en" ? "text-onyx" : "text-white/40 hover:text-white/70"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("fr")}
        className={`relative z-10 px-3 py-1 transition-colors ${
          lang === "fr" ? "text-onyx" : "text-white/40 hover:text-white/70"
        }`}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
    </div>
  );
}
