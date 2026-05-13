import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Maximize2, Volume2, Sparkles } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { REPLAY_DEADLINE_ISO, REPLAY_EMBED_URL, PAYMENT_LINK } from "@/lib/webinar";

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
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const BENEFITS = [
  "Varför det du provat hittills inte har fungerat – och vad som faktiskt gör skillnad",
  "Hur din kropp redan vet vägen hem till dig själv",
  "Vad som händet när du börjar förstå hur du fungerar som kvinna",
  "Första steget du kan ta för att komma tillbaka till din kraft",
];

function VideoPlayer() {
  if (REPLAY_EMBED_URL) {
    return (
      <iframe
        src={REPLAY_EMBED_URL}
        title="Inspelning – Kvinnlig Lustkraft webinar"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white/85">
      <div className="text-center px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="font-serif italic text-lg md:text-xl">
          Inspelningen laddas snart upp här
        </p>
        <p className="text-xs text-white/60 mt-2 tracking-[0.18em] uppercase">
          Du får ett mejl när den är redo
        </p>
      </div>
    </div>
  );
}

export default function WebinarReplay() {
  const [expired, setExpired] = useState(
    () => Date.now() > new Date(REPLAY_DEADLINE_ISO).getTime(),
  );

  useEffect(() => {
    if (expired) return;
    const id = window.setInterval(() => {
      if (Date.now() > new Date(REPLAY_DEADLINE_ISO).getTime()) {
        setExpired(true);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [expired]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 md:px-8 py-5 border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-base tracking-[0.22em] uppercase text-primary">
              Kvinnlig Lustkraft
            </span>
          </Link>
          {!expired && (
            <span className="hidden sm:inline-flex items-center gap-2 text-xs text-primary/70">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span className="tracking-[0.18em] uppercase font-semibold">
                Tillgänglig 48h
              </span>
            </span>
          )}
        </div>
      </header>

      <main className="px-4 md:px-8 max-w-5xl mx-auto pt-10 md:pt-14 pb-24">
        {expired ? (
          <ExpiredState />
        ) : (
          <>
            {/* Title */}
            <FadeIn>
              <span className="block text-accent text-[11px] font-bold tracking-[0.28em] uppercase text-center mb-4">
                Begränsad tillgång · 48 timmar
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary leading-tight tracking-tight text-center">
                Här kan du se inspelningen
                <br className="hidden sm:block" />
                <span className="sm:ml-2">av webinaret:</span>
              </h1>
              <p className="font-serif italic text-accent text-xl md:text-2xl text-center mt-4 max-w-3xl mx-auto leading-snug">
                Din kropp vet vägen – återväck din lust och livskraft
              </p>
            </FadeIn>

            {/* Countdown */}
            <FadeIn delay={0.1} className="mt-8 md:mt-10">
              <div className="text-center">
                <p className="text-[11px] tracking-[0.28em] uppercase text-primary/60 font-semibold mb-3">
                  Inspelningen stängs om
                </p>
                <Countdown targetIso={REPLAY_DEADLINE_ISO} />
              </div>
            </FadeIn>

            {/* Video */}
            <FadeIn delay={0.2} className="mt-10 md:mt-12">
              <div className="relative rounded-[1.75rem] md:rounded-[2rem] overflow-hidden shadow-2xl border border-border/40 aspect-video bg-primary">
                <VideoPlayer />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-primary/55">
                <span className="inline-flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  Aktivera ljudet
                </span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-primary/30" />
                <span className="inline-flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Helskärm
                </span>
              </div>
            </FadeIn>

            {/* Inline mid-CTA */}
            <FadeIn delay={0.28} className="mt-10 text-center">
              <a
                href={PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-semibold tracking-[0.18em] uppercase text-xs border-b border-accent/40 hover:border-accent pb-1 transition-colors"
              >
                Köp din kursplats här
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </FadeIn>

            {/* Benefits */}
            <FadeIn delay={0.35} className="mt-16 md:mt-20">
              <div className="bg-white rounded-[2rem] p-7 md:p-12 shadow-sm border border-border/30 max-w-3xl mx-auto">
                <h2 className="font-serif text-2xl md:text-3xl text-primary mb-7 text-center">
                  I webinaret får du:
                </h2>
                <ul className="space-y-5">
                  {BENEFITS.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-4 text-primary/80 leading-relaxed"
                    >
                      <span className="mt-1 shrink-0 text-accent">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <span className="text-base md:text-lg">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Final CTA */}
            <FadeIn delay={0.42} className="mt-16 md:mt-20 text-center">
              <p className="font-serif italic text-primary/70 text-lg mb-3">
                Om du är redo att ta nästa steg:
              </p>
              <p className="font-serif text-2xl md:text-3xl text-primary mb-8 leading-tight">
                Kvinnlig Lustkraft är öppen
                <br className="sm:hidden" />
                <span className="sm:ml-2">i begränsad tid.</span>
              </p>
              <a
                href={PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-9 py-4 text-base md:text-lg font-semibold tracking-wide shadow-lg hover:bg-accent/90 hover:scale-[1.02] transition-all"
              >
                <span>TA MIG TILL KURSEN</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-primary/50 mt-4">
                Erbjudandet stängs när inspelningen tas ner
              </p>
            </FadeIn>
          </>
        )}
      </main>
    </div>
  );
}

function ExpiredState() {
  return (
    <FadeIn className="text-center max-w-2xl mx-auto py-20">
      <span className="block text-accent text-[11px] font-bold tracking-[0.28em] uppercase mb-4">
        Inspelningen är stängd
      </span>
      <h1 className="font-serif text-3xl md:text-5xl text-primary leading-tight mb-6">
        Tiden för inspelningen är slut.
      </h1>
      <p className="text-primary/70 text-lg leading-relaxed mb-10">
        Inspelningen var tillgänglig i 48 timmar. Men du kan fortfarande ta
        nästa steg — kursen är öppen i begränsad tid.
      </p>
      <a
        href={PAYMENT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-9 py-4 text-base md:text-lg font-semibold tracking-wide shadow-lg hover:bg-accent/90 transition-all"
      >
        <span>TA MIG TILL KURSEN</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </FadeIn>
  );
}
