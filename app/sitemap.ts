import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/company`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/fahl`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/aniqa`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cart`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/checkout`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/${p.branch}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
