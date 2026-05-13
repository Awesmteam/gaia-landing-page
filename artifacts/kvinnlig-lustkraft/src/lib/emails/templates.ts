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
  subject: "Du är med! 💛",
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
        { label: "🕖&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}} svensk tid" },
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

/* ============== BEFORE WEBINAR EMAILS (BWE) ============== */

const webinarInfoBox = () =>
  infoBox([
    { label: "📅&nbsp; Datum", value: "{{custom_values.date_of_the_webinar}}" },
    { label: "🕖&nbsp; Tid", value: "{{custom_values.time_of_the_webinar}} svensk tid" },
    {
      label: "🔗&nbsp; Länk",
      value: `<a href="{{custom_values.webinar_zoom_link}}" target="_blank" rel="noopener" style="color:#a87b6e;text-decoration:underline;font-weight:600;">{{custom_values.webinar_zoom_link}}</a>`,
    },
  ]);

const ctaJoin = (label = "Klicka här för att gå med") => cta(label, "webinar_zoom_link");

/* ----- BWE 1: 5 days before ----- */
const bwe1: EmailTemplate = {
  id: "bwe-01",
  label: "BWE 1 · 5 dagar före",
  subject: "Jag skickade mina vänner i tio år. Men själv vågade jag inte.",
  preheader: "Mod föds inte innan du tar steget. Mod föds i steget.",
  html: wrapEmail({
    preheader: "Mod föds inte innan du tar steget. Mod föds i steget.",
    body: `
      ${eyebrow("5 dagar före webinaret")}
      ${greet()}
      ${p("I tio år skickade jag mina vänner på kurser. De kom tillbaka med glittrande ögon. Förändrade. Levande.")}
      ${italic("Och jag stod kvar.")}
      ${p("Jag tänkte: jag har ju man och barn och företag. Jag kan inte. Det där är inte för mig.")}
      ${p("Men vet du vad det egentligen handlade om?")}
      ${p("Jag var rädd. Rädd för vad jag skulle hitta. Rädd för att ta plats. Rädd för att det kanske skulle förändra allt.")}
      ${p("Det är ju så vi ofta gör, eller hur? Vi väntar. Tills vi är redo. Tills det passar bättre. Tills barnen är större, tills jobbet lugnar sig, tills, tills, tills.")}
      ${p("Men jag lärde mig något viktigt: <strong>Mod föds inte innan du tar steget. Mod föds i steget.</strong>")}
      ${p("Så jag tog det. Och efteråt tänkte jag bara: <em>Jag är hemma. På riktigt.</em>")}
      ${pLast("Inte för att jag blev någon annan. Utan för att jag äntligen fick vara jag.")}
      ${italic("Det är därför vi ses på:")}
      ${webinarInfoBox()}
      ${p("Jag vill visa dig vad jag hittade. Inte för att du ska bli som mig. Utan för att du ska få tillgång till dig.")}
      ${pLast("Vad längtar du mest efter just nu? Svara gärna. Jag läser allt.")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 2: 4 days before ----- */
const bwe2: EmailTemplate = {
  id: "bwe-02",
  label: "BWE 2 · 4 dagar före",
  subject: "Hon hade gått till terapeut i åratal. Sen sa hon: ”Var det så här enkelt?”",
  preheader: "Kroppen ljuger inte. Och den har inte glömt vägen hem till dig.",
  html: wrapEmail({
    preheader: "Kroppen ljuger inte. Och den har inte glömt vägen hem till dig.",
    body: `
      ${eyebrow("4 dagar före webinaret")}
      ${greet()}
      ${p("En kvinna kom till mig. Hon hade försökt allt.")}
      ${p("Terapeut. Gynekolog. Läkare. Alla sa samma sak: det är klimakteriet, det är normalt, det finns inte så mycket att göra.")}
      ${p("Hon hade nästan gett upp.")}
      ${italic("Men vet du vad som hände?")}
      ${p("Det tog inte lång tid. Inte för att jag gjorde något magiskt – utan för att vi gick tillbaka till kroppen. Och kroppen visste redan.")}
      ${italic("Efteråt sa hon: &ldquo;Här har jag gått i terapi i åratal. Och så var det så här lätt?&rdquo;")}
      ${p("Jag förstår att det kan låta konstigt. Men det är lite som att köra bil. När du väl kan det, glömmer du det aldrig. Körkortet är redan på plats – du har bara glömt att kroppen vet.")}
      ${p("Vi har lärt oss att leta efter svar utanför oss själva. Hos experter. I böcker. På nätet.")}
      ${pLast("Men kroppen ljuger inte. Och den har inte glömt vägen hem till dig.")}
      ${italic("Det är precis det jag kommer visa dig på:")}
      ${webinarInfoBox()}
      ${p("Inte teori. Inte fluff. Utan hur du faktiskt kan börja känna det i din egen kropp.")}
      ${pLast("Känner du igen dig i hennes historia? Svara gärna – jag läser allt.")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 3: 3 days before ----- */
const bwe3: EmailTemplate = {
  id: "bwe-03",
  label: "BWE 3 · 3 dagar före",
  subject: "Varför det inte funkar att ”bara slappna av”",
  preheader: "Det handlar inte om att slappna av. Det handlar om att komma tillbaka till kroppen.",
  html: wrapEmail({
    preheader:
      "Det handlar inte om att slappna av. Det handlar om att komma tillbaka till kroppen.",
    body: `
      ${eyebrow("3 dagar före webinaret")}
      ${greet()}
      ${p("Har du hört det där? &ldquo;Du behöver bara slappna av.&rdquo; &ldquo;Ta det lugnt.&rdquo; &ldquo;Stressa inte.&rdquo;")}
      ${p("Som om det vore så enkelt.")}
      ${p("Du har försökt. Ta ett bad. Tända ett ljus. Dricka ett glas vin. Kanske till och med bokat en massage eller en weekend bort.")}
      ${p("Men sen kommer du tillbaka till vardagen. Och allting känns likadant.")}
      ${italic("Vet du varför?")}
      ${p("För att det inte handlar om att slappna av. Det handlar om <strong>att komma tillbaka till kroppen</strong>.")}
      ${italic("Det är skillnad.")}
      ${p("Avslappning händer i huvudet. Du tänker att du ska slappna av. Du försöker släppa taget.")}
      ${p("Men kroppen fungerar inte så. Den behöver inte att du tänker. Den behöver att du känner. Att du landar. Att du kommer hem.")}
      ${p("Och det har ingen lärt oss.")}
      ${pLast("Vi har lärt oss prestera. Ställa upp. Hålla ihop. Men inte hur vi kommer tillbaka till oss själva.")}
      ${p("Det är det jag vill visa dig på torsdag. Inte fler tips om att slappna av. Utan hur du faktiskt landar i din egen kropp igen.")}
      ${italic("Vi ses:")}
      ${webinarInfoBox()}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 4: 2 days before ----- */
const bwe4: EmailTemplate = {
  id: "bwe-04",
  label: "BWE 4 · 2 dagar före",
  subject: "Det var inget nytt. Men ändå förändrades allt.",
  preheader: "Du behöver inte bli någon annan. Du behöver komma hem till dig själv.",
  html: wrapEmail({
    preheader: "Du behöver inte bli någon annan. Du behöver komma hem till dig själv.",
    body: `
      ${eyebrow("2 dagar före webinaret")}
      ${greet()}
      ${p("En kvinna sa till mig efter att vi jobbat tillsammans:")}
      ${italic("&ldquo;Det som förvånade mig mest var att det här har jag alltid haft. Det var inget nytt. Men förhållningssättet till det är helt nytt.&rdquo;")}
      ${p("Hon hade trott att hon behövde bli någon annan. Fixa sig. Förändra sig.")}
      ${p("Men det hon hittade var sig själv. Den hon alltid varit, under alla lager av att ställa upp, prestera, ta hand om alla andra.")}
      ${italic("Stark. Hel. Levande.")}
      ${p("Inte för att hon blev någon ny. Utan för att hon äntligen fick vara den hon är.")}
      ${p("Det är det jag ser hända, gång på gång. Kvinnor som kommer till mig och tror att de är trasiga. Att något är fel. Att de har tappat bort något de aldrig kan få tillbaka.")}
      ${pLast("Och sen upptäcker de att allt finns kvar. Kroppen har inte glömt. Den väntade bara på att de skulle komma tillbaka.")}
      ${p("Det är det jag vill visa dig på torsdag.")}
      ${p("Inte hur du blir någon annan. Utan hur du kommer hem till dig själv.")}
      ${italic("Vi ses:")}
      ${webinarInfoBox()}
      ${pLast("Hur skulle det kännas att vakna och känna sig som du igen?")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 5: 1 day before (morning) ----- */
const bwe5: EmailTemplate = {
  id: "bwe-05",
  label: "BWE 5 · 1 dag före (morgon)",
  subject: "Vad som brukar hända",
  preheader: "Imorgon ses vi. Och jag vill berätta vad som brukar hända.",
  html: wrapEmail({
    preheader: "Imorgon ses vi. Och jag vill berätta vad som brukar hända.",
    body: `
      ${eyebrow("1 dag före · morgon")}
      ${greet()}
      ${p("Imorgon ses vi. Och jag vill berätta vad som brukar hända.")}
      ${p("Först är folk nervösa. De vet inte riktigt vad de gett sig in på. De har kameran avstängd och sitter lite på avstånd.")}
      ${italic("Sen börjar något hända.")}
      ${p("Någon känner igen sig i det jag säger. Någon annan vågar skriva något i chatten. Och plötsligt är det inte längre ett webinar – det är ett rum fullt av kvinnor som bär på samma längtan.")}
      ${p("Efter en stund märker jag det i kroppen. Energin förändras. Det blir mjukare. Varmare. Som om vi alla andas ut samtidigt.")}
      ${p("Och när vi är klara skriver folk saker som:")}
      <ul style="margin:0 0 24px 0;padding:0 0 0 22px;color:#3a4a4a;font-size:16px;line-height:1.8;">
        <li style="margin-bottom:8px;font-style:italic;">&ldquo;Jag visste inte att det var det här jag behövde.&rdquo;</li>
        <li style="margin-bottom:8px;font-style:italic;">&ldquo;Äntligen känner jag mig inte ensam med det här.&rdquo;</li>
        <li style="margin-bottom:8px;font-style:italic;">&ldquo;Wow, nu ska det bli spännande att uppleva världen utanför.&rdquo;</li>
      </ul>
      ${italic("Det är det som väntar imorgon.")}
      ${webinarInfoBox()}
      ${pLast("Kom som du är. Du behöver inte ha kameran på. Bara kom.")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 6: 1 day before (evening) ----- */
const bwe6: EmailTemplate = {
  id: "bwe-06",
  label: "BWE 6 · 1 dag före (kväll)",
  subject: "Vi ses imorgon 💛",
  preheader: "Bara en snabb påminnelse – imorgon är det dags.",
  html: wrapEmail({
    preheader: "Bara en snabb påminnelse – imorgon är det dags.",
    body: `
      ${eyebrow("1 dag före · kväll")}
      ${greet()}
      ${p("Bara en snabb påminnelse – imorgon är det dags.")}
      ${p("Jag vet hur lätt det är att glömma. Att något kommer emellan. Att man tänker &ldquo;jag tar det en annan gång&rdquo;.")}
      ${p("Men det är något med att vara där. I rummet. Tillsammans med andra kvinnor som längtar efter samma sak.")}
      ${p("Det går inte att förklara riktigt. Man måste uppleva det.")}
      ${pLast("Så lägg in det i kalendern nu om du inte redan gjort det. Säg till familjen att du är upptagen en och en halv timme. Stäng dörren. Gör det här för dig.")}
      ${italic("Imorgon kl. {{custom_values.time_of_the_webinar}}")}
      ${webinarInfoBox()}
      ${cta("Lägg till i din kalender", "webinar_add_to_calendar_link")}
      ${pLast("Jag ser fram emot att se dig där.")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 7: Morning of webinar ----- */
const bwe7: EmailTemplate = {
  id: "bwe-07",
  label: "BWE 7 · Morgonen för webinaret",
  subject: "En sak jag vill att du tar med dig ikväll",
  preheader: "Hur levande vill du faktiskt vara?",
  html: wrapEmail({
    preheader: "Hur levande vill du faktiskt vara?",
    body: `
      ${eyebrow("Idag · webinardagen")}
      ${greet()}
      ${p("Idag är det dags. Och jag vill ge dig något att tänka på innan vi ses.")}
      ${italic("Jag brukar fråga kvinnor: &ldquo;Hur levande vill du vara?&rdquo;")}
      ${p("Inte hur levande du borde vara. Inte hur levande du kan vara om allt blir perfekt.")}
      ${p("Utan <strong>hur levande vill du faktiskt vara?</strong> I din kropp. I ditt liv. I dina relationer.")}
      ${p("De flesta har aldrig ställt sig den frågan. Vi är så vana vid att överleva vardagen att vi glömt att fråga oss vad vi egentligen längtar efter.")}
      ${pLast("Ta med dig den frågan ikväll. Du behöver inte ha ett svar. Bara låt den vara där.")}
      ${webinarInfoBox()}
      ${pLast("Och en praktisk grej – testa länken innan så du vet att den funkar. Sådant tekniskt strul vill vi inte ha i sista sekunden.")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 8: 1 hour before ----- */
const bwe8: EmailTemplate = {
  id: "bwe-08",
  label: "BWE 8 · 1 timme före",
  subject: "Om en timme börjar vi",
  preheader: "Det här är din tid.",
  html: wrapEmail({
    preheader: "Det här är din tid.",
    body: `
      ${eyebrow("1 timme före start")}
      ${greet()}
      ${italic("En timme kvar.")}
      ${p("Avsluta det du håller på med. Häll upp något gott att dricka. Hitta en plats där du får vara ifred en stund.")}
      ${p("<strong>Det här är din tid.</strong>")}
      ${ctaJoin("Klicka här för att komma in")}
      ${italic("Vi börjar kl. {{custom_values.time_of_the_webinar}}.")}
      ${pLast("Ses strax.")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 9: 15 minutes before ----- */
const bwe9: EmailTemplate = {
  id: "bwe-09",
  label: "BWE 9 · 15 min före",
  subject: "Dörren är öppen – kom in",
  preheader: "Nu är det dags. Jag väntar på dig.",
  html: wrapEmail({
    preheader: "Nu är det dags. Jag väntar på dig.",
    body: `
      ${eyebrow("15 min före start")}
      ${greet()}
      ${italic("Nu är det dags. Dörren är öppen.")}
      ${ctaJoin("Klicka här för att komma in")}
      ${pLast("Jag väntar på dig.")}
      ${signOff()}
    `,
  }),
};

/* ----- BWE 10: 5 min after start ----- */
const bwe10: EmailTemplate = {
  id: "bwe-10",
  label: "BWE 10 · 5 min efter start",
  subject: "Vi har börjat – men du hinner fortfarande",
  preheader: "Vi är igång. Men du hinner fortfarande.",
  html: wrapEmail({
    preheader: "Vi är igång. Men du hinner fortfarande.",
    body: `
      ${eyebrow("5 min efter start")}
      ${greet()}
      ${italic("Vi är igång. Men du hinner fortfarande.")}
      ${ctaJoin("Klicka här och kom in nu")}
      ${pLast("Jag vill att du ska vara med.")}
      ${signOff()}
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
  bwe1,
  bwe2,
  bwe3,
  bwe4,
  bwe5,
  bwe6,
  bwe7,
  bwe8,
  bwe9,
  bwe10,
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
