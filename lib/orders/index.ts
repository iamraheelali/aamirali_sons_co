import type { CartItem } from "@/types/cart";
import type { Order, OrderItem, PaymentMethod } from "@/types/order";
import { calculateCartTotals } from "@/lib/pricing";

const ORDERS_KEY = "marahil-orders";

// In-memory fallback used when localStorage is unavailable (e.g. sandboxed
// preview iframes with an opaque origin). In normal browsers this is never
// touched — orders persist to localStorage instead.
let memoryOrders: Order[] = [];

function localStorageAvailable(): boolean {
  try {
    const k = "__marahil_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function generateOrderNumber(): string {
  const stamp = Date.now().toString().slice(-8);
  const rand = Math.floor(Math.random() * 900 + 100);
  return `MRH-${stamp}-${rand}`;
}

export function createOrderFromCart(
  items: CartItem[],
  input: {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    emirate: string;
    paymentMethod: PaymentMethod;
  },
): Order {
  const totals = calculateCartTotals(items);
  const orderItems: OrderItem[] = items.map((item) => ({
    productId: item.productId,
    productName: item.name,
    branch: item.branch,
    sku: item.sku,
    size: item.size === "default" ? item.variantLabel ?? "—" : `${item.size}ml`,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    total: item.unitPrice * item.quantity,
  }));

  const order: Order = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `MRH-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    orderNumber: generateOrderNumber(),
    customerName: input.customerName,
    email: input.email,
    phone: input.phone,
    address: input.address,
    city: input.city,
    emirate: input.emirate,
    paymentMethod: input.paymentMethod,
    paymentStatus: input.paymentMethod === "cod" ? "pending" : "paid",
    orderStatus: "received",
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    charityAmount: totals.charityAmount,
    total: totals.total,
    items: orderItems,
    createdAt: new Date().toISOString(),
  };

  persistOrder(order);
  return order;
}

function persistOrder(order: Order): void {
  if (typeof window === "undefined") return;
  if (!localStorageAvailable()) {
    memoryOrders.unshift(order);
    return;
  }
  const existing = readOrders();
  existing.unshift(order);
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(existing));
  } catch {
    memoryOrders.unshift(order);
  }
}

export function readOrders(): Order[] {
  if (typeof window === "undefined") return memoryOrders;
  if (!localStorageAvailable()) return memoryOrders;
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    if (!raw) return memoryOrders;
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : memoryOrders;
  } catch {
    return memoryOrders;
  }
}

export function getOrderById(id: string): Order | null {
  return readOrders().find((o) => o.id === id) ?? null;
}
