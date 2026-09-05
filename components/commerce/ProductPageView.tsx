import Link from "next/link";
import { ProductDetails } from "./ProductDetails";
import { ProductCardLink } from "./ProductCard";
import { MarahilBottle } from "@/components/brand/MarahilBottle";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/pricing";
import { priceForSize } from "@/lib/catalog";

export function ProductPageView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const isFragrance = product.category === "fragrance";
  const noteTiers = [
    { label: "Top", notes: product.topNotes },
    { label: "Heart", notes: product.heartNotes },
    { label: "Base", notes: product.baseNotes },
  ].filter((t) => t.notes && t.notes.length > 0);

  return (
    <div className="border-t border-border">
      <ProductDetails product={product} related={related.slice(0, 2)} />

      {/* Editorial detail sections */}
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-24 space-y-20">
        {isFragrance && (
          <section className="space-y-6">
            <span className="text-label text-muted">The Chapter</span>
            <div className="flex items-baseline gap-4">
              <h2 className="text-3xl md:text-4xl font-serif">
                {product.chapter}
              </h2>
              <span className="text-label text-muted">{product.prayer}</span>
            </div>
            {noteTiers.map((tier) => (
              <div key={tier.label} className="flex items-center gap-4">
                <span className="text-label text-muted w-12">{tier.label}</span>
                <span className="text-base">{tier.notes?.join(" · ")}</span>
              </div>
            ))}
            {product.meaning && (
              <p className="text-label text-accent">{product.meaning}</p>
            )}
          </section>
        )}

        <section className="space-y-6 border-t border-border pt-12">
          <span className="text-label text-muted">The Bottle</span>
          <h2 className="text-2xl md:text-3xl font-serif">Same bottle forever.</h2>
          <p className="text-sm text-muted leading-relaxed max-w-xl">
            Matte black glass. Gold cap. Premium silhouette. Only the chapter
            plate changes. One bottle carries all six chapters of the day.
          </p>
          <div className="h-56 w-32">
            <MarahilBottle
              chapter={product.chapter}
              prayer={product.prayer}
              plateColor={product.colorHex}
              branch={product.branch}
              size="50"
            />
          </div>
        </section>

        <section className="space-y-6 border-t border-border pt-12">
          <span className="text-label text-muted">The Ritual</span>
          <h2 className="text-2xl md:text-3xl font-serif">
            Collect your day, not a trend.
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-xl">
            Each chapter follows a prayer of the day. Wear the chapter that
            meets the hour.
          </p>
          <Link
            href={`/${product.branch}#collection`}
            className="inline-flex h-12 items-center px-8 border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
          >
            View the collection
          </Link>
        </section>

        {related.length > 0 && (
          <section className="space-y-8 border-t border-border pt-12">
            <span className="text-label text-muted">Related</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
              {related.map((r) => (
                <ProductCardLink key={r.id} product={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export { formatPrice, priceForSize };
