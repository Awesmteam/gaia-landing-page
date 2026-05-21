import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, Flower2, Sparkles } from "lucide-react";

import speakerImg from "@/assets/image_1778316645808.png";
import quoteImg from "@/assets/image_1778316613497.png";
import bioImg from "@/assets/image_1778315729204.png";
import bioImg2 from "@/assets/image_1778315750725.png";
import accentImg from "@/assets/image_1778316635107.png";
import {
  WEBINAR_DATE,
  WEBINAR_DATE_SHORT,
  WEBINAR_TIME,
  WEBINAR_TIMEZONE_LABEL,
  WEBINAR_LOCATION_PUBLIC,
  WEBINAR_TARGET_ISO,
} from "@/lib/webinar";
import { Countdown } from "@/components/Countdown";
import { RegistrationPopup } from "@/components/RegistrationPopup";
import { useAttribution } from "@/lib/attribution";

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
  useAttribution();
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const CtaButton = ({
    children = "Ja, anmäl mig till webinaret",
    className = "",
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={openPopup}
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-8 py-4 text-base font-semibold tracking-wide shadow-md hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 ${className}`}
    >
      <span>{children}</span>
      <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
        <ArrowRight className="w-4 h-4" />
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header — slim, centered, distinct from sales page pill nav */}
      <header className="border-b border-border/50 bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-base tracking-[0.22em] uppercase text-primary">
              Kvinnlig Lustkraft
            </span>
            <span className="font-serif italic text-primary/60 text-sm hidden sm:inline-block">
              med Gaia
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openPopup}
              className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Anmäl dig
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — editorial poster: centered headline anchored by a large
            circular portrait of Gaia, with two tilted polaroid satellites */}
        <section className="relative px-6 pt-10 md:pt-16 pb-14 md:pb-20 overflow-hidden">
          {/* soft accent blobs */}
          <div
            className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-secondary/70 blur-3xl pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute top-40 -right-40 w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl pointer-events-none"
            aria-hidden
          />

          <div className="relative max-w-5xl mx-auto">
            {/* Polaroid satellites — desktop only, asymmetric placement */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -7 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block absolute left-0 top-24 z-10 w-[180px] origin-bottom-right"
              aria-hidden
            >
              <div className="relative bg-white p-2.5 pb-10 rounded-md shadow-xl">
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-secondary/40">
                  <img
                    src={bioImg2}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center font-serif italic text-primary/70 text-sm">
                  närvaro
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="hidden lg:block absolute right-2 top-44 z-10 w-[170px] origin-bottom-left"
              aria-hidden
            >
              <div className="relative bg-white p-2.5 pb-10 rounded-md shadow-xl">
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-secondary/40">
                  <img
                    src={quoteImg}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center font-serif italic text-primary/70 text-sm">
                  hemkomst
                </p>
              </div>
            </motion.div>

            {/* Center editorial column */}
            <div className="relative z-20 max-w-3xl mx-auto text-center">
              {/* Magazine masthead row */}
              <FadeIn>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="hidden sm:block h-px w-12 bg-primary/25" aria-hidden />
                  <div className="inline-flex items-center gap-2 bg-white border border-border/60 text-primary text-[11px] font-bold tracking-[0.24em] uppercase rounded-full px-4 py-2 shadow-sm">
                    <Flower2 className="w-3.5 h-3.5 text-accent" />
                    <span>Gratis live-webinar</span>
                    <span className="w-1 h-1 rounded-full bg-primary/30" aria-hidden />
                    <span className="font-mono tracking-normal">{WEBINAR_DATE_SHORT}</span>
                  </div>
                  <span className="hidden sm:block h-px w-12 bg-primary/25" aria-hidden />
                </div>
              </FadeIn>

              {/* Headline line 1 */}
              <FadeIn delay={0.05}>
                <h1 className="font-serif text-primary text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.02] tracking-tight">
                  Din kropp vet vägen.
                </h1>
              </FadeIn>

              {/* Circular portrait — anchor of the composition */}
              <FadeIn delay={0.15}>
                <div className="relative my-8 md:my-10 mx-auto w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px]">
                  {/* decorative ring */}
                  <div
                    className="absolute -inset-3 rounded-full border border-accent/25"
                    aria-hidden
                  />
                  <div
                    className="absolute -inset-6 rounded-full border border-primary/10"
                    aria-hidden
                  />
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-secondary/60 shadow-[0_30px_60px_-20px_rgba(40,60,55,0.35)] ring-4 ring-white">
                    <img
                      src={speakerImg}
                      alt="Gaia Lindroos"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Mobile/tablet polaroid overlays — magazine layered feel */}
                  <div
                    className="lg:hidden absolute -left-10 sm:-left-14 -bottom-4 w-[88px] sm:w-[100px] -rotate-[10deg] z-0"
                    aria-hidden
                  >
                    <div className="relative bg-white p-1.5 pb-6 rounded-sm shadow-xl">
                      <div className="aspect-[3/4] overflow-hidden bg-secondary/40">
                        <img
                          src={bioImg2}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <p className="absolute bottom-1 left-0 right-0 text-center font-serif italic text-primary/70 text-[10px]">
                        närvaro
                      </p>
                    </div>
                  </div>

                  <div
                    className="lg:hidden absolute -right-10 sm:-right-14 -top-4 w-[82px] sm:w-[94px] rotate-[8deg] z-0"
                    aria-hidden
                  >
                    <div className="relative bg-white p-1.5 pb-6 rounded-sm shadow-xl">
                      <div className="aspect-[3/4] overflow-hidden bg-secondary/40">
                        <img
                          src={quoteImg}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <p className="absolute bottom-1 left-0 right-0 text-center font-serif italic text-primary/70 text-[10px]">
                        hemkomst
                      </p>
                    </div>
                  </div>

                  {/* "Med Gaia" sticker */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full px-4 py-1.5 shadow-lg flex items-baseline gap-1.5 whitespace-nowrap z-10">
                    <span className="text-[9px] tracking-[0.22em] uppercase font-bold opacity-70">
                      Med
                    </span>
                    <span className="font-serif italic text-base leading-none">Gaia</span>
                  </div>
                </div>
              </FadeIn>

              {/* Headline line 2 wraps under the portrait */}
              <FadeIn delay={0.2}>
                <p className="font-serif italic font-light text-accent text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                  Återväck din lust
                  <br className="sm:hidden" />
                  <span className="sm:ml-3">och livskraft.</span>
                </p>
              </FadeIn>

              {/* Sub */}
              <FadeIn delay={0.28}>
                <p className="font-serif italic text-primary/75 text-lg md:text-xl max-w-xl mx-auto leading-snug mt-7 mb-9">
                  Ett gratis webinar för dig som längtar efter att känna dig
                  levande, sedd och närvarande – i din kropp, i dina relationer
                  och i ditt liv.
                </p>
              </FadeIn>

              {/* Countdown overlapping the lower poster */}
              <FadeIn delay={0.36}>
                <p className="text-[11px] tracking-[0.28em] uppercase text-primary/60 font-semibold mb-4">
                  Webbinariet startar om
                </p>
                <Countdown targetIso={WEBINAR_TARGET_ISO} className="mb-9" />
              </FadeIn>

              {/* CTA */}
              <FadeIn delay={0.44}>
                <CtaButton />
                <p className="text-xs text-primary/50 mt-4">
                  100% kostnadsfritt · Inga förkunskaper behövs
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Date/time row */}
        <section className="px-4 md:px-8 max-w-5xl mx-auto pb-16 md:pb-20">
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
                  className="w-full h-full object-cover object-top"
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

        {/* COUNTDOWN BAND — dark, restating urgency */}
        <section className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <FadeIn>
            <div className="relative rounded-[2.5rem] overflow-hidden bg-primary text-white p-10 md:p-14 text-center">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `url(${accentImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" aria-hidden />

              <div className="relative">
                <span className="text-white/70 text-xs font-bold tracking-[0.22em] uppercase block mb-4">
                  Reservera din plats
                </span>
                <h2 className="font-serif text-3xl md:text-5xl mb-3 leading-tight">
                  Det börjar snart
                </h2>
                <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
                  {WEBINAR_DATE} kl. {WEBINAR_TIME} {WEBINAR_TIMEZONE_LABEL}.
                  Platserna är begränsade.
                </p>
                <Countdown targetIso={WEBINAR_TARGET_ISO} variant="dark" className="mb-10" />
                <CtaButton className="!bg-white !text-primary hover:!bg-white/90">
                  <span className="mr-1">Ja, anmäl mig till webinaret</span>
                </CtaButton>
              </div>
            </div>
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
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-md hidden md:block bg-secondary/40">
                <img
                  src={bioImg}
                  alt="Gaia leder grupp"
                  className="w-full h-full object-cover object-top"
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

                <div className="my-10 rounded-[1.75rem] overflow-hidden aspect-[16/10] bg-secondary/40">
                  <img
                    src={bioImg2}
                    alt="Gaia i närvaro"
                    className="w-full h-full object-cover object-top"
                  />
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

                <div className="mt-10">
                  <CtaButton />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 text-center">
          <Sparkles className="w-5 h-5 text-accent mx-auto mb-4" />
          <p className="font-serif italic text-primary/70 text-lg mb-2">Vi ses snart.</p>
          <p className="font-serif text-primary text-xl">Kram, Gaia</p>
        </footer>
      </main>

      {/* Sticky bottom CTA bar with mini countdown */}
      <div className="fixed bottom-0 inset-x-0 z-30 border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60 font-semibold">
              Startar om
            </p>
            <Countdown
              targetIso={WEBINAR_TARGET_ISO}
              variant="compact"
              className="text-primary"
            />
          </div>
          <button
            type="button"
            onClick={openPopup}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-accent text-white px-5 py-2.5 text-sm font-semibold shadow-md"
          >
            Anmäl dig
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <RegistrationPopup open={popupOpen} onClose={closePopup} />
    </div>
  );
}
