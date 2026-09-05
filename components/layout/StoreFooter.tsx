import Link from "next/link";
import { siteConfig } from "@/lib/site";
import type { Branch } from "@/types/product";

export function StoreFooter({ branch }: { branch: Branch }) {
  const site = siteConfig[branch];
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <span className="text-sm font-serif">{site.name}</span>
            <span
              dir="rtl"
              lang="ar"
              className="block text-sm font-serif text-muted"
            >
              {site.arabicName}
            </span>
            <p className="text-xs text-muted leading-relaxed">
              MARAHIL — Collect your day, not a trend. Same bottle forever.
            </p>
          </div>

          <div className="md:text-right">
            <div className="flex md:justify-end gap-4 flex-wrap text-[10px] tracking-nav uppercase text-muted">
              <Link href="/company" className="hover:text-accent transition-colors">
                Parent Company
              </Link>
              <span className="text-muted/40">Contact</span>
              <span className="text-muted/40">Shipping</span>
              <span className="text-muted/40">Returns</span>
              <span className="text-muted/40">Privacy</span>
              <span className="text-muted/40">Terms</span>
            </div>
            <p className="mt-6 text-[10px] tracking-nav uppercase text-muted">
              Parent: Aamir Ali & Sons Co. LLC · Abu Dhabi, UAE
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-[10px] tracking-nav uppercase text-muted">
          © Aamir Ali & Sons Co. LLC
        </div>
      </div>
    </footer>
  );
}
