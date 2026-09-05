"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SiteKey } from "@/types/site";

const SITES: { key: SiteKey; label: string; href: string }[] = [
  { key: "parent", label: "Parent", href: "/" },
  { key: "fahl", label: "AL-FAHL", href: "/fahl" },
  { key: "aniqa", label: "AL-ANIQA", href: "/aniqa" },
];

function activeSite(pathname: string): SiteKey {
  if (pathname.startsWith("/fahl")) return "fahl";
  if (pathname.startsWith("/aniqa")) return "aniqa";
  return "parent";
}

export function SiteSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const active = activeSite(pathname);
  return (
    <nav
      aria-label="Switch site"
      className={cn("flex items-center gap-1 text-[10px] tracking-nav uppercase", className)}
    >
      {SITES.map((s, i) => {
        const isActive = s.key === active;
        return (
          <span key={s.key} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-muted/50 px-1" aria-hidden="true">
                |
              </span>
            )}
            <Link
              href={s.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "px-1 py-1 transition-colors",
                isActive
                  ? "text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              {s.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
