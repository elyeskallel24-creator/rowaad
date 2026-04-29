import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "gold";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  strength?: number;
};

export function MagneticButton({
  variant = "primary",
  children,
  className = "",
  strength = 0.3,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition-[transform,background,color,box-shadow] duration-300 will-change-transform";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-fire text-onyx shadow-[0_20px_60px_-20px_oklch(0.72_0.19_45/0.6)] hover:shadow-[0_30px_80px_-20px_oklch(0.72_0.19_45/0.8)]",
    ghost:
      "border border-white/20 text-foreground hover:border-orange hover:text-orange bg-white/0",
    gold:
      "bg-gradient-to-r from-gold to-amber text-onyx shadow-[0_20px_60px_-20px_oklch(0.9_0.13_90/0.5)]",
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
