import { NextRequest, NextResponse } from "next/server";
import { AnalysisRequest } from "@/types/analysis";
import { fetchPage } from "@/lib/scraper/fetchPage";
import { discoverPolicyUrl, normalizeDomain } from "@/lib/scraper/discoverPolicy";
import { extractText } from "@/lib/scraper/extractText";
import { analyzePolicy } from "@/lib/analysis";

export const maxDuration = 30; // Allow up to 30s for slow sites

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalysisRequest;

    if (!body.input || !body.input.trim()) {
      return NextResponse.json(
        { error: "Please provide a URL or domain." },
        { status: 400 }
      );
    }

    const input = body.input.trim();
    const mode = body.mode || "domain";

    let policyUrl: string;

    if (mode === "url") {
      // If it looks like a URL but missing protocol, add it
      let urlInput = input;
      if (!urlInput.startsWith("http://") && !urlInput.startsWith("https://")) {
        urlInput = `https://${urlInput}`;
      }
      try {
        new URL(urlInput);
        policyUrl = urlInput;
      } catch {
        return NextResponse.json(
          { error: "Invalid URL. Please enter a valid URL." },
          { status: 400 }
        );
      }
    } else {
      // Domain mode: discover the privacy policy
      try {
        policyUrl = await discoverPolicyUrl(input);
      } catch (e) {
        return NextResponse.json(
          {
            error:
              e instanceof Error
                ? e.message
                : "Could not find privacy policy.",
          },
          { status: 404 }
        );
      }
    }

    // Fetch the page
    let html: string;
    let finalUrl: string;
    try {
      const result = await fetchPage(policyUrl);
      html = result.html;
      finalUrl = result.finalUrl;
    } catch (e) {
      return NextResponse.json(
        {
          error: `Failed to fetch the page: ${
            e instanceof Error ? e.message : "Unknown error"
          }`,
        },
        { status: 502 }
      );
    }

    // Extract text
    const { text, title } = extractText(html);

    if (text.length < 100) {
      return NextResponse.json(
        {
          error:
            "The page doesn't appear to contain enough text for a privacy policy. Try providing a direct URL to the privacy policy page.",
        },
        { status: 422 }
      );
    }

    // Parse domain from the final URL (after redirects)
    const domain = normalizeDomain(finalUrl);

    // Analyze
    const result = analyzePolicy(text, {
      url: finalUrl,
      domain,
      title,
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("Analysis error:", e);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
