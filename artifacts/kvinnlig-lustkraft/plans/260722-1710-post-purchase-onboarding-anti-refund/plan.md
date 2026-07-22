# Post-Purchase Onboarding — Anti-Refund System (Kvinnlig Lustkraft®)

**Status:** 📋 ready to build in GHL · **Market:** SE (svenska) · **Platform:** GoHighLevel (LeadConnector) · **Course host:** GHL Memberships
**Goal:** Sänk refund-raten genom att få varje ny kund att (1) logga in i kursen inom 48h, (2) boka sitt Gaia-samtal, (3) delta på LIVE. Copy nedan är **svensk** (klar att klistra in i GHL). *English implementation notes in italics.*

> **Refund-logik (English):** Refunds spike when a buyer never logs in — the purchase feels abstract, doubt creeps in, they charge back. This system attacks the three refund triggers: *friction* (can't find the course), *silence* (no human contact), *no first win* (never experienced value). Every asset below removes one of those.

---

## 1. Översikt — de fyra flödena (English overview)

| # | Workflow | Trigger | Syfte |
|---|----------|---------|-------|
| **A** | **Onboarding Core** (2-dagars aktivering) | Köp genomfört → tag `kund-kvinnlig-lustkraft` | Få kunden in i GHL-kursen inom 48h. Push i 2 dagar, exit när de startat, Slack-larm om de inte gör det. |
| **B** | **Boka med Gaia** | Samma köp-tag | Skicka bokningsinbjudan + boknings-sida direkt efter köp. Påminn tills bokat. |
| **C** | **Pre-LIVE / pre-booking påminnelser** | Bokning bekräftad ELLER LIVE-datum satt | Nudge-sekvens före varje samtal/LIVE så de faktiskt dyker upp. |
| **D** | **8-veckors nurture** | 3 dagar efter köp (tag `onboardad`) | 1 mejl/vecka i 8 veckor, ett per modul. Håller dem engagerade genom hela kursen = ingen refund. |

**Kanaler:** E-post (HTML, samma mall-system som `/emails`), SMS (GHL), Slack (intern notis).
**Nya sidor att bygga:** Välkomstsida (`/valkommen`), SMS-sida med akut-formulär (`/kom-igang`), Boknings-sida (`/boka-gaia`).

---

## 2. GHL-arkitektur

### 2.1 Nya Custom Values (Settings → Custom Values)
*English: add these so every email/SMS/page reuses one source of truth. Same `{{custom_values.x}}` convention as existing `shell.ts`.*

| Custom Value key | Exempelvärde | Används i |
|------------------|--------------|-----------|
| `welcome_page_link` | `https://innershift.se/valkommen` | Mejl O1 |
| `course_login_link` | `https://innershift.se/kurs` (GHL membership login) | Alla onboarding-assets |
| `kickstart_page_link` | `https://innershift.se/kom-igang` | SMS O2 |
| `support_form_link` | `https://innershift.se/kom-igang#hjalp` | SMS-sida, alla push |
| `booking_page_link` | `https://innershift.se/boka-gaia` | Mejl B-serien |
| `gaia_support_phone` | `+46 …` (WhatsApp/SMS-nr för akut hjälp) | SMS-sida |
| `our_email_adress` | `gaia@innershift.se` *(finns redan)* | Footer |

### 2.2 Tags (kund-livscykel)
`kund-kvinnlig-lustkraft` (köp) → `kurs-startad` (loggat in / öppnat modul 1) → `onboardad` → `samtal-bokat` → `live-deltog`
Larm-tags: `ej-startad-48h` (utlöser Slack), `refund-risk`.

### 2.3 Signal: "har kunden startat kursen?" (viktigast)
*English — this is the make-or-break signal. Three ways, in order of reliability:*
1. **Bäst:** GHL Membership-trigger **"Product/Offer — Started"** eller **"Category/Lesson viewed"** → lägg tag `kurs-startad`.
2. **Fallback:** Gör "Öppna kursen"-knappen till en **Trigger Link**. Klick → tag `kurs-startad`.
3. Kombinera båda (OR) för säkerhet.
Tag `kurs-startad` är **Goal-event** i Workflow A → hoppar kunden direkt till exit-grenen (ingen mer push).

### 2.4 Workflow A — Onboarding Core (ASCII)
```
TRIGGER: Tag added "kund-kvinnlig-lustkraft"
   │
   ├─ [GOAL EVENT] Tag "kurs-startad"  ──────────────►  EXIT-gren:
   │                                                     • ta bort ur flödet
   │                                                     • Email O-Grattis ("Du är igång ❤️")
   │                                                     • add tag "onboardad"
   │
   ├─ Direkt:        Email  O1  (Välkommen + Välkomstsida + steg-för-steg)
   ├─ Wait 15 min:   SMS    O2  (bekräftelse + länk till /kom-igang)
   ├─ Wait till 09:00 nästa dag:
   │                 IF NOT "kurs-startad":  Email O3 + SMS O3  (Dag 1-push)
   ├─ Wait 24h (≈ dag 2, 09:00):
   │                 IF NOT "kurs-startad":  Email O4 + SMS O4  (Dag 2-push, "sista knuffen")
   ├─ Wait 6h:
   │                 IF NOT "kurs-startad":
   │                       • add tag "ej-startad-48h" + "refund-risk"
   │                       • SLACK notis (#kundframgang)  → manuell follow-up
   │                       • (valfritt) skapa GHL-task till Gaia/support
   └─ END
```
*English: use one **Wait step with a Goal/branch** rather than sending pushes to people who already logged in. The `kurs-startad` goal short-circuits everything.*

### 2.5 Workflow B — Boka med Gaia
```
TRIGGER: Tag "kund-kvinnlig-lustkraft"
   ├─ Wait 30 min:  Email B1 (Boka ditt välkomstsamtal med Gaia → /boka-gaia)
   ├─ [GOAL] Tag "samtal-bokat" (sätts av GHL Calendar booking) → EXIT
   ├─ Wait 2 dagar:  IF NOT bokat → Email B2 (påminnelse, "din plats väntar")
   └─ Wait 3 dagar:  IF NOT bokat → Email B3 + SMS (sista påminnelse)
```

### 2.6 Workflow C — Pre-samtal / Pre-LIVE påminnelser
```
TRIGGER: Appointment booked (GHL Calendar)  |  eller LIVE-event datum
   ├─ Direkt:         Email C0  (Bekräftelse: "Ditt samtal är bokat")
   ├─ 24h före:       Email C1  (Påminnelse + förbered dig-checklista)
   ├─ 3h före:        SMS   C2  (kort nudge + länk)
   ├─ 15 min före:    SMS   C3  ("Vi börjar nu — klicka här")
   └─ No-show gren:   Email C4 (ombokning) om status = no-show
```

---

## 3. Sidor (page-specar + copy)

### 3.1 Välkomstsida — `/valkommen`  (Mejl O1 länkar hit)
**Syfte:** video + steg-för-steg hur man loggar in i GHL-kursen. Återanvänd design från `WebinarReplay.tsx` (serif, design-tokens, FadeIn).

**Sektioner + svensk copy:**
- **Eyebrow:** `VÄLKOMMEN TILL KVINNLIG LUSTKRAFT®`
- **H1:** `Så glad att du är här, {{contact.first_name}} ❤️`
- **Video:** välkomstvideo från Gaia (Vimeo-embed). *English: 60–90 s, Gaia face-to-camera: "you made the right choice, here's exactly how to start."*
- **Underrubrik:** `Så kommer du in i kursen — på 3 steg`
- **Steg-för-steg (numrerad):**
  1. **Klicka på knappen "Öppna kursen"** längst ner — den tar dig till din inloggning.
  2. **Logga in** med samma e-postadress som du köpte med *(du fick ett separat mejl med ditt lösenord — sök på "Kvinnlig Lustkraft inloggning" i din inkorg)*.
  3. **Börja med Modul 1 och den första hypnosen.** Sätt på hörlurar, sätt dig ostört i 20 minuter. Det är här resan börjar.
- **CTA-knapp (primär):** `Öppna kursen →` → `{{custom_values.course_login_link}}` *(Trigger Link → tag `kurs-startad`)*
- **Trygghets-box:** `Kommer du inte in? Ingen stress. Fyll i formuläret på nästa sida eller svara på SMS:et jag skickar dig om en stund — vi löser det direkt.`
- **PS:** `Spara den här sidan. Här hittar du alltid vägen tillbaka in.`

### 3.2 Kom-igång-sida — `/kom-igang`  (SMS O2 länkar hit)
**Syfte:** video + **akut-kontaktformulär** om de inte kcommer in. *English: this page's job is to catch the frustrated buyer before they refund.*

- **Eyebrow:** `KOM IGÅNG`
- **H1:** `Fastnat? Vi fixar det tillsammans.`
- **Video:** kort skärmvideo (screen-recording) som visar exakt var man loggar in i GHL. *English: 45 s Loom-style walkthrough of the login.*
- **CTA (primär):** `Öppna kursen →` → `{{custom_values.course_login_link}}`
- **Akut-formulär (GHL Form, embed):**
  - Rubrik: `Kommer du fortfarande inte in? Skriv till mig här — jag svarar personligen.`
  - Fält: `Förnamn` (auto), `E-post` (auto), `Vad händer när du försöker logga in?` (textarea), `Telefonnummer (om du vill bli uppringd)` (valfritt)
  - Submit-knapp: `Skicka — hjälp mig komma in`
  - *English: form submit → tag `support-akut` → Slack #kundframgang + assign task. This is the safety valve that stops refunds cold.*
- **Trygghets-rad:** `Eller ring/SMS:a oss direkt: {{custom_values.gaia_support_phone}}`

### 3.3 Boknings-sida — `/boka-gaia`  (Mejl B1 länkar hit)
- **Eyebrow:** `DITT VÄLKOMSTSAMTAL`
- **H1:** `Boka din stund med Gaia`
- **Brödtext:** `Som ny i Kvinnlig Lustkraft® får du ett personligt välkomstsamtal. 20 minuter, bara du och Gaia — så att du vet exakt var du ska börja och känner dig trygg hela vägen.`
- **Embed:** GHL Calendar booking widget.
- **Social proof:** 1–2 korta testimonials (återanvänd Sonja/Sofia/Maria från `TestimonialPage.tsx`).

---

## 4. E-post & SMS — full copy

> **Design (English):** all emails use the existing `shell.ts` helpers (`wrapEmail/greet/eyebrow/p/cta/infoBox/psBox/signOff`). Sign-off `signOff("Gaia")`. Palette redan definierad. Placeholders: `{{contact.first_name}}`, `{{custom_values.*}}`.

### 4.1 Onboarding-mejl & SMS (Workflow A)

---
**O1 · E-post · direkt efter köp — Välkommen**
`Subject:` Välkommen ❤️ Så här kommer du igång
`Preheader:` Din plats i Kvinnlig Lustkraft® är klar — läs detta på två minuter.
`Body:`
> Hej {{contact.first_name}},
>
> Du gjorde det. Du sa ja till dig själv — och det är modigare än de flesta någonsin vågar.
>
> Din plats i **Kvinnlig Lustkraft®** är nu klar, och allt ligger och väntar på dig: 8 moduler, 8 vägledda hypnoser och våra LIVE-möten med mig.
>
> Men jag vill inte att du ska känna dig ensam framför en skärm. Så här börjar du — jag har gjort en kort välkomstvideo och en steg-för-steg-guide åt dig:
>
> **[KNAPP: Se din välkomstvideo & kom igång →]** *(→ `welcome_page_link`)*
>
> Gör så här redan idag:
> 1. Klicka på knappen ovan och titta på min välkomsthälsning (2 min).
> 2. Logga in i kursen med samma e-post som du köpte med.
> 3. Börja med **Modul 1** och den **första hypnosen** — sätt på hörlurar och ge dig själv 20 stilla minuter.
>
> Om du gör *en enda sak* idag: börja med hypnos 1. Det är där kroppen känner skillnaden först.
>
> Om något strular skickar jag dig ett SMS strax med en direktlänk och en väg att nå mig personligen. Du ska aldrig behöva fastna.
>
> Kram, Gaia 💛
>
> *PS. Spara det här mejlet — här finns alltid vägen tillbaka in.*

*English note: opens with pride/identity ("you said yes to yourself"), removes friction (3 steps), plants the SMS safety net, drives ONE micro-win (hypnosis 1).*

---
**O2 · SMS · +15 min — bekräftelse + trygghet**
> Hej {{contact.first_name}}, det är Gaia 💛 Din plats i Kvinnlig Lustkraft® är klar. Här är din direktlänk in + en video om du fastnar: {{custom_values.kickstart_page_link}} — Kommer du inte in? Svara på detta SMS, jag läser allt.

*English: warm, personal, gives the "reply and a human answers" promise — the single biggest refund-killer.*

---
**O3 · E-post · Dag 1, 09:00 (om ej startad) — mjuk knuff**
`Subject:` {{contact.first_name}}, din första hypnos väntar
`Preheader:` 20 minuter idag kan förändra hur hela veckan känns.
`Body:`
> Hej {{contact.first_name}},
>
> Jag såg att du ännu inte hunnit in i kursen — och jag vill bara säga: det är helt okej. Livet är fullt.
>
> Men jag vet också hur det är. Man köper något fint till sig själv… och sedan sväljs det av vardagen. Därför skriver jag: låt inte det här bli en sådan sak.
>
> Du behöver inte hela kursen idag. Du behöver bara **20 minuter och Modul 1**.
>
> **[KNAPP: Öppna Modul 1 →]** *(→ `course_login_link`)*
>
> Sätt på hörlurar. Lås dörren. Låt hypnosen göra jobbet. Du behöver inte förstå — bara känna.
>
> Kram, Gaia 💛
>
> *PS. Krånglar inloggningen? Klicka här så hjälper jag dig: {{custom_values.support_form_link}}*

**O3 · SMS · Dag 1:**
> {{contact.first_name}}, allt du behöver idag är 20 min + Modul 1 🎧 Öppna här: {{custom_values.course_login_link}} /Gaia

---
**O4 · E-post · Dag 2, 09:00 (om ej startad) — sista knuffen + trygghet**
`Subject:` Jag vill inte att du ska ångra det här
`Preheader:` En ärlig rad från mig till dig.
`Body:`
> Hej {{contact.first_name}},
>
> Jag ska vara helt ärlig med dig, för jag bryr mig om att det här faktiskt ska hjälpa dig.
>
> De kvinnor som ångrar sitt köp är nästan alltid de som aldrig hann börja. Och de som får sitt liv förändrat? De tog sig igenom modul 1 — inget mer avancerat än så.
>
> Så innan mer tid rinner iväg: ge dig själv de här 20 minuterna. Idag.
>
> **[KNAPP: Ta första steget nu →]** *(→ `course_login_link`)*
>
> Och känner du minsta tvekan, teknisk eller inte — skriv till mig. Jag och mitt team finns här för dig, på riktigt:
> **[Jag behöver hjälp att komma igång →]** *(→ `support_form_link`)*
>
> Du är inte ensam i det här.
>
> Kram, Gaia 💛

**O4 · SMS · Dag 2:**
> {{contact.first_name}}, jag vill inte att du ska ångra det här. Börja med Modul 1 idag (20 min): {{custom_values.course_login_link}} — eller svara här om något strular. /Gaia 💛

*English: O4 names the refund fear out loud and reframes it — "the ones who regret it never started." Doubles down on the human safety net.*

---
**O-Grattis · E-post · utlöses av tag `kurs-startad` (exit-gren)**
`Subject:` Du är igång ❤️ Så stolt över dig
`Body:`
> Hej {{contact.first_name}},
>
> Du gjorde det — du är inne och har börjat. Det är precis så här förändring börjar: inte med ett stort språng, utan med ett litet, modigt steg.
>
> Fortsätt i din egen takt. En modul, en hypnos i taget. Och glöm inte att boka ditt välkomstsamtal med mig om du inte redan gjort det.
>
> Kram, Gaia 💛

*English: positive reinforcement the moment they activate — locks in the identity shift, reduces buyer's remorse.*

---
**Slack-notis · Dag 2 (tag `ej-startad-48h`)** — kanal `#kundframgang`
```
🚨 Ej-startad kund (48h) — follow-up behövs
Namn: {{contact.first_name}} {{contact.last_name}}
E-post: {{contact.email}}  |  Tel: {{contact.phone}}
Köpt: Kvinnlig Lustkraft® · {{date_added}}
Åtgärd: Ring/personligt SMS inom 24h. Fråga om tekniskt hinder. Erbjud att logga in tillsammans.
```
*English: this is the human escalation — a real person reaches out before the refund window closes.*

### 4.2 Boknings-mejl (Workflow B)

**B1 · E-post · +30 min — Boka ditt samtal**
`Subject:` En stund bara för dig och mig 💛
`Preheader:` Ditt personliga välkomstsamtal ingår — boka det här.
`Body:`
> Hej {{contact.first_name}},
>
> Som ny i Kvinnlig Lustkraft® vill jag träffa dig — på riktigt.
>
> Du får ett personligt välkomstsamtal med mig: 20 minuter där vi tillsammans hittar var *du* ska börja, och du får ställa alla frågor du bär på.
>
> **[KNAPP: Boka din stund med Gaia →]** *(→ `booking_page_link`)*
>
> Välj en tid som passar dig. Det här är din stund.
>
> Kram, Gaia 💛

**B2 · E-post · +2 dagar (om ej bokat)**
`Subject:` Din plats i kalendern väntar fortfarande
`Body (kort):`
> Hej {{contact.first_name}}, jag ville bara påminna dig — ditt välkomstsamtal med mig står och väntar. Många säger att det var här allt föll på plats. Boka här: **[Boka nu →]** *(→ `booking_page_link`)* · Kram, Gaia 💛

**B3 · E-post + SMS · +3 dagar (om ej bokat) — sista påminnelse**
`Subject:` Sista chansen den här veckan att boka med mig
`SMS:` {{contact.first_name}}, jag har några tider kvar denna vecka för ditt välkomstsamtal 💛 Boka här: {{custom_values.booking_page_link}} /Gaia

### 4.3 Pre-samtal / Pre-LIVE (Workflow C)

**C0 · Bekräftelse (vid bokning):** `Subject:` Ditt samtal är bokat ❤️ — infoBox med `Datum / Tid / Länk` + "lägg i kalender"-CTA.
**C1 · 24h före:** `Subject:` Imorgon ses vi 💛 — kort förbered-dig-checklista (*hitta en lugn plats, ha hörlurar, skriv ner din största fråga*).
**C2 · SMS 3h före:** {{contact.first_name}}, om 3h ses vi 💛 Din länk: [länk]. Vi hörs snart! /Gaia
**C3 · SMS 15 min före:** Vi börjar nu, {{contact.first_name}} — klicka här och kom in: [länk] 💛
**C4 · No-show → ombokning:** `Subject:` Vi missade varandra — här är en ny tid — vänlig ton, ingen skuld, direkt omboknings-CTA.

---

## 5. 8-veckors nurture (Workflow D) — ett mejl/vecka, ett per modul

> **Tema-logik (English):** each weekly email = one course module + its hypnosis. Every email: (1) a warm insight tied to the module, (2) a nudge to *do that week's module*, (3) a soft push toward the next LIVE. This keeps momentum through the full program so the buyer reaches value = no refund. Themes proposed from the course structure (nervous system → vagus → trygghet → lust → livskraft). *Gaia should confirm module titles.*

| Vecka | Modul-tema (SE) | Kärnbudskap | CTA |
|------|------------------|-------------|-----|
| **1** | **Hem till kroppen** | Lust börjar inte i huvudet — den börjar i ett tryggt nervsystem. | Gör Modul 1 + hypnos 1 |
| **2** | **Den starka kvinnans pris** | Varför de mest kapabla kvinnorna stänger av lusten — och att det inte är ditt fel. | Modul 2 |
| **3** | **Vagusnerven — din trygghetsnerv** | Biologin bakom: hur den långa utandningen öppnar kroppen igen. | Modul 3 + andningsövning |
| **4** | **Att känna sig trygg nog att känna** | Trygghet före lust. Hur du skapar inre säkerhet. | Modul 4 |
| **5** | **Skammen som tystade dig** | Släpp gamla berättelser om vad en kvinna "får" känna. | Modul 5 + LIVE-inbjudan |
| **6** | **Lusten vaknar** | Från avstängd till levande — vad som händer när kroppen känner sig sedd. | Modul 6 |
| **7** | **Din livskraft, inte bara din lust** | Lustkraft = energi, närvaro, livsglädje — inte bara sex. | Modul 7 |
| **8** | **Att bära det vidare** | Hur du håller det levande efter kursen. Firande + nästa steg. | Modul 8 + boka uppföljning |

**Mall per veckomejl (svensk struktur, dev fyller varje modul):**
`Subject:` (vecka-specifik, t.ex. V1: "Lust börjar i kroppen — inte i huvudet")
`Body:`
> Hej {{contact.first_name}},
>
> *(1 insikt kopplad till veckans tema — 2–3 stycken, Gaias röst)*
>
> Den här veckan: **[Modul X — {tema}]**. Ge dig själv 20 minuter med hypnosen. Låt kroppen känna, inte prestera.
>
> **[KNAPP: Öppna veckans modul →]** *(→ `course_login_link`)*
>
> *(mjuk påminnelse om nästa LIVE med Gaia)*
>
> Kram, Gaia 💛

*English: I've drafted themes + structure; full body copy for W1–W8 can be written next once Gaia confirms the real module titles (see open questions). This avoids inventing module names that don't match the product.*

---

## 6. Mätning / KPI (English)
- **Primary:** refund rate (baseline → post-launch), *course-activation rate within 48h* (target ≥ 70%).
- **Secondary:** O1 open/CTR, `kurs-startad` tag-rate per day, booking rate (Workflow B), LIVE-attendance, 8-week email engagement.
- **Guardrail:** support-form submissions (should rise early = friction caught, not refunds).

## 7. Implementeringschecklista (GHL)
1. Skapa Custom Values (§2.1) + Tags (§2.2).
2. Bygg 3 sidor (§3) — Välkomst, Kom-igång (+ GHL-form), Boka-Gaia (+ Calendar).
3. Sätt upp membership-trigger/Trigger Link för `kurs-startad` (§2.3).
4. Bygg Workflows A–D (§2.4–2.6) med Goal-events.
5. Klistra in mejl/SMS-copy (§4–5) i GHL. HTML-mejl via befintligt mall-system.
6. Koppla Slack (§4.1) till `#kundframgang`.
7. Testa end-to-end med testköp: köp → O1 → SMS → (starta ej) → O3 → O4 → Slack; och (starta) → O-Grattis exit.

---

## 8. Öppna frågor (English — need Gaia's input)
1. **Modul-titlar:** exact titles/order of the 8 modules? (Weekly themes in §5 are proposed, not confirmed.)
2. **Course host:** confirmed GHL Memberships? If course lives elsewhere (Kajabi/other), `course_login_link` + `kurs-startad` signal change.
3. **`kurs-startad` signal:** does the GHL membership plan fire a "started/lesson-viewed" trigger, or do we rely on the Trigger Link fallback?
4. **Välkomstsamtal:** is the 20-min Gaia call for *every* buyer or 1:1 capacity-limited? Affects Workflow B urgency/pacing.
5. **SMS-avsändare:** verified GHL SMS number for SE? `gaia_support_phone` value?
6. **LIVE-schema:** 2 LIVE/month — fixed dates or rolling? Needed to wire Workflow C triggers.
7. **Timing:** O3/O4 at 09:00 SE — OK, or prefer evening?
