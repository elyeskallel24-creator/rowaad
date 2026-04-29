const ITEMS = [
  "Revenue Systems",
  "Growth Architecture",
  "AI Stacks",
  "Venture Optimization",
  "Fractional CGO",
  "Ecosystem Overhaul",
  "High-Yield Assets",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-6">
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`font-display text-3xl uppercase tracking-wider md:text-4xl ${
                i % 2 === 0 ? "text-foreground" : "text-orange"
              }`}
            >
              {t}
            </span>
            <span className="h-2 w-2 rounded-full bg-orange/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
