import type { Branch, ProductSize } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  branch: Branch;
  category: string;
  chapter?: string;
  colorHex?: string;
  size: ProductSize;
  finish?: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  /** Optional label shown beside the product, e.g. "Onyx Heavy Bead 12mm" */
  variantLabel?: string;
}

export interface CartState {
  items: CartItem[];
}
