import type { Metadata } from "next";
import { ParentHeader } from "@/components/layout/ParentHeader";
import { ParentFooter } from "@/components/layout/ParentFooter";
import { metadataForSite } from "@/lib/seo";

export const metadata: Metadata = {
  ...metadataForSite("parent"),
  title: "Company | Aamir Ali & Sons",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <>
      <ParentHeader />
      <main className="flex-1">
        <section className="px-6 md:px-10 py-24 md:py-40">
          <div className="mx-auto max-w-2xl text-center space-y-10">
            <span className="text-label text-muted">Company</span>

            <div className="space-y-6 animate-reveal">
              <p className="text-lg md:text-xl font-serif leading-relaxed">
                In Loving Memory of Late Father Aamir Ali
                <br />& Elder Brother Faisal Aamir Ali
              </p>

              <div className="h-px w-16 mx-auto bg-border" />

              <p className="text-sm text-muted leading-relaxed">
                Built by Raheel Ali
              </p>

              <p className="text-sm md:text-base leading-relaxed">
                Raheel is custodian of legacy.
                <br />
                Aamir Ali &amp; Sons lives on.
              </p>

              <div className="h-px w-16 mx-auto bg-border" />

              <p
                dir="rtl"
                lang="ar"
                className="text-xl md:text-2xl font-serif"
              >
                لكل مرحلة هيبتها
              </p>
              <p className="text-[10px] tracking-nav uppercase text-muted">
                For every stage, its presence.
              </p>
            </div>
          </div>
        </section>
      </main>
      <ParentFooter />
    </>
  );
}
