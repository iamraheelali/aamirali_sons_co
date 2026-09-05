import { getProducts } from "@/lib/catalog";
import { AdminStats } from "@/components/admin/AdminStats";

export default async function AdminDashboard() {
  const products = await getProducts();
  return (
    <div className="space-y-8">
      <div>
        <span className="text-label text-muted">Overview</span>
        <h1 className="mt-2 text-2xl font-serif">Dashboard</h1>
      </div>
      <AdminStats products={products} />
    </div>
  );
}
