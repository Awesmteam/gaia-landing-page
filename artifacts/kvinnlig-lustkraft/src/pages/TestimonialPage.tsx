import {
  PageHeader,
  PageTitle,
  WebinarCta,
  FadeIn,
  useJourneyGate,
  JourneyLocked,
} from "@/components/webinar-page-shell";
import { TestimonialsGrid } from "@/components/Testimonials";

// D-2 nurture page · testimonials + handling of the "för sent"-objection.
export default function TestimonialPage() {
  const unlocked = useJourneyGate("testimonial");
  if (!unlocked) {
    return (
      <JourneyLocked
        pageKey="testimonial"
        eyebrow="Röster · D-2"
        title="”Det är som om jag har fått ett liv”"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-4xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Röster"
          title="”Det är som om jag har fått ett liv”"
          subtitle="Kvinnor som en gång satt precis där du sitter."
        />

        <FadeIn delay={0.15} className="mt-10 md:mt-12">
          <p className="text-base md:text-lg text-primary/80 leading-relaxed text-center max-w-2xl mx-auto">
            De är inte perfekta människor. De är vanliga kvinnor, precis som du och jag, med helt
            olika liv. Men de hade en sak gemensamt: de hade tappat kontakten med sig själva. Och
            de hittade vägen tillbaka.
          </p>
        </FadeIn>

        <div className="mt-12">
          <TestimonialsGrid />
        </div>

        {/* Objection handling */}
        <FadeIn delay={0.2} className="mt-14 bg-cream/50 rounded-[2rem] p-7 md:p-10 border border-border/30 max-w-2xl mx-auto">
          <p className="font-serif italic text-xl md:text-2xl text-primary leading-snug mb-4 text-center">
            ”Men det är nog för sent för mig.”
          </p>
          <p className="text-base text-primary/80 leading-relaxed text-center">
            Det var precis så de här kvinnorna också tänkte. Skillnaden var inte att de hade
            mer tid eller mindre att göra. Skillnaden var att de fick förstå vad som pågick – och
            fick rätt stöd. Det är det jag vill ge dig på webbinariet.
          </p>
        </FadeIn>

        <WebinarCta lead="Vi ses snart:" label="Jag vill vara med" />
      </main>
    </div>
  );
}
