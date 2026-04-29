import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { store } from "@/lib/store";
import { ContactForm } from "./ContactForm";
import { useTranslation } from "@/i18n/LanguageContext";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) setSuccess(false);
    if (typeof document !== "undefined") document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-onyx/85 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark relative max-h-[92vh] w-full max-w-2xl overflow-auto rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose} aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-onyx/60 text-foreground hover:bg-orange hover:text-onyx"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8 md:p-10">
              {success ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-fire text-onyx"
                  >
                    <Check className="h-10 w-10" strokeWidth={3} />
                  </motion.div>
                  <h3 className="mt-6 font-display text-3xl uppercase">{t("contact.success")}</h3>
                  <p className="mt-2 max-w-sm text-sm text-foreground/70">{t("contact.successSub")}</p>
                  <button
                    onClick={onClose}
                    className="mt-8 rounded-full border border-orange px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange hover:bg-orange hover:text-onyx"
                  >
                    {t("contact.close")}
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.32em] text-orange">{t("contact.session")}</p>
                  <h3 className="mt-2 font-display text-4xl uppercase leading-none md:text-5xl">{t("contact.modalTitle")}</h3>
                  <p className="mt-3 text-sm text-foreground/70">{t("contact.modalSub")}</p>
                  <ContactForm onSubmit={(data) => { store.addContact(data); setSuccess(true); }} />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
