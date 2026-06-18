import {
  wrapEmail,
  greet,
  eyebrow,
  p,
  pLast,
  italic,
  signOff,
  cta,
  ctaLight,
  infoBox,
  psBox,
} from "../shell";
import type { EmailTemplate } from "../templates";

// Påminnelsesekvens efter anmälan · Mejl 5 — 2 dagar före (D-2) · testimonial
export const rem05Testimonial: EmailTemplate = {
  id: "rem-05-testimonial",
  group: "Påminnelse efter anmälan",
  label: "Påminnelse 5 · D-2 · Testimonial",
  subject: "“Det är som om jag har fått ett liv”",
  preheader: "Tre kvinnor som en gång satt precis där du sitter.",
  html: wrapEmail({
    preheader: "Tre kvinnor som en gång satt precis där du sitter.",
    body: `
      ${eyebrow("2 dagar före · Tre röster")}
      ${greet()}
      ${p("Det är två dagar kvar. Idag vill jag inte prata så mycket själv. Istället vill jag låta några kvinnor som jag har arbetat med berätta – med deras tillåtelse.")}
      ${p("De är inte perfekta människor. De är vanliga kvinnor, precis som du och jag, med helt olika liv. Men de hade en sak gemensamt: de hade tappat kontakten med sig själva. Och de hittade vägen tillbaka.")}
      ${p("<strong>Sonja, 45 år</strong>, drev eget företag och var alltid den starka, den som höll ihop allt. Men inombords var hon helt tom:")}
      ${italic("&ldquo;Jag fungerade – men jag levde inte på riktigt. När min kropp blev lugnare och mjukare igen sa jag till Gaia: det är som om jag har fått ett liv.&rdquo;")}
      ${p("<strong>Sofia, 37 år</strong>, småbarnsmamma och projektledare, kände sig ständigt irriterad och avstängd:")}
      ${italic("&ldquo;Jag har blivit mycket lugnare hemma. Mjukare med barnen. Mer närvarande i relationen. Och lusten är tillbaka – inte bara i kroppen, utan i livet.&rdquo;")}
      ${p("<strong>Maria, 51 år</strong>, trodde att det mesta redan var förbi för hennes del:")}
      ${italic("&ldquo;Det här arbetet har förändrat så mycket, för mig och för min man. Han sa: det är som om jag har fått min fru tillbaka.&rdquo;")}
      ${p("Det finns fler röster – fler kvinnor som vågade tro att förändring var möjlig. Du kan läsa deras berättelser i lugn och ro här:")}
      ${ctaLight("Läs fler kvinnors berättelser", "testimonial_page_link")}
      ${p("Kanske tänker du: &ldquo;Men det är nog för sent för mig.&rdquo; Eller: &ldquo;Det fungerar säkert för andra, men inte för mig.&rdquo;")}
      ${p("Det var precis så Sonja, Sofia och Maria också tänkte. Skillnaden var inte att de hade mer tid, mer energi eller mindre att göra. Skillnaden var att de fick förstå vad som pågick – och fick rätt stöd.")}
      ${pLast("Det är det jag vill ge dig på webbinariet.")}
      ${cta("Jag vill vara med", "webinar_join_link")}
      ${infoBox([
        {
          label: "🔗&nbsp; Din länk",
          value: `<a href="{{custom_values.webinar_join_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_join_link}}</a>`,
        },
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}} kl. {{custom_values.time_of_the_webinar}}" },
      ])}
      ${p("Vi ses om två dagar.")}
      ${signOff("Gaia")}
      ${psBox("Fortsätt gärna med trygghetsövningen under tiden. Varje kväll räknas.")}
    `,
  }),
};
