import * as cheerio from "cheerio";

export function extractText(html: string): { text: string; title: string } {
  const $ = cheerio.load(html);

  // Remove non-content elements
  $(
    "script, style, nav, header, footer, iframe, noscript, svg, " +
    "form, button, input, select, textarea, .cookie-banner, " +
    ".cookie-consent, #cookie-banner, .nav, .navbar, .footer, " +
    ".sidebar, .menu, .advertisement, .ad, [role='navigation'], " +
    "[role='banner'], [role='contentinfo']"
  ).remove();

  // Get title
  const title =
    $("h1").first().text().trim() ||
    $("title").text().trim() ||
    "Privacy Policy";

  // Prefer main content area
  let contentEl = $("main, article, [role='main'], .content, .policy, .privacy-policy, #content, #main").first();

  if (!contentEl.length || contentEl.text().trim().length < 200) {
    contentEl = $("body");
  }

  let text = contentEl.text();

  // Clean whitespace
  text = text
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();

  return { text, title };
}
