"use client";

import { useEffect, useState } from "react";
import { readOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/pricing";
import type { Order } from "@/types/order";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(readOrders());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-label text-muted">Fulfillment</span>
        <h1 className="mt-2 text-2xl font-serif">Orders</h1>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-muted">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] tracking-nav uppercase text-muted border-b border-border">
                <th className="py-3 pr-4">Order</th>
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Payment</th>
                <th className="py-3 pr-4">Items</th>
                <th className="py-3 pr-4">Total</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border">
                  <td className="py-3 pr-4 font-serif text-xs">{o.orderNumber}</td>
                  <td className="py-3 pr-4">{o.customerName}</td>
                  <td className="py-3 pr-4 text-muted uppercase text-[10px] tracking-nav">
                    {o.paymentMethod === "cod" ? "COD" : "Card"}
                  </td>
                  <td className="py-3 pr-4 text-muted">{o.items.length}</td>
                  <td className="py-3 pr-4">{formatPrice(o.total)}</td>
                  <td className="py-3 pr-4 text-muted uppercase text-[10px] tracking-nav">
                    {o.orderStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
