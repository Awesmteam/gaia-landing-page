import {
  wrapEmail,
  greet,
  eyebrow,
  h1,
  p,
  pLast,
  italic,
  signOff,
  cta,
  ctaLight,
  infoBox,
  psBox,
  divider,
} from "./shell";

export interface EmailTemplate {
  id: string;
  label: string;
  subject: string;
  preheader: string;
  html: string;
}

/* ----- 0. Registration confirmation ----- */
const registrationConfirmation: EmailTemplate = {
  id: "00-registration",
  label: "Bekräftelse efter anmälan",
  subject: "Du är anmäld – vi ses snart 💛",
  preheader:
    "Du är anmäld till Kvinnlig Lustkraft – här är allt du behöver inför vårt webbinarium.",
  html: wrapEmail({
    preheader:
      "Du är anmäld till Kvinnlig Lustkraft – här är allt du behöver inför vårt webbinarium.",
    body: `
      ${eyebrow("Bekräftelse · Din plats är säkrad")}
      ${greet()}
      ${p("Du är anmäld. Och jag vill att du ska veta – det här var ett riktigt bra beslut.")}
      ${p("De flesta kvinnor jag möter har gått och känt att något saknas. Länge. Men de har skjutit på det. Väntat. Tänkt att det kanske löser sig av sig självt.")}
      ${pLast("Du valde annorlunda. Du sa ja till dig själv. Och det firar vi.")}
      ${italic("Här är vad som väntar dig:")}
      ${infoBox([
        { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}}" },
        { label: "🕖&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}}" },
        {
          label: "🔗&nbsp; Länk",
          value: `<a href="{{custom_values.webinar_zoom_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_zoom_link}}</a>`,
        },
      ])}
      ${cta("Lägg till i din kalender", "webinar_add_to_calendar_link")}
      ${p("Under de här 90 minuterna kommer jag visa dig något som de flesta kvinnor aldrig fått lära sig. Hur din kropp faktiskt fungerar – och varför det du provat hittills inte har räckt hela vägen.")}
      ${p("Kvinnor jag har arbetat med brukar säga att de önskar att de hade fått veta det här för tjugo år sedan. Att pusselbiten äntligen föll på plats.")}
      ${pLast("Du behöver inte förbereda något. Hitta en lugn plats där du kan vara ifred, häll upp något gott att dricka, och kom som du är. Det räcker.")}
      ${divider()}
      ${p("Jag ser verkligen fram emot att träffa dig.")}
      ${signOff()}
      ${psBox("Kolla att mejlet inte hamnade i skräppost – dra det till inkorgen så missar du ingenting inför vårt webbinarium.")}
    `,
  }),
};

/* ----- 1. Right after webinar ----- */
const email1: EmailTemplate = {
  id: "01-right-after",
  label: "Sales 1 · Right after webinar",
  subject: "Tack för ikväll 💛",
  preheader: "Det som hände ikväll var verkligt – och det är ditt.",
  html: wrapEmail({
    preheader: "Det som hände ikväll var verkligt – och det är ditt.",
    body: `
      ${eyebrow("Direkt efter webinaret")}
      ${greet()}
      ${p("Jag sitter här efter kvällen och känner fortfarande energin från det vi delade.")}
      ${p("Det betyder något att du var med.")}
      ${p("Det som hände var verkligt — och det du kände försvinner inte, det är ditt. Men det lever starkast just nu, innan vardagen lägger sig över det. Du känner det inte i huvudet, du känner det i kroppen — lyssna på det!")}
      ${p("För dig som vill gå djupare är Kvinnlig Lustkraft nästa steg.")}
      ${pLast("Går du med före klockan 21.00 ikväll får du även <strong>MATKA</strong> — en ceremoniell föreläsning och vägledd hypnos om livmoderns kraft. I vanliga fall delar jag bara den här på mina retreater.")}
      ${cta("JA — JAG TAR STEGET NU", "sale_page_link")}
      ${pLast("Missade du delar av kvällen? Inspelningen skickas ut imorgon.")}
      ${signOff()}
    `,
  }),
};

/* ----- 2. 1 day after ----- */
const email2: EmailTemplate = {
  id: "02-day-1",
  label: "Sales 2 · 1 dag efter",
  subject: "Det jag sällan delar så öppet",
  preheader: "Min vändpunkt var inte mer kunskap — det var trygghet i nervsystemet.",
  html: wrapEmail({
    preheader:
      "Min vändpunkt var inte mer kunskap — det var trygghet i nervsystemet.",
    body: `
      ${eyebrow("1 dag efter webinaret")}
      ${greet()}
      ${p("Jag vill berätta något jag sällan delar så öppet.")}
      ${p("I tio år hade jag en känsla av att det finns något mer. Jag hade byggt företag, rest världen runt och utbildat tiotusentals människor. Jag hade en man jag älskade, familj och barnbarn. Utåt sett hade jag allt.")}
      ${p("Men inuti fanns en fråga som kom tillbaka, om och om igen…")}
      ${italic("Vad är det som saknas?")}
      ${p("Jag försökte lösa det på samma sätt som jag alltid löst saker — med mer kunskap, mer struktur och mer fokus. Jag fortsatte att prestera — men kroppen var inte med. Det var som att jag levde mitt liv utan att riktigt vara med i det.")}
      ${p("Så räckte någon ut en hand. Inte vid rätt tillfälle, inte när livet hade lugnat sig utan mitt i alltihop — och jag tog den.")}
      ${p("Det som hände var inte dramatiskt — inte ens något jag kunde sätta ord på — men för första gången landade jag i min egen kropp, hemma i mig själv.")}
      ${p("<strong>Min vändpunkt var inte mer kunskap — det var trygghet i nervsystemet.</strong>")}
      ${p("Det är precis det Kvinnlig Lustkraft är byggt för — inte för att ge dig mer kunskap utan för att ge nervsystemet den trygghet det behöver för att öppna sig igen. Lager för lager, i rätt ordning och i din takt.")}
      ${pLast("Det finns en väg tillbaka — jag vet det, för jag har gått den.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
    `,
  }),
};

/* ----- 3. 2 days after ----- */
const email3: EmailTemplate = {
  id: "03-day-2",
  label: "Sales 3 · 2 dagar efter",
  subject: "Hon var inte olycklig – bara färglös",
  preheader: "Kroppen öppnar sig inte när den pressas. Den öppnar sig när den känner sig trygg.",
  html: wrapEmail({
    preheader:
      "Kroppen öppnar sig inte när den pressas. Den öppnar sig när den känner sig trygg.",
    body: `
      ${eyebrow("2 dagar efter webinaret")}
      ${greet()}
      ${p("Jag tänker på en kvinna jag mötte; hon kom inte för att något hade gått sönder. Arbete, relationer och vardagen — allt fanns på plats. Hon var en stark, duktig och kompetent kvinna.")}
      ${italic("Men hon sa: jag känner mig färglös.")}
      ${p("Inte olycklig, inte deprimerad — bara på autopilot. Som om livet hände henne — men på avstånd. Allt hon skapade kom från disciplin, inte från glöd — innerst inne visste hon att det inte var mer prestation hon behövde.")}
      ${p("Det hon saknade var rörelse — den där inre känslan av: jag vill, jag längtar, jag lever.")}
      ${p("Jag hör den känslan om och om igen.")}
      ${p("Det hon sa efteråt har stannat kvar hos mig.")}
      ${italic("&ldquo;Jag trodde jag behövde bli mer — det är vad jag har fått lära mig hela livet — men jag behövde inte bli mer, jag behövde sluta hålla tillbaka.&rdquo;")}
      ${p("Det var där allting vände — inte när hon ansträngde sig mer, utan när hon slutade hålla tillbaka.")}
      ${p("<strong>Kroppen öppnar sig inte när den pressas. Den öppnar sig när den känner sig trygg.</strong> Det är biologi, inte filosofi.")}
      ${p("Den resan — att skapa den tryggheten, lager för lager — det är precis vad vi gör tillsammans i Kvinnlig Lustkraft.")}
      ${pLast("Känner du igen dig i henne? Då skriver jag det här till dig.")}
      ${italic("Erbjudandet från webinaret — 7 995 kr — gäller till på tisdag.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
      ${psBox(`Inspelningen från webinaret hittar du här: <a href="{{custom_values.recording_page_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.recording_page_link}}</a>`)}
    `,
  }),
};

/* ----- 4. 3 days after ----- */
const email4: EmailTemplate = {
  id: "04-day-3",
  label: "Sales 4 · 3 dagar efter",
  subject: "Ingenting förändras om ingenting förändras",
  preheader:
    "Hur kommer det kännas om ett år om ingenting förändras?",
  html: wrapEmail({
    preheader: "Hur kommer det kännas om ett år om ingenting förändras?",
    body: `
      ${eyebrow("3 dagar efter webinaret")}
      ${greet()}
      ${p("Inte för att göra dig illa till mods — utan för att jag bryr mig — vill jag ställa dig en fråga.")}
      ${p("Om ingenting förändras och livet fortsätter precis som nu, samma tempo, samma ansvar och samma känsla av att något skaver.")}
      ${italic("Hur kommer det då kännas om ett år?")}
      ${p("Det är inte en retorisk fråga — det är den viktigaste frågan du kan ställa dig just nu. Det finns två saker som håller oss kvar: <strong>rädsla</strong> och <strong>sanning</strong> — och de känns olika i kroppen.")}
      ${p("Rädslan säger — vänta! Jag gör det när jobbet lugnat ner sig, när barnen inte behöver mig, när jag känner mig mer säker. Men den tiden dyker inte upp av sig själv, det vet du lika väl som jag.")}
      ${p("Sanningen säger något annat — den agerar inte av stress eller för att den måste, utan för att något i kroppen är färdigt med att vänta.")}
      ${p("Du behöver inte bli mer redo än du är just nu — du behöver bara lyssna på vad kroppen säger.")}
      ${p("Det är precis det vi arbetar med i Kvinnlig Lustkraft — att lyssna på kroppen.")}
      ${pLast("Ingenting förändras om ingenting förändras — det vet du redan, och om något i dig säger ja när du läser det här, lyssna på det.")}
      ${italic("Om du vill göra den resan med mig — välkommen! Erbjudandet från webinaret, 7 995 kr, gäller till på tisdag.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
      ${psBox(`Inspelningen från webinaret hittar du här: <a href="{{custom_values.recording_page_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.recording_page_link}}</a>`)}
    `,
  }),
};

/* ----- 5. 4 days after ----- */
const email5: EmailTemplate = {
  id: "05-day-4",
  label: "Sales 5 · 4 dagar efter",
  subject: "Det är inte egoism",
  preheader: "Att välja dig själv är inte egoism — det är biologi.",
  html: wrapEmail({
    preheader: "Att välja dig själv är inte egoism — det är biologi.",
    body: `
      ${eyebrow("4 dagar efter webinaret")}
      ${greet()}
      ${p("Det finns en röst som nästan varje kvinna jag arbetar med känner igen — rösten som säger: <em>men är det verkligen min tur?</em>")}
      ${p("Jag känner igen den rösten — jag har burit den själv.")}
      ${p("Kvinnor som ger och fixar och håller ihop, som ställer upp för alla andra och sedan, när det äntligen finns en möjlighet att välja sig själv, då känns det konstigt — nästan fel, som om man behöver förtjäna det först.")}
      ${p("Att välja dig själv är inte egoism — det är inte att ta från någon annan, det är biologi. En kropp som aldrig får landa börjar till slut stänga ner, och när du väljer dig själv överlever du inte bara — <strong>du börjar leva</strong>. Det förändrar inte bara dig — det förändrar allt runt omkring dig. Det är inte egoism. Det är det mest generösa du kan göra.")}
      ${pLast("Du behöver inte förtjäna det — du får lov, NU.")}
      ${italic("Om något i dig känner igen det här — då är det här för dig. Erbjudandet från webinaret, 7 995 kr, gäller till på tisdag.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
    `,
  }),
};

/* ----- 6. 5 days morning ----- */
const email6: EmailTemplate = {
  id: "06-day-5-morning",
  label: "Sales 6 · 5 dagar efter (morgon)",
  subject: "Varför jag gör det här",
  preheader: "Idag är sista dagen — om något i dig säger ja, lyssna på det.",
  html: wrapEmail({
    preheader: "Idag är sista dagen — om något i dig säger ja, lyssna på det.",
    body: `
      ${eyebrow("5 dagar efter · morgon")}
      ${greet()}
      ${p("Jag tänker ofta på vad som driver mig — och det är den stunden när en kvinna slutar kämpa mot sig själv och börjar landa. När axlarna sjunker, andningen förändras och något i ögonen vaknar som inte var där innan.")}
      ${p("Jag vet hur det känns att inte ha den kontakten — att fungera, leverera och hålla ihop men inte riktigt vara hemma i sig själv. Jag har levt det och jag vet vad det kostar, inte dramatiskt utan stilla, lite i taget.")}
      ${pLast("Det är därför Kvinnlig Lustkraft finns — för det är lätt att tro att lustkraft handlar om sexualitet, men det gör det inte. Det handlar om livet och om hur det känns att vara i sin kropp en vanlig dag — och om att lära sig lyssna på kroppens intelligens. Inte som en tillfällig upplevelse utan som en ny grund att leva ifrån.")}
      ${italic("Idag är sista dagen — om något i dig säger ja, lyssna på det.")}
      ${italic("Erbjudandet från webinaret, 7 995 kr, gäller till midnatt ikväll.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
    `,
  }),
};

/* ----- 7. 5 days 12.00 — same subject, "Du har följt med" body ----- */
const email7: EmailTemplate = {
  id: "07-day-5-noon-a",
  label: "Sales 7 · 5 dagar efter (12.00)",
  subject: "Varför jag gör det här",
  preheader: "Du har följt med hela vägen hit — nu är det dags att ta steget.",
  html: wrapEmail({
    preheader: "Du har följt med hela vägen hit — nu är det dags att ta steget.",
    body: `
      ${eyebrow("5 dagar efter · 12.00")}
      ${greet()}
      ${p("Jag tänker ofta på vad som driver mig — och det är den stunden när en kvinna slutar kämpa mot sig själv och börjar landa. När axlarna sjunker, andningen förändras och något i ögonen vaknar som inte var där innan.")}
      ${p("Jag vet hur det känns att inte ha den kontakten — att fungera, leverera och hålla ihop men inte riktigt vara hemma i sig själv. Jag har levt det och jag vet vad det kostar, inte dramatiskt utan stilla, lite i taget.")}
      ${pLast("Det är därför Kvinnlig Lustkraft finns — för det är lätt att tro att lustkraft handlar om sexualitet, men det gör det inte. Det handlar om livet och om hur det känns att vara i sin kropp en vanlig dag — och om att lära sig lyssna på kroppens intelligens. Inte som en tillfällig upplevelse utan som en ny grund att leva ifrån.")}
      ${italic("Du har följt med hela vägen hit — nu är det dags att ta steget. Jag vill så gärna få ge dig det du längtar efter. Erbjudandet från webinaret, 7 995 kr, gäller till midnatt ikväll.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
    `,
  }),
};

/* ----- 8. 5 days 12.00 — "Vad som faktiskt förändras" ----- */
const email8: EmailTemplate = {
  id: "08-day-5-noon-b",
  label: "Sales 8 · 5 dagar efter (12.00)",
  subject: "Vad som faktiskt förändras",
  preheader: "Vad betyder det egentligen, att komma hem till dig själv?",
  html: wrapEmail({
    preheader: "Vad betyder det egentligen, att komma hem till dig själv?",
    body: `
      ${eyebrow("5 dagar efter · 12.00")}
      ${greet()}
      ${p("Du har hört mig prata om att komma hem till dig själv. Men vad betyder det egentligen i din vardag?")}
      <ul style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:8px;">Du slutar säga ja när du menar nej — utan skuld, utan att behöva förklara dig.</li>
        <li style="margin-bottom:8px;">Du har energi kvar på kvällen — inte bara rester som räcker till soffan, utan riktig energi.</li>
        <li style="margin-bottom:8px;">Du förstår varför du reagerar som du gör — och istället för att döma dig själv möter du dig med nyfikenhet.</li>
        <li style="margin-bottom:8px;">Du slutar vänta på att han ska se dig — för du ser dig själv nu.</li>
        <li style="margin-bottom:8px;">Du sover bättre — inte för att du är utmattad, utan för att kroppen är lugn.</li>
        <li style="margin-bottom:8px;">Det som andra säger och gör fastnar inte på samma sätt längre — det är deras, inte ditt.</li>
      </ul>
      ${p("Och under allt det där — en känsla av att du äntligen är hemma. I din egen kropp. I ditt eget liv.")}
      ${p("Det är vad Kvinnlig Lustkraft ger dig — inte som en tillfällig känsla utan som en ny grund att leva ifrån.")}
      ${pLast("Du gör inte det här ensam — vi är många kvinnor i samma process och vi gör det tillsammans. Det är precis det som gör Kvinnlig Lustkraft unik. Jag hoppas få välkomna dig in. Erbjudandet från webinaret, 7 995 kr, gäller till midnatt ikväll.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
    `,
  }),
};

/* ----- 9. 5 days 16.00 ----- */
const email9: EmailTemplate = {
  id: "09-day-5-1600",
  label: "Sales 9 · 5 dagar efter (16.00)",
  subject: "Din kropp vet redan svaret",
  preheader: "Kroppen ljuger inte — och den har inte gett upp på dig.",
  html: wrapEmail({
    preheader: "Kroppen ljuger inte — och den har inte gett upp på dig.",
    body: `
      ${eyebrow("5 dagar efter · 16.00")}
      ${greet()}
      ${p("Du vet redan vad du vill. Kroppen har vetat ett tag nu — den ljuger inte och den har inte gett upp på dig, inte ens när du gett upp på den.")}
      ${pLast("Det enda som är kvar är att lyssna på den, och ja, jag vet att det är stort — att välja sig själv är ovant när man i så många år har varit andra till lags, men jag är med dig hela vägen.")}
      ${italic("Jag väntar på dig. Erbjudandet från webinaret, 7 995 kr, gäller till midnatt ikväll.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
    `,
  }),
};

/* ----- 10. 5 days 20.00 — final ----- */
const email10: EmailTemplate = {
  id: "10-day-5-2000",
  label: "Sales 10 · 5 dagar efter (20.00) · sista mejlet",
  subject: "Nu räcker jag ut min hand",
  preheader: "Du behöver bara säga ja till dig själv. Resten tar vi tillsammans.",
  html: wrapEmail({
    preheader:
      "Du behöver bara säga ja till dig själv. Resten tar vi tillsammans.",
    body: `
      ${eyebrow("5 dagar efter · 20.00 · sista mejlet")}
      ${greet()}
      ${p("Det här är mitt sista mail till dig — och jag vet att du har följt med, läst och känt efter. Något i dig vet redan, om du lyssnar noga.")}
      ${p("Och ja, det kan kännas stort — det var det för mig också när jag tog mitt steg.")}
      ${p("Du behöver inte ha allting klart eller veta exakt hur det ska bli — du behöver bara säga ja till dig själv. Resten tar vi tillsammans.")}
      ${pLast("Nu räcker jag ut min hand — precis som någon en gång räckte ut sin till mig.")}
      ${italic("Erbjudandet från webinaret, 7 995 kr, gäller till midnatt ikväll.")}
      ${cta("TA MIG TILL KURSEN", "sale_page_link")}
      ${signOff()}
    `,
  }),
};

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  registrationConfirmation,
  email1,
  email2,
  email3,
  email4,
  email5,
  email6,
  email7,
  email8,
  email9,
  email10,
];
