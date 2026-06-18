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
  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
      {items.map((t, i) => (
        <FadeIn key={t.id} delay={Math.min(i * delayStep, 0.4)}>
          <figure className="overflow-hidden rounded-[1.5rem] border border-border/30 bg-white shadow-sm">
            <img
              src={t.image}
              alt={`${t.name}, ${t.age} år – ${t.role}. ”${t.quote}”`}
              loading="lazy"
              className="block w-full h-auto"
            />
          </figure>
        </FadeIn>
      ))}
    </div>
  );
}
