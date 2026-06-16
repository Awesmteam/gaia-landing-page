# Påminnelsesekvens (efter anmälan) — HTML-mejl + Podcast/Video/Blogg-sidor

**Status:** ✅ done (SE only; typecheck pass; code-review DONE 0 issues) · **Mode:** /cook interactive · **Project:** artifacts/kvinnlig-lustkraft

## Mål (user)
1. Lägg in **påminnelsesekvensen efter anmälan** (6 mejl) som **HTML-mallar** på `/emails` → copy-paste till GHL.
2. Bygg tillhörande sidor: **Podcast**, **Video**, **Video-tack**, **Blogg** (med Vimeo-embeds).

## Sekvens (källa: user-inklistrad text, final)
| # | När | Typ | Subject (SE) | CTA-mål |
|---|-----|-----|--------------|---------|
| 1 | Straks | Welcome | Din plats är bokad — välkommen ❤️ | Kalender + Join |
| 2 | D-5 | Podcast | "Jag som har det så bra…" | Podcast-sida |
| 3 | D-4 | Video | En 10-min övning du kan göra ikväll | Video-sida |
| 4 | D-3 | Blogg | Varför den långa utandningen fungerar | Blogg-sida |
| 5 | D-2 | Testimonial | "Det är som om jag har fått ett liv" | Join |
| 6 | D-1 | Påminnelse + checklista | I morgon ❤️ | Join |

## Arkitektur (matchar befintligt)
- **Mejl:** nya filer `src/lib/emails/reminders/rem-0X-*.ts` (samma mönster som `inv-*.ts`), byggda med `shell.ts`-helpers (`wrapEmail/greet/p/cta/infoBox/psBox/...`). Importeras i `templates.ts`, läggs i `EMAIL_TEMPLATES`.
- **Gruppering på /emails:** lägg till valfritt `group?: string` i `EmailTemplate` + sektionsrubriker i sidebaren (annars blir listan ~37 platt). Minimal ändring, befintliga mallar default-grupp.
- **Platshållare → GHL-nycklar** (klammer i källtext → `{{...}}`):
  `[FÖRNAMN]→{{contact.first_name}}`, `[DATUM]→{{custom_values.date_of_the_webinar}}`, `[TID]→{{custom_values.time_of_the_webinar}}`, `[KALENDERLÄNK]→{{custom_values.webinar_add_to_calendar_link}}`, `[ANMÄLNINGS-/JOIN-LÄNK]→{{custom_values.webinar_join_link}}` (ny), `[PODDLÄNK]→{{custom_values.podcast_page_link}}` (ny), `[VIDEOLÄNK]→{{custom_values.video_page_link}}` (ny), `[BLOGGLÄNK]→{{custom_values.blog_page_link}}` (ny).
  → Lägg nya nycklar i `shell.ts` `SAMPLE_VALUES` (sample = riktiga site-URL:er).

## Sidor (nya) + rutter i App.tsx
| Route | Sida | Innehåll |
|-------|------|----------|
| `/podcast` | PodcastPage | HTML5-ljudspelare (POD Mail.m4a) + "Den stilla tomheten"-ram + CTA till webinar |
| `/video` | VideoPage | Vimeo `1201953714` + "Trygghetsövningen" 3 steg + CTA |
| `/blogg` | BlogPage | Artikel "Vagusnerven – kroppens trygghetsnerv" + CTA |
| `/testimonial` | TestimonialPage | 3 testimonials (Sonja/Sofia/Maria) + "för sent"-invändning + CTA |

**Video-tack (Vimeo `1201953715`):** INTE egen route — bäddas in i befintliga `/tack` (`WebinarThankYou.tsx`), visas efter anmälan.
- Stil: återanvänd mönster från `WebinarReplay.tsx` (framer-motion FadeIn, design-tokens, serif). Håll varje sida < 200 rader; bryt ut delkomponenter v.b.
- **Podcast-ljud:** kopiera `~/Downloads/POD Mail.m4a` → `public/podcast/den-stilla-tomheten.m4a` (4,3 MB) och referera lokalt. Alt: byt till extern CDN-länk senare.

## ⬜ ÖPPET BESLUT — språk (dubblar arbetet)
**Default (om inget annat sägs):** bygg **svenska** mejl + svenska sidor (= det GHL faktiskt skickar till svensk lista). VN-texten du gav används som referens.
**Alternativ:** bygg **även VN-mallar** (rem-0X-vn.ts, 6 till) + VN-sidvarianter.

## Steg
1. shell.ts: + nya SAMPLE_VALUES (join/podcast/video/blog). + `group?` i EmailTemplate.
2. reminders/rem-01..06 .ts (SE) [+ -vn om valt].
3. templates.ts: importera + lägg i EMAIL_TEMPLATES (ny grupp "Påminnelse efter anmälan").
4. Emails.tsx: gruppera sidebar per `group`.
5. Pages: PodcastPage, VideoPage, BlogPage, TestimonialPage + 4 rutter i App.tsx.
5b. Bädda in video-tack (Vimeo 1201953715) i WebinarThankYou.tsx.
6. Kopiera podcast-ljud till public/.
7. `pnpm run typecheck` → code-reviewer → finalize.

## Verifiering
- typecheck pass; alla 6 (el. 12) mallar syns/kopierar på /emails; 4 rutter renderar; Vimeo + ljud spelar.

## Utanför scope
- GHL-konfig av custom values (görs i GHL).
- Hosting av podcast på extern CDN (lokalt nu).
- Riktig podcast/video/blogg-text-finputs mot .m4a/.docx (använder inklistrad text).
