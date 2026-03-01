import * as cheerio from "cheerio";
import { fetchPage } from "./fetchPage";

// Known mappings: domain -> direct privacy policy URL
// Many popular sites are SPAs or have policies on a parent domain
const KNOWN_POLICY_URLS: Record<string, string> = {
  "chatgpt.com": "https://openai.com/policies/privacy-policy/",
  "openai.com": "https://openai.com/policies/privacy-policy/",
  "google.com": "https://policies.google.com/privacy",
  "youtube.com": "https://policies.google.com/privacy",
  "gmail.com": "https://policies.google.com/privacy",
  "facebook.com": "https://www.facebook.com/privacy/policy/",
  "meta.com": "https://www.facebook.com/privacy/policy/",
  "instagram.com": "https://privacycenter.instagram.com/policy",
  "whatsapp.com": "https://www.whatsapp.com/legal/privacy-policy",
  "twitter.com": "https://x.com/en/privacy",
  "x.com": "https://x.com/en/privacy",
  "tiktok.com": "https://www.tiktok.com/legal/privacy-policy-us",
  "amazon.com": "https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ",
  "apple.com": "https://www.apple.com/legal/privacy/en-ww/",
  "microsoft.com": "https://privacy.microsoft.com/en-us/privacystatement",
  "linkedin.com": "https://www.linkedin.com/legal/privacy-policy",
  "reddit.com": "https://www.reddit.com/policies/privacy-policy",
  "netflix.com": "https://help.netflix.com/legal/privacy",
  "spotify.com": "https://www.spotify.com/us/legal/privacy-policy/",
  "discord.com": "https://discord.com/privacy",
  "twitch.tv": "https://www.twitch.tv/p/en/legal/privacy-notice/",
  "snapchat.com": "https://values.snap.com/privacy/privacy-policy",
  "snap.com": "https://values.snap.com/privacy/privacy-policy",
  "pinterest.com": "https://policy.pinterest.com/en/privacy-policy",
  "github.com": "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
  "zoom.us": "https://explore.zoom.us/en/privacy/",
  "slack.com": "https://slack.com/trust/privacy/privacy-policy",
  "dropbox.com": "https://www.dropbox.com/privacy",
  "uber.com": "https://www.uber.com/legal/en/document/?name=privacy-notice",
  "airbnb.com": "https://www.airbnb.com/terms/privacy_policy",
  "paypal.com": "https://www.paypal.com/us/legalhub/privacy-full",
  "ebay.com": "https://www.ebay.com/help/policies/member-behaviour-policies/user-privacy-notice-privacy-policy?id=4260",
  "walmart.com": "https://corporate.walmart.com/privacy-security/walmart-privacy-policy",
  "target.com": "https://www.target.com/c/target-privacy-policy/-/N-4sr7p",
  "hulu.com": "https://www.hulu.com/privacy",
  "adobe.com": "https://www.adobe.com/privacy/policy.html",
  "salesforce.com": "https://www.salesforce.com/company/privacy/",
  "cnn.com": "https://www.cnn.com/privacy",
  "nytimes.com": "https://www.nytimes.com/privacy/privacy-policy",
  "bbc.com": "https://www.bbc.com/usingthebbc/privacy/",
  "wikipedia.org": "https://foundation.wikimedia.org/wiki/Privacy_policy",
};

// Common short names people might type
const NAME_ALIASES: Record<string, string> = {
  chatgpt: "chatgpt.com",
  openai: "openai.com",
  google: "google.com",
  youtube: "youtube.com",
  facebook: "facebook.com",
  meta: "meta.com",
  instagram: "instagram.com",
  whatsapp: "whatsapp.com",
  twitter: "twitter.com",
  tiktok: "tiktok.com",
  amazon: "amazon.com",
  apple: "apple.com",
  microsoft: "microsoft.com",
  linkedin: "linkedin.com",
  reddit: "reddit.com",
  netflix: "netflix.com",
  spotify: "spotify.com",
  discord: "discord.com",
  twitch: "twitch.tv",
  snapchat: "snapchat.com",
  pinterest: "pinterest.com",
  github: "github.com",
  zoom: "zoom.us",
  slack: "slack.com",
  dropbox: "dropbox.com",
  uber: "uber.com",
  airbnb: "airbnb.com",
  paypal: "paypal.com",
  ebay: "ebay.com",
  walmart: "walmart.com",
  target: "target.com",
  hulu: "hulu.com",
  adobe: "adobe.com",
  cnn: "cnn.com",
  bbc: "bbc.com",
  wikipedia: "wikipedia.org",
};

const COMMON_PATHS = [
  "/privacy",
  "/privacy-policy",
  "/privacy-policy.html",
  "/legal/privacy",
  "/legal/privacy-policy",
  "/about/privacy",
  "/privacypolicy",
  "/policies/privacy-policy",
  "/policies/privacy",
  "/en/privacy",
  "/us/legal/privacy-policy",
];

const PRIVACY_LINK_PATTERNS = [
  /privacy\s*policy/i,
  /privacy\s*notice/i,
  /privacy\s*statement/i,
  /data\s*protection/i,
  /privacy$/i,
];

export function normalizeDomain(input: string): string {
  let domain = input.toLowerCase().trim();

  // Strip protocol if present
  domain = domain.replace(/^https?:\/\//, "");
  // Strip trailing slashes and paths
  domain = domain.split("/")[0];
  // Strip www.
  domain = domain.replace(/^www\./, "");

  // If it's a bare name (no dot), look up alias or append .com
  if (!domain.includes(".")) {
    domain = NAME_ALIASES[domain] || `${domain}.com`;
  }

  return domain;
}

export async function discoverPolicyUrl(rawInput: string): Promise<string> {
  const domain = normalizeDomain(rawInput);

  // 1. Check known mappings first
  if (KNOWN_POLICY_URLS[domain]) {
    return KNOWN_POLICY_URLS[domain];
  }

  // Also check without www
  const withoutWww = domain.replace(/^www\./, "");
  if (KNOWN_POLICY_URLS[withoutWww]) {
    return KNOWN_POLICY_URLS[withoutWww];
  }

  const origin = `https://${domain}`;

  // 2. Try common paths
  for (const path of COMMON_PATHS) {
    const url = `${origin}${path}`;
    try {
      const { html, finalUrl } = await fetchPage(url);
      if (looksLikePrivacyPolicy(html)) {
        return finalUrl;
      }
    } catch {
      // Continue to next path
    }
  }

  // 3. Try with www. prefix if not already
  if (!domain.startsWith("www.")) {
    const wwwOrigin = `https://www.${domain}`;
    for (const path of COMMON_PATHS.slice(0, 3)) {
      const url = `${wwwOrigin}${path}`;
      try {
        const { html, finalUrl } = await fetchPage(url);
        if (looksLikePrivacyPolicy(html)) {
          return finalUrl;
        }
      } catch {
        // Continue
      }
    }
  }

  // 4. Scan homepage for privacy links
  try {
    const { html: homepageHtml } = await fetchPage(origin);
    const foundUrl = scanForPrivacyLink(homepageHtml, origin);
    if (foundUrl) return foundUrl;
  } catch {
    // Try www version
    try {
      const { html: homepageHtml } = await fetchPage(`https://www.${domain}`);
      const foundUrl = scanForPrivacyLink(homepageHtml, `https://www.${domain}`);
      if (foundUrl) return foundUrl;
    } catch {
      // Homepage scan failed
    }
  }

  throw new Error(
    `Could not find a privacy policy for "${rawInput}". Try providing a direct URL to the privacy policy page.`
  );
}

function scanForPrivacyLink(html: string, origin: string): string | null {
  const $ = cheerio.load(html);
  const links = $("a[href]");

  for (let i = 0; i < links.length; i++) {
    const el = links.eq(i);
    const href = el.attr("href") || "";
    const text = el.text().trim();

    const isPrivacyLink =
      PRIVACY_LINK_PATTERNS.some((re) => re.test(text)) ||
      PRIVACY_LINK_PATTERNS.some((re) => re.test(href));

    if (isPrivacyLink && href) {
      if (href.startsWith("http")) {
        return href;
      } else if (href.startsWith("/")) {
        return `${origin}${href}`;
      } else {
        return `${origin}/${href}`;
      }
    }
  }

  return null;
}

function looksLikePrivacyPolicy(html: string): boolean {
  const lower = html.toLowerCase();
  const indicators = [
    "privacy policy",
    "privacy notice",
    "data protection",
    "personal information",
    "personal data",
    "we collect",
    "information we collect",
    "data we collect",
    "data controller",
    "your rights",
  ];
  let matches = 0;
  for (const indicator of indicators) {
    if (lower.includes(indicator)) matches++;
  }
  return matches >= 2;
}
