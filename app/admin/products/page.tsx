import { getProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";
import type { Product } from "@/types/product";

export default async function AdminProductsPage() {
  const products = await getProducts();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-label text-muted">Catalog</span>
          <h1 className="mt-2 text-2xl font-serif">Products</h1>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] tracking-nav uppercase text-muted border-b border-border">
              <th className="py-3 pr-4">Name</th>
              <th className="py-3 pr-4">Branch</th>
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">SKU</th>
              <th className="py-3 pr-4">Price</th>
              <th className="py-3 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <ProductRow key={p.id} product={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductRow({ product }: { product: Product }) {
  const price = product.price50 ?? product.price ?? 0;
  return (
    <tr className="border-b border-border">
      <td className="py-3 pr-4 font-serif">{product.name}</td>
      <td className="py-3 pr-4 text-muted uppercase text-[10px] tracking-nav">
        {product.branch}
      </td>
      <td className="py-3 pr-4 text-muted uppercase text-[10px] tracking-nav">
        {product.category}
      </td>
      <td className="py-3 pr-4 text-muted text-xs">{product.sku}</td>
      <td className="py-3 pr-4">{formatPrice(price)}</td>
      <td className="py-3 pr-4">
        <span className="text-[10px] tracking-nav uppercase text-muted">
          {product.isActive ? "Active" : "Inactive"}
        </span>
      </td>
    </tr>
  );
}
