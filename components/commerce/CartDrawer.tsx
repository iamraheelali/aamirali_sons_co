"use client";

import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "@/components/cart/CartProvider";
import { calculateCartTotals, formatPrice } from "@/lib/pricing";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, hydrated } = useCart();
  const totals = calculateCartTotals(items);

  return (
    <Drawer open={isOpen} onClose={close} title="Your Cart" className="bg-surface">
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="text-label text-muted">Your cart is empty.</span>
          <p className="text-sm text-muted">Your next chapter awaits.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto no-scrollbar px-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-border py-5"
              >
                <div className="h-20 w-14 bg-accent-soft/40 flex items-center justify-center shrink-0">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.colorHex ?? "#D4AF37" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-serif leading-snug">
                      {item.name}
                    </span>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeItem(item.id)}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.25} />
                    </button>
                  </div>
                  <div className="mt-1 text-[10px] tracking-nav uppercase text-muted">
                    {item.branch} · {item.size === "default" ? item.variantLabel : `${item.size}ml`} · {item.sku}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                      className="h-8"
                    />
                    <span className="text-sm font-serif">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-label text-muted">Subtotal</span>
              <span className="font-serif">{formatPrice(totals.subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="block w-full h-12 bg-accent text-background flex items-center justify-center text-label uppercase tracking-nav hover:opacity-90 transition-opacity"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </Drawer>
  );
}
