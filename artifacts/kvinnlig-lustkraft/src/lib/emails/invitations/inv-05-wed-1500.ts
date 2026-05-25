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

export const inv05WedAfternoon: EmailTemplate = {
  id: "14-inv-05-wed-1500",
  label: "Inbjudan 5 · ons 27/5 15:00 · Sista tanken",
  subject: "3 timmar kvar – en sista tanke",
  preheader: "En mening jag vill att du bär med dig in i kvällen.",
  html: wrapEmail({
    preheader: "En mening jag vill att du bär med dig in i kvällen.",
    body: `
      ${eyebrow("3 timmar före start")}
      ${greet()}
      ${p("Jag tänker inte upprepa något jag redan sagt. Jag vill bara lämna dig med en mening innan vi ses ikväll.")}
      ${italic("Det är inte din lust som är borta. Det är kontakten som är bruten.")}
      ${p("Och kontakt går alltid att återupprätta. Inte över en natt – men över sex veckor, tre månader, en stilla resa hem. Det är det enda jag vill att du tar med dig in i ikväll.")}
      ${p("Du behöver inte komma med rätt frågor. Du behöver inte ha bestämt något. Du behöver inte ens ha kameran på.")}
      ${pLast("Du behöver bara dyka upp och låta kroppen lyssna.")}
      ${infoBox([
        { label: "🕖&nbsp; Ikväll", value: "{{custom_values.time_of_the_webinar}}" },
        {
          label: "🔗&nbsp; Zoom",
          value: `<a href="{{custom_values.webinar_zoom_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_zoom_link}}</a>`,
        },
        {
          label: "📆&nbsp; Kalender",
          value: `<a href="{{custom_values.webinar_add_to_calendar_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">Lägg till i din kalender</a>`,
        },
      ])}
      ${cta("Jag är med ikväll", "webinar_registration_link")}
      ${pLast("Vi ses om några timmar.")}
      ${signOff()}
    `,
  }),
};
