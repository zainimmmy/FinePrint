const BLOCKED_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^0\./,
  /^169\.254\./,
  /^::1$/,
  /^fc/i,
  /^fd/i,
  /^fe80/i,
  /^localhost$/i,
];

function isPrivateHost(hostname: string): boolean {
  return BLOCKED_RANGES.some((re) => re.test(hostname));
}

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export interface FetchResult {
  html: string;
  finalUrl: string;
}

export async function fetchPage(url: string): Promise<FetchResult> {
  const parsed = new URL(url);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }

  if (isPrivateHost(parsed.hostname)) {
    throw new Error("Requests to private/internal addresses are not allowed.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Cache-Control": "no-cache",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      throw new Error("Page is too large (>5MB).");
    }

    const html = await res.text();
    if (html.length > MAX_SIZE) {
      throw new Error("Page content is too large (>5MB).");
    }

    return { html, finalUrl: res.url };
  } finally {
    clearTimeout(timeout);
  }
}
