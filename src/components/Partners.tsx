import { useEffect, useState } from "react";
import { store, useStoreSubscription, type Partner } from "@/lib/store";
import { Reveal } from "./Reveal";
import { useTranslation } from "@/i18n/LanguageContext";

export function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const refresh = () => setPartners(store.getPartners().filter((p) => p.visible));
    refresh();
    return useStoreSubscription(refresh);
  }, []);

  return (
    <section className="relative border-y border-white/5 bg-[#040404] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.32em] text-orange">{t("partners.eyebrow")}</p>
          <h2 className="mt-3 text-center font-display text-4xl uppercase md:text-5xl">{t("partners.title")}</h2>
        </Reveal>

        {partners.length === 0 ? (
          <Reveal delay={0.15}>
            <div className="mt-12 flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-muted-foreground">
              {t("partners.empty")}
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-2 items-start gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {partners.map((p) => {
              const Tag = p.website ? "a" : "div";
              return (
                <Tag
                  key={p.id}
                  {...(p.website ? { href: p.website, target: "_blank", rel: "noreferrer" } : {})}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center justify-center" style={{ width: 180, height: 80 }}>
                    <img
                      src={p.logo}
                      alt={p.name}
                      style={{ width: 180, height: 80, objectFit: "contain" }}
                      className="opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                  <p
                    className="mt-[10px] text-center uppercase"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.08em",
                      maxWidth: 160,
                    }}
                  >
                    {p.name}
                  </p>
                </Tag>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
