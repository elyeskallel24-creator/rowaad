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
          <div className="mt-14 grid grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {partners.map((p) => {
              const Tag = p.website ? "a" : "div";
              return (
                <Tag
                  key={p.id}
                  {...(p.website ? { href: p.website, target: "_blank", rel: "noreferrer" } : {})}
                  className="flex h-20 items-center justify-center"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-12 w-auto opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                  />
                </Tag>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
