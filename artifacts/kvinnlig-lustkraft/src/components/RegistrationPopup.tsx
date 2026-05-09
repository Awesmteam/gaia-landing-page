import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, X } from "lucide-react";
import {
  WEBINAR_DATE,
  WEBINAR_TIME,
  WEBINAR_TIMEZONE_LABEL,
  WEBINAR_LOCATION_PUBLIC,
} from "@/lib/webinar";

export type RegistrationPopupProps = {
  open: boolean;
  onClose: () => void;
};

export function RegistrationPopup({ open, onClose }: RegistrationPopupProps) {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

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
    setTimeout(() => navigate("/tack"), 250);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          aria-modal="true"
          role="dialog"
          aria-labelledby="reg-popup-title"
        >
          <div
            className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-md bg-background rounded-[2rem] shadow-2xl border border-border/40 overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Stäng"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-secondary/70 px-7 py-7 border-b border-border/40">
              <span className="text-accent text-[10px] font-bold tracking-[0.22em] uppercase block mb-2">
                Gratis webinar
              </span>
              <h2
                id="reg-popup-title"
                className="font-serif text-2xl md:text-3xl text-primary leading-tight"
              >
                Anmäl dig nu
              </h2>
              <p className="text-primary/70 text-sm mt-2 leading-relaxed">
                Få länken till webinaret direkt på mejlen. Det är helt kostnadsfritt.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-primary/70">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span className="font-medium text-primary">{WEBINAR_DATE}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span className="font-medium text-primary">
                    {WEBINAR_TIME} {WEBINAR_TIMEZONE_LABEL}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>{WEBINAR_LOCATION_PUBLIC}</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-7 space-y-4">
              <div>
                <label
                  htmlFor="popup-name"
                  className="block text-[11px] font-bold tracking-[0.18em] uppercase text-primary/60 mb-2"
                >
                  Förnamn
                </label>
                <input
                  id="popup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ditt förnamn"
                  autoFocus
                  className="w-full bg-secondary/40 border border-border/60 rounded-full px-5 py-3 text-primary placeholder:text-primary/40 focus:outline-none focus:border-accent focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="popup-email"
                  className="block text-[11px] font-bold tracking-[0.18em] uppercase text-primary/60 mb-2"
                >
                  E-post
                </label>
                <input
                  id="popup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@epost.se"
                  className="w-full bg-secondary/40 border border-border/60 rounded-full px-5 py-3 text-primary placeholder:text-primary/40 focus:outline-none focus:border-accent focus:bg-white transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-6 py-3.5 text-base font-semibold tracking-wide shadow-md hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                <span>
                  {submitting ? "Skickar…" : "Ja, anmäl mig till webinaret"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-primary/50 text-center pt-1">
                Genom att anmäla dig godkänner du att vi mejlar dig om webinaret.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
