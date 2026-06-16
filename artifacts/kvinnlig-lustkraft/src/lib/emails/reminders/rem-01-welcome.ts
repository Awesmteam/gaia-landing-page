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

// Påminnelsesekvens efter anmälan · Mejl 1 — skickas direkt efter anmälan
export const rem01Welcome: EmailTemplate = {
  id: "rem-01-welcome",
  group: "Påminnelse efter anmälan",
  label: "Påminnelse 1 · Straks · Välkommen",
  subject: "Din plats är bokad — välkommen ❤️",
  preheader: "Läs detta på två minuter, så vet du precis vad som väntar dig.",
  html: wrapEmail({
    preheader: "Läs detta på två minuter, så vet du precis vad som väntar dig.",
    body: `
      ${eyebrow("Bekräftelse · Din plats är bokad")}
      ${greet()}
      ${p("Så fint att du är här.")}
      ${p("Du hade kunnat göra vad som helst med din tid – men något inom dig valde att säga ja till detta. Det betyder något. Och din plats är nu bokad.")}
      ${italic("Här är det du behöver:")}
      ${infoBox([
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}}" },
        { label: "🕢&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}} svensk tid" },
        {
          label: "🔗&nbsp; Din länk",
          value: `<a href="{{custom_values.webinar_join_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_join_link}}</a>`,
        },
      ])}
      ${cta("Lägg in webbinariet i din kalender", "webinar_add_to_calendar_link")}
      ${p("(Det tar tio sekunder – och kan vara skillnaden mellan att vara med och att missa det.)")}
      ${p("Jag vill att du ska veta vad som väntar dig de kommande dagarna. För det här är inte bara en påminnelse om ett datum. Det är en liten resa fram till kvällen vi ska dela tillsammans:")}
      <ul style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:14px;">Om några dagar skickar jag dig en <strong>podcast</strong> där jag berättar min egen historia – och varför så många starka, välfungerande kvinnor känner sig avstängda på insidan.</li>
        <li style="margin-bottom:14px;">Därefter får du en kort <strong>video</strong> med en konkret övning som du kan göra hemma, helt kostnadsfritt, för att börja lugna ditt nervsystem redan innan webbinariet.</li>
        <li style="margin-bottom:14px;">Du får också en <strong>artikel</strong> om biologin bakom – och några ord från kvinnor som har gått vägen före dig.</li>
      </ul>
      ${p("Med andra ord: du behöver inte vänta till webbinariet för att börja känna skillnad.")}
      ${p("Det här blir ingen vanlig föreläsning. Vi ska utforska varför kroppen stänger ner lust, energi och livskraft när en kvinna har varit stark alldeles för länge – och vad som faktiskt krävs för att den ska öppna sig igen.")}
      ${pLast("Du behöver inte förbereda någonting. Kom precis som du är.")}
      ${p("Vi ses snart.")}
      ${signOff("Gaia")}
      ${psBox("Spara detta mejl i en egen mapp – då hittar du alltid din länk igen.")}
    `,
  }),
};
