import type { Branch } from "./product";

export type PaymentMethod = "card" | "cod";
export type PaymentStatus = "pending" | "paid" | "failed";
export type OrderStatus = "received" | "processing" | "shipped" | "delivered";

export interface OrderItem {
  productId: string;
  productName: string;
  branch: Branch;
  sku: string;
  size: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  emirate: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  shipping: number;
  charityAmount: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
}
