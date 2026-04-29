import { useTranslation } from "@/i18n/LanguageContext";

export function Marquee() {
  const { t } = useTranslation();
  const items = t("marquee.items").split("·").map((s) => s.trim()).filter(Boolean);
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-6">
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((label, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`font-display text-3xl uppercase tracking-wider md:text-4xl ${
                i % 2 === 0 ? "text-foreground" : "text-orange"
              }`}
            >
              {label}
            </span>
            <span className="h-2 w-2 rounded-full bg-orange/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
