import { notFound } from "next/navigation";
import { StoreHeader } from "@/components/layout/StoreHeader";
import { StoreFooter } from "@/components/layout/StoreFooter";
import { ProductPageView } from "@/components/commerce/ProductPageView";
import { getProductBySlug, getProductsByBranch } from "@/lib/catalog";
import { metadataForProduct, productJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProductsByBranch("aniqa");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return metadataForProduct(product);
}

export default async function AniqaProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || product.branch !== "aniqa") notFound();

  const allProducts = await getProductsByBranch("aniqa");
  const related = allProducts.filter(
    (p) => p.category === "jewelry" && p.id !== product.id,
  );

  const jsonLd = productJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreHeader branch="aniqa" />
      <main className="flex-1">
        <ProductPageView product={product} related={related} />
      </main>
      <StoreFooter branch="aniqa" />
    </>
  );
}
