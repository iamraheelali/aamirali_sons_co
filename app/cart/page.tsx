import type { Metadata } from "next";
import { CartView } from "@/components/commerce/CartView";
import { StoreHeader } from "@/components/layout/StoreHeader";
import { StoreFooter } from "@/components/layout/StoreFooter";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Your MARAHIL cart.",
};

export default function CartPage() {
  return (
    <>
      <StoreHeader branch="fahl" />
      <main className="flex-1">
        <CartView />
      </main>
      <StoreFooter branch="fahl" />
    </>
  );
}
