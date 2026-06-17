import { Wind, Eye, HandHeart, Sparkles } from "lucide-react";
import { PageHeader, PageTitle, WebinarCta, JourneyNav, FadeIn } from "@/components/webinar-page-shell";

// D-4 nurture page · "Trygghetsövningen" — guided ~10 min video (Vimeo).
const VIMEO_VIDEO_ID = "1201953714";

const STEPS = [
  {
    icon: Eye,
    title: "Orientering",
    text: "Låt blicken långsamt vandra runt i rummet. Du berättar för nervsystemet: här finns ingen fara, jag är trygg just nu.",
  },
  {
    icon: Wind,
    title: "Förlängd utandning",
    text: "Andas in på fyra, ut på sex. Den långa utandningen aktiverar vagusnerven och signalerar att du kan slappna av.",
  },
  {
    icon: HandHeart,
    title: "Hand på hjärta och mage",
    text: "Känn värmen från dina händer. Beröring är en av kroppens äldsta trygghetssignaler – och den fungerar även från dig själv.",
  },
];

const BENEFITS = [
  "En kropp som känner sig lite lugnare och mjukare efteråt.",
  "Djupare andetag, lägre axlar och mindre inre stress.",
  "En konkret upplevelse av vad ”trygghet i kroppen” faktiskt betyder.",
];

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-5xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Din övning · 10 minuter"
          title="Trygghetsövningen"
          subtitle="En enkel övning som börjar lugna ditt nervsystem – redan innan vi ses."
        />

        {/* Video (portrait) */}
        <FadeIn delay={0.15} className="mt-10 md:mt-12">
          <div
            className="relative w-full max-w-sm mx-auto rounded-[1.75rem] overflow-hidden shadow-2xl border border-border/40 bg-primary"
            style={{ paddingTop: "min(177.78%, 78vh)" }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479`}
              title="Trygghetsövningen"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </FadeIn>

        {/* Benefits */}
        <FadeIn delay={0.25} className="mt-14 max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">
            Det du får ut av övningen
          </h2>
          <ul className="space-y-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-4 text-primary/80 leading-relaxed">
                <span className="mt-1 shrink-0 text-accent">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-base md:text-lg">{b}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Three steps */}
        <FadeIn delay={0.32} className="mt-14 grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="bg-white rounded-[1.5rem] p-6 border border-border/30 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <p className="text-[11px] tracking-[0.18em] uppercase text-accent/80 font-bold mb-1">
                Steg {i + 1}
              </p>
              <h3 className="font-serif text-lg text-primary mb-2">{title}</h3>
              <p className="text-sm text-primary/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.4} className="mt-10 text-center">
          <p className="font-serif italic text-primary/65 text-lg max-w-2xl mx-auto leading-snug">
            Gör gärna övningen varje kväll fram till webbinariet. Ju oftare du gör den, desto
            mer lär sig kroppen att det är tryggt.
          </p>
        </FadeIn>

        <JourneyNav current="video" />
        <WebinarCta />
      </main>
    </div>
  );
}
