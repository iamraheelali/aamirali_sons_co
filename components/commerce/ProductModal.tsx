"use client";

import { Modal } from "@/components/ui/Modal";
import { ProductDetails } from "./ProductDetails";
import type { Product } from "@/types/product";

export function ProductModal({
  product,
  related = [],
  open,
  onClose,
}: {
  product: Product | null;
  related?: Product[];
  open: boolean;
  onClose: () => void;
}) {
  if (!product) return null;
  return (
    <Modal open={open} onClose={onClose} labelledBy="product-modal-title">
      <ProductDetails product={product} related={related} />
    </Modal>
  );
}
