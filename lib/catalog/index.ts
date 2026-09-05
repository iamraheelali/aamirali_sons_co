import productsData from "@/data/products.json";
import chaptersData from "@/data/chapters.json";
import type { Chapter, Product } from "@/types/product";

const CATALOG_SOURCE = process.env.CATALOG_SOURCE ?? "json";

/**
 * Catalog repository abstraction.
 * The storefront reads only through this interface so the data source can be
 * swapped between JSON (default) and Supabase without touching components.
 */
export interface CatalogRepository {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByBranch(branch: "fahl" | "aniqa"): Promise<Product[]>;
  getChapter(key: string): Promise<Chapter | null>;
}

class JsonCatalogRepository implements CatalogRepository {
  private products: Product[] = productsData as Product[];
  private chapters: Chapter[] = chaptersData as Chapter[];

  async getProducts(): Promise<Product[]> {
    return this.products;
  }
  async getProductBySlug(slug: string): Promise<Product | null> {
    return this.products.find((p) => p.slug === slug) ?? null;
  }
  async getProductsByBranch(branch: "fahl" | "aniqa"): Promise<Product[]> {
    return this.products.filter((p) => p.branch === branch);
  }
  async getChapter(key: string): Promise<Chapter | null> {
    return this.chapters.find((c) => c.key === key) ?? null;
  }
}

function createRepository(): CatalogRepository {
  if (CATALOG_SOURCE === "supabase") {
    // Lazy import so JSON-only deployments never load the Supabase client.
    const { createSupabaseRepository } = require("./supabase");
    try {
      return createSupabaseRepository();
    } catch {
      // Fall back to JSON if Supabase is not configured.
      return new JsonCatalogRepository();
    }
  }
  return new JsonCatalogRepository();
}

let repository: CatalogRepository | null = null;
function repo(): CatalogRepository {
  if (!repository) repository = createRepository();
  return repository;
}

export function getProducts(): Promise<Product[]> {
  return repo().getProducts();
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return repo().getProductBySlug(slug);
}

export function getProductsByBranch(branch: "fahl" | "aniqa"): Promise<Product[]> {
  return repo().getProductsByBranch(branch);
}

export function getChapters(): Chapter[] {
  return chaptersData as Chapter[];
}

export function getChapter(key: string): Promise<Chapter | null> {
  return repo().getChapter(key);
}

/** Resolve the price for a given size selection. Returns dollars (number). */
export function priceForSize(product: Product, size: "50" | "100" | "default"): number {
  if (size === "50" && typeof product.price50 === "number") return product.price50;
  if (size === "100" && typeof product.price100 === "number") return product.price100;
  if (typeof product.price === "number") return product.price;
  if (typeof product.discoveryPrice === "number") return product.discoveryPrice;
  return 0;
}

/** Resolve the SKU for a given size selection. */
export function skuForSize(product: Product, size: "50" | "100" | "default"): string {
  if (size === "100" && product.sku100) return product.sku100;
  return product.sku;
}

export const catalogSource = CATALOG_SOURCE;
