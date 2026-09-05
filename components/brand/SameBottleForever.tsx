import { MarahilBottle } from "./MarahilBottle";
import { getChapters } from "@/lib/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SameBottleForever() {
  const chapters = getChapters();
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 border-t border-border">
      <SectionHeading
        eyebrow="Brand Philosophy"
        title="Same bottle forever."
        arabic="زجاجة واحدة · ستة فصول"
      />
      <p className="mt-6 text-center text-sm text-muted max-w-md mx-auto">
        One bottle. Six chapters. Only the chapter changes.
      </p>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4">
        {chapters.map((c) => (
          <div key={c.key} className="flex flex-col items-center gap-3">
            <div className="h-40 w-24">
              <MarahilBottle
                chapter={c.chapter}
                prayer={c.prayer}
                plateColor={c.colorHex}
                size="50"
              />
            </div>
            <div className="text-center">
              <div className="text-xs font-serif">{c.chapter}</div>
              <div className="text-[10px] text-muted tracking-nav uppercase">
                {c.colorName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
