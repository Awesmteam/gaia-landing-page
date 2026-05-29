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

export const inv03FriEvening: EmailTemplate = {
  id: "12-inv-03-fri-evening",
  label: "Inbjudan 3 · fre 29/5 18:00 · Mini-case",
  subject: "Maria, 47 – hittade tillbaka på 6 veckor",
  preheader: "Det här är inte en framgångssaga. Det är en helt vanlig kvinna.",
  html: wrapEmail({
    preheader: "Det här är inte en framgångssaga. Det är en helt vanlig kvinna.",
    body: `
      ${eyebrow("Värde · En berättelse · 5 min")}
      ${greet()}
      ${p("Jag vill berätta om Maria. Hon heter egentligen något annat. Allt annat är som det var.")}
      ${p("Maria var 47 när hon hörde av sig. Två tonårsbarn, ett bra äktenskap, ett krävande jobb hon faktiskt tyckte om. Inget var fel. Och ändå skrev hon till mig:")}
      ${italic("&ldquo;Jag känner ingenting längre. Inte ledsen. Inte glad. Inte hungrig på något. Det är som att någon dragit ner volymen på hela mitt liv.&rdquo;")}
      ${p("Hon hade varit hos läkaren. Hos terapeuten. Hon hade testat järntillskott, träning, en weekend i Spanien med vännerna. Allt var bra för en kort stund. Sen kom gråtonen tillbaka.")}
      ${divider()}
      ${italic("Det vi gjorde var inte komplicerat.")}
      ${p("Vi började med kroppen. Inte med samtal om barndomen. Inte med ett schema för &ldquo;egen tid&rdquo;. Vi började med att lära hennes nervsystem att det var tryggt att kännas igen.")}
      ${p("Vecka 1: hon märkte att hon andades högre upp i bröstet än hon trott.")}
      ${p("Vecka 3: hon grät en kväll – inte av sorg. För att något lossnade.")}
      ${p("Vecka 6: hon skrev till mig: &ldquo;Jag märkte att jag längtade efter min man igen. Det har jag inte gjort på fyra år.&rdquo;")}
      ${divider()}
      ${italic("Det är inte magi. Det är biologi.")}
      ${p("När nervsystemet känner sig tryggt nog att öppna sig igen, så öppnar kroppen sig. Lust, närvaro, glädje, sömn, hunger – allt det där börjar komma tillbaka i sin egen takt.")}
      ${p("Maria är inte speciell. Hon är som du. Hon hade bara aldrig fått veta att det fanns en väg.")}
      ${p("Det är den vägen jag visar dig på webbinariet.")}
      ${infoBox([
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}}" },
        { label: "🕖&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}} svensk tid" },
        { label: "📍&nbsp; Var", value: "Online – du får länken efter anmälan" },
      ])}
      ${cta("Plocka din plats", "webinar_registration_link")}
      ${pLast("Du behöver inte vara redo. Du behöver bara vara nyfiken.")}
      ${signOff()}
    `,
  }),
};
