import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "@/components/PageWrap";
import { ContactForm } from "@/components/ContactForm";
import { store } from "@/lib/store";
import { useState } from "react";
import { Check, Mail, MessageCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Rowaad" },
      { name: "description", content: "Book a strategy call with Rowaad. Limited clients. Qualification only." },
      { property: "og:title", content: "Contact — Rowaad" },
      { property: "og:description", content: "Book a strategy call with Rowaad. Limited clients. Qualification only." },
      { property: "og:url", content: "https://rowaad.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://rowaad.lovable.app/contact" }],
  }),
});

function ContactPage() {
  const [success, setSuccess] = useState(false);

  return (
    <PageWrap>
      <section className="grain relative overflow-hidden pt-32 pb-24">
        <div className="ambient-orb -bottom-32 -left-20 h-[500px] w-[500px]" style={{ background: "var(--brand-orange)", opacity: 0.25 }} />
        <div className="ambient-orb -top-32 -right-20 h-[400px] w-[400px]" style={{ background: "var(--brand-gold)", opacity: 0.18 }} />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-orange">Strategy Session</p>
            <h1 className="mt-3 font-display text-6xl uppercase leading-[0.95] md:text-7xl">
              Let's <span className="text-gradient-fire">Build.</span>
            </h1>
            <p className="mt-6 max-w-md text-foreground/70">
              We accept a limited number of clients per quarter. Tell us about your business and we'll respond
              personally on WhatsApp within 24 hours.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { Icon: MessageCircle, label: "Reach out via WhatsApp after submission" },
                { Icon: Mail, label: "Direct line opened upon qualification" },
                { Icon: MapPin, label: "Tunis, Tunisia · Operating globally" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange/30 text-orange">
                    <c.Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-foreground/80">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-dark rounded-3xl p-8">
            {success ? (
              <div className="flex flex-col items-center py-14 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-fire text-onyx"
                >
                  <Check className="h-10 w-10" strokeWidth={3} />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl uppercase">Request received</h3>
                <p className="mt-2 max-w-sm text-sm text-foreground/70">
                  Your strategy session request has been logged. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl uppercase">Request a Strategy Session</h2>
                <ContactForm
                  onSubmit={(data) => {
                    store.addContact(data);
                    setSuccess(true);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </PageWrap>
  );
}
