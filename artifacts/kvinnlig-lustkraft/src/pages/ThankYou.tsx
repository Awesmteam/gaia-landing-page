import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Inbox,
  PlayCircle,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { COURSE_LOGIN_LINK, SUPPORT_EMAIL } from "@/lib/webinar";
import closingImg from "@/assets/image_1778315750725.png";
import gaiaPortraitImg from "@/assets/image_1778315729204.png";

const STEPS = [
  {
    icon: Inbox,
    title: "Kolla din inkorg",
    body: "Inom några minuter får du ett mejl med all viktig information — hur du loggar in, hur du kommer igång och vad som väntar dig i första modulen.",
  },
  {
    icon: PlayCircle,
    title: "Starta första modulen",
    body: "Du har tillgång direkt. Sätt av en lugn stund, sätt på något fint, och låt resan börja.",
  },
  {
    icon: HeartHandshake,
    title: "Möt mig live",
    body: "Du är nu del av Gaiacommunity. Två LIVE-seminarier i månaden — vi ses snart där.",
  },
];

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-8 flex justify-center items-center border-b border-border/40">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-lg tracking-widest uppercase text-primary">
            Kvinnlig Lustkraft
          </span>
          <span className="font-serif italic text-primary/70 text-sm">med Gaia</span>
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background" />
            <div className="absolute -top-20 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 w-[24rem] h-[24rem] rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white border border-accent/20 shadow-md flex items-center justify-center">
                    <Sparkles
                      className="w-9 h-9 text-accent"
                      strokeWidth={1.4}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl -z-10" />
                </div>
              </div>

              <span className="text-accent text-[11px] font-bold tracking-[0.28em] uppercase block mb-5">
                Tack — välkommen hem
              </span>

              <h1 className="font-serif text-5xl md:text-7xl text-primary leading-[1.05] mb-6">
                Du är med.
              </h1>

              <p className="font-serif italic text-2xl md:text-3xl text-primary/80 leading-snug mb-8">
                Och jag är så glad att du sa ja.
              </p>

              <div className="space-y-4 text-base md:text-lg text-primary/75 max-w-xl mx-auto leading-relaxed">
                <p>
                  Du tog steget. Du sa ja till dig själv. Och det är stort,
                  vet du det?
                </p>
                <p>
                  Jag ser så mycket fram emot att ta den här resan tillsammans
                  med dig — att få vara med när du kommer hem till din kropp,
                  till din kraft.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="px-6 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10 md:mb-14"
            >
              <span className="text-accent text-[11px] font-bold tracking-[0.28em] uppercase block mb-3">
                Vad händer nu?
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
                Tre enkla steg.
              </h2>
            </motion.div>

            <div className="grid gap-5 md:gap-6 md:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative bg-white rounded-[1.75rem] p-7 md:p-8 border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-serif text-sm shadow-md">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-secondary text-accent flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-primary mb-3 leading-tight">
                    {title}
                  </h3>
                  <p className="text-sm md:text-base text-primary/70 leading-relaxed">
                    {body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA: open course */}
            <div className="mt-10 md:mt-12 flex justify-center">
              <a
                href={COURSE_LOGIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-9 py-4 text-base md:text-lg font-semibold tracking-wide shadow-md hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300"
              >
                <PlayCircle className="w-5 h-5" strokeWidth={1.8} />
                <span>Öppna första modulen</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Inbox / support card */}
        <section className="px-6 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-border/40 shadow-sm p-7 md:p-10 flex flex-col sm:flex-row items-start gap-5 sm:gap-7"
          >
            <div className="w-12 h-12 rounded-full bg-secondary text-accent flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <Mail className="w-6 h-6" strokeWidth={1.6} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-serif text-2xl text-primary mb-3 leading-tight">
                Hittar du inte mejlet?
              </h3>
              <p className="text-primary/75 leading-relaxed mb-2">
                Titta i skräpposten eller spam-mappen — ibland smyger det sig
                dit. Hittar du det fortfarande inte? Skriv till oss på{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-accent font-medium hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                — vi svarar dig snabbt.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Closing — Gaia note */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] border border-accent/15 shadow-md">
            <img
              src={closingImg}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/60" />

            <div className="relative px-7 md:px-14 py-14 md:py-20 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/40 shadow-lg">
                  <img
                    src={gaiaPortraitImg}
                    alt="Gaia Qiliv Lindroos"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="font-serif italic text-2xl md:text-3xl leading-snug mb-3">
                Du har gjort ett modigt val idag.
              </p>
              <p className="text-white/85 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Och jag lovar att jag kommer vara där med dig — hela vägen hem.
              </p>

              <p className="font-serif italic text-xl text-white/85 mb-1">
                Välkommen hem.
              </p>
              <p className="font-serif text-2xl md:text-3xl">Kram, Gaia</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-transparent px-8 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors duration-300"
            >
              Tillbaka till startsidan
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
