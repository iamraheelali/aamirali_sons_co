"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SiteSwitcher } from "@/components/brand/SiteSwitcher";
import { siteConfig } from "@/lib/site";

export function ParentHeader() {
  const [open, setOpen] = useState(false);
  const nav = siteConfig.parent.navigation;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="text-center py-2 text-[10px] tracking-[0.3em] uppercase text-muted border-b border-border">
        Abu Dhabi · Parent Company
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Aamir Ali & Sons Co. home">
            <Image
              src="./images/brand/aas-monogram.svg"
              alt="Aamir Ali & Sons Co."
              width={40}
              height={40}
              priority
            />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-serif">Aamir Ali & Sons</span>
              <span
                dir="rtl"
                lang="ar"
                className="text-[10px] text-muted"
              >
                عامر علي آند سنز
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
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
            <span className="text-muted/40">|</span>
            <SiteSwitcher />
          </nav>

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

      {/* Mobile nav */}
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
