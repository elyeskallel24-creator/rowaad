import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-app");

    let x = 0, y = 0, rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
    };
    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const enter = () => ringRef.current?.classList.add("cursor-active");
    const leave = () => ringRef.current?.classList.remove("cursor-active");
    const targets = "a, button, [role=button], input, textarea, select, [data-cursor]";
    const handleEnter = (e: Event) => {
      if ((e.target as HTMLElement).closest(targets)) enter();
    };
    const handleLeave = (e: Event) => {
      if ((e.target as HTMLElement).closest(targets)) leave();
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
      document.documentElement.classList.remove("cursor-none-app");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 rounded-full bg-orange mix-blend-difference"
        style={{ background: "var(--brand-orange)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-9 w-9 rounded-full border transition-[width,height,background] duration-200"
        style={{ borderColor: "var(--brand-orange)" }}
      />
      <style>{`
        .cursor-active { width: 56px !important; height: 56px !important; background: oklch(0.72 0.19 45 / 25%); transform-origin: center; }
      `}</style>
    </>
  );
}
