import { Wind, Eye, HandHeart, Heart, CheckCircle2 } from "lucide-react";
import {
  PageHeader,
  PageTitle,
  WebinarCta,
  FadeIn,
  useJourneyGate,
  JourneyLocked,
} from "@/components/webinar-page-shell";

// D-4 nurture page · "Trygghetsövningen" — guided ~10 min video (Vimeo).
const VIMEO_VIDEO_ID = "1201953714";

const STEPS = [
  {
    icon: Eye,
    label: "Del 1 · ca 2,5 min",
    title: "Orientering",
    text: "Låt blicken långsamt vandra runt i rummet, utan brådska. Du berättar något konkret för ditt nervsystem: ”Se. Här finns ingen fara. Jag är trygg just nu.” Stanna gärna vid något som känns vackert att se på.",
  },
  {
    icon: Wind,
    label: "Del 2 · ca 3 min",
    title: "Förlängd utandning",
    text: "Andas in genom näsan på fyra – ut genom munnen på sex, som genom ett sugrör. Den långa utandningen är det vagusnerven älskar: den signalerar att du kan slappna av, att det inte finns något du behöver fly ifrån.",
  },
  {
    icon: HandHeart,
    label: "Del 3 · ca 2 min",
    title: "Hand på hjärta och mage",
    text: "Lägg en hand på hjärtat och en på magen. Känn värmen. Beröring är en av kroppens äldsta trygghetssignaler – och den fungerar lika fint när den kommer från dig själv. Andas vidare, lugnt, under dina händer.",
  },
  {
    icon: Heart,
    label: "Del 4 · ca 1 min",
    title: "Integration och avslutning",
    text: "Känn efter på nytt, precis som i början: hur känns kroppen nu jämfört med för tio minuter sedan? Kanske är skillnaden stor, kanske liten. Båda är helt rätt. Det handlar inte om att prestera en känsla – utan om att ge kroppen en ny erfarenhet av trygghet.",
  },
];

const AFFIRMATIONS = [
  "Jag är trygg just nu.",
  "Jag behöver inte kämpa längre.",
  "Det är tryggt för mig att slappna av här.",
];

const BENEFITS = [
  "En kropp som känner sig lite lugnare och mjukare efteråt.",
  "Djupare andetag, lägre axlar och mindre inre stress.",
  "En konkret upplevelse av vad ”trygghet i kroppen” faktiskt betyder.",
];

export default function VideoPage() {
  const unlocked = useJourneyGate("video");
  if (!unlocked) {
    return (
      <JourneyLocked pageKey="video" eyebrow="Video · D-4" title="Trygghetsövningen" />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-5xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Din övning · 10 minuter"
          title="Trygghetsövningen"
          subtitle="En enkel övning som börjar lugna ditt nervsystem – redan innan vi ses."
        />

        {/* Video — the hero of the page */}
        <FadeIn delay={0.15} className="mt-10 md:mt-12">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-5 sm:p-8 md:p-10 shadow-xl">
            <div
              className="pointer-events-none absolute -bottom-16 -left-12 w-56 h-56 rounded-full bg-accent/25 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid md:grid-cols-[1fr_300px] gap-7 md:gap-10 items-center">
              <div className="text-white order-2 md:order-1 text-center md:text-left">
                <p className="text-[11px] tracking-[0.22em] uppercase text-white/60 font-bold mb-3">
                  Guidad övning · 10 min
                </p>
                <p className="font-serif text-2xl md:text-4xl leading-tight mb-4">
                  Tryck på play och låt kroppen få landa
                </p>
                <p className="text-sm md:text-base text-white/65 leading-relaxed max-w-sm mx-auto md:mx-0">
                  Sätt på hörlurar om du kan, slut ögonen mellan stegen och följ Gaias röst.
                  Du behöver inte göra något ”rätt” – bara vara med.
                </p>
              </div>
              <div className="order-1 md:order-2 mx-auto w-full max-w-[300px]">
                <div
                  className="relative w-full rounded-[1.5rem] overflow-hidden shadow-2xl ring-1 ring-white/15 bg-black"
                  style={{ paddingTop: "177.78%" }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    title="Trygghetsövningen"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Intro framing */}
        <FadeIn delay={0.22} className="mt-14 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-5 leading-snug">
            Inte mer att göra – utan ett annat sätt att vara
          </h2>
          <p className="text-base md:text-lg text-primary/80 leading-relaxed">
            Om du har provat allt – mer träning, mer terapi, mer självkärlek, positivt tänkande –
            och ändå känner att kroppen inte följer med, så vill jag ge dig något annat. Den här
            övningen arbetar direkt med vagusnerven, kroppens trygghetsnerv. När den känner trygghet
            lugnar hela nervsystemet ner sig, och kroppen kan äntligen släppa lite av den beredskap
            den burit så länge.
          </p>
        </FadeIn>

        {/* Four steps */}
        <FadeIn delay={0.28} className="mt-14">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8 text-center">
            Så går övningen till
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {STEPS.map(({ icon: Icon, label, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-[1.5rem] p-6 md:p-7 border border-border/30 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-accent/80 font-bold mb-1">
                  {label}
                </p>
                <h3 className="font-serif text-lg md:text-xl text-primary mb-2">{title}</h3>
                <p className="text-sm md:text-base text-primary/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Affirmations */}
        <FadeIn delay={0.34} className="mt-14">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary text-white p-8 md:p-12 shadow-xl text-center">
            <div
              className="pointer-events-none absolute -top-16 -right-12 w-56 h-56 rounded-full bg-accent/25 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-[11px] tracking-[0.22em] uppercase text-white/60 font-bold mb-6">
                Säg orden tyst inom dig – som till någon du älskar
              </p>
              <div className="space-y-4 max-w-xl mx-auto">
                {AFFIRMATIONS.map((a) => (
                  <p
                    key={a}
                    className="font-serif italic text-xl md:text-2xl leading-snug"
                  >
                    ”{a}”
                  </p>
                ))}
              </div>
              <p className="text-white/70 leading-relaxed max-w-xl mx-auto mt-7 text-sm md:text-base">
                Du behöver inte tro fullt ut på orden ännu. Kroppen lär genom upprepning, inte genom
                övertygelse. Det räcker att du säger dem.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Benefits */}
        <FadeIn delay={0.4} className="mt-14 max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">
            Det du får ut av övningen
          </h2>
          <ul className="space-y-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-4 text-primary/80 leading-relaxed">
                <span className="mt-1 shrink-0 text-accent">
                  <CheckCircle2 className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <span className="text-base md:text-lg">{b}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.44} className="mt-12 text-center">
          <p className="font-serif italic text-primary/65 text-lg max-w-2xl mx-auto leading-snug">
            Gör gärna övningen varje kväll fram till webbinariet. Tio minuter – en liten gåva till
            ditt nervsystem. Ju oftare du gör den, desto mer lär sig kroppen att det är tryggt.
          </p>
        </FadeIn>

        <WebinarCta />
      </main>
    </div>
  );
}
