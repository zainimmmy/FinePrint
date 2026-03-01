export interface ThirdPartyEntity {
  name: string;
  aliases: string[];
  category: string;
  description: string;
}

export const THIRD_PARTY_ENTITIES: ThirdPartyEntity[] = [
  // Analytics
  { name: "Google Analytics", aliases: ["google analytics", "google-analytics", "gtag", "ga4"], category: "Analytics", description: "Web analytics service" },
  { name: "Mixpanel", aliases: ["mixpanel"], category: "Analytics", description: "Product analytics platform" },
  { name: "Amplitude", aliases: ["amplitude"], category: "Analytics", description: "Product analytics platform" },
  { name: "Segment", aliases: ["segment", "segment.io", "twilio segment"], category: "Analytics", description: "Customer data platform" },
  { name: "Hotjar", aliases: ["hotjar"], category: "Analytics", description: "Behavior analytics and feedback" },
  { name: "Heap", aliases: ["heap analytics", "heap.io"], category: "Analytics", description: "Digital insights platform" },
  { name: "Adobe Analytics", aliases: ["adobe analytics", "omniture"], category: "Analytics", description: "Enterprise analytics" },
  { name: "Snowplow", aliases: ["snowplow"], category: "Analytics", description: "Behavioral data platform" },
  // Advertising
  { name: "Google Ads", aliases: ["google ads", "google adwords", "adwords", "google advertising", "doubleclick", "google ad manager"], category: "Advertising", description: "Advertising platform" },
  { name: "Facebook Ads", aliases: ["facebook ads", "meta ads", "facebook pixel", "meta pixel", "facebook advertising"], category: "Advertising", description: "Social media advertising" },
  { name: "Amazon Advertising", aliases: ["amazon advertising", "amazon ads", "amazon marketing"], category: "Advertising", description: "E-commerce advertising" },
  { name: "Criteo", aliases: ["criteo"], category: "Advertising", description: "Retargeting advertising" },
  { name: "The Trade Desk", aliases: ["the trade desk", "tradedesk"], category: "Advertising", description: "Demand-side advertising platform" },
  { name: "AppNexus", aliases: ["appnexus", "xandr"], category: "Advertising", description: "Programmatic advertising" },
  { name: "TikTok Ads", aliases: ["tiktok ads", "tiktok pixel", "tiktok advertising"], category: "Advertising", description: "Social media advertising" },
  { name: "Twitter/X Ads", aliases: ["twitter ads", "x ads", "twitter advertising"], category: "Advertising", description: "Social media advertising" },
  // Data Brokers
  { name: "Acxiom", aliases: ["acxiom", "liveramp"], category: "Data Broker", description: "Data brokerage and identity resolution" },
  { name: "Oracle Data Cloud", aliases: ["oracle data cloud", "oracle advertising", "bluekai"], category: "Data Broker", description: "Data management platform" },
  { name: "Experian", aliases: ["experian marketing", "experian"], category: "Data Broker", description: "Consumer data and credit bureau" },
  { name: "Epsilon", aliases: ["epsilon"], category: "Data Broker", description: "Data-driven marketing" },
  // Social Login
  { name: "Facebook Login", aliases: ["facebook login", "sign in with facebook", "log in with facebook", "facebook connect", "meta login"], category: "Social Login", description: "Social authentication" },
  { name: "Google Sign-In", aliases: ["google sign-in", "sign in with google", "google login", "google oauth"], category: "Social Login", description: "Social authentication" },
  { name: "Apple Sign-In", aliases: ["sign in with apple", "apple login", "apple id"], category: "Social Login", description: "Social authentication" },
  // Payment
  { name: "Stripe", aliases: ["stripe"], category: "Payment", description: "Payment processing" },
  { name: "PayPal", aliases: ["paypal"], category: "Payment", description: "Payment processing" },
  { name: "Braintree", aliases: ["braintree"], category: "Payment", description: "Payment processing" },
  // Cloud / Hosting
  { name: "AWS", aliases: ["amazon web services", "aws"], category: "Cloud", description: "Cloud infrastructure" },
  { name: "Google Cloud", aliases: ["google cloud", "gcp", "google cloud platform"], category: "Cloud", description: "Cloud infrastructure" },
  { name: "Microsoft Azure", aliases: ["microsoft azure", "azure"], category: "Cloud", description: "Cloud infrastructure" },
  { name: "Cloudflare", aliases: ["cloudflare"], category: "Cloud", description: "CDN and security" },
  // CRM / Marketing
  { name: "Salesforce", aliases: ["salesforce"], category: "CRM", description: "Customer relationship management" },
  { name: "HubSpot", aliases: ["hubspot"], category: "CRM", description: "Marketing and CRM platform" },
  { name: "Mailchimp", aliases: ["mailchimp"], category: "Email Marketing", description: "Email marketing platform" },
  { name: "SendGrid", aliases: ["sendgrid", "twilio sendgrid"], category: "Email Marketing", description: "Email delivery service" },
  // Customer Support
  { name: "Zendesk", aliases: ["zendesk"], category: "Support", description: "Customer support platform" },
  { name: "Intercom", aliases: ["intercom"], category: "Support", description: "Customer messaging platform" },
];

export const GENERIC_SHARING_PATTERNS: RegExp[] = [
  /\b(share|disclose|transfer|provide|sell)\b.*\b(third[\s-]*part(?:y|ies)|partners?|affiliates?|vendors?|service\s*providers?)/i,
  /\bthird[\s-]*part(?:y|ies)\b.*\b(access|receive|collect|use|process)\b.*\b(data|information)/i,
  /\b(data|information)\b.*\b(shared?\s*with|disclosed?\s*to|transferred?\s*to|sold?\s*to)\b/i,
  /\b(advertising|marketing)\s*(partners?|networks?|companies)/i,
  /\b(data\s*processors?|sub-?processors?)\b/i,
];
