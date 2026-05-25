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

export const inv04WedMorning: EmailTemplate = {
  id: "13-inv-04-wed-1000",
  label: "Inbjudan 4 · ons 27/5 10:00 · 4 takeaways",
  subject: "Ikväll kl 18 – det här får du med dig",
  preheader:
    "Fyra konkreta saker du tar med dig hem ikväll – även om du bara lyssnar.",
  html: wrapEmail({
    preheader:
      "Fyra konkreta saker du tar med dig hem ikväll – även om du bara lyssnar.",
    body: `
      ${eyebrow("Idag · webinardagen · 3 min")}
      ${greet()}
      ${p("Ikväll klockan {{custom_values.time_of_the_webinar}} ses vi. Jag vill att du ska veta exakt vad du får med dig hem – så att din tid är värd det, även om du bara lyssnar med ena örat medan barnen sover.")}
      ${italic("Fyra saker du tar med dig:")}
      <ol style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:14px;"><strong>En ny förklaring</strong> – varför din lust och livskraft minskat. Inte den du fått av läkaren. Den som faktiskt stämmer med vad du känt.</li>
        <li style="margin-bottom:14px;"><strong>En övning du kan göra ikväll</strong> – fem minuter, ingen utrustning. Den ger dig direkt en känsla av vad &ldquo;hemma i kroppen&rdquo; betyder.</li>
        <li style="margin-bottom:14px;"><strong>Tre tecken</strong> på att din kropp är nedstängd – inte trasig. Skillnaden är avgörande och få har fått höra den.</li>
        <li style="margin-bottom:14px;"><strong>En karta</strong> över de fyra stegen som faktiskt fungerar – så du slipper testa dig fram i åratal som så många andra.</li>
      </ol>
      ${p("Det här är inte teori. Det är vad jag sett fungera, gång på gång, med tusentals kvinnor.")}
      ${infoBox([
        { label: "📅&nbsp; Idag", value: "{{custom_values.date_of_the_webinar}}" },
        { label: "🕖&nbsp; Klockan", value: "{{custom_values.time_of_the_webinar}}" },
        {
          label: "🔗&nbsp; Zoom",
          value: `<a href="{{custom_values.webinar_zoom_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_zoom_link}}</a>`,
        },
        {
          label: "📆&nbsp; Kalender",
          value: `<a href="{{custom_values.webinar_add_to_calendar_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">Lägg till i din kalender</a>`,
        },
      ])}
      ${cta("Säkra min plats", "webinar_registration_link")}
      ${pLast("Lägg in det i kalendern nu om du inte redan gjort det. Stäng dörren. Häll upp något varmt. Det är din tid.")}
      ${signOff()}
    `,
  }),
};
