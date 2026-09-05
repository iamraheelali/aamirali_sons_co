"use client";

import { useState } from "react";
import { ProductVisual } from "./ProductVisual";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "@/components/cart/CartProvider";
import { priceForSize } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";
import type { Product, ProductSize } from "@/types/product";
import { cn } from "@/lib/utils";

export function ProductDetails({
  product,
  related = [],
}: {
  product: Product;
  related?: Product[];
}) {
  const { addItem } = useCart();
  const hasSizes = typeof product.price50 === "number";
  const [size, setSize] = useState<ProductSize>(hasSizes ? "50" : "default");
  const [quantity, setQuantity] = useState(1);
  const finishes = Object.keys(product.variantImages ?? {});
  const [finish, setFinish] = useState(finishes[0] ?? "");
  const displayProduct = finish
    ? { ...product, imageUrl: product.variantImages?.[finish] }
    : product;

  const price = priceForSize(product, size);

  const noteTiers = [
    { label: "Top", notes: product.topNotes },
    { label: "Heart", notes: product.heartNotes },
    { label: "Base", notes: product.baseNotes },
  ].filter((t) => t.notes && t.notes.length > 0);

  return (
    <div className="grid md:grid-cols-2 gap-0">
      {/* Left: visual */}
      <div className={cn(
        "bg-accent-soft/40 flex items-center justify-center p-4 md:p-8",
        product.category === "discovery"
          ? "aspect-[4/3] md:aspect-auto md:min-h-[560px]"
          : "aspect-[4/5] md:aspect-auto md:min-h-[560px]",
      )}>
        <div className="relative h-full min-h-[320px] w-full max-w-[640px]">
          <ProductVisual product={displayProduct} />
        </div>
      </div>

      {/* Right: details */}
      <div className="p-8 md:p-10 flex flex-col">
        <span className="text-label text-muted">
          MARAHIL AL-{product.branch === "fahl" ? "FAHL" : "ANIQA"}
        </span>
        <h2 className="mt-2 text-2xl md:text-3xl font-serif">{product.name}</h2>
        <div className="mt-3 flex items-center gap-3 text-label text-muted">
          {product.chapter && <span>{product.chapter}</span>}
          {product.prayer && (
            <>
              <span className="text-border">·</span>
              <span>{product.prayer}</span>
            </>
          )}
          {product.colorName && (
            <>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: product.colorHex }}
                />
                {product.colorName}
              </span>
            </>
          )}
        </div>

        {product.meaning && (
          <p className="mt-4 text-sm text-muted italic">{product.meaning}</p>
        )}
        {finishes.length > 0 && (
          <div className="mt-6">
            <span className="text-label text-muted">Finish</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {finishes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFinish(option)}
                  aria-pressed={finish === option}
                  className={cn(
                    "border px-4 py-2 text-label transition-colors",
                    finish === option ? "border-accent text-accent" : "border-border text-muted",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.description && (
          <p className="mt-3 text-sm leading-relaxed">{product.description}</p>
        )}

        {/* Notes */}
        {noteTiers.length > 0 && (
          <div className="mt-8 space-y-3">
            {noteTiers.map((tier) => (
              <div key={tier.label} className="flex items-center gap-4">
                <span className="text-label text-muted w-12">{tier.label}</span>
                <span className="text-sm">{tier.notes?.join(" · ")}</span>
              </div>
            ))}
          </div>
        )}

        {/* Size */}
        {hasSizes && (
          <div className="mt-8">
            <span className="text-label text-muted">Size</span>
            <div className="mt-3 inline-flex border border-border">
              {(["50", "100"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cn(
                    "px-6 py-3 text-label transition-colors",
                    size === s
                      ? "bg-accent text-background"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {s}ml
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price + quantity + CTA */}
        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-label text-muted">Price</span>
            <div className="text-2xl font-serif mt-1">{formatPrice(price)}</div>
          </div>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        <Button
          onClick={() => addItem(displayProduct, size, quantity, finish || undefined)}
          className="mt-6 w-full"
          size="lg"
        >
          Add to cart
        </Button>

        {product.isMemorialEdition && (
          <p className="mt-3 text-[10px] tracking-nav uppercase text-muted">
            Memorial Edition — no discounts apply
          </p>
        )}

        {related.length > 0 && (
          <div className="mt-10 border-t border-border pt-8">
            <span className="text-label text-muted">Pair it with</span>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {related.slice(0, 2).map((r) => (
                <PairItem key={r.id} product={r} />
              ))}
            </div>
          </div>
        )}
      </div>
            <p className="mt-3 text-xs text-muted">
              50ml EDP 30% / 100ml Extrait 40%
            </p>
    </div>
  );
}

function PairItem({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => addItem(product, "default", 1)}
      className="flex flex-col items-start gap-2 text-left group"
    >
      <div className="h-24 w-full bg-accent-soft/40 flex items-center justify-center">
        <div className="h-20 w-12">
          <ProductVisual product={product} />
        </div>
      </div>
      <span className="text-xs font-serif">{product.name}</span>
      <span className="text-[10px] text-muted">
        {formatPrice(product.price ?? product.price50 ?? 0)}
      </span>
    </button>
  );
}
