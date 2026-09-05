import type { Branch, SiteKey } from "./product";

export type { SiteKey };
export interface SiteNav {
  label: string;
  href: string;
  arabic?: string;
}

export interface SiteConfigEntry {
  key: SiteKey;
  domain: string;
  name: string;
  arabicName: string;
  route: string;
  description: string;
  theme: {
    background: string;
    surface: string;
    foreground: string;
    muted: string;
    accent: string;
    accentSoft: string;
    border: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  navigation: SiteNav[];
}

export interface SiteConfig {
  parent: SiteConfigEntry;
  fahl: SiteConfigEntry;
  aniqa: SiteConfigEntry;
}

export function isBranch(key: SiteKey): key is Branch {
  return key === "fahl" || key === "aniqa";
}
