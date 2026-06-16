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

// Påminnelsesekvens efter anmälan · Mejl 2 — 5 dagar före (D-5) · podcast
export const rem02Podcast: EmailTemplate = {
  id: "rem-02-podcast",
  group: "Påminnelse efter anmälan",
  label: "Påminnelse 2 · D-5 · Podcast",
  subject: "“Jag som har det så bra. Jag borde inte klaga.”",
  preheader: "Ett avsnitt på 8 minuter om något som nästan ingen vågar säga högt.",
  html: wrapEmail({
    preheader: "Ett avsnitt på 8 minuter om något som nästan ingen vågar säga högt.",
    body: `
      ${eyebrow("5 dagar före · Podcast 8 min")}
      ${greet()}
      ${p("Det är fem dagar kvar till webbinariet, och jag vill dela något personligt med dig innan dess.")}
      ${p("För tio år sedan hade jag allt på plats – och ändå vaknade jag om nätterna med en tomhet som jag inte kunde förklara. Jag var inte deprimerad. Inte sjuk. Bara avstängd.")}
      ${p("Jag har spelat in ett avsnitt på cirka 8 minuter där jag berättar hela den historien. Det är det mest ärliga jag någonsin har delat.")}
      ${italic("I avsnittet får du höra:")}
      <ul style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:14px;">Varför &ldquo;jag borde inte klaga&rdquo; är en av de farligaste meningarna en kvinna kan säga till sig själv.</li>
        <li style="margin-bottom:14px;">De tre tysta tecknen på att din kropp har varit i beredskap för länge (de flesta känner igen minst två).</li>
        <li style="margin-bottom:14px;">Varför mer vilja, mer disciplin och mer &ldquo;skärp dig&rdquo; faktiskt gör det värre – inte bättre.</li>
      </ul>
      ${cta("🎧 Lyssna här (8 min)", "podcast_page_link")}
      ${p("Lyssna gärna under en promenad eller medan du diskar. Och lägg märke till vad som rör sig i din kropp medan du lyssnar – det är ofta där svaret börjar.")}
      ${pLast("Vi ses om fem dagar.")}
      ${infoBox([
        {
          label: "🔗&nbsp; Din länk",
          value: `<a href="{{custom_values.webinar_join_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_join_link}}</a>`,
        },
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}} kl. {{custom_values.time_of_the_webinar}}" },
      ])}
      ${signOff("Gaia")}
      ${psBox("Om något i avsnittet känns igen – då är du på precis rätt väg och på precis rätt webbinar.")}
    `,
  }),
};
