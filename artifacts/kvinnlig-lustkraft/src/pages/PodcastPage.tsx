import { Headphones, Sparkles, Moon, Flame, Users } from "lucide-react";
import { PageHeader, PageTitle, WebinarCta, FadeIn } from "@/components/webinar-page-shell";

// D-5 nurture page · podcast "Den stilla tomheten" (~8 min).
// Audio file lives in public/podcast/ and is served from the app base path.
const AUDIO_SRC = `${import.meta.env.BASE_URL}podcast/den-stilla-tomheten.m4a`;

// De tre tysta tecknen (ur avsnittet) — ger sidan verkligt värde, inte bara en spelare.
const SIGNS = [
  {
    icon: Moon,
    title: "En trötthet som inte går över",
    text: "Inte den som försvinner efter en god natts sömn. En djupare trötthet i själva kroppen – du vaknar och känner att dagen redan är förbrukad.",
  },
  {
    icon: Flame,
    title: "Lusten börjar försvinna",
    text: "Inte bara den sexuella. Lust till närhet, lust att skapa, glädjen i de små sakerna. Färgerna i livet bleknar – så långsamt att du knappt märker när.",
  },
  {
    icon: Users,
    title: "Den tysta ensamheten",
    text: "Känslan av att ingen riktigt förstår. Att du håller ihop allt själv, finns där för alla andra – men att det inte finns någon plats där du själv får landa.",
  },
];

const HIGHLIGHTS = [
  "Varför ”jag borde inte klaga” är en av de farligaste meningarna en kvinna kan säga till sig själv.",
  "Hur kroppen viskar först – och ropar till slut, om vi inte lyssnar.",
  "Varför mer vilja och mer disciplin faktiskt gör det värre – inte bättre.",
];

export default function PodcastPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-3xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Podcast · Avsnitt 1 · 8 minuter"
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
                <p className="font-serif text-lg text-primary leading-tight">Lyssna här</p>
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

        {/* Pull quote */}
        <FadeIn delay={0.22} className="mt-12 md:mt-14">
          <blockquote className="border-l-2 border-accent/50 pl-6 md:pl-8">
            <p className="font-serif italic text-2xl md:text-3xl text-primary leading-snug">
              Det är inget fel på dig. Din kropp har bara burit för mycket, under för lång tid –
              utan att få det den behöver.
            </p>
          </blockquote>
        </FadeIn>

        {/* De tre tysta tecknen */}
        <FadeIn delay={0.3} className="mt-14">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-2 text-center">
            De tre tysta tecknen
          </h2>
          <p className="text-sm text-primary/55 text-center mb-8 max-w-xl mx-auto">
            De flesta kvinnor känner igen minst två. Känner du igen ett – eller alla tre?
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {SIGNS.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="bg-white rounded-[1.5rem] p-6 border border-border/30 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-accent/80 font-bold mb-1">
                  Tecken {i + 1}
                </p>
                <h3 className="font-serif text-lg text-primary mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-primary/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Highlights */}
        <FadeIn delay={0.38} className="mt-14 bg-cream/50 rounded-[2rem] p-7 md:p-10 border border-border/30">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">
            I avsnittet får du höra
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
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

        <FadeIn delay={0.45} className="mt-12 text-center">
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
