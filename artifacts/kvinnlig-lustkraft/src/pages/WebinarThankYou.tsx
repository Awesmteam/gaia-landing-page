import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  PartyPopper,
  Video,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  WEBINAR_DATE,
  WEBINAR_TIME,
  WEBINAR_TIMEZONE_LABEL,
  WEBINAR_LOCATION_CONFIRMED,
  WEBINAR_TITLE,
  WEBINAR_DESCRIPTION,
  WEBINAR_ICS_DTSTART_UTC,
  WEBINAR_ICS_DTEND_UTC,
  WEBINAR_ZOOM_LINK,
  WEBINAR_CALENDAR_LINK,
} from "@/lib/webinar";

function buildIcs(): string {
  const dtStamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const uid = `webinar-${Date.now()}@kvinnlig-lustkraft`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kvinnlig Lustkraft//Webinar//SV",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${WEBINAR_ICS_DTSTART_UTC}`,
    `DTEND:${WEBINAR_ICS_DTEND_UTC}`,
    `SUMMARY:${WEBINAR_TITLE}`,
    `DESCRIPTION:${WEBINAR_DESCRIPTION}\\n\\nZoom: ${WEBINAR_ZOOM_LINK}`,
    `LOCATION:${WEBINAR_ZOOM_LINK}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function WebinarThankYou() {
  const [copied, setCopied] = useState(false);

  const handleDownloadIcs = () => {
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kvinnlig-lustkraft-webinar.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyZoom = async () => {
    try {
      await navigator.clipboard.writeText(WEBINAR_ZOOM_LINK);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-8 flex justify-center items-center border-b border-border/40">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-lg tracking-widest uppercase text-primary">
            Kvinnlig Lustkraft
          </span>
          <span className="font-serif italic text-primary/70 text-sm">med Gaia</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center py-16 md:py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-secondary text-accent flex items-center justify-center">
              <PartyPopper className="w-7 h-7" strokeWidth={1.6} />
            </div>
          </div>

          <span className="text-accent text-xs font-bold tracking-[0.22em] uppercase block mb-4">
            Anmälan bekräftad
          </span>

          <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight mb-8">
            Juhuu, du är anmäld! <span aria-hidden>🎉</span>
          </h1>

          <div className="space-y-5 text-lg text-primary/80 max-w-xl mx-auto mb-12 leading-relaxed">
            <p className="font-serif italic text-2xl text-primary">
              Wow – vad roligt att du är med!
            </p>
            <p>
              Det här är inte en liten sak. Du har just sagt ja till dig själv. Till att
              ta ett steg mot något nytt. Mot att komma hem.
            </p>
            <p className="font-serif italic text-xl text-primary">Det firar vi.</p>
            <p>Jag ser så mycket fram emot att träffa dig.</p>
          </div>

          {/* Välkomstvideo (Vimeo) — efter anmälan */}
          <div className="bg-white rounded-[1.75rem] p-7 md:p-9 text-left max-w-xl mx-auto mb-6 border border-border/40 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/50 font-semibold">
                  Ett välkomstord
                </p>
                <p className="font-serif text-primary text-lg leading-tight">
                  Ett litet hej från Gaia
                </p>
              </div>
            </div>
            <div
              className="relative w-full max-w-xs mx-auto rounded-[1.25rem] overflow-hidden border border-border/40 bg-primary"
              style={{ paddingTop: "min(158.89%, 70vh)" }}
            >
              <iframe
                src="https://player.vimeo.com/video/1201953715?badge=0&autopause=0&player_id=0&app_id=58479"
                title="Välkomstvideo – Kvinnlig Lustkraft"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Date/time card */}
          <div className="bg-white rounded-[1.75rem] p-7 md:p-9 text-left max-w-xl mx-auto mb-6 border border-border/40 shadow-sm">
            <h2 className="text-xs font-bold tracking-[0.22em] uppercase text-primary/60 mb-5 text-center">
              När och var
            </h2>
            <div className="space-y-4">
              {[
                { icon: Calendar, label: "Datum", value: WEBINAR_DATE },
                { icon: Clock, label: "Tid", value: `${WEBINAR_TIME} ${WEBINAR_TIMEZONE_LABEL}` },
                { icon: MapPin, label: "Plats", value: WEBINAR_LOCATION_CONFIRMED },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-primary/50 font-semibold">
                      {label}
                    </p>
                    <p className="font-serif text-primary text-lg leading-tight">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zoom link card */}
          <div className="bg-white rounded-[1.75rem] p-7 md:p-9 text-left max-w-xl mx-auto mb-6 border border-accent/30 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/50 font-semibold">
                  Zoom-länk
                </p>
                <p className="font-serif text-primary text-lg leading-tight">
                  Din ingång till webinaret
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <code className="flex-1 bg-secondary/40 rounded-xl px-4 py-3 text-sm text-primary/80 font-mono break-all border border-border/40">
                {WEBINAR_ZOOM_LINK}
              </code>
              <button
                type="button"
                onClick={handleCopyZoom}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-primary hover:bg-secondary/40 transition-colors duration-200 shrink-0"
                aria-label="Kopiera Zoom-länken"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={2.2} />
                    <span>Kopierad</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" strokeWidth={1.8} />
                    <span>Kopiera</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={WEBINAR_ZOOM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white px-6 py-3 text-sm font-semibold tracking-wide shadow-sm hover:bg-accent/90 transition-colors duration-200 w-full sm:w-auto"
            >
              <Video className="w-4 h-4" strokeWidth={2} />
              <span>Öppna Zoom-länken</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" strokeWidth={2} />
            </a>

            <p className="text-xs text-primary/55 mt-4 leading-relaxed">
              Öppna den här länken den 23 juni kl. 18:00. Spara den så du har den nära.
            </p>
          </div>

          {/* Calendar card */}
          <div className="bg-white rounded-[1.75rem] p-7 md:p-9 text-left max-w-xl mx-auto mb-12 border border-border/40 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0">
                <CalendarPlus className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/50 font-semibold">
                  Kalender
                </p>
                <p className="font-serif text-primary text-lg leading-tight">
                  Lägg till i din kalender
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WEBINAR_CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white px-6 py-3 text-sm font-semibold tracking-wide shadow-sm hover:bg-primary/90 transition-colors duration-200 flex-1"
              >
                <CalendarPlus className="w-4 h-4" strokeWidth={2} />
                <span>Google / Apple / Outlook</span>
              </a>
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-transparent px-6 py-3 text-sm font-semibold tracking-wide text-primary hover:bg-primary/5 transition-colors duration-200 flex-1"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.8} />
                <span>Ladda ner .ics</span>
              </button>
            </div>

            <p className="text-xs text-primary/55 mt-4 leading-relaxed">
              Vi har även mejlat dig länken — kolla din skräppost om du inte ser mejlet.
            </p>
          </div>

          <div className="text-center mb-10">
            <p className="font-serif italic text-xl text-primary/70 mb-2">Vi ses snart.</p>
            <p className="font-serif text-2xl text-primary">Kram, Gaia</p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-transparent px-8 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors duration-300"
          >
            Tillbaka till startsidan
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
