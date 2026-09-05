import { getProducts, getChapters, catalogSource } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";

export const metadata = { title: "Catalog" };

export default async function AdminCatalogPage() {
  const products = await getProducts();
  const chapters = getChapters();
  const byBranch = {
    fahl: products.filter((p) => p.branch === "fahl"),
    aniqa: products.filter((p) => p.branch === "aniqa"),
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-label text-muted">Configuration</span>
        <h1 className="mt-2 text-2xl font-serif">Catalog</h1>
        <p className="mt-2 text-xs text-muted">
          Source: <span className="uppercase">{catalogSource}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {(Object.keys(byBranch) as ("fahl" | "aniqa")[]).map((branch) => (
          <div key={branch} className="border border-border p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-serif uppercase">{branch}</span>
              <span className="text-[10px] tracking-nav uppercase text-muted">
                {byBranch[branch].length} products
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-muted">
              {byBranch[branch].map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span>{formatPrice(p.price50 ?? p.price ?? 0)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border border-border p-6">
        <span className="text-sm font-serif">Chapters</span>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-3">
          {chapters.map((c) => (
            <div key={c.key} className="flex items-center gap-2 text-xs">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: c.colorHex }}
              />
              {c.chapter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
