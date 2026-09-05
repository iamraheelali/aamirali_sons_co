"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { QuantitySelector } from "./QuantitySelector";
import { calculateCartTotals, formatPrice } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";

export function CartView() {
  const { items, updateQuantity, removeItem, hydrated } = useCart();
  const totals = calculateCartTotals(items);

  return (
    <section className="mx-auto max-w-5xl px-6 md:px-10 py-16 md:py-24">
      <span className="text-label text-muted">Your Cart</span>
      <h1 className="mt-2 text-2xl md:text-3xl font-serif">The chapters you have collected</h1>

      {hydrated && items.length === 0 ? (
        <div className="mt-16 text-center space-y-3">
          <p className="text-sm text-muted">Your cart is empty.</p>
          <p className="text-sm text-muted">Your next chapter awaits.</p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/fahl"
              className="h-12 px-8 inline-flex items-center border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
            >
              Visit AL-FAHL
            </Link>
            <Link
              href="/aniqa"
              className="h-12 px-8 inline-flex items-center border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
            >
              Visit AL-ANIQA
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 divide-y divide-border">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 py-6">
                <div className="h-24 w-16 bg-accent-soft/40 flex items-center justify-center shrink-0">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.colorHex ?? "#D4AF37" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm font-serif">{item.name}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                      className="text-muted hover:text-accent"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.25} />
                    </button>
                  </div>
                  <div className="mt-1 text-[10px] tracking-nav uppercase text-muted">
                    {item.branch} · {item.size === "default" ? item.variantLabel : `${item.size}ml`} · {item.sku}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                      className="h-9"
                    />
                    <span className="font-serif">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="border border-border p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-serif">{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span className="font-serif">{formatPrice(totals.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">2% Sadaqah Jariyah</span>
                <span className="font-serif">{formatPrice(totals.charityAmount)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-baseline">
                <span className="text-label">Total</span>
                <span className="text-xl font-serif">{formatPrice(totals.total)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button size="lg" className="w-full">Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
