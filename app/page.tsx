import type { Metadata } from "next";
import { ParentHeader } from "@/components/layout/ParentHeader";
import { ParentFooter } from "@/components/layout/ParentFooter";
import { ParentHero } from "@/components/brand/ParentHero";
import { MarahilStages } from "@/components/brand/MarahilStages";
import { MarahilStores } from "@/components/brand/MarahilStores";
import { SameBottleForever } from "@/components/brand/SameBottleForever";
import { metadataForSite } from "@/lib/seo";

export const metadata: Metadata = metadataForSite("parent");

export default function ParentPage() {
  return (
    <>
      <ParentHeader />
      <main className="flex-1">
        <ParentHero />

        <section className="px-6 md:px-10 py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 flex flex-col items-center text-center gap-3">
              <span className="text-label text-muted">The Six Stages</span>
              <h2 className="text-2xl md:text-3xl font-serif">
                مراحل · Marahil
              </h2>
              <p className="text-sm text-muted max-w-md">
                Each chapter follows a prayer of the day. The same bottle
                carries them all.
              </p>
            </div>
            <MarahilStages />
          </div>
        </section>

        <MarahilStores />
        <SameBottleForever />
      </main>
      <ParentFooter />
    </>
  );
}
