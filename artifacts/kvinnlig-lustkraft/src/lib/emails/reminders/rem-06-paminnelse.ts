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
} from "../shell";
import type { EmailTemplate } from "../templates";

// Påminnelsesekvens efter anmälan · Mejl 6 — 1 dag före (D-1) · påminnelse + checklista
export const rem06Paminnelse: EmailTemplate = {
  id: "rem-06-paminnelse",
  group: "Påminnelse efter anmälan",
  label: "Påminnelse 6 · D-1 · Checklista",
  subject: "I morgon ❤️ (din checklista inför kvällen)",
  preheader: "Allt du behöver för att få ut så mycket som möjligt av kvällen.",
  html: wrapEmail({
    preheader: "Allt du behöver för att få ut så mycket som möjligt av kvällen.",
    body: `
      ${eyebrow("I morgon · Din checklista")}
      ${greet()}
      ${p("I morgon är det dags. Jag ser verkligen fram emot att dela den här kvällen med dig.")}
      ${infoBox([
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}}" },
        { label: "🕢&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}} svensk tid" },
        {
          label: "🔗&nbsp; Din länk",
          value: `<a href="{{custom_values.webinar_join_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_join_link}}</a>`,
        },
      ])}
      ${italic("Här är din lilla checklista:")}
      <ul style="margin:0 0 24px 0;padding:0;list-style:none;color:#3a4a4a;font-size:16px;line-height:1.7;">
        <li style="margin-bottom:12px;">☐&nbsp; Lägg in tiden i din kalender nu om du inte redan har gjort det.</li>
        <li style="margin-bottom:12px;">☐&nbsp; Spara länken – det är här du går in.</li>
        <li style="margin-bottom:12px;">☐&nbsp; Var med live om du kan. Det är då magin sker, och då du kan skriva i chatten och ställa frågor.</li>
        <li style="margin-bottom:12px;">☐&nbsp; Hitta en lugn plats där du kan vara ostörd i 120 minuter.</li>
        <li style="margin-bottom:12px;">☐&nbsp; Ha papper och penna i närheten – det kommer insikter som du vill skriva ner.</li>
        <li style="margin-bottom:12px;">☐&nbsp; Ta med något varmt att dricka och kom precis som du är.</li>
        <li style="margin-bottom:12px;">☐&nbsp; Logga in några minuter innan vi börjar, så att du hinner landa i lugn och ro.</li>
        <li style="margin-bottom:12px;">☐&nbsp; Gör gärna trygghetsövningen precis innan – då är din kropp redan öppen och närvarande.</li>
      </ul>
      ${cta("Gå med här i morgon", "webinar_join_link")}
      ${p("Du behöver inte förbereda något mer än detta. Inga krav. Du får bara vara här.")}
      ${pLast("Det här blir början på något fint.")}
      ${p("Vi ses i morgon.")}
      ${signOff("Gaia")}
      ${psBox("Lägg länken i ett öppet fönster redan ikväll, så slipper du leta i morgon.")}
    `,
  }),
};
