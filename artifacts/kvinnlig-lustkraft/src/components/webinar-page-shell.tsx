import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WEBINAR_DATE, WEBINAR_TIME, WEBINAR_TIMEZONE_LABEL } from "@/lib/webinar";

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
