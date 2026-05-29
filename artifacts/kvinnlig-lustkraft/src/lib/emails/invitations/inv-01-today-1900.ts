import {
  wrapEmail,
  greet,
  eyebrow,
  p,
  pLast,
  italic,
  signOff,
  cta,
  infoBox,
  psBox,
  divider,
} from "../shell";
import type { EmailTemplate } from "../templates";

export const inv01TodayEvening: EmailTemplate = {
  id: "10-inv-01-today-1900",
  label: "Inbjudan 1 · tors 28/5 19:00 · Värdeöppning",
  subject: "Det du tror är slut är ofta bara nedstängt",
  preheader:
    "En liten övning du kan göra ikväll – innan du läser något mer om webbinariet.",
  html: wrapEmail({
    preheader:
      "En liten övning du kan göra ikväll – innan du läser något mer om webbinariet.",
    body: `
      ${eyebrow("Värde · Läs ikväll · 4 min")}
      ${greet()}
      ${p("Jag tänker inte börja det här mejlet med att be dig anmäla dig till något. Jag tänker börja med att ge dig något du kan använda redan ikväll.")}
      ${p("För det jag möter oftast är inte kvinnor som tappat sin lust. Det är kvinnor som tror att den är slut – när den i själva verket bara är <strong>nedstängd</strong>.")}
      ${italic("Och nedstängt är inte samma sak som borta.")}
      ${p("Nedstängt är vad kroppen gör för att skydda dig när vardagen blir för mycket. När du burit för länge. När ingen frågat hur du mår på riktigt. Då stänger nervsystemet av det som inte är livsnödvändigt i stunden – och lusten är det första som åker.")}
      ${p("Inte för att det är fel på dig. För att din kropp är klok.")}
      ${divider()}
      ${italic("En övning, om du vill prova ikväll:")}
      ${p("Hitta en plats där ingen stör dig i fem minuter. Sätt dig. Lägg en hand mot bröstkorgen, en hand mot magen. Andas långsamt och lägg märke till var dina händer rör sig.")}
      ${p("Fråga sedan kroppen – inte huvudet – en enda fråga:")}
      ${italic("&ldquo;Var i mig är jag inte hemma just nu?&rdquo;")}
      ${pLast("Vänta. Lyssna. Det första du känner är svaret. Du behöver inte göra något åt det. Bara veta.")}
      ${divider()}
      ${p("Det är där vi börjar på webbinariet. Inte med strategier. Inte med &ldquo;tips&rdquo;. Utan med att namnsätta det som varit nedstängt – och visa kroppen vägen tillbaka.")}
      ${infoBox([
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}}" },
        { label: "🕖&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}} svensk tid" },
        { label: "⏱&nbsp; Längd", value: "90 minuter, online" },
      ])}
      ${italic("Zoom-länken får du i bekräftelsemejlet direkt efter att du anmält dig.")}
      ${cta("Plocka din plats – gratis", "webinar_registration_link")}
      ${pLast("Och om du bara gjorde övningen ovan ikväll? Då har du redan tagit ett steg. Det räcker långt.")}
      ${signOff()}
      ${psBox("Spar gärna det här mejlet. Övningen är din – du kan göra den när som helst, oavsett vad du bestämmer dig för om webbinariet.")}
    `,
  }),
};
