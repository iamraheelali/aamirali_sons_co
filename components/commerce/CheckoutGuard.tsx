"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { CheckoutForm } from "./CheckoutForm";

export function CheckoutGuard() {
  const { items, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 text-center">
        <span className="text-label text-muted">Loading…</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 md:px-10 py-24 text-center space-y-4">
        <span className="text-label text-muted">Checkout</span>
        <h1 className="text-2xl font-serif">Your cart is empty.</h1>
        <p className="text-sm text-muted">Your next chapter awaits.</p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/fahl"
            className="h-12 px-8 inline-flex items-center border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
          >
            Visit AL-FAHL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24">
      <span className="text-label text-muted">Checkout</span>
      <h1 className="mt-2 text-2xl md:text-3xl font-serif">Complete your order</h1>
      <div className="mt-12">
        <CheckoutForm />
      </div>
    </section>
  );
}
