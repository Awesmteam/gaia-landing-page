export type EmailBlock = string;

export const C = {
  bg: "#f1ece2",
  card: "#ffffff",
  cream: "#f7f3ec",
  border: "#e8e0cf",
  primary: "#305151",
  primaryDark: "#244141",
  mauve: "#a87b6e",
  text: "#3a4a4a",
  muted: "#7a8585",
  faint: "#9aa5a5",
};

export const SAMPLE_VALUES: Record<string, string> = {
  date_of_the_webinar: "onsdag 20. mai",
  name_of_the_business: "send.innershift.se",
  recording_page_link: "https://innershift.se/inspelning-av-webbinariet",
  sale_page_link: "https://innershift.se/kvinnlig-lustkraft",
  time_of_the_webinar: "18.00",
  webinar_add_to_calendar_link: "https://calendarlink.com/event/Jd0K4",
  webinar_zoom_link: "https://zoom.us/j/94430244908",
  our_email_adress: "gaia@innershift.se",
};

export const SAMPLE_CONTACT: Record<string, string> = {
  first_name: "Anna",
  last_name: "Lindberg",
  full_name: "Anna Lindberg",
  email: "anna@example.se",
};

export function applySampleValues(html: string): string {
  return html
    .replace(/\{\{\s*custom_values\.([a-z_]+)\s*\}\}/gi, (_m, key) => {
      return SAMPLE_VALUES[key] ?? `{{custom_values.${key}}}`;
    })
    .replace(/\{\{\s*contact\.([a-z_]+)\s*\}\}/gi, (_m, key) => {
      return SAMPLE_CONTACT[key] ?? `{{contact.${key}}}`;
    });
}

/* ------------- HTML building blocks ------------- */

export const p = (html: string) =>
  `<p style="margin:0 0 18px 0;font-size:16px;line-height:1.7;color:${C.text};">${html}</p>`;

export const pLast = (html: string) =>
  `<p style="margin:0 0 28px 0;font-size:16px;line-height:1.7;color:${C.text};">${html}</p>`;

export const italic = (html: string) =>
  `<p style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;color:${C.primary};">${html}</p>`;

export const signOff = (html = "Kram, Gaia 💛") =>
  `<p style="margin:0 0 28px 0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:20px;color:${C.primary};">${html}</p>`;

export const cta = (label: string, hrefVar: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="btn" style="margin:8px 0 32px 0;">
    <tr><td align="center">
      <a href="{{custom_values.${hrefVar}}}" target="_blank" rel="noopener" style="display:inline-block;background-color:${C.primary};color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:600;letter-spacing:0.6px;text-decoration:none;padding:16px 36px;border-radius:999px;">${label}</a>
    </td></tr>
  </table>`;

export const ctaLight = (label: string, hrefVar: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="btn" style="margin:8px 0 32px 0;">
    <tr><td align="center">
      <a href="{{custom_values.${hrefVar}}}" target="_blank" rel="noopener" style="display:inline-block;background-color:${C.mauve};color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:600;letter-spacing:0.6px;text-decoration:none;padding:16px 36px;border-radius:999px;">${label}</a>
    </td></tr>
  </table>`;

export const infoBox = (rows: Array<{ label: string; value: string }>) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.cream};border:1px solid ${C.border};border-radius:14px;margin:0 0 24px 0;">
    ${rows
      .map(
        (r, i) => `
      <tr class="info-row">
        <td class="info-label" style="padding:${i === 0 ? "18px" : "8px"} 22px ${i === rows.length - 1 ? "18px" : "8px"} 22px;font-size:14px;color:${C.muted};width:90px;font-family:Georgia,'Times New Roman',serif;vertical-align:top;">${r.label}</td>
        <td class="info-value" style="padding:${i === 0 ? "18px" : "8px"} 22px ${i === rows.length - 1 ? "18px" : "8px"} 0;font-size:16px;color:${C.primary};font-weight:600;word-break:break-all;">${r.value}</td>
      </tr>`,
      )
      .join("")}
  </table>`;

export const psBox = (html: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fbf6ec;border-left:3px solid ${C.mauve};border-radius:6px;margin-top:8px;">
    <tr><td style="padding:14px 18px;">
      <p style="margin:0;font-size:14px;line-height:1.6;color:#5b6b6b;">
        <strong style="color:${C.primary};">PS.</strong> ${html}
      </p>
    </td></tr>
  </table>`;

export const divider = () => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px 0;">
    <tr><td style="border-top:1px solid ${C.border};line-height:0;font-size:0;">&nbsp;</td></tr>
  </table>`;

export const eyebrow = (text: string) => `
  <p style="margin:0 0 12px 0;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${C.mauve};font-weight:700;">${text}</p>`;

export const h1 = (text: string) => `
  <h1 class="h1" style="margin:0 0 22px 0;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.2;font-weight:500;color:${C.primary};letter-spacing:-0.4px;">${text}</h1>`;

export const greet = () => h1("Hej {{contact.first_name}},");

/* ------------- Page shell ------------- */

export interface WrapOpts {
  preheader: string;
  body: string;
  showFooterAddress?: boolean;
}

export function wrapEmail({ preheader, body, showFooterAddress = true }: WrapOpts): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>Kvinnlig Lustkraft</title>
<style>
  @media only screen and (max-width: 600px) {
    .container { width:100% !important; }
    .px-outer { padding-left:22px !important; padding-right:22px !important; }
    .py-outer { padding-top:32px !important; padding-bottom:32px !important; }
    .h1 { font-size:26px !important; line-height:1.2 !important; }
    .info-row td { display:block !important; width:100% !important; }
    .btn a { display:block !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};font-family:Georgia,'Times New Roman',serif;color:${C.text};-webkit-font-smoothing:antialiased;">
<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg};">
  <tr><td align="center" style="padding:32px 16px;">
    <!-- Wordmark -->
    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
      <tr><td align="center" style="padding-bottom:16px;">
        <span style="font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:4px;text-transform:uppercase;color:${C.primary};font-weight:600;">Kvinnlig Lustkraft</span>
        <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:13px;color:#7e8a8a;margin-top:4px;">med Gaia</div>
      </td></tr>
    </table>
    <!-- Card -->
    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${C.card};border-radius:20px;box-shadow:0 4px 24px rgba(48,81,81,0.06);">
      <tr><td class="px-outer py-outer" style="padding:44px 48px 40px 48px;">
        ${body}
      </td></tr>
    </table>
    <!-- Footer -->
    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
      <tr><td align="center" style="padding:22px 16px 8px 16px;font-size:12px;color:${C.faint};line-height:1.6;font-family:Georgia,'Times New Roman',serif;">
        © Kvinnlig Lustkraft · Gaia Lindroos${
          showFooterAddress
            ? `<br/>{{custom_values.our_email_adress}} · {{custom_values.name_of_the_business}}`
            : ""
        }
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
