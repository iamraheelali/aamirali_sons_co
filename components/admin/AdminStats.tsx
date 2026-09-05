import { getProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";

export function AdminStats({ products }: { products: import("@/types/product").Product[] }) {
  const fahl = products.filter((p) => p.branch === "fahl").length;
  const aniqa = products.filter((p) => p.branch === "aniqa").length;
  const fragrances = products.filter((p) => p.category === "fragrance").length;
  const memorial = products.filter((p) => p.isMemorialEdition).length;

  const stats = [
    { label: "Products", value: products.length },
    { label: "AL-FAHL", value: fahl },
    { label: "AL-ANIQA", value: aniqa },
    { label: "Fragrances", value: fragrances },
    { label: "Memorial Editions", value: memorial },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border">
      {stats.map((s) => (
        <div key={s.label} className="bg-background p-5 space-y-2">
          <span className="text-[10px] tracking-nav uppercase text-muted">
            {s.label}
          </span>
          <div className="text-2xl font-serif">{s.value}</div>
        </div>
      ))}
    </div>
  );
}

export { formatPrice };
