import { Heart, Wind, Soup, Brain, Flower2, Eye, HandHeart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Native, responsive recreation of the "Vagusnerven – kroppens trygghetsnerv" infographic.
// Built from the article content so it stays on-brand, accessible and screen-reader friendly
// (no flattened screenshot text).

type Row = { icon: LucideIcon; text: string };

const ACTIVATED: Row[] = [
  { icon: Heart, text: "Hjärtat saktar ner, blodtrycket stabiliseras" },
  { icon: Wind, text: "Andningen blir djup och lugn" },
  { icon: Soup, text: "Matsmältningen fungerar optimalt" },
  { icon: Brain, text: "Hjärnan blir klarare, känslor lättare att reglera" },
  { icon: Flower2, text: "Hormoner balanseras – lust och livskraft ökar" },
];

const SUPPRESSED: Row[] = [
  { icon: Heart, text: "Hjärtat slår snabbare, blodtrycket ökar" },
  { icon: Wind, text: "Andningen blir ytlig och snabb" },
  { icon: Soup, text: "Matsmältningen saktar ner eller stannar" },
  { icon: Brain, text: "Hjärnan går i överlevnad, känslor svårare att hantera" },
  { icon: Flower2, text: "Stresshormoner ökar – lusten försvinner" },
];

const METHODS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Wind,
    title: "Förläng utandningen",
    text: "Andas in på 4 sekunder, ut på 6–8. Detta aktiverar kroppens bromspedal.",
  },
  {
    icon: Eye,
    title: "Orientera dig i rummet",
    text: "Låt blicken vandra runt. Din kropp registrerar: ”Det är tryggt här.”",
  },
  {
    icon: HandHeart,
    title: "Berör dig själv",
    text: "En hand på hjärtat, en på magen. Varm, mjuk beröring är en signal om trygghet.",
  },
];

function StateColumn({
  eyebrow,
  heading,
  rows,
  tone,
}: {
  eyebrow: string;
  heading: string;
  rows: Row[];
  tone: "calm" | "alert";
}) {
  const iconWrap =
    tone === "calm"
      ? "bg-secondary text-accent"
      : "bg-primary/10 text-primary/70";
  return (
    <div className="bg-white rounded-[1.5rem] p-6 md:p-7 border border-border/30 shadow-sm">
      <p className="text-[10px] tracking-[0.22em] uppercase text-accent/80 font-bold text-center">
        {eyebrow}
      </p>
      <p className="font-serif italic text-lg text-primary text-center mb-5">{heading}</p>
      <ul className="space-y-4">
        {rows.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3">
            <span className={`mt-0.5 w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconWrap}`}>
              <Icon className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-sm text-primary/75 leading-snug">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VagusnervenInfographic() {
  return (
    <div className="bg-cream/50 rounded-[2rem] p-6 md:p-10 border border-border/30">
      {/* 80% callout */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 text-center sm:text-left">
        <span className="font-serif text-5xl md:text-6xl text-accent leading-none">80%</span>
        <p className="text-sm md:text-base text-primary/75 leading-relaxed max-w-md">
          av signalerna i vagusnerven går <strong className="text-primary">från kroppen till hjärnan</strong>.
          Det betyder att kroppen påverkar hjärnan mer än tvärtom.
        </p>
      </div>

      {/* Two states */}
      <div className="grid gap-4 md:gap-5 md:grid-cols-2">
        <StateColumn
          eyebrow="När vagusnerven är aktiverad"
          heading="Kroppen är i trygghet"
          rows={ACTIVATED}
          tone="calm"
        />
        <StateColumn
          eyebrow="När vagusnerven är hämmad"
          heading="Kroppen är i beredskap"
          rows={SUPPRESSED}
          tone="alert"
        />
      </div>

      {/* Banner quote */}
      <p className="font-serif italic text-lg md:text-xl text-primary text-center leading-snug my-8 max-w-2xl mx-auto">
        Kroppen kan inte samtidigt vara i överlevnad och njutning.
        <br className="hidden sm:block" />
        <span className="text-accent"> Trygghet först. Lust sedan.</span>
      </p>

      {/* Three ways */}
      <p className="text-[10px] tracking-[0.24em] uppercase text-primary/50 font-bold text-center mb-5">
        Tre enkla sätt att aktivera vagusnerven
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {METHODS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="bg-white rounded-[1.25rem] p-5 border border-border/30">
            <span className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center mb-3">
              <Icon className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="font-semibold text-primary text-sm mb-1">{title}</p>
            <p className="text-xs text-primary/70 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
