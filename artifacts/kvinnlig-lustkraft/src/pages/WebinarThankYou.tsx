import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, CalendarPlus, PartyPopper } from "lucide-react";
import {
  WEBINAR_DATE,
  WEBINAR_TIME,
  WEBINAR_TIMEZONE_LABEL,
  WEBINAR_LOCATION_CONFIRMED,
  WEBINAR_TITLE,
  WEBINAR_DESCRIPTION,
  WEBINAR_ICS_DTSTART_UTC,
  WEBINAR_ICS_DTEND_UTC,
} from "@/lib/webinar";

function buildIcs(): string {
  const dtStart = WEBINAR_ICS_DTSTART_UTC;
  const dtEnd = WEBINAR_ICS_DTEND_UTC;
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
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${WEBINAR_TITLE}`,
    `DESCRIPTION:${WEBINAR_DESCRIPTION}`,
    `LOCATION:${WEBINAR_LOCATION_CONFIRMED}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function WebinarThankYou() {
  const handleAddToCalendar = () => {
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

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
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

          {/* Date/time card */}
          <div className="bg-white rounded-[1.75rem] p-7 md:p-9 text-left max-w-xl mx-auto mb-10 border border-border/40 shadow-sm">
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

          <div className="space-y-4 text-primary/75 text-base max-w-xl mx-auto mb-10">
            <p>
              Jag har skickat dig ett mejl med all viktig information och länken till
              webinaret.
            </p>
            <p className="text-sm text-primary/60">
              Har du inte fått det inom några minuter? Kolla din skräppost eller
              spam-mapp – ibland smyger det sig dit.
            </p>
            <p className="font-serif italic text-lg text-primary">
              Lägg in det i kalendern nu – så du inte glömmer.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-8 py-4 text-base font-semibold tracking-wide shadow-md hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 mb-12"
          >
            <CalendarPlus className="w-5 h-5" />
            <span>Lägg till i kalendern</span>
          </button>

          <div className="text-center mb-12">
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
