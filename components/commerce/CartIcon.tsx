"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export function CartIcon({ className }: { className?: string }) {
  const { itemCount, open, hydrated } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart, ${itemCount} items`}
      className={cn(
        "relative inline-flex items-center gap-2 text-label hover:text-accent transition-colors",
        className,
      )}
    >
      <span className="hidden sm:inline">Cart</span>
      <span className="relative">
        <ShoppingBag className="w-4 h-4" strokeWidth={1.25} />
        {hydrated && itemCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 flex items-center justify-center text-[9px] bg-accent text-background rounded-full">
            {itemCount}
          </span>
        )}
      </span>
    </button>
  );
}

export function CartLink({ className }: { className?: string }) {
  const { itemCount, hydrated } = useCart();
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${itemCount} items`}
      className={cn(
        "relative inline-flex items-center gap-2 text-label hover:text-accent transition-colors",
        className,
      )}
    >
      <span className="hidden sm:inline">Cart</span>
      <span className="relative">
        <ShoppingBag className="w-4 h-4" strokeWidth={1.25} />
        {hydrated && itemCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 flex items-center justify-center text-[9px] bg-accent text-background rounded-full">
            {itemCount}
          </span>
        )}
      </span>
    </Link>
  );
}
