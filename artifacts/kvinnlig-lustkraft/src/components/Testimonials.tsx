import { useEffect, useState } from "react";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { FadeIn } from "@/components/webinar-page-shell";

// Responsive grid of the designed testimonial cards (image graphics from Gaia).
export function TestimonialsGrid({
  items = TESTIMONIALS,
  delayStep = 0.05,
}: {
  items?: Testimonial[];
  delayStep?: number;
}) {
  const [active, setActive] = useState<Testimonial | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {items.map((t, i) => (
          <FadeIn key={t.id} delay={Math.min(i * delayStep, 0.4)}>
            <button
              type="button"
              onClick={() => setActive(t)}
              aria-label={`Förstora bilden: ${t.name}, ${t.age} år`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] border border-border/30 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <img
                src={t.image}
                alt={`${t.name}, ${t.age} år – ${t.role}. ”${t.quote}”`}
                loading="lazy"
                className="block w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          </FadeIn>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name}, ${active.age} år`}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
        >
          <button
            type="button"
            aria-label="Stäng"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors hover:bg-white"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={active.image}
            alt={`${active.name}, ${active.age} år – ${active.role}. ”${active.quote}”`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full w-auto rounded-[1.25rem] shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
