"use client";

import Link from "next/link";
import { ProductVisual } from "./ProductVisual";
import { useCart } from "@/components/cart/CartProvider";
import { priceForSize } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ProductCard({
  product,
  onOpen,
  className,
}: {
  product: Product;
  onOpen?: (product: Product) => void;
  className?: string;
}) {
  const { addItem } = useCart();
  const hasSizes = typeof product.price50 === "number";
  const finishes = Object.keys(product.variantImages ?? {});
  const [finish, setFinish] = useState(finishes[0] ?? "");
  const displayProduct = finish
    ? { ...product, imageUrl: product.variantImages?.[finish] }
    : product;
  const price = hasSizes ? (product.price50 ?? 0) : priceForSize(product, "default");

  return (
    <article
      className={cn("group flex flex-col", className)}
    >
      <button
        type="button"
        onClick={() => onOpen?.(product)}
        className="relative aspect-[3/2] w-full overflow-hidden bg-accent-soft/30 flex items-center justify-center cursor-pointer"
        aria-label={`View ${product.name}`}
      >
        <div className="h-full w-full max-w-none transition-transform duration-700 group-hover:scale-105">
          <ProductVisual product={displayProduct} />
        </div>
        {product.isMemorialEdition && (
          <span className="absolute top-3 left-3 text-[9px] tracking-nav uppercase text-muted">
            Memorial Edition
          </span>
        )}
      </button>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[10px] tracking-nav uppercase text-muted">
          {product.chapter && <span>{product.chapter}</span>}
          {product.prayer && (
            <>
              <span className="text-border">·</span>
              <span>{product.prayer}</span>
            </>
          )}
          {product.colorName && (
            <span className="ml-auto flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: product.colorHex }}
              />
            </span>
          )}
        </div>
        <h3 className="text-sm font-serif">{product.name}</h3>
        {finishes.length > 0 && (
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-nav text-muted">
            <span>Finish</span>
            {finishes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFinish(option)}
                aria-pressed={finish === option}
                className={cn(
                  "border px-2 py-1 transition-colors",
                  finish === option ? "border-accent text-accent" : "border-border",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">
            {hasSizes
              ? "50ml EDP 30% / 100ml Extrait 40%"
              : product.discoverySize ?? "—"}
          </span>
          <span className="text-sm font-serif">{formatPrice(price)}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        {onOpen && (
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="text-[10px] tracking-nav uppercase text-muted hover:text-accent transition-colors"
          >
            View
          </button>
        )}
        <span className="text-border">·</span>
        <button
          type="button"
          onClick={() =>
            addItem(
              displayProduct,
              typeof product.price50 === "number" ? "50" : "default",
              1,
              finish || undefined,
            )
          }
          className="text-[10px] tracking-nav uppercase text-muted hover:text-accent transition-colors"
        >
          Add
        </button>
      </div>
    </article>
  );
}

export function ProductCardLink({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const hasSizes = typeof product.price50 === "number";
  const finishes = Object.keys(product.variantImages ?? {});
  const price = hasSizes ? (product.price50 ?? 0) : priceForSize(product, "default");
  return (
    <Link
      href={`/${product.branch}/product/${product.slug}`}
      className={cn("group flex flex-col", className)}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-accent-soft/30 flex items-center justify-center">
        <div className="h-full w-full max-w-none transition-transform duration-700 group-hover:scale-105">
          <ProductVisual product={product} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[10px] tracking-nav uppercase text-muted">
          {product.chapter && <span>{product.chapter}</span>}
          {product.colorName && (
            <span className="ml-auto flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: product.colorHex }}
              />
            </span>
          )}
        </div>
        <h3 className="text-sm font-serif">{product.name}</h3>
        {finishes.length > 0 && (
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-nav text-muted">
            <span>Finish</span>
            {finishes.map((option) => (
              <span key={option}>{option}</span>
            ))}
          </div>
        )}
        <div className="flex flex-col items-end gap-1">
          {hasSizes && (
            <span className="text-[10px] text-muted">
              50ml EDP 30% / 100ml Extrait 40%
            </span>
          )}
          <span className="text-sm font-serif">{formatPrice(price)}</span>
        </div>
      </div>
    </Link>
  );
}
