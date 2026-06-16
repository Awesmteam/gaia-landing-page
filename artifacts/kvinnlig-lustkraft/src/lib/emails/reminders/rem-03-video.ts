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

// Påminnelsesekvens efter anmälan · Mejl 3 — 4 dagar före (D-4) · video
export const rem03Video: EmailTemplate = {
  id: "rem-03-video",
  group: "Påminnelse efter anmälan",
  label: "Påminnelse 3 · D-4 · Video",
  subject: "En 10-minuters övning du kan göra ikväll",
  preheader: "Det är inte vilja som saknas. Det är trygghet – och den kan tränas.",
  html: wrapEmail({
    preheader: "Det är inte vilja som saknas. Det är trygghet – och den kan tränas.",
    body: `
      ${eyebrow("4 dagar före · Video 10 min")}
      ${greet()}
      ${p("Igår berättade jag om problemet. Idag vill jag ge dig något som du faktiskt kan göra något åt – redan ikväll.")}
      ${p("För här är de goda nyheterna: din kropp har inte stängt av för alltid. Den väntar bara på rätt signaler. Och du kan börja ge den dessa signaler helt själv, gratis, hemma i soffan.")}
      ${p("Jag har skapat en video på cirka 10 minuter där jag guidar dig genom en enkel övning som jag kallar &ldquo;Trygghetsövningen&rdquo;. Den arbetar direkt med vagusnerven – kroppens trygghetsnerv – i tre korta steg.")}
      ${italic("Det du kan få ut av övningen:")}
      <ul style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:14px;">En kropp som känner sig lite lugnare och mjukare efteråt.</li>
        <li style="margin-bottom:14px;">Djupare andetag, lägre axlar och mindre inre stress.</li>
        <li style="margin-bottom:14px;">En konkret upplevelse av vad &ldquo;trygghet i kroppen&rdquo; faktiskt betyder – inte som en idé, utan som en upplevelse.</li>
      </ul>
      ${italic("Så här använder du den:")}
      <ol style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:14px;">Avsätt 10 minuter där du kan vara ostörd.</li>
        <li style="margin-bottom:14px;">Sitt eller ligg bekvämt. Ha gärna ljudet i hörlurar.</li>
        <li style="margin-bottom:14px;">Gör övningen – och lägg märke till hur kroppen känns före och efter.</li>
        <li style="margin-bottom:14px;">Upprepa den gärna varje kväll fram till webbinariet. Ju oftare du gör den, desto mer lär sig kroppen att det är tryggt.</li>
      </ol>
      ${cta("🎬 Se videon och gör övningen (10 min)", "video_page_link")}
      ${pLast("Det här är bara början. På webbinariet fördjupar vi detta tillsammans – och du får fler verktyg som är skapade särskilt för kvinnokroppen.")}
      ${infoBox([
        {
          label: "🔗&nbsp; Din länk",
          value: `<a href="{{custom_values.webinar_join_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_join_link}}</a>`,
        },
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}} kl. {{custom_values.time_of_the_webinar}}" },
      ])}
      ${signOff("Gaia")}
      ${psBox("Om du bara gör en enda sak idag – gör den här övningen. Tio minuter. Din kropp kommer att tacka dig.")}
    `,
  }),
};
