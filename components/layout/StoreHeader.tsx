"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SiteSwitcher } from "@/components/brand/SiteSwitcher";
import { CartLink } from "@/components/commerce/CartIcon";
import { siteConfig } from "@/lib/site";
import type { Branch } from "@/types/product";

export function StoreHeader({ branch }: { branch: Branch }) {
  const [open, setOpen] = useState(false);
  const site = siteConfig[branch];
  const nav = site.navigation;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="text-center py-2 text-[10px] tracking-[0.3em] uppercase text-muted border-b border-border">
        {site.name} · <span dir="rtl" lang="ar">{site.arabicName}</span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-between h-28">
          <Link href={site.route} className="flex items-center gap-5 leading-tight" aria-label={`${site.name} home`}>
            <Image
              src="/images/marahil/marahil-crest.png"
              alt="MARAHIL"
              width={72}
              height={72}
              priority
              className="h-[72px] w-[72px] shrink-0 object-contain"
            />
            <span className="flex flex-col">
              <span className="text-lg font-serif tracking-[0.12em]">MARAHIL</span>
              <span className="text-[11px] tracking-[0.12em] text-muted">{site.name.replace("MARAHIL ", "")}</span>
            </span>
            <span
              dir="rtl"
              lang="ar"
              className="text-[10px] text-muted"
            >
              {site.arabicName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-nav text-muted hover:text-foreground transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <SiteSwitcher className="hidden sm:flex" />
            <CartLink />
            <button
              type="button"
              className="md:hidden text-muted"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-nav text-muted hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            <SiteSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
