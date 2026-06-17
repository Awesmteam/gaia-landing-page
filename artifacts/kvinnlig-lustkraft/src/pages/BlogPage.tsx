import { Clock, Headphones, Film, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import {
  PageHeader,
  PageTitle,
  WebinarCta,
  JourneyNav,
  FadeIn,
} from "@/components/webinar-page-shell";
import { VagusnervenInfographic } from "@/components/vagusnerven-infographic";

// D-3 nurture page · full article "Vagusnerven – bron mellan kroppen, känslorna och tryggheten".
// Full text preserved (Gaia Lindroos); infographic recreated natively below.

const LISTS = {
  autonomic: [
    "hjärtslag",
    "andning",
    "matsmältning",
    "immunförsvar",
    "inflammation",
    "blodtryck",
    "hormonreglering",
    "återhämtning",
  ],
  parasympathetic: [
    "hjärtfrekvensen sjunker",
    "blodtrycket stabiliseras",
    "matsmältningen förbättras",
    "inflammation minskar",
    "immunförsvaret fungerar bättre",
    "muskler slappnar av",
    "hormonsystemet balanseras",
  ],
  symptoms: [
    "sömnsvårigheter",
    "spänd käke",
    "ytlig andning",
    "magproblem",
    "trötthet",
    "minskad lust",
    "irritabilitet",
    "känslan av att vara avstängd",
  ],
};

// Reusable bits to keep the article body readable.
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-xl md:text-2xl text-primary mt-9 mb-3 first:mt-0">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base text-primary/75 leading-relaxed mb-4">{children}</p>
);
const Chips = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2 mb-5">
    {items.map((i) => (
      <li
        key={i}
        className="text-xs text-primary/70 bg-secondary/50 border border-border/40 rounded-full px-3 py-1.5"
      >
        {i}
      </li>
    ))}
  </ul>
);
const Pull = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-7 border-l-2 border-accent/50 pl-6">
    <p className="font-serif italic text-xl md:text-2xl text-primary leading-snug">{children}</p>
  </blockquote>
);

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-3xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Artikel · Kroppens biologi"
          title="Vagusnerven – bron mellan kroppen, känslorna och tryggheten"
          subtitle="Varför kvinnlig lust börjar i nervsystemet"
        />

        <FadeIn delay={0.1} className="mt-5 flex items-center justify-center gap-x-5 gap-y-2 flex-wrap text-xs text-primary/55">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" /> 6 minuters läsning
          </span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-primary/30" />
          <span>Av Gaia Lindroos</span>
        </FadeIn>

        {/* Article */}
        <FadeIn delay={0.16} className="mt-10 md:mt-12">
          <article className="bg-white rounded-[2rem] p-7 md:p-12 border border-border/30 shadow-sm">
            <p className="text-base text-primary/75 leading-relaxed mb-4 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:text-accent first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] first-letter:mt-1">
              Under mer än 25 år har jag arbetat med kvinnor och deras kroppar. Och om det är något
              jag gång på gång har sett så är det detta: många kvinnor försöker lösa ett biologiskt
              problem med viljestyrka.
            </p>
            <P>De tänker: ”Jag borde kunna slappna av.” ”Jag borde känna mer lust.” ”Jag borde vara glad – jag har ju ett bra liv.”</P>
            <Pull>Men kroppen fungerar inte genom ”borde”. Kroppen fungerar genom biologi.</Pull>
            <P>Och mitt i denna biologi finns ett av människans mest fascinerande system: vagusnerven.</P>

            <H2>Kroppens största kommunikationssystem</H2>
            <P>
              Vagusnerven är den tionde kranialnerven – Nervus vagus (kranialnerv X) – och är den
              längsta nerven i det autonoma nervsystemet. Det autonoma nervsystemet styr allt det
              vi inte behöver tänka på:
            </P>
            <Chips items={LISTS.autonomic} />
            <P>
              Vi tror ofta att hjärnan styr kroppen. Men neurovetenskapen visar något fascinerande:
              omkring 80 % av signalerna i vagusnerven går från kroppen till hjärnan. Det betyder
              att hjärnan i stor utsträckning lyssnar på kroppen. Din hjärna frågar hela tiden
              kroppen: ”Hur mår vi?” Och kroppen svarar.
            </P>

            <H2>Kroppens säkerhetssystem</H2>
            <P>
              Den amerikanske neurofysiologen Stephen Porges beskriver i polyvagalteorin hur
              nervsystemet ständigt skannar omgivningen efter säkerhet eller fara. Denna process
              sker omedvetet och kallas neuroception.
            </P>
            <Pull>Du tänker inte: ”Är jag trygg?” Din kropp känner det. Varje sekund. Hela livet.</Pull>
            <P>
              När vagusnerven registrerar trygghet aktiveras det parasympatiska nervsystemet –
              kroppens läkningsläge. Då sker bland annat detta:
            </P>
            <Chips items={LISTS.parasympathetic} />
            <P>Det är här kroppen läker. Och det är här lust kan uppstå.</P>

            <H2>Kvinnlig lust är en biologisk process</H2>
            <P>
              Många tror att lust uppstår i huvudet. Men forskning visar att kvinnlig sexualitet är
              djupt kopplad till nervsystemets upplevelse av trygghet. När kroppen känner sig säker
              frisätts bland annat <strong>oxytocin</strong> (anknytningens och närhetens hormon),
              <strong> dopamin</strong> (motivationens och njutningens signalsubstans) och
              <strong> serotonin</strong> (välbefinnandets signalsubstans).
            </P>
            <P>
              Samtidigt ökar blodflödet till bäckenet och könsorganen. Kroppen öppnar sig – både
              bokstavligt och bildligt. Men om kroppen uppfattar fara sker motsatsen.
            </P>

            <H2>Stress och lust använder samma energisystem</H2>
            <P>
              Här kommer ett viktigt aha: kroppen kan inte samtidigt vara i överlevnad och i djup
              njutning. När stressystemet aktiveras frisätts kortisol, adrenalin och noradrenalin.
              Blodet omfördelas då bort från matsmältning, reproduktion och långsiktig läkning.
              Istället prioriteras muskler, vaksamhet och reaktionsförmåga.
            </P>
            <P>
              Biologiskt sett förbereder sig kroppen på att fly, kämpa eller frysa. Och en kropp som
              förbereder sig för överlevnad prioriterar inte sexualitet.
            </P>
            <Pull>Det är inte ett fel. Det är evolution.</Pull>

            <H2>Därför kan en stark kvinna tappa kontakten med sig själv</H2>
            <P>
              Många kvinnor lever åratal i hög funktion: de arbetar, tar ansvar, bär familjen,
              håller ihop relationer, fungerar utåt. Men nervsystemet kan samtidigt leva i kronisk
              aktivering. Med tiden blir detta kroppens nya normalläge. Man vänjer sig vid stress.
              Men kroppen vänjer sig aldrig helt. Det kan visa sig som:
            </P>
            <Chips items={LISTS.symptoms} />
            <P>
              Kroppen säger inte: ”Det är något fel på dig.” Kroppen säger: ”Jag har burit för
              mycket för länge.”
            </P>

            <H2>Vagusnerven och känslor</H2>
            <P>
              Känslor är inte bara tankar. Känslor är biologiska tillstånd i kroppen. När
              vagusnerven fungerar väl blir det lättare att reglera känslor, känna kontakt med
              andra, återhämta sig efter stress och växla mellan aktivitet och vila.
            </P>
            <P>
              När vagusnerven är belastad kan det istället bli svårare att känna glädje, lust,
              trygghet och kontakt med sig själv. Det betyder inte att du är svag. Det betyder att
              ditt nervsystem arbetar hårt.
            </P>

            <H2>Den goda nyheten: nervsystemet är formbart</H2>
            <P>
              Hjärnan och nervsystemet förändras genom hela livet. Det kallas neuroplasticitet.
              Precis som muskler kan tränas kan nervsystemet tränas. Varje gång du andas långsamt,
              känner trygg beröring, upplever kontakt, vilar djupt eller känner dig sedd och trygg,
              skickar du nya signaler genom vagusnerven. Kroppen lär sig gradvis: ”Det är tryggt nu.”
            </P>
            <Pull>Lusten återvänder. Energin vaknar. Livskraften börjar röra sig igen – inte genom kamp, utan genom trygghet.</Pull>
            <P>
              För kanske är den viktigaste frågan inte ”Hur får jag tillbaka min lust?” Kanske är
              frågan: ”Hur hjälper jag min kropp att känna sig trygg igen?”
            </P>
            <p className="font-serif italic text-primary/70 mt-8">Med värme, Gaia Lindroos</p>
          </article>
        </FadeIn>

        {/* Native infographic */}
        <FadeIn delay={0.22} className="mt-10">
          <p className="text-[10px] tracking-[0.28em] uppercase text-primary/45 font-bold mb-4 text-center">
            Vagusnerven · en överblick
          </p>
          <VagusnervenInfographic />
        </FadeIn>

        {/* Cross-links to podcast & video */}
        <FadeIn delay={0.3} className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link
            href="/podcast"
            className="group flex items-center gap-4 bg-white rounded-[1.5rem] p-5 border border-border/30 shadow-sm hover:border-accent/40 transition-colors"
          >
            <span className="w-11 h-11 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] uppercase text-accent/80 font-bold">
                Podcast · 8 min
              </span>
              <span className="block font-serif text-primary leading-tight">Den stilla tomheten</span>
            </span>
            <ArrowRight className="w-4 h-4 text-primary/40 ml-auto group-hover:text-accent transition-colors" aria-hidden="true" />
          </Link>
          <Link
            href="/video"
            className="group flex items-center gap-4 bg-white rounded-[1.5rem] p-5 border border-border/30 shadow-sm hover:border-accent/40 transition-colors"
          >
            <span className="w-11 h-11 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0">
              <Film className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] uppercase text-accent/80 font-bold">
                Video · 10 min
              </span>
              <span className="block font-serif text-primary leading-tight">Trygghetsövningen</span>
            </span>
            <ArrowRight className="w-4 h-4 text-primary/40 ml-auto group-hover:text-accent transition-colors" aria-hidden="true" />
          </Link>
        </FadeIn>

        <JourneyNav current="blogg" />
        <WebinarCta lead="Det är precis detta vi arbetar med på webbinariet:" label="Boka din plats" />
      </main>
    </div>
  );
}
