import type { Metadata } from "next";
import { StoreHeader } from "@/components/layout/StoreHeader";
import { StoreFooter } from "@/components/layout/StoreFooter";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";
import { CheckoutGuard } from "@/components/commerce/CheckoutGuard";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your MARAHIL order.",
};

export default function CheckoutPage() {
  return (
    <>
      <StoreHeader branch="fahl" />
      <main className="flex-1">
        <CheckoutGuard />
      </main>
      <StoreFooter branch="fahl" />
    </>
  );
}
