import { Headphones, Sparkles } from "lucide-react";
import { PageHeader, PageTitle, WebinarCta, FadeIn } from "@/components/webinar-page-shell";

// D-5 nurture page · podcast "Den stilla tomheten" (~8 min).
// Audio file lives in public/podcast/ and is served from the app base path.
const AUDIO_SRC = `${import.meta.env.BASE_URL}podcast/den-stilla-tomheten.m4a`;

const HIGHLIGHTS = [
  "Varför ”jag borde inte klaga” är en av de farligaste meningarna en kvinna kan säga till sig själv.",
  "De tre tysta tecknen på att din kropp har varit i beredskap för länge.",
  "Varför mer vilja och mer disciplin faktiskt gör det värre – inte bättre.",
];

export default function PodcastPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-3xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Podcast · 8 minuter"
          title="Den stilla tomheten"
          subtitle="”Jag som har det så bra. Jag borde inte klaga.”"
        />

        {/* Audio player */}
        <FadeIn delay={0.15} className="mt-10 md:mt-12">
          <div className="bg-white rounded-[1.75rem] p-7 md:p-9 border border-border/30 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-serif text-lg text-primary leading-tight">
                  Lyssna här
                </p>
                <p className="text-xs text-primary/55">Cirka 8 minuter · med Gaia</p>
              </div>
            </div>
            <audio controls preload="metadata" src={AUDIO_SRC} className="w-full">
              Din webbläsare stödjer inte ljuduppspelning.
            </audio>
            <p className="text-xs text-primary/55 mt-4 leading-relaxed">
              Lyssna gärna under en promenad eller medan du diskar. Lägg märke till vad som rör
              sig i din kropp medan du lyssnar – det är ofta där svaret börjar.
            </p>
          </div>
        </FadeIn>

        {/* Highlights */}
        <FadeIn delay={0.25} className="mt-12 max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">
            I avsnittet får du höra
          </h2>
          <ul className="space-y-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-4 text-primary/80 leading-relaxed">
                <span className="mt-1 shrink-0 text-accent">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-base md:text-lg">{h}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.33} className="mt-10 text-center">
          <p className="font-serif italic text-primary/65 text-lg max-w-2xl mx-auto leading-snug">
            Om något i avsnittet känns igen – då är du på precis rätt väg, och på precis rätt
            webbinar.
          </p>
        </FadeIn>

        <WebinarCta />
      </main>
    </div>
  );
}
