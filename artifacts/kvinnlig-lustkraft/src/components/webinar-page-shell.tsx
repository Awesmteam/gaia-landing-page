import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import {
  WEBINAR_DATE,
  WEBINAR_TIME,
  WEBINAR_TIMEZONE_LABEL,
  JOURNEY_UNLOCK_ISO,
  isJourneyUnlocked,
  formatSwedishDate,
  type JourneyKey,
} from "@/lib/webinar";
import { Countdown } from "@/components/Countdown";

// Shared chrome for the post-registration nurture pages (podcast / video / blogg / testimonial).
// Keeps each page lean and visually consistent with the rest of the funnel.

export const FadeIn = ({
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

export function PageHeader() {
  return (
    <header className="px-4 md:px-8 py-5 border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-base tracking-[0.22em] uppercase text-primary">
            Kvinnlig Lustkraft
          </span>
          <span className="hidden sm:inline font-serif italic text-[13px] text-primary/50">
            med Gaia
          </span>
        </Link>
      </div>
    </header>
  );
}

// Eyebrow + title + italic subtitle block, centered.
export function PageTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FadeIn>
      <span className="block text-accent text-[11px] font-bold tracking-[0.28em] uppercase text-center mb-4">
        {eyebrow}
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary leading-tight tracking-tight text-center">
        {title}
      </h1>
      {subtitle ? (
        <p className="font-serif italic text-accent text-xl md:text-2xl text-center mt-4 max-w-3xl mx-auto leading-snug">
          {subtitle}
        </p>
      ) : null}
    </FadeIn>
  );
}

// Cross-links between the nurture pages — "din resa fram till webbinariet".
const JOURNEY: { key: JourneyKey; href: string; label: string; meta: string }[] = [
  { key: "podcast", href: "/podcast", label: "Podcast", meta: "D-5" },
  { key: "video", href: "/video", label: "Video", meta: "D-4" },
  { key: "blogg", href: "/blogg", label: "Artikel", meta: "D-3" },
  { key: "testimonial", href: "/testimonial", label: "Röster", meta: "D-2" },
];

const JOURNEY_PILL_BASE =
  "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm border transition-colors";

export function JourneyNav({ current }: { current: string }) {
  return (
    <FadeIn delay={0.5} className="mt-16 md:mt-20">
      <p className="text-[10px] tracking-[0.28em] uppercase text-primary/45 font-bold mb-4 text-center">
        Din resa fram till webbinariet
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {JOURNEY.map((s) => {
          const active = s.key === current;
          const unlocked = isJourneyUnlocked(s.key);

          // Not yet open → static, muted pill with a lock + the day it opens.
          if (!unlocked) {
            return (
              <span
                key={s.key}
                aria-disabled="true"
                title={`Öppnas ${formatSwedishDate(JOURNEY_UNLOCK_ISO[s.key])}`}
                className={`${JOURNEY_PILL_BASE} bg-secondary/30 text-primary/40 border-border/40 cursor-not-allowed`}
              >
                <Lock className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-wider text-primary/35">
                  {s.meta}
                </span>
                <span className="font-medium">{s.label}</span>
              </span>
            );
          }

          return (
            <Link
              key={s.key}
              href={s.href}
              aria-current={active ? "page" : undefined}
              className={`${JOURNEY_PILL_BASE} ${
                active
                  ? "bg-primary text-white border-primary"
                  : "bg-white/70 text-primary/75 border-border/50 hover:bg-white hover:text-primary"
              }`}
            >
              <span
                className={`text-[10px] font-bold tracking-wider ${
                  active ? "text-white/70" : "text-accent/70"
                }`}
              >
                {s.meta}
              </span>
              <span className="font-medium">{s.label}</span>
            </Link>
          );
        })}
      </div>
    </FadeIn>
  );
}

// Drip gate — a journey page is open once its unlock day has arrived.
// `?preview` in the URL bypasses the gate so Gaia can review a page in advance.
export function useJourneyGate(key: JourneyKey): boolean {
  return useMemo(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("preview")) return true;
    }
    return isJourneyUnlocked(key);
  }, [key]);
}

// Calm, on-brand "opens soon" screen shown when a page is visited before its unlock day.
export function JourneyLocked({
  pageKey,
  eyebrow = "Snart öppnas",
  title = "Den här sidan öppnas snart",
}: {
  pageKey: JourneyKey;
  eyebrow?: string;
  title?: string;
}) {
  const unlockIso = JOURNEY_UNLOCK_ISO[pageKey];
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-2xl mx-auto pt-16 md:pt-24 pb-24 text-center">
        <FadeIn>
          <div className="w-16 h-16 rounded-full bg-secondary text-accent flex items-center justify-center mx-auto mb-7">
            <Lock className="w-7 h-7" strokeWidth={1.6} aria-hidden="true" />
          </div>
          <span className="block text-accent text-[11px] font-bold tracking-[0.28em] uppercase mb-4">
            {eyebrow}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary leading-tight tracking-tight">
            {title}
          </h1>
          <p className="font-serif italic text-accent text-xl md:text-2xl mt-4 leading-snug">
            Öppnas {formatSwedishDate(unlockIso)}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10">
          <p className="text-[10px] tracking-[0.28em] uppercase text-primary/45 font-bold mb-5">
            Öppnas om
          </p>
          <Countdown targetIso={unlockIso} />
        </FadeIn>

        <FadeIn delay={0.25} className="mt-10">
          <p className="text-base text-primary/70 leading-relaxed max-w-md mx-auto">
            Varje steg på din resa fram till webbinariet öppnas på sin egen dag – så att du
            kan ta det i lugn takt, en sak i taget.
          </p>
        </FadeIn>

        <JourneyNav current={pageKey} />
        <WebinarCta />
      </main>
    </div>
  );
}

// Closing CTA back to the webinar (attendee already registered → reminder of date/link).
export function WebinarCta({
  lead = "Vi ses på webbinariet:",
  label = "Till webbinariet",
}: {
  lead?: string;
  label?: string;
}) {
  return (
    <FadeIn delay={0.3} className="mt-16 md:mt-20 text-center">
      <p className="font-serif italic text-primary/70 text-lg mb-2">{lead}</p>
      <p className="font-serif text-2xl md:text-3xl text-primary mb-8 leading-tight">
        {WEBINAR_DATE} kl. {WEBINAR_TIME} {WEBINAR_TIMEZONE_LABEL}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-accent text-white font-semibold tracking-[0.12em] uppercase text-sm px-8 py-4 hover:bg-accent/90 transition-colors shadow-sm"
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </FadeIn>
  );
}
