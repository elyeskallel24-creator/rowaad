import { useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { useTranslation } from "@/i18n/LanguageContext";

export type ContactFormData = {
  name: string;
  email: string;
  whatsapp: string;
  description: string;
  date: string;
  time: string;
};

export function ContactForm({ onSubmit }: { onSubmit: (data: ContactFormData) => void }) {
  const { t } = useTranslation();
  const [data, setData] = useState<ContactFormData>({
    name: "", email: "", whatsapp: "", description: "", date: "", time: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const update = (k: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [k]: e.target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!data.name.trim()) errs.name = t("form.required");
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = t("form.invalidEmail");
    if (!data.whatsapp.trim()) errs.whatsapp = t("form.required");
    if (!data.description.trim()) errs.description = t("form.required");
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit(data);
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30";

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <Field label={t("form.name")} error={errors.name}>
        <input className={inputCls} value={data.name} onChange={update("name")} placeholder="Jane Doe" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("form.email")} error={errors.email}>
          <input className={inputCls} type="email" value={data.email} onChange={update("email")} placeholder="you@company.com" />
        </Field>
        <Field label={t("form.whatsapp")} error={errors.whatsapp}>
          <input className={inputCls} value={data.whatsapp} onChange={update("whatsapp")} placeholder="+216 ..." />
        </Field>
      </div>

      <Field label={t("form.company")} error={errors.description}>
        <textarea
          className={inputCls + " min-h-[120px] resize-y"}
          value={data.description}
          onChange={update("description")}
          placeholder={t("form.companyPh")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("form.date")}>
          <input className={inputCls} type="date" value={data.date} onChange={update("date")} />
        </Field>
        <Field label={t("form.time")}>
          <input className={inputCls} type="time" value={data.time} onChange={update("time")} />
        </Field>
      </div>

      <div className="pt-2">
        <MagneticButton type="submit" className="w-full sm:w-auto">
          {t("form.submit")}
        </MagneticButton>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-foreground/70">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
