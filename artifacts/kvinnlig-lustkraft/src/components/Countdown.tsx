import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diffParts(targetMs: number): Parts {
  const now = Date.now();
  const total = Math.max(0, targetMs - now);
  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / (1000 * 60)) % 60;
  const hours = Math.floor(total / (1000 * 60 * 60)) % 24;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export type CountdownProps = {
  targetIso: string;
  variant?: "light" | "dark" | "compact";
  className?: string;
};

export function Countdown({ targetIso, variant = "light", className = "" }: CountdownProps) {
  const targetMs = new Date(targetIso).getTime();
  const [parts, setParts] = useState<Parts>(() => diffParts(targetMs));

  useEffect(() => {
    const id = setInterval(() => setParts(diffParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const items: Array<[string, number]> = [
    ["dagar", parts.days],
    ["tim", parts.hours],
    ["min", parts.minutes],
    ["sek", parts.seconds],
  ];

  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 font-mono text-sm tabular-nums ${className}`}
      >
        <span>{pad(parts.days)}d</span>
        <span className="opacity-50">:</span>
        <span>{pad(parts.hours)}h</span>
        <span className="opacity-50">:</span>
        <span>{pad(parts.minutes)}m</span>
        <span className="opacity-50">:</span>
        <span>{pad(parts.seconds)}s</span>
      </div>
    );
  }

  const styles =
    variant === "dark"
      ? {
          card: "bg-white/10 border-white/15 text-white",
          label: "text-white/65",
        }
      : {
          card: "bg-white border-border/60 text-primary shadow-sm",
          label: "text-primary/60",
        };

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
      {items.map(([label, value], i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <div
            className={`${styles.card} border rounded-2xl w-[68px] sm:w-[88px] py-3 sm:py-4 text-center backdrop-blur-sm`}
          >
            <div className="font-serif text-3xl sm:text-5xl leading-none tabular-nums">
              {pad(value)}
            </div>
            <div
              className={`${styles.label} mt-1 sm:mt-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold`}
            >
              {label}
            </div>
          </div>
          {i < items.length - 1 && (
            <span
              className={`${variant === "dark" ? "text-white/40" : "text-primary/30"} font-serif text-2xl sm:text-3xl`}
              aria-hidden
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
