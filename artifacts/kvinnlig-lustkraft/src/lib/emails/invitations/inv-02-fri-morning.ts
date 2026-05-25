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
  divider,
} from "../shell";
import type { EmailTemplate } from "../templates";

export const inv02FriMorning: EmailTemplate = {
  id: "11-inv-02-fri-morning",
  label: "Inbjudan 2 · fre 22/5 09:00 · 3 myter",
  subject: "3 myter som håller din lust gisslan",
  preheader:
    "Det här har vi fått lära oss. Och det är därför så få kvinnor hittar tillbaka.",
  html: wrapEmail({
    preheader:
      "Det här har vi fått lära oss. Och det är därför så få kvinnor hittar tillbaka.",
    body: `
      ${eyebrow("Värde · 3 myter · 5 min")}
      ${greet()}
      ${p("Jag har arbetat med tusentals kvinnor. Och jag hör samma tre meningar om och om igen. De låter rimliga. De låter vetenskapliga. De låter nästan som omsorg.")}
      ${italic("Men de håller kvinnor gisslan i ett liv som är mindre än det skulle behöva vara.")}
      ${p("Här är de tre. Läs långsamt. Se om någon av dem bor i dig.")}
      ${divider()}
      ${italic("Myt 1: &ldquo;Det är åldern. Det är hormonerna. Det är inte mycket att göra.&rdquo;")}
      ${p("Det är sant att hormoner förändras. Det är inte sant att din lust och livskraft är beroende av hormonnivåer på det sättet vi fått lära oss. Lust föds i nervsystemet – inte i östrogenet. Och ditt nervsystem kan tränas tillbaka, i vilken ålder som helst.")}
      ${divider()}
      ${italic("Myt 2: &ldquo;Jag måste bara slappna av mer.&rdquo;")}
      ${p("Slappna av är något du gör i huvudet. Att komma hem i kroppen är något helt annat. Det är därför badet, vinet och weekenden bort inte räcker – de släcker stress, men de bygger inte tillbaka kontakten. Två olika saker.")}
      ${divider()}
      ${italic("Myt 3: &ldquo;Jag måste först fixa relationen / vikten / jobbet.&rdquo;")}
      ${p("Nej. Det är tvärtom. När kroppen kommer hem börjar allt annat lägga sig på rätt plats av sig själv. Du behöver inte vänta tills livet är ordnat. Det är när du börjar i kroppen som livet börjar ordna sig.")}
      ${divider()}
      ${p("Det här är inte små detaljer. Det är hela ramen.")}
      ${p("På webbinariet på <strong>{{custom_values.date_of_the_webinar}}</strong> visar jag dig vad som faktiskt händer i kroppen – och varför det du provat hittills inte räckt hela vägen.")}
      ${infoBox([
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}}" },
        { label: "🕖&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}} svensk tid" },
        { label: "💛&nbsp; Pris", value: "Gratis" },
      ])}
      ${cta("Jag vill vara med", "webinar_registration_link")}
      ${pLast("Vilken av de tre myterna kände du igen mest? Svara gärna på mejlet – jag läser allt.")}
      ${signOff()}
    `,
  }),
};
