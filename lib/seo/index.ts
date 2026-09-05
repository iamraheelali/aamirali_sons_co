import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/pricing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iamraheelali.github.io/aamirali_sons_co";

export function metadataForSite(
  key: "parent" | "fahl" | "aniqa",
  overrides?: Metadata,
): Metadata {
  const site = siteConfig[key];
  return {
    title: site.seo.title,
    description: site.seo.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: site.route },
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      url: site.route,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
    },
    ...overrides,
  };
}

export function metadataForProduct(product: Product): Metadata {
  const site = siteConfig[product.branch];
  const price = product.price50 ?? product.price ?? 0;
  return {
    title: `${product.name} | ${site.name}`,
    description: product.description ?? site.seo.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: `/${product.branch}/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description ?? "",
      url: `/${product.branch}/product/${product.slug}`,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description ?? "",
    },
  };
}

/** JSON-LD product structured data. No fake reviews. */
export function productJsonLd(product: Product) {
  const site = siteConfig[product.branch];
  const price = product.price50 ?? product.price ?? 0;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? site.seo.description,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: process.env.NEXT_PUBLIC_CURRENCY ?? "USD",
      price: formatPrice(price),
      availability: "https://schema.org/InStock",
      url: `/${product.branch}/product/${product.slug}`,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aamir Ali & Sons Co. LLC",
    url: SITE_URL,
    email: "group@aamiralisons.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
  };
}
