"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Catalog", href: "/admin/catalog" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-border p-4 md:p-6">
      <div className="mb-8">
        <span className="text-sm font-serif">MARAHIL</span>
        <span className="block text-[10px] tracking-nav uppercase text-muted">
          Admin
        </span>
      </div>
      <nav className="flex md:flex-col gap-4 overflow-x-auto no-scrollbar">
        {NAV.map((n) => {
          const active =
            pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "text-[10px] tracking-nav uppercase whitespace-nowrap transition-colors",
                active ? "text-accent" : "text-muted hover:text-foreground",
              )}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
