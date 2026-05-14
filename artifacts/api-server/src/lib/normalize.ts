import crypto from "node:crypto";

export function sha256(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const v = value.trim().toLowerCase();
  if (!v) return undefined;
  return crypto.createHash("sha256").update(v).digest("hex");
}

export type NormalizedPhone = {
  e164: string;
  country: string;
};

const COUNTRY_CODE_MAP: Array<{ prefix: string; country: string }> = [
  { prefix: "46", country: "SE" },
  { prefix: "47", country: "NO" },
  { prefix: "45", country: "DK" },
  { prefix: "358", country: "FI" },
  { prefix: "354", country: "IS" },
  { prefix: "1", country: "US" },
  { prefix: "44", country: "GB" },
  { prefix: "49", country: "DE" },
  { prefix: "33", country: "FR" },
  { prefix: "34", country: "ES" },
  { prefix: "39", country: "IT" },
  { prefix: "31", country: "NL" },
  { prefix: "32", country: "BE" },
  { prefix: "351", country: "PT" },
  { prefix: "353", country: "IE" },
  { prefix: "61", country: "AU" },
  { prefix: "64", country: "NZ" },
  { prefix: "65", country: "SG" },
  { prefix: "84", country: "VN" },
];

const KNOWN_PREFIXES = COUNTRY_CODE_MAP.map((c) => c.prefix);

function stripTrunkZeroAfterCountryCode(digits: string): string {
  for (const p of KNOWN_PREFIXES) {
    if (digits.startsWith(p) && digits[p.length] === "0") {
      return p + digits.slice(p.length + 1);
    }
  }
  return digits;
}

export function normalizePhone(
  raw: string,
  defaultCountry: string = "SE",
): NormalizedPhone {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return { e164: "", country: defaultCountry };

  // strip all formatting (spaces, parens, dashes); keep digits + leading +
  const hasPlus = trimmed.startsWith("+") || trimmed.startsWith("00");
  let digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("00")) digits = digits.slice(2);

  if (!digits) return { e164: "", country: "" };

  if (hasPlus) {
    // e.g. "+46 (0)70..." -> digits "46070..." -> strip trunk 0 after country code
    digits = stripTrunkZeroAfterCountryCode(digits);
  } else if (digits.startsWith("0") && defaultCountry === "SE") {
    // Swedish national format: 070... -> 4670...
    digits = "46" + digits.slice(1);
  } else if (KNOWN_PREFIXES.some((p) => digits.startsWith(p))) {
    // bare international (no plus), e.g. "4670..." or "1212..."
    digits = stripTrunkZeroAfterCountryCode(digits);
  } else if (defaultCountry === "SE") {
    digits = "46" + digits;
  }

  // E.164 sanity: 8–15 digits total
  if (digits.length < 8 || digits.length > 15) {
    return { e164: "+" + digits, country: "" };
  }

  let country = "";
  for (const { prefix, country: c } of COUNTRY_CODE_MAP) {
    if (digits.startsWith(prefix)) {
      country = c;
      break;
    }
  }
  return { e164: "+" + digits, country };
}

export function deriveCountry(
  phoneCountry: string,
  headers: Record<string, string | string[] | undefined>,
  fallback: string = "SE",
): string {
  if (phoneCountry) return phoneCountry;
  const h = (k: string) => {
    const v = headers[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const cf = h("cf-ipcountry");
  if (cf && /^[A-Z]{2}$/i.test(cf)) return cf.toUpperCase();
  const vc = h("x-vercel-ip-country");
  if (vc && /^[A-Z]{2}$/i.test(vc)) return vc.toUpperCase();
  return fallback;
}

export function getClientIp(
  headers: Record<string, string | string[] | undefined>,
  fallback: string | undefined,
): string | undefined {
  const h = (k: string) => {
    const v = headers[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const xff = h("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim();
  const real = h("x-real-ip");
  if (real) return real;
  return fallback ?? undefined;
}
