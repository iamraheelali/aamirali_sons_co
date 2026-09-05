import Link from "next/link";
import { BRAND } from "@/lib/site";

export function ParentFooter() {
  return (
    <footer id="contact" className="mt-auto border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <span className="text-sm font-serif">Aamir Ali & Sons Co. LLC</span>
            <p className="text-xs text-muted leading-relaxed">
              In Memory · Parent of Marahil.
              <br />
              No shop on this origin.
            </p>
            <div className="pt-2 text-xs text-muted space-y-1">
              <p>{BRAND.city}</p>
              <p>
                <a
                  href={`mailto:${BRAND.parentEmail}`}
                  className="hover:text-accent transition-colors"
                >
                  {BRAND.parentEmail}
                </a>
              </p>
            </div>
          </div>

          <div className="md:text-right space-y-3">
            <span
              dir="rtl"
              lang="ar"
              className="block text-sm font-serif text-muted"
            >
              {BRAND.legacyStatement}
            </span>
            <p className="text-xs text-muted">
              MARAHIL — Collect your day, not a trend.
            </p>
            <div className="flex md:justify-end gap-4 text-[10px] tracking-nav uppercase text-muted">
              <Link href="/fahl" className="hover:text-accent transition-colors">
                AL-FAHL
              </Link>
              <Link href="/aniqa" className="hover:text-accent transition-colors">
                AL-ANIQA
              </Link>
              <Link href="/company" className="hover:text-accent transition-colors">
                Company
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-[10px] tracking-nav uppercase text-muted">
          © Aamir Ali & Sons Co. LLC
        </div>
      </div>
    </footer>
  );
}
