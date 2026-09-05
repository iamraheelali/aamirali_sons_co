import { createClient } from "@supabase/supabase-js";
import type { CatalogRepository } from "./index";
import type { Chapter, Product } from "@/types/product";

/**
 * Supabase-backed catalog repository.
 * Only public env vars are used; the service role key is never exposed to the
 * client. If Supabase is not configured, the caller falls back to JSON.
 */
export function createSupabaseRepository(): CatalogRepository {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase is not configured");
  }
  const supabase = createClient(url, anonKey);

  return {
    async getProducts(): Promise<Product[]> {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error || !data) return [];
      return data as Product[];
    },
    async getProductBySlug(slug: string): Promise<Product | null> {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error || !data) return null;
      return data as Product;
    },
    async getProductsByBranch(branch: "fahl" | "aniqa"): Promise<Product[]> {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("branch", branch)
        .eq("is_active", true)
        .order("sort_order");
      if (error || !data) return [];
      return data as Product[];
    },
    async getChapter(key: string): Promise<Chapter | null> {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("key", key)
        .maybeSingle();
      if (error || !data) return null;
      return data as Chapter;
    },
  };
}
