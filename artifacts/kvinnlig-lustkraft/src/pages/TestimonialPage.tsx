import { Quote } from "lucide-react";
import { PageHeader, PageTitle, WebinarCta, JourneyNav, FadeIn } from "@/components/webinar-page-shell";

// D-2 nurture page · testimonials + handling of the "för sent"-objection.
const TESTIMONIALS = [
  {
    initials: "S",
    name: "Sonja",
    age: "45 år",
    role: "Driver eget företag",
    context: "var alltid den starka, den som höll ihop allt. Men inombords var hon helt tom.",
    quote:
      "Jag fungerade – men jag levde inte på riktigt. När min kropp blev lugnare och mjukare igen sa jag till Gaia: det är som om jag har fått ett liv.",
  },
  {
    initials: "S",
    name: "Sofia",
    age: "37 år",
    role: "Småbarnsmamma & projektledare",
    context: "kände sig ständigt irriterad och avstängd.",
    quote:
      "Jag har blivit mycket lugnare hemma. Mjukare med barnen. Mer närvarande i relationen. Och lusten är tillbaka – inte bara i kroppen, utan i livet.",
  },
  {
    initials: "M",
    name: "Maria",
    age: "51 år",
    role: "Trodde det var för sent",
    context: "trodde att det mesta redan var förbi för hennes del.",
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
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-secondary text-accent font-serif text-xl flex items-center justify-center shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-serif text-primary text-lg leading-tight">
                      {t.name}, <span className="text-primary/60">{t.age}</span>
                    </p>
                    <p className="text-[11px] tracking-[0.16em] uppercase text-accent/80 font-semibold">
                      {t.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-primary/60 leading-relaxed mb-4">{t.context}</p>
                <div className="relative">
                  <Quote className="w-7 h-7 text-accent/30 absolute -top-1 -left-1" />
                  <blockquote className="font-serif italic text-lg md:text-xl text-primary leading-relaxed pl-7">
                    {t.quote}
                  </blockquote>
                </div>
              </figure>
            </FadeIn>
          ))}
        </div>

        {/* Objection handling */}
        <FadeIn delay={0.46} className="mt-12 bg-cream/50 rounded-[2rem] p-7 md:p-10 border border-border/30 max-w-2xl mx-auto">
          <p className="font-serif italic text-xl md:text-2xl text-primary leading-snug mb-4 text-center">
            ”Men det är nog för sent för mig.”
          </p>
          <p className="text-base text-primary/80 leading-relaxed text-center">
            Det var precis så Sonja, Sofia och Maria också tänkte. Skillnaden var inte att de hade
            mer tid eller mindre att göra. Skillnaden var att de fick förstå vad som pågick – och
            fick rätt stöd. Det är det jag vill ge dig på webbinariet.
          </p>
        </FadeIn>

        <JourneyNav current="testimonial" />
        <WebinarCta lead="Vi ses om två dagar:" label="Jag vill vara med" />
      </main>
    </div>
  );
}
