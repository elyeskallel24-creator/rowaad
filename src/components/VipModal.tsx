import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Eye, Shield, DollarSign, Check } from "lucide-react";
import { store } from "@/lib/store";

type FormState = { whatsapp: string; email: string; date: string; time: string };
type Errors = Partial<Record<keyof FormState, string>>;

const TIME_SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let h = 8; h <= 20; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 20) out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

export function VipModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>({ whatsapp: "", email: "", date: "", time: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSuccess(false); setError(false); setErrors({});
        setForm({ whatsapp: "", email: "", date: "", time: "" });
      }, 300);
    }
  }, [open]);

  const today = new Date().toISOString().split("T")[0];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!form.whatsapp.trim()) errs.whatsapp = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.date) errs.date = "Required";
    else if (form.date < today) errs.date = "Date must be in the future";
    if (!form.time) errs.time = "Required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      store.addVipBooking(form);
      setSuccess(true);
    } catch {
      setError(true);
    }
  };

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none transition-colors";
  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", caretColor: "#FFE072" } as React.CSSProperties;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] overflow-y-auto"
          style={{ background: "#000" }}
        >
          {/* Animated mesh */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle, #FFE072 0%, transparent 70%)", opacity: 0.04, animation: "vipDrift1 25s ease-in-out infinite", left: "10%", top: "10%" }} />
            <div className="absolute h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, #FF7A20 0%, transparent 70%)", opacity: 0.03, animation: "vipDrift2 25s ease-in-out infinite", right: "5%", bottom: "5%" }} />
          </div>


          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="relative mx-auto flex min-h-screen max-w-[560px] flex-col justify-center px-6 py-16"
          >
            {success ? (
              <SuccessState />
            ) : (
              <>
                <div className="text-center">
                  <div className="mx-auto inline-flex h-9 w-9 items-center justify-center" style={{ color: "#FFE072" }}>
                    <Crown className="h-9 w-9" strokeWidth={1.2} />
                  </div>
                  <p className="mt-5 text-[11px] uppercase" style={{ color: "#FFE072", letterSpacing: "0.25em" }}>
                    Private Access · By Invitation Only
                  </p>
                  <h2 className="mt-4 font-display text-[52px] uppercase leading-[0.95] text-white md:text-[60px]">
                    The VIP<br />Investors Club
                  </h2>
                  <p className="mx-auto mt-5 max-w-[420px] text-[15px] leading-[1.7] text-white/60">
                    Reserved for qualified investors who want direct access to Rowaad's portfolio of AI-powered ventures. Monthly distributions. Full transparency. Zero operational involvement required.
                  </p>
                </div>

                <div className="my-8 h-px w-full" style={{ background: "#FFE072", opacity: 0.15 }} />

                <div className="space-y-5">
                  <FeatureRow Icon={DollarSign} label="Monthly Revenue Distributions" body="Your share of what the venture earns, paid monthly, automatically." />
                  <FeatureRow Icon={Eye} label="Full Portfolio Transparency" body="Real-time access to revenue data, milestones, and performance reports." />
                  <FeatureRow Icon={Shield} label="Operator-Backed Security" body="Rowaad retains operational control. We only win when you win." />
                </div>

                <div className="my-8 h-px w-full" style={{ background: "#FFE072", opacity: 0.15 }} />

                <p className="text-[11px] uppercase text-orange" style={{ letterSpacing: "0.2em" }}>
                  Request Your Private Briefing
                </p>

                <form onSubmit={submit} className="mt-5 space-y-4">
                  <FormField label="WhatsApp Number" error={errors.whatsapp}>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      className={inputCls + " vip-input"}
                      style={inputStyle}
                    />
                  </FormField>
                  <FormField label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls + " vip-input"}
                      style={inputStyle}
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Preferred Date" error={errors.date}>
                      <input
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className={inputCls + " vip-input"}
                        style={inputStyle}
                      />
                    </FormField>
                    <FormField label="Preferred Time" error={errors.time}>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className={inputCls + " vip-input"}
                        style={inputStyle}
                      >
                        <option value="">Select…</option>
                        {TIME_SLOTS.map((s) => (
                          <option key={s} value={s} style={{ background: "#000" }}>{s}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  <button
                    type="submit"
                    className="vip-submit mt-2 w-full rounded-xl py-4 font-display text-[18px] text-black transition-colors"
                    style={{ background: "#FFE072", letterSpacing: "0.1em" }}
                  >
                    SECURE MY SPOT
                  </button>

                  {error && (
                    <p className="text-center text-xs" style={{ color: "#FFE072" }}>
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}
                </form>

                <p className="mt-8 text-center text-[11px] text-white/30">
                  By submitting, you confirm that you are a qualified investor seeking information about private investment opportunities. Rowaad does not guarantee returns. All investment carries risk.
                </p>
              </>
            )}
          </motion.div>

          <style>{`
            @keyframes vipDrift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(60px,40px); } }
            @keyframes vipDrift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,-30px); } }
            .vip-input:focus { border-color: #FFE072 !important; }
            .vip-submit:hover { background: #FF7A20 !important; }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FeatureRow({ Icon, label, body }: { Icon: typeof Crown; label: string; body: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Icon className="h-[18px] w-[18px]" style={{ color: "#FFE072" }} strokeWidth={1.4} />
        <p className="font-semibold text-white">{label}</p>
      </div>
      <p className="mt-1 pl-[30px] text-sm text-white/50">{body}</p>
    </div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[11px]" style={{ color: "#FFE072" }}>{error}</span>}
    </label>
  );
}

function SuccessState() {
  return (
    <div className="text-center">
      <motion.svg
        width="80" height="80" viewBox="0 0 80 80"
        className="mx-auto"
        initial="hidden" animate="visible"
      >
        <motion.circle
          cx="40" cy="40" r="36" fill="none" stroke="#FFE072" strokeWidth="2"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6 } } }}
        />
        <motion.path
          d="M24 42 L36 54 L58 30" fill="none" stroke="#FFE072" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.5, delay: 0.5 } } }}
        />
      </motion.svg>
      <h3 className="mt-6 font-display text-[48px] uppercase text-white">You're In.</h3>
      <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[1.7] text-white/65">
        Your briefing request has been received. Elyes Kallel will reach out to you directly within 24 hours via WhatsApp or email to confirm your appointment.
      </p>
      <span className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] uppercase" style={{ background: "rgba(255,224,114,0.1)", border: "1px solid rgba(255,224,114,0.3)", color: "#FFE072", letterSpacing: "0.18em" }}>
        <Crown className="h-3.5 w-3.5" strokeWidth={1.4} /> Rowaad VIP Investors Club
      </span>
      <Check className="hidden" />
    </div>
  );
}
