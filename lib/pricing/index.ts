import type { CartItem } from "@/types/cart";
import type { Product, ProductSize } from "@/types/product";
import { priceForSize, skuForSize } from "@/lib/catalog";
import { BRAND } from "@/lib/site";

export const SHIPPING_FLAT = 0; // Free shipping for luxury; adjust as needed.
export const CHARITY_RATE = BRAND.charityRate;

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function calculateShipping(_items: CartItem[]): number {
  return SHIPPING_FLAT;
}

export function calculateCharityAmount(subtotal: number): number {
  return Math.round(subtotal * CHARITY_RATE * 100) / 100;
}

export function calculateTotal(subtotal: number, shipping: number, charity: number): number {
  return Math.round((subtotal + shipping + charity) * 100) / 100;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  charityAmount: number;
  total: number;
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const subtotal = calculateCartSubtotal(items);
  const shipping = calculateShipping(items);
  const charityAmount = calculateCharityAmount(subtotal);
  const total = calculateTotal(subtotal, shipping, charityAmount);
  return { subtotal, shipping, charityAmount, total };
}

/** Build a CartItem from a product + selected size. */
export function buildCartItem(
  product: Product,
  size: ProductSize,
  quantity: number,
  finish?: string,
): CartItem {
  const finishSuffix = finish ? `-${finish.toLowerCase().replace(/\s+/g, "-")}` : "";
  return {
    id: `${product.id}-${size}${finishSuffix}`,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    branch: product.branch,
    category: product.category,
    chapter: product.chapter,
    colorHex: product.colorHex,
    size,
    finish,
    sku: skuForSize(product, size),
    quantity,
    unitPrice: priceForSize(product, size),
    variantLabel: finish
      ? `${productVariantLabel(product, size)} · ${finish}`
      : productVariantLabel(product, size),
  };
}

export function productVariantLabel(product: Product, size: ProductSize): string {
  if (size === "50") return "50ml";
  if (size === "100") return "100ml";
  if (product.discoverySize) return product.discoverySize;
  return product.name;
}

export function formatPrice(amount: number, currency = "USD"): string {
  const symbol = currency === "USD" ? "$" : "";
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
