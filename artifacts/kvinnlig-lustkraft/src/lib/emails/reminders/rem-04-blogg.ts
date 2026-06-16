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
} from "../shell";
import type { EmailTemplate } from "../templates";

// Påminnelsesekvens efter anmälan · Mejl 4 — 3 dagar före (D-3) · blogg
export const rem04Blogg: EmailTemplate = {
  id: "rem-04-blogg",
  group: "Påminnelse efter anmälan",
  label: "Påminnelse 4 · D-3 · Blogg",
  subject: "Varför den långa utandningen faktiskt fungerar",
  preheader: "Biologin bakom övningen du gjorde igår – på 4 minuter.",
  html: wrapEmail({
    preheader: "Biologin bakom övningen du gjorde igår – på 4 minuter.",
    body: `
      ${eyebrow("3 dagar före · Artikel 4 min")}
      ${greet()}
      ${p("Gjorde du övningen igår? Om du märkte att kroppen blev lite lugnare, så var det inte inbillning. Det var biologi. Och idag vill jag visa dig varför.")}
      ${p("Det handlar om vagusnerven – kroppens trygghetsnerv. Den går från hjärnan, genom hjärtat och magen, och ställer hela tiden en fråga:")}
      ${italic("&ldquo;Är jag trygg – eller i fara?&rdquo;")}
      ${p("Tre saker är värda att veta:")}
      <ol style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:14px;">Den <strong>långa utandningen</strong> som du övade på igår aktiverar vagusnerven direkt. Därför lugnar du dig snabbare av att andas ut länge än av att bara &ldquo;tänka positivt&rdquo;.</li>
        <li style="margin-bottom:14px;">När vagusnerven har varit i alarmberedskap för länge kan kroppen börja tolka även vardagliga saker – ett ögonblick av närhet eller stillhet – som något att vara på sin vakt mot. Och en kropp som är på vakt prioriterar överlevnad, inte lust.</li>
        <li style="margin-bottom:14px;">Nerven går att <strong>träna</strong>. Varje gång du ger den en signal om trygghet blir det lite lättare för kroppen att lugna sig nästa gång. Det är som en muskel.</li>
      </ol>
      ${p("Jag har skrivit en artikel som förklarar detta på ett enkelt sätt – och vad det betyder för lust, energi och närhet.")}
      ${cta("📖 Läs här (4 min)", "blog_page_link")}
      ${p("Fortsätt gärna med övningen från igår medan du läser. När teori och upplevelse möts – då sker den verkliga förändringen.")}
      ${pLast("Det är tre dagar kvar till webbinariet.")}
      ${infoBox([
        {
          label: "🔗&nbsp; Din länk",
          value: `<a href="{{custom_values.webinar_join_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_join_link}}</a>`,
        },
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}} kl. {{custom_values.time_of_the_webinar}}" },
      ])}
      ${signOff("Gaia")}
    `,
  }),
};
