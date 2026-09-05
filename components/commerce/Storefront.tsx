"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { MarahilBottle } from "@/components/brand/MarahilBottle";
import { ProductVisual } from "./ProductVisual";
import { useCart } from "@/components/cart/CartProvider";
import { priceForSize } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ChapterKey, Product } from "@/types/product";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "fragrance" | "discovery" | "jewelry" | "gift";
type Sort = "featured" | "price-asc" | "price-desc" | "chapter";

const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fragrance", label: "Fragrance" },
  { key: "discovery", label: "Discovery" },
  { key: "jewelry", label: "Atelier" },
  { key: "gift", label: "Gifts" },
];

const CHAPTERS: { key: ChapterKey | "all"; label: string }[] = [
  { key: "all", label: "All Chapters" },
  { key: "bad", label: "Bad’" },
  { key: "ishraq", label: "Ishraq" },
  { key: "zuhr", label: "Zuhr" },
  { key: "athar", label: "Athar" },
  { key: "wasl", label: "Wasl" },
  { key: "layl", label: "Layl" },
];

export function Storefront({
  products,
}: {
  products: Product[];
}) {
  const [category, setCategory] = useState<CategoryFilter>("fragrance");
  const [chapter, setChapter] = useState<ChapterKey | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.isActive);
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (category === "fragrance" && chapter !== "all") {
      list = list.filter((p) => p.chapter === chapter);
    }
    const price = (p: Product) => p.price50 ?? p.price ?? 0;
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => price(a) - price(b));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => price(b) - price(a));
        break;
      default:
        list = [...list].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }
    return list;
  }, [products, category, chapter, sort]);

  const jewelry = products.filter((p) => p.category === "jewelry");
  const gifts = products.filter((p) => p.category === "gift");
  const discovery = products.find((p) => p.category === "discovery") ?? null;
  const related = jewelry.slice(0, 2);

  return (
    <>
      {/* Collection */}
      <section id="collection" className="px-6 md:px-10 py-16 md:py-24 border-b border-border">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-label text-muted">The Collection</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-serif">
              Six chapters. One bottle.
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCategory(c.key)}
                  aria-pressed={category === c.key}
                  className={cn(
                    "text-[10px] tracking-nav uppercase transition-colors",
                    category === c.key
                      ? "text-accent"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort products"
              className="bg-transparent text-[10px] tracking-nav uppercase border border-border px-3 py-2 text-muted focus:text-foreground"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="chapter">Chapter</option>
            </select>
          </div>
        </div>

        {category === "fragrance" && (
          <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
            {CHAPTERS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setChapter(c.key)}
                aria-pressed={chapter === c.key}
                className={cn(
                  "text-[10px] tracking-nav uppercase transition-colors",
                  chapter === c.key
                    ? "text-accent"
                    : "text-muted hover:text-foreground",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">
            No chapters are currently available.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </div>
        )}
      </section>

      {/* Discovery spotlight */}
      {discovery && (
        <DiscoverySpotlight product={discovery} onOpen={setSelected} />
      )}

      {/* Jewelry */}
      {jewelry.length > 0 && (
        <section id="atelier" className="px-6 md:px-10 py-16 md:py-24 border-b border-border">
          <SectionHeading
            eyebrow="The Atelier"
            title="Atelier"
            align="left"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {jewelry.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </div>
        </section>
      )}

      {/* Gifts */}
      {gifts.length > 0 && (
        <section id="gifts" className="px-6 md:px-10 py-16 md:py-24 border-b border-border">
          <SectionHeading eyebrow="The Ritual, Given" title="Gifts" align="left" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {gifts.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </div>
        </section>
      )}

      <ProductModal
        product={selected}
        related={related}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

function DiscoverySpotlight({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const { addItem } = useCart();
  const price = priceForSize(product, "default");
  return (
    <section
      id="discovery"
      className="px-6 md:px-10 py-16 md:py-24 border-b border-border"
    >
      <div className="grid md:grid-cols-2 items-center gap-10 bg-accent-soft/30">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="relative aspect-[4/3] w-full flex items-center justify-center cursor-pointer"
          aria-label={`View ${product.name}`}
        >
          <div className="h-full w-full max-w-[720px] transition-transform duration-700 hover:scale-[1.02]">
            <ProductVisual product={product} />
          </div>
        </button>
        <div className="p-8 md:p-12 space-y-5">
          <span className="text-label text-muted">Discovery Set</span>
          <h2 className="text-2xl md:text-3xl font-serif">{product.name}</h2>
          <p className="text-sm text-muted leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-muted">{product.discoverySize}</p>
          <div className="flex items-center gap-6 pt-2">
            <span className="text-2xl font-serif">{formatPrice(price)}</span>
            <button
              type="button"
              onClick={() => addItem(product, "default", 1)}
              className="h-12 px-8 border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Re-exported so the product page can reuse the same detail UI.
export { MarahilBottle };
