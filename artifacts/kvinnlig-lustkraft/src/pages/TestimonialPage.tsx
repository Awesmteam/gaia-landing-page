import { Quote } from "lucide-react";
import { PageHeader, PageTitle, WebinarCta, FadeIn } from "@/components/webinar-page-shell";

// D-2 nurture page · testimonials + handling of the "för sent"-objection.
const TESTIMONIALS = [
  {
    name: "Sonja, 45 år",
    context: "drev eget företag och var alltid den starka, den som höll ihop allt. Men inombords var hon helt tom:",
    quote:
      "Jag fungerade – men jag levde inte på riktigt. När min kropp blev lugnare och mjukare igen sa jag till Gaia: det är som om jag har fått ett liv.",
  },
  {
    name: "Sofia, 37 år",
    context: "småbarnsmamma och projektledare, kände sig ständigt irriterad och avstängd:",
    quote:
      "Jag har blivit mycket lugnare hemma. Mjukare med barnen. Mer närvarande i relationen. Och lusten är tillbaka – inte bara i kroppen, utan i livet.",
  },
  {
    name: "Maria, 51 år",
    context: "trodde att det mesta redan var förbi för hennes del:",
    quote:
      "Det här arbetet har förändrat så mycket, för mig och för min man. Han sa: det är som om jag har fått min fru tillbaka.",
  },
];

export default function TestimonialPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-3xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Tre röster"
          title="”Det är som om jag har fått ett liv”"
          subtitle="Tre kvinnor som en gång satt precis där du sitter."
        />

        <FadeIn delay={0.15} className="mt-10 md:mt-12">
          <p className="text-base md:text-lg text-primary/80 leading-relaxed text-center max-w-2xl mx-auto">
            De är inte perfekta människor. De är vanliga kvinnor, precis som du och jag, med helt
            olika liv. Men de hade en sak gemensamt: de hade tappat kontakten med sig själva. Och
            de hittade vägen tillbaka.
          </p>
        </FadeIn>

        <div className="mt-12 space-y-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={0.2 + i * 0.08}>
              <figure className="bg-white rounded-[1.75rem] p-7 md:p-9 border border-border/30 shadow-sm">
                <Quote className="w-7 h-7 text-accent/40 mb-3" />
                <blockquote className="font-serif italic text-lg md:text-xl text-primary leading-relaxed mb-4">
                  {t.quote}
                </blockquote>
                <figcaption className="text-sm text-primary/65">
                  <span className="font-semibold text-primary">{t.name}</span> {t.context}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.45} className="mt-12 max-w-2xl mx-auto text-center">
          <p className="text-base md:text-lg text-primary/80 leading-relaxed mb-4">
            Kanske tänker du: ”Men det är nog för sent för mig.” Eller: ”Det fungerar säkert för
            andra, men inte för mig.”
          </p>
          <p className="text-base md:text-lg text-primary/80 leading-relaxed">
            Det var precis så Sonja, Sofia och Maria också tänkte. Skillnaden var inte att de hade
            mer tid eller mindre att göra. Skillnaden var att de fick förstå vad som pågick – och
            fick rätt stöd. Det är det jag vill ge dig på webbinariet.
          </p>
        </FadeIn>

        <WebinarCta lead="Vi ses om två dagar:" label="Jag vill vara med" />
      </main>
    </div>
  );
}
