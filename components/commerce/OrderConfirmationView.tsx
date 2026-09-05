"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { getOrderById } from "@/lib/orders";
import { formatPrice } from "@/lib/pricing";
import { BRAND } from "@/lib/site";
import type { Order } from "@/types/order";
import { useEffect, useState } from "react";

export function OrderConfirmationView({ orderId }: { orderId: string }) {
  const { clear } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const o = getOrderById(orderId);
    setOrder(o);
    setLoaded(true);
    // Cart was already cleared on order creation; ensure no stale items remain.
    clear();
  }, [orderId, clear]);

  if (!loaded) {
    return (
      <div className="py-24 text-center">
        <span className="text-label text-muted">Loading…</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center space-y-4">
        <span className="text-label text-muted">Order</span>
        <h1 className="text-2xl font-serif">The chapter could not be found.</h1>
        <Link
          href="/fahl"
          className="inline-flex h-12 items-center px-8 border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
        >
          Return to MARAHIL
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 md:px-10 py-16 md:py-24 space-y-10">
      <div className="text-center space-y-3 animate-reveal">
        <span className="text-label text-muted">Order Received</span>
        <h1 className="text-3xl md:text-4xl font-serif">Thank you.</h1>
        <p className="text-sm text-muted">
          Thank you for collecting your chapter with MARAHIL.
        </p>
      </div>

      <div className="border border-border p-6 md:p-8 space-y-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Order number</span>
          <span className="font-serif">{order.orderNumber}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Field label="Name" value={order.customerName} />
          <Field label="Email" value={order.email} />
          <Field label="Phone" value={order.phone} />
          <Field label="Emirate" value={order.emirate} />
          <Field label="City" value={order.city} />
          <Field label="Address" value={order.address} />
          <Field
            label="Payment"
            value={order.paymentMethod === "cod" ? "Cash on Delivery" : "Card"}
          />
          <Field
            label="Status"
            value={order.paymentStatus === "paid" ? "Paid" : "Pending"}
          />
        </div>
      </div>

      <div className="border border-border p-6 md:p-8 space-y-4">
        <span className="text-label text-muted">Items</span>
        <div className="divide-y divide-border">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between py-3 text-sm">
              <span className="min-w-0">
                <span className="block font-serif">{item.productName}</span>
                <span className="text-[10px] tracking-nav uppercase text-muted">
                  {item.branch} · {item.size} · ×{item.quantity}
                </span>
              </span>
              <span className="font-serif whitespace-nowrap">
                {formatPrice(item.total)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span>{formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">{BRAND.charityLabel}</span>
            <span>{formatPrice(order.charityAmount)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2">
            <span className="text-label">Total</span>
            <span className="text-xl font-serif">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] tracking-nav uppercase text-muted">
        {BRAND.charityLabel} {BRAND.memorialNote}
      </p>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex h-12 items-center px-8 border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
        >
          Return to MARAHIL
        </Link>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] tracking-nav uppercase text-muted">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
