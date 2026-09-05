import type { Metadata } from "next";
import { StoreHeader } from "@/components/layout/StoreHeader";
import { StoreFooter } from "@/components/layout/StoreFooter";
import { StoreHero } from "@/components/brand/StoreHero";
import { Storefront } from "@/components/commerce/Storefront";
import { SameBottleForever } from "@/components/brand/SameBottleForever";
import { getProductsByBranch } from "@/lib/catalog";
import { metadataForSite } from "@/lib/seo";

export const metadata: Metadata = metadataForSite("fahl");

export default async function FahlPage() {
  const products = await getProductsByBranch("fahl");
  return (
    <>
      <StoreHeader branch="fahl" />
      <main className="flex-1">
        <StoreHero branch="fahl" />
        <Storefront products={products} />
        <SameBottleForever />
      </main>
      <StoreFooter branch="fahl" />
    </>
  );
}
