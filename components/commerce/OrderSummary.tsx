"use client";

import { useCart } from "@/components/cart/CartProvider";
import { calculateCartTotals, formatPrice } from "@/lib/pricing";
import { BRAND } from "@/lib/site";

export function OrderSummary() {
  const { items } = useCart();
  const totals = calculateCartTotals(items);

  return (
    <div className="border border-border p-6 md:p-8 space-y-5 bg-surface">
      <span className="text-label text-muted">Order Summary</span>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4 text-sm">
            <span className="min-w-0">
              <span className="block font-serif leading-snug">{item.name}</span>
              <span className="text-[10px] tracking-nav uppercase text-muted">
                {item.branch} · {item.size === "default" ? item.variantLabel : `${item.size}ml`} · ×{item.quantity}
              </span>
            </span>
            <span className="font-serif whitespace-nowrap">
              {formatPrice(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2 text-sm">
        <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
        <Row label="Shipping" value={formatPrice(totals.shipping)} />
        <Row
          label={`${BRAND.charityLabel}`}
          value={formatPrice(totals.charityAmount)}
          muted
        />
        <div className="pt-2 flex justify-between items-baseline">
          <span className="text-label">Total</span>
          <span className="text-xl font-serif">{formatPrice(totals.total)}</span>
        </div>
      </div>

      <p className="text-[10px] text-muted leading-relaxed">
        {BRAND.charityLabel} {BRAND.memorialNote}.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-muted" : "text-muted"}>{label}</span>
      <span className={muted ? "text-muted" : "text-foreground"}>{value}</span>
    </div>
  );
}
