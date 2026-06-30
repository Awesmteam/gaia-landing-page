import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Check, Heart } from "lucide-react";
import { PAYMENT_LINK } from "@/lib/webinar";
import { TestimonialsGrid } from "@/components/Testimonials";
import { TESTIMONIALS } from "@/lib/testimonials";
import gaiaPortraitImg from "@/assets/image_1778315729204.png";

const TIMER_DURATION_SECONDS = 20 * 60;
const TIMER_STORAGE_KEY = "kl_checkout_timer_start_v1";

function useCheckoutCountdown() {
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (typeof window === "undefined") return TIMER_DURATION_SECONDS;
    try {
      const stored = window.sessionStorage.getItem(TIMER_STORAGE_KEY);
      const startMs = stored ? Number(stored) : NaN;
      if (Number.isFinite(startMs)) {
        const elapsed = Math.floor((Date.now() - startMs) / 1000);
        const remaining = TIMER_DURATION_SECONDS - elapsed;
        return Math.max(0, remaining);
      }
    } catch {
      // ignore
    }
    return TIMER_DURATION_SECONDS;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.sessionStorage.getItem(TIMER_STORAGE_KEY);
      if (!stored) {
        window.sessionStorage.setItem(TIMER_STORAGE_KEY, String(Date.now()));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return secondsLeft;
}

function formatTime(total: number): { mm: string; ss: string } {
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return { mm, ss };
}

function StickyTimer({ secondsLeft }: { secondsLeft: number }) {
  const expired = secondsLeft <= 0;
  const urgent = !expired && secondsLeft <= 60;
  const warning = !expired && !urgent && secondsLeft <= 5 * 60;
  const { mm, ss } = formatTime(secondsLeft);

  let bg = "bg-primary text-white";
  let label = "Erbjudandet stängs om";
  if (expired) {
    bg = "bg-primary/40 text-white/90";
    label = "Erbjudandet är stängt";
  } else if (urgent) {
    bg = "bg-destructive text-white animate-pulse";
    label = "SISTA MINUTEN";
  } else if (warning) {
    bg = "bg-accent text-white";
    label = "Snart slut — säkra din plats nu";
  }

  return (
    <div className={`${bg} sticky top-0 z-40 transition-colors duration-500`}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">
            {expired ? "Stängt" : urgent ? "SISTA MIN" : "Snart slut"}
          </span>
        </div>
        <div className="font-serif tabular-nums text-2xl md:text-3xl font-medium tracking-wider">
          {expired ? (
            <span>00:00</span>
          ) : (
            <>
              <span>{mm}</span>
              <span className="opacity-60 mx-0.5">:</span>
              <span>{ss}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Checkout() {
  const secondsLeft = useCheckoutCountdown();
  const expired = secondsLeft <= 0;

  return (
    <div className="min-h-screen bg-background">
      <StickyTimer secondsLeft={secondsLeft} />

      {/* Header */}
      <header className="px-4 md:px-8 py-5 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-sm md:text-base tracking-[0.22em] uppercase text-primary">
              Kvinnlig Lustkraft
            </span>
            <span className="font-serif italic text-primary/60 text-xs md:text-sm hidden sm:inline">
              med Gaia
            </span>
          </Link>
          <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-primary/50 font-semibold">
            Webinar­erbjudande
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-24">
        {/* Hero */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-accent text-[11px] font-bold tracking-[0.28em] uppercase mb-5">
              Endast för webinardeltagare
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-primary leading-[1.05] tracking-tight mb-6">
              Säkra din plats i
              <br />
              <span className="italic">Kvinnlig Lustkraft®</span>
            </h1>
            <p className="font-serif italic text-primary/75 text-lg md:text-2xl leading-snug max-w-xl mx-auto">
              Det du längtar efter finns redan i dig. Kroppen vet vägen hem —
              du behöver bara ta första steget.
            </p>
          </div>
        </FadeIn>

        {/* Testimonials — social proof first to build trust before the price */}
        <FadeIn delay={0.05}>
          <section className="mb-12 md:mb-16">
            <h2 className="font-serif text-2xl md:text-3xl text-primary text-center mb-3">
              Kvinnor som redan gjort resan
            </h2>
            <p className="text-primary/70 leading-relaxed text-center max-w-xl mx-auto mb-8 md:mb-10">
              Du behöver inte ta mitt ord för det. Lyssna på dem som en gång stod precis där du
              står nu.
            </p>
            <TestimonialsGrid items={TESTIMONIALS.slice(0, 4)} />
          </section>
        </FadeIn>

        {/* Pricing card */}
        <FadeIn delay={0.05}>
          <div
            id="pricing"
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-xl shadow-primary/5 border border-white/60 mb-12 md:mb-16"
          >
            <span className="text-accent text-xs font-bold tracking-[0.22em] uppercase block mb-3 text-center">
              Din investering
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-primary text-center mb-8 md:mb-10">
              Kvinnlig Lustkraft®
            </h2>

            {/* Base value */}
            <div className="space-y-4 mb-8">
              {[
                { text: "8 moduler med vägledning / 8 hypnoser", value: "8 890:-" },
                { text: "2 LIVE webinar 90 min Gaiacommunity", value: "1 980:-" },
                { text: "12 månaders tillgång", value: "2 000:-" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-2 border-b border-border/30 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span className="text-primary/90">{item.text}</span>
                  </div>
                  <div className="text-sm font-medium text-primary/50 shrink-0 uppercase tracking-wide pl-7 sm:pl-0">
                    Värde {item.value}
                  </div>
                </div>
              ))}
              <div className="text-right font-serif text-primary/60 italic pt-2">
                TOTALT VÄRDE 12 870:-
              </div>
            </div>

            {/* Bonus block */}
            {expired ? (
              <div className="relative rounded-2xl md:rounded-3xl p-5 md:p-7 mb-8 border border-border/40 bg-secondary/20 text-center">
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-destructive block mb-2">
                  Bonusen har gått ut
                </span>
                <p className="font-serif italic text-primary/60 text-sm md:text-base">
                  Webinarbonusen var tillgänglig endast under webbinariedagen.
                </p>
              </div>
            ) : (
              <div className="relative rounded-2xl md:rounded-3xl p-5 md:p-7 mb-8 border border-accent/20 bg-secondary/50 transition-all duration-500">
                <span className="text-accent text-[11px] font-bold tracking-[0.22em] uppercase block mb-5 text-center">
                  Webinarbonus — endast under webbinariedagen
                </span>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-2 border-b border-border/40">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-accent mt-1 shrink-0" />
                      <span className="text-primary/90 font-medium">
                        BONUS 1: 1 års medlemskap — 12 st LIVE webinar
                      </span>
                    </div>
                    <div className="text-sm font-medium text-primary/50 shrink-0 uppercase tracking-wide pl-7 sm:pl-0">
                      Värde 11 880:-
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-2">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-accent mt-1 shrink-0" />
                      <span className="text-primary/90 font-medium">
                        BONUS 2: MATKA — InnerMedicineWoman PAKET
                        (föreläsning + hypnos)
                      </span>
                    </div>
                    <div className="text-sm font-medium text-primary/50 shrink-0 uppercase tracking-wide pl-7 sm:pl-0">
                      Värde 3 500:-
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price */}
            <div className="text-center mb-6">
              {!expired && (
                <div className="text-xl md:text-2xl font-serif text-primary/40 line-through mb-1">
                  TOTALT VÄRDE: 26 450:-
                </div>
              )}
              <div className="text-[11px] tracking-[0.28em] uppercase text-accent font-bold mb-3">
                Ditt pris idag
              </div>
              <div className="text-5xl md:text-6xl font-serif text-primary font-medium mb-5">
                7 990 SEK
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-primary/70 mb-8">
                <span>Delbetaling möjlig med Klarna.</span>
                <span className="hidden sm:inline-block">•</span>
                <span>Tillgång direkt efter köp.</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href={expired ? undefined : PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={expired}
              onClick={(e) => {
                if (expired) e.preventDefault();
              }}
              className={`flex items-center justify-center gap-3 rounded-full px-8 py-5 text-base md:text-lg font-semibold tracking-wide w-full transition-all duration-300 ${
                expired
                  ? "bg-primary/30 text-white/80 cursor-not-allowed"
                  : "bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.01]"
              }`}
            >
              <span>
                {expired ? "Erbjudandet har stängt" : "Ja, jag tar platsen nu"}
              </span>
              {!expired && <ArrowRight className="w-5 h-5" />}
            </a>
            {!expired && (
              <p className="text-xs text-primary/55 text-center mt-4">
                Erbjudandet och bonusen gäller endast tills timern går ut.
              </p>
            )}
          </div>
        </FadeIn>

        {/* What you get summary */}
        <FadeIn delay={0.1}>
          <section className="mb-14 md:mb-20">
            <h2 className="font-serif text-2xl md:text-3xl text-primary text-center mb-8 md:mb-10">
              Det här ingår i din plats
            </h2>
            <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-border/40 shadow-sm">
              <ul className="space-y-4">
                {[
                  "8 moduler som tar dig steg för steg hem till din kropp och din kraft",
                  "8 vägledda hypnoser — kroppen får uppleva, inte bara förstå",
                  "2 LIVE-seminarier med Gaia varje månad — möte i Gaia­community",
                  "12 månaders tillgång — du går i din egen takt",
                  "Tillgång till första modulen direkt efter köp",
                  ...(expired
                    ? []
                    : [
                        "BONUS: 1 års medlemskap — 12 st LIVE webinar",
                        "BONUS: MATKA — InnerMedicineWoman paket (föreläsning + vägledd hypnos)",
                      ]),
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-primary/85 leading-relaxed"
                  >
                    <span className="mt-1 shrink-0 text-accent">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span className="text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>

        {/* Who is Gaia */}
        <FadeIn delay={0.1}>
          <section className="mb-14 md:mb-20">
            <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-border/40 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
                <div className="shrink-0 mx-auto sm:mx-0">
                  <div className="w-40 md:w-48 rounded-2xl overflow-hidden border border-secondary shadow-md bg-secondary/30">
                    <img
                      src={gaiaPortraitImg}
                      alt="Gaia Qiliv Lindroos"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-accent text-[11px] font-bold tracking-[0.22em] uppercase block mb-2">
                    Vem är jag?
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4 leading-tight">
                    Gaia Qiliv Lindroos
                  </h2>
                  <p className="text-primary/80 leading-relaxed mb-4">
                    Sedan 1999 har jag jobbat med personlig utveckling och
                    transformation, skrivit över 400 ljudböcker och hjälpt
                    hundratusentals kvinnor att komma hem till sig själva. Det
                    viktigaste är inte vad jag gjort — det är att jag har stått
                    där du står.
                  </p>
                  <div className="border-l-2 border-accent/40 pl-4 py-1">
                    <p className="font-serif italic text-primary text-base md:text-lg">
                      "Det finns ingen som gör det så tryggt och säkert som
                      Gaia. Jag har aldrig upplevt något liknande."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Final urgency CTA */}
        <FadeIn delay={0.1}>
          <section className="text-center">
            <div
              className={`inline-block px-5 py-2 rounded-full mb-6 border ${
                expired
                  ? "bg-primary/5 border-border/40"
                  : "bg-accent/10 border-accent/30"
              }`}
            >
              <p
                className={`text-xs font-serif italic ${
                  expired ? "text-primary/50" : "text-accent"
                }`}
              >
                {expired
                  ? "Erbjudandet och bonusen är stängda."
                  : "Bonusen försvinner när timern går ut."}
              </p>
            </div>

            <p className="font-serif text-2xl md:text-4xl text-primary leading-tight mb-3">
              Du har gett så mycket till alla andra.
            </p>
            <p className="font-serif text-2xl md:text-4xl text-primary italic leading-tight mb-10">
              Nu är det din tur.
            </p>

            <a
              href={expired ? undefined : PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={expired}
              onClick={(e) => {
                if (expired) e.preventDefault();
              }}
              className={`flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 text-base md:text-lg font-semibold tracking-wide transition-all ${
                expired
                  ? "bg-primary/30 text-white/80 cursor-not-allowed"
                  : "bg-accent text-white shadow-lg hover:bg-accent/90 hover:scale-[1.02]"
              }`}
            >
              <span>
                {expired ? "Erbjudandet har stängt" : "Ja, jag tar platsen nu"}
              </span>
              {!expired && <ArrowRight className="w-4 h-4" />}
            </a>

            <div className="flex flex-col items-center gap-3 mt-12">
              <span className="font-serif italic text-xl md:text-2xl text-primary">
                Kram, Gaia
              </span>
              <Heart className="w-5 h-5 text-accent" strokeWidth={1.5} />
            </div>
          </section>
        </FadeIn>
      </main>

      <footer className="py-8 px-6 text-center border-t border-border/40 bg-white">
        <div className="flex items-baseline justify-center gap-2 text-xs text-primary/60">
          <span className="font-serif tracking-widest uppercase text-primary/70">
            Kvinnlig Lustkraft®
          </span>
          <span className="font-serif italic">· med Gaia Qiliv Lindroos</span>
        </div>
      </footer>
    </div>
  );
}
