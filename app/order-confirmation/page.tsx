"use client";

import { useSearchParams } from "next/navigation";
import { StoreHeader } from "@/components/layout/StoreHeader";
import { StoreFooter } from "@/components/layout/StoreFooter";
import { OrderConfirmationView } from "@/components/commerce/OrderConfirmationView";
import { Suspense } from "react";

export default function OrderConfirmationPage() {
  return (
    <>
      <StoreHeader branch="fahl" />
      <main className="flex-1">
        <Suspense fallback={<div className="py-24 text-center text-label text-muted">Loading…</div>}>
          <OrderConfirmationFromQuery />
        </Suspense>
      </main>
      <StoreFooter branch="fahl" />
    </>
  );
}

function OrderConfirmationFromQuery() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  return <OrderConfirmationView orderId={id} />;
}
