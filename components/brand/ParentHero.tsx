import { MarahilBottle } from "./MarahilBottle";
import { getChapters } from "@/lib/catalog";
import Image from "next/image";

export function ParentHero() {
  const chapters = getChapters();
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-reveal">
            <Image
              src="./images/brand/aas-wordmark.svg"
              alt="Aamir Ali & Sons Co."
              width={420}
              height={118}
              className="h-auto w-full max-w-[420px]"
              priority
            />
            <span className="text-label text-muted">
              MARAHIL · <span dir="rtl" lang="ar">مراحل</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
              Collect your day,
              <br />
              not a trend.
            </h1>
            <p className="text-sm md:text-base text-muted leading-relaxed max-w-md">
              Six stages follow the day&apos;s prayers. Discovery beside them.
              Same bottle forever. Two souls: AL-ANIQA and AL-FAHL. Separate
              sites.
            </p>
          </div>

          {/* Bottle composition */}
          <div className="relative h-80 md:h-[440px] flex items-end justify-center gap-2 md:gap-4">
            {chapters.map((c, i) => (
              <div
                key={c.key}
                className="h-48 w-12 md:h-72 md:w-16 transition-transform hover:-translate-y-2"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <MarahilBottle
                  chapter={c.chapter}
                  prayer={c.prayer}
                  plateColor={c.colorHex}
                  size="50"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
