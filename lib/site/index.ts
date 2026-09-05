import siteConfigData from "@/data/site-config.json";
import type { SiteConfig, SiteConfigEntry, SiteKey } from "@/types/site";

export const siteConfig: SiteConfig = siteConfigData as SiteConfig;

export const SITE_KEYS: SiteKey[] = ["parent", "fahl", "aniqa"];

export function getSite(key: SiteKey): SiteConfigEntry {
  return siteConfig[key];
}

export function getSiteFromHost(hostname: string): SiteKey {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  if (host === "aamiralisons.com") return "parent";
  if (host === "al-fahl.marahil.ae") return "fahl";
  if (host === "al-aniqa.marahil.ae") return "aniqa";
  return "parent";
}

export function getRouteForSite(key: SiteKey): string {
  return siteConfig[key].route;
}

/** Brand-level constants reused across the experience. */
export const BRAND = {
  parentEmail: "group@aamiralisons.com",
  parentCompany: "Aamir Ali & Sons Co. LLC",
  city: "Abu Dhabi, UAE",
  currency: "USD" as const,
  charityRate: 0.02,
  charityLabel: "2% Sadaqah Jariyah",
  memorialNote: "in memory of Aamir Ali & Faisal Aamir Ali",
  legacyStatement: "لكل مرحلة هيبتها",
} as const;
