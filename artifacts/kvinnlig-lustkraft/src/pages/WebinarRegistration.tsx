import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, Flower2 } from "lucide-react";

import heroImg from "@/assets/image_1778316635107.png";
import speakerImg from "@/assets/image_1778316645808.png";
import quoteImg from "@/assets/image_1778316613497.png";
import bioImg from "@/assets/image_1778315729204.png";
import bioImg2 from "@/assets/image_1778315750725.png";
import {
  WEBINAR_DATE,
  WEBINAR_TIME,
  WEBINAR_TIMEZONE_LABEL,
  WEBINAR_LOCATION_PUBLIC,
} from "@/lib/webinar";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const CtaButton = ({
  children = "Ja, anmäl mig till webinaret",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <a
    href="#anmal"
    className={`group inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-8 py-4 text-base font-semibold tracking-wide shadow-md hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 ${className}`}
  >
    <span>{children}</span>
    <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
      <ArrowRight className="w-4 h-4" />
    </span>
  </a>
);

const DateTimeBlock = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
    {[
      { icon: Calendar, label: "Datum", value: WEBINAR_DATE },
      { icon: Clock, label: "Tid", value: `${WEBINAR_TIME} ${WEBINAR_TIMEZONE_LABEL}` },
      { icon: MapPin, label: "Plats", value: WEBINAR_LOCATION_PUBLIC },
    ].map(({ icon: Icon, label, value }) => (
      <div
        key={label}
        className="bg-white rounded-2xl p-5 border border-border/40 shadow-sm flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" strokeWidth={1.6} />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-primary/60 font-semibold mb-1">
            {label}
          </p>
          <p className="font-serif text-primary text-lg leading-tight">{value}</p>
        </div>
      </div>
    ))}
  </div>
);

export default function WebinarRegistration() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Skriv ditt förnamn.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Skriv en giltig e-postadress.");
      return;
    }
    setError(null);
    setSubmitting(true);
    setTimeout(() => navigate("/webinar/tack"), 300);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 p-4">
        <div className="mx-auto max-w-5xl bg-white/85 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-base tracking-widest uppercase text-primary">
              Kvinnlig Lustkraft
            </span>
            <span className="font-serif italic text-primary/70 text-sm hidden sm:inline-block">
              med Gaia
            </span>
          </Link>
          <a
            href="#anmal"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent text-white px-5 py-2 text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            Anmäl dig
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto">
          <FadeIn>
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[4/5] md:aspect-[16/10] lg:aspect-[21/10] bg-secondary">
              <img
                src={heroImg}
                alt="Kvinnor i nära närvaro"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/45 to-primary/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />

              <div className="absolute top-5 left-5 md:top-7 md:left-7 z-10">
                <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-primary text-xs md:text-sm font-bold tracking-[0.22em] uppercase rounded-full px-4 py-2 shadow-lg">
                  <Flower2 className="w-3.5 h-3.5 text-accent" />
                  Gratis webinar
                </span>
              </div>

              <div className="hidden md:flex absolute top-7 right-7 z-10 flex-col items-end text-white/90 text-[10px] tracking-[0.3em] uppercase font-semibold leading-tight">
                <span>Med</span>
                <span className="font-serif italic text-lg tracking-normal normal-case mt-1">
                  Gaia
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-14 text-white">
                <h1 className="font-serif leading-[1.0] tracking-tight text-white text-4xl md:text-6xl lg:text-7xl mb-5 md:mb-6 max-w-4xl">
                  Din kropp vet vägen.{" "}
                  <span className="italic font-light">
                    Återväck din lust och livskraft.
                  </span>
                </h1>
                <p className="font-serif italic text-white/95 text-lg md:text-2xl leading-snug max-w-3xl mb-6 md:mb-8">
                  Ett gratis webinar för dig som längtar efter att känna dig levande, sedd
                  och närvarande – i din kropp, i dina relationer och i ditt liv.
                </p>
                <CtaButton />
              </div>
            </div>
          </FadeIn>
        </section>

        {/* DATE/TIME bar (top of fold) */}
        <section className="px-4 md:px-8 max-w-6xl mx-auto pb-16 md:pb-20">
          <FadeIn>
            <DateTimeBlock />
          </FadeIn>
        </section>

        {/* PROBLEM */}
        <section className="py-20 md:py-24 px-6 md:px-12 bg-white rounded-[3rem] mx-4 md:mx-8 mb-8 md:mb-12 shadow-sm border border-border/30">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <span className="text-accent text-xs font-bold tracking-[0.22em] uppercase block mb-4">
                Det du bär på
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-8">
                Jag vet hur det känns.
              </h2>
              <div className="space-y-5 text-lg text-primary/80 leading-relaxed">
                <p>Du har egentligen allt. Partner, familj, ett liv som fungerar.</p>
                <p>
                  Men på kvällen, när du lägger dig, så känner du det. Något fattas. Något
                  har försvunnit någonstans på vägen.
                </p>
                <p className="font-serif italic text-xl text-primary">
                  Du vet inte riktigt när det hände.
                </p>
                <p>
                  Kanske var det efter barnen. Kanske efter alla år av att ställa upp,
                  fixa, ta hand om alla andra.
                </p>
                <p className="font-serif italic text-xl text-primary">
                  Nu ligger du där. Bredvid din partner. Och känner dig ändå helt ensam.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* PAIN BULLETS */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
              Känner du igen det här?
            </h2>
          </FadeIn>
          <FadeIn>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Du gör allt för andra – men ingen ser dig på riktigt",
                "Din man är där, men han är inte närvarande",
                "Fredagsmyset har blivit en rutin som alla andra",
                "Du längtar efter något, men du vet inte vad",
                'Du tänker "jag som har det så bra, jag borde inte klaga"',
                "Du har köpt nya saker, bokat resor, försökt fylla tomheten – men ingenting hjälper",
                "Du känner dig ensam, även när du har folk runt dig hela tiden",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-border/40 shadow-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                  <span className="text-primary/85 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 max-w-2xl mx-auto text-center space-y-4 text-lg text-primary/80">
              <p>
                Kanske har du pratat med någon om det. Läkare. Terapeut. Och fått höra att
                det är klimakteriet. Att det är normalt.
              </p>
              <p>Att du bara får acceptera det.</p>
              <p className="font-serif italic text-2xl md:text-3xl text-primary pt-4">
                Men vet du vad?
                <br />
                Det är inte sant.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* PROMISE */}
        <section className="py-20 md:py-24 px-6 md:px-12 bg-secondary rounded-[3rem] mx-4 md:mx-8 mb-8 md:mb-12 shadow-sm">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <FadeIn className="lg:col-span-5">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg">
                <img
                  src={quoteImg}
                  alt="Kvinna i mjuk närvaro"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>

            <div className="lg:col-span-7">
              <FadeIn>
                <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight mb-6">
                  Det finns en väg tillbaka.{" "}
                  <span className="italic">Och den är enklare än du tror.</span>
                </h2>
                <div className="space-y-5 text-lg text-primary/80 leading-relaxed mb-8">
                  <p>
                    Din kropp har inte glömt. Livskraften finns fortfarande där – den har
                    bara blivit gömd under alla lager av stress, rutiner och att ta hand
                    om alla andra än dig själv.
                  </p>
                  <p>
                    Du behöver inte förändra hela ditt liv. Du behöver inte övertala din
                    partner. Du behöver inte bli någon annan.
                  </p>
                  <p className="font-serif italic text-2xl text-primary">
                    Du behöver bara komma hem till dig själv.
                  </p>
                  <p>
                    I det här webinaret visar jag dig hur. Jag delar med mig av det jag
                    själv fick lära mig – det som förändrade allt för mig. Och som har
                    hjälpt hundratusentals kvinnor att hitta tillbaka till sin livskraft,
                    sin kropp och sitt liv.
                  </p>
                </div>

                <blockquote className="font-serif italic text-xl md:text-2xl text-primary border-l-2 border-accent/40 pl-6 mb-10">
                  "Det här handlar inte bara om lust. Det handlar om att få känna sig
                  levande igen. Att bli sedd. Att våga ta plats i sitt eget liv."
                </blockquote>

                <CtaButton />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* DATE/TIME RESTATED */}
        <section className="py-16 md:py-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
          <FadeIn>
            <span className="text-accent text-xs font-bold tracking-[0.22em] uppercase block mb-4">
              Boka tiden
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10">
              Datum och tid för webbinariet
            </h2>
            <DateTimeBlock className="mb-10 text-left" />
            <CtaButton />
          </FadeIn>
        </section>

        {/* CURRICULUM */}
        <section className="py-20 md:py-24 px-6 md:px-12 bg-white rounded-[3rem] mx-4 md:mx-8 mb-8 md:mb-12 shadow-sm border border-border/30">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-12 md:mb-16">
              <span className="text-accent text-xs font-bold tracking-[0.22em] uppercase block mb-4">
                I webinaret
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
                I webinaret kommer jag att visa dig:
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                {
                  title: "Varför ingenting du provat har fungerat",
                  body: "Det är inte klimakteriet. Det är inte din partner. Det är inte att det är något fel på dig. Jag förklarar vad som faktiskt händer – och varför det kan vändas.",
                },
                {
                  title: "Att din kropp redan vet vägen",
                  body: "Det är lite som att köra bil. När du väl har lärt dig, glömmer du det aldrig. Körkortet är redan på plats – du har bara glömt att kroppen vet. Jag visar dig hur du påminner den.",
                },
                {
                  title: "Hur du kan börja komma hem till dig själv",
                  body: "Du får med dig något konkret som du kan göra direkt efteråt. Inte teori. Inte fluff. Något som faktiskt fungerar.",
                },
                {
                  title: "Att det här är din resa – och den börjar med dig",
                  body: "Du behöver inte dra med din partner. Du behöver inte förklara för någon. Det här är för dig. Och bara dig.",
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="bg-secondary/60 rounded-[1.75rem] p-7 md:p-8 h-full border border-border/40">
                    <div className="text-2xl mb-4" aria-hidden>🌸</div>
                    <h3 className="font-serif text-xl md:text-2xl text-primary leading-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-primary/75 leading-relaxed">{item.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="text-center">
              <CtaButton />
            </FadeIn>
          </div>
        </section>

        {/* SPEAKER */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg mb-5">
                <img
                  src={speakerImg}
                  alt="Gaia Lindroos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-md hidden md:block">
                <img
                  src={bioImg}
                  alt="Gaia leder grupp"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>

            <div className="lg:col-span-7">
              <FadeIn>
                <span className="text-accent text-xs font-bold tracking-[0.22em] uppercase block mb-4">
                  Om mig
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-8">
                  Vem är jag?
                </h2>
                <div className="space-y-5 text-lg text-primary/80 leading-relaxed">
                  <p>
                    Jag heter Gaia Lindroos. Jag har jobbat med personlig utveckling
                    sedan 1999 och skrivit över 400 ljudböcker.
                  </p>
                  <p className="font-serif italic text-xl text-primary">
                    Men det viktigaste är inte vad jag har gjort. Det är vem jag är.
                  </p>
                  <p>
                    Jag har varit gift i 34 år. Jag är mormor. Och jag lever det jag lär
                    – fri, kärleksfull och levande.
                  </p>
                  <p>
                    Folk frågar mig hur det är möjligt. Att ha passionen kvar. Att känna
                    sig fri och samtidigt vara djupt rotad i familj och relation.
                  </p>
                </div>

                <div className="my-10 rounded-[1.75rem] overflow-hidden aspect-[16/10] md:hidden">
                  <img src={bioImg2} alt="Gaia i närvaro" className="w-full h-full object-cover" />
                </div>
                <div className="my-10 rounded-[1.75rem] overflow-hidden aspect-[16/9] hidden md:block">
                  <img src={bioImg2} alt="Gaia i närvaro" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-5 text-lg text-primary/80 leading-relaxed mb-10">
                  <p>
                    Sanningen? Jag stod en gång precis där du står nu. Jag trodde att
                    tantra bara var för sexuellt frustrerade människor. Jag skickade mina
                    vänner på kurs i tio år innan jag själv vågade.
                  </p>
                  <p className="font-serif italic text-xl text-primary">
                    Men när jag väl gick – då kom jag hem. På riktigt.
                  </p>
                  <p>
                    Det är det jag vill visa dig. Inte för att du ska bli som jag. Utan
                    för att du ska få tillgång till dig.
                  </p>
                </div>

                <blockquote className="font-serif italic text-xl md:text-2xl text-primary bg-secondary/60 border-l-2 border-accent/40 pl-6 pr-6 py-6 rounded-r-2xl">
                  "Det finns ingen som gör det så tryggt och säkert som Gaia. Jag har
                  aldrig upplevt något liknande."
                  <footer className="not-italic mt-4 text-sm tracking-[0.2em] uppercase text-primary/60 font-semibold">
                    — Kursdeltagare
                  </footer>
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* REGISTRATION FORM */}
        <section
          id="anmal"
          className="py-20 md:py-28 px-6 md:px-12 bg-primary rounded-[3rem] mx-4 md:mx-8 mb-12 shadow-lg scroll-mt-24"
        >
          <div className="max-w-2xl mx-auto text-center text-white">
            <FadeIn>
              <span className="text-white/70 text-xs font-bold tracking-[0.22em] uppercase block mb-4">
                Anmäl dig nu — kostnadsfritt
              </span>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-4">
                Ja, jag vill vara med
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
                Fyll i ditt namn och e-post så får du länken till webinaret direkt på
                mejlen.
              </p>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[1.75rem] p-6 md:p-8 text-left shadow-xl space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold tracking-[0.18em] uppercase text-primary/60 mb-2"
                  >
                    Förnamn
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ditt förnamn"
                    className="w-full bg-secondary/40 border border-border/60 rounded-full px-5 py-3.5 text-primary placeholder:text-primary/40 focus:outline-none focus:border-accent focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold tracking-[0.18em] uppercase text-primary/60 mb-2"
                  >
                    E-post
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@epost.se"
                    className="w-full bg-secondary/40 border border-border/60 rounded-full px-5 py-3.5 text-primary placeholder:text-primary/40 focus:outline-none focus:border-accent focus:bg-white transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-8 py-4 text-base font-semibold tracking-wide shadow-md hover:bg-accent/90 transition-colors disabled:opacity-60"
                >
                  <span>
                    {submitting ? "Skickar…" : "Ja, anmäl mig till webinaret"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-primary/50 text-center pt-2">
                  Genom att anmäla dig godkänner du att vi mejlar dig om webinaret.
                </p>
              </form>

              <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/70 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {WEBINAR_DATE}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {WEBINAR_TIME} {WEBINAR_TIMEZONE_LABEL}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Online
                </span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 text-center">
          <p className="font-serif italic text-primary/70 text-lg mb-2">Vi ses snart.</p>
          <p className="font-serif text-primary text-xl">Kram, Gaia</p>
          <div className="mt-8">
            <Link
              href="/"
              className="text-sm tracking-[0.2em] uppercase text-primary/60 hover:text-accent transition-colors"
            >
              Tillbaka till Kvinnlig Lustkraft
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
