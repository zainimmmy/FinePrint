import { Severity } from "@/types/analysis";

export interface DataTypePattern {
  category: string;
  label: string;
  severity: Severity;
  patterns: RegExp[];
  description: string;
}

export const DATA_TYPE_PATTERNS: DataTypePattern[] = [
  {
    category: "contact",
    label: "Email Address",
    severity: "low",
    patterns: [
      /\b(collect|gather|store|process|obtain)\b.*\b(email\s*address(?:es)?|e-mail)/i,
      /\bemail\s*address(?:es)?\b.*\b(collect|gather|provid|submit)/i,
    ],
    description: "The policy mentions collecting email addresses.",
  },
  {
    category: "contact",
    label: "Phone Number",
    severity: "low",
    patterns: [
      /\b(collect|gather|store|process)\b.*\b(phone\s*number|telephone|mobile\s*number)/i,
      /\bphone\s*number\b.*\b(collect|provid|submit)/i,
    ],
    description: "The policy mentions collecting phone numbers.",
  },
  {
    category: "contact",
    label: "Physical Address",
    severity: "medium",
    patterns: [
      /\b(collect|gather|store)\b.*\b(physical\s*address|mailing\s*address|postal\s*address|home\s*address)/i,
      /\b(street\s*address|zip\s*code|postal\s*code)\b.*\b(collect|provid)/i,
    ],
    description: "The policy mentions collecting physical/mailing addresses.",
  },
  {
    category: "identity",
    label: "Full Name",
    severity: "low",
    patterns: [
      /\b(collect|gather|store|process)\b.*\b(full\s*name|first\s*name|last\s*name|legal\s*name)/i,
      /\byour\s*name\b.*\b(collect|provid|submit)/i,
    ],
    description: "The policy mentions collecting your name.",
  },
  {
    category: "identity",
    label: "Date of Birth / Age",
    severity: "medium",
    patterns: [
      /\b(collect|gather|store)\b.*\b(date\s*of\s*birth|birth\s*date|age|birthday)/i,
      /\b(date\s*of\s*birth|birth\s*date|your\s*age)\b/i,
    ],
    description: "The policy mentions collecting date of birth or age.",
  },
  {
    category: "identity",
    label: "Government ID / SSN",
    severity: "critical",
    patterns: [
      /\b(social\s*security|SSN|passport\s*number|driver'?s?\s*licen[cs]e|national\s*id|tax\s*id)/i,
      /\b(government[\s-]*issued\s*id|identification\s*number)/i,
    ],
    description: "The policy mentions collecting government-issued IDs or SSN.",
  },
  {
    category: "financial",
    label: "Financial / Payment Data",
    severity: "high",
    patterns: [
      /\b(credit\s*card|debit\s*card|bank\s*account|payment\s*information|billing\s*address)/i,
      /\b(financial\s*(information|data)|payment\s*method|card\s*number)/i,
    ],
    description: "The policy mentions collecting financial or payment data.",
  },
  {
    category: "location",
    label: "Precise Location",
    severity: "high",
    patterns: [
      /\b(precise\s*location|GPS|geolocation|geo-location|latitude|longitude)/i,
      /\b(location\s*data|real[\s-]*time\s*location|physical\s*location)\b/i,
    ],
    description: "The policy mentions collecting precise location data.",
  },
  {
    category: "location",
    label: "Approximate Location",
    severity: "medium",
    patterns: [
      /\b(approximate\s*location|general\s*location|IP[\s-]*based\s*location|city|region|zip\s*code)/i,
      /\b(infer.*location|derive.*location)\b/i,
    ],
    description: "The policy mentions collecting approximate location.",
  },
  {
    category: "biometric",
    label: "Biometric Data",
    severity: "critical",
    patterns: [
      /\b(biometric|fingerprint|face\s*recognition|facial\s*recognition|voice\s*print|retina|iris\s*scan)/i,
      /\b(faceprint|voiceprint|biometric\s*identif)/i,
    ],
    description: "The policy mentions collecting biometric data.",
  },
  {
    category: "browsing",
    label: "Browsing History",
    severity: "high",
    patterns: [
      /\b(browsing\s*history|web\s*history|search\s*history|pages?\s*visited|sites?\s*visited)/i,
      /\b(internet\s*activity|online\s*activity|browsing\s*behavior)/i,
    ],
    description: "The policy mentions tracking browsing history.",
  },
  {
    category: "browsing",
    label: "Cookies & Tracking",
    severity: "medium",
    patterns: [
      /\b(cookies|tracking\s*pixel|web\s*beacon|pixel\s*tag|local\s*storage)/i,
      /\b(device\s*fingerprint|browser\s*fingerprint|tracking\s*technolog)/i,
    ],
    description: "The policy mentions using cookies or tracking technologies.",
  },
  {
    category: "device",
    label: "Device Information",
    severity: "medium",
    patterns: [
      /\b(device\s*(information|data|identifier|ID)|hardware\s*model|operating\s*system|browser\s*type)/i,
      /\b(IMEI|IDFA|advertising\s*id|unique\s*device)/i,
    ],
    description: "The policy mentions collecting device information.",
  },
  {
    category: "health",
    label: "Health / Medical Data",
    severity: "critical",
    patterns: [
      /\b(health\s*(information|data)|medical\s*(record|information|data|history))/i,
      /\b(fitness\s*data|heart\s*rate|sleep\s*data|step\s*count|calori)/i,
    ],
    description: "The policy mentions collecting health or medical data.",
  },
  {
    category: "children",
    label: "Children's Data",
    severity: "critical",
    patterns: [
      /\b(children'?s?\s*(data|information|privacy)|COPPA|under\s*(13|sixteen|thirteen))/i,
      /\b(minor'?s?\s*data|child'?s?\s*(information|data))/i,
    ],
    description: "The policy mentions handling children's data.",
  },
  {
    category: "communications",
    label: "Communications Content",
    severity: "high",
    patterns: [
      /\b(content\s*of.*messages|chat\s*logs|email\s*content|message\s*content)/i,
      /\b(read.*(?:emails?|messages)|scan.*(?:emails?|messages)|analy[sz].*(?:emails?|messages))/i,
    ],
    description: "The policy mentions accessing communications content.",
  },
  {
    category: "social",
    label: "Social Media Data",
    severity: "medium",
    patterns: [
      /\b(social\s*media\s*(profile|account|data|information)|friends?\s*list)/i,
      /\b(connect.*social\s*media|link.*social\s*account|social\s*network\s*data)/i,
    ],
    description: "The policy mentions collecting social media data.",
  },
  {
    category: "behavioral",
    label: "Usage / Behavioral Data",
    severity: "medium",
    patterns: [
      /\b(usage\s*(data|information|patterns)|behavioral\s*data|interaction\s*data)/i,
      /\b(how\s*you\s*use|features?\s*you\s*use|actions?\s*you\s*take)/i,
    ],
    description: "The policy mentions collecting behavioral/usage data.",
  },
];
