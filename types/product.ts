export type Branch = "fahl" | "aniqa";
export type SiteKey = "parent" | "fahl" | "aniqa";
export type Category = "fragrance" | "jewelry" | "gift" | "discovery";
export type ChapterKey =
  | "bad"
  | "ishraq"
  | "zuhr"
  | "athar"
  | "wasl"
  | "layl";

export interface Product {
  id: string;
  name: string;
  slug: string;
  branch: Branch;
  category: Category;
  chapter?: ChapterKey;
  arabicName?: string;
  prayer?: string;
  colorName?: string;
  colorHex?: string;
  description?: string;
  meaning?: string;
  juiceNotes?: string[];
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  /** 50ml price in whole dollars */
  price50?: number;
  /** 100ml price in whole dollars */
  price100?: number;
  /** Fixed price (jewelry / gift / discovery) in whole dollars */
  price?: number;
  /** Discovery set total ml */
  discoverySize?: string;
  /** Discovery set price */
  discoveryPrice?: number;
  sku: string;
  /** SKU for the 100ml variant when applicable */
  sku100?: string;
  imageUrl?: string;
  variantImages?: Record<string, string>;
  isActive: boolean;
  isMemorialEdition: boolean;
  sortOrder: number;
  /** Jewelry material / visual hint */
  material?: string;
}

export interface Chapter {
  key: ChapterKey;
  number: string;
  chapter: string;
  prayer: string;
  colorName: string;
  colorHex: string;
}

export type ProductSize = "50" | "100" | "default";
