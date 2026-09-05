import { MarahilBottle } from "./MarahilBottle";
import { getChapters } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";
import type { Branch } from "@/types/product";

export function StoreHero({ branch }: { branch: Branch }) {
  const site = siteConfig[branch];
  const chapters = getChapters();
  const isAniqa = branch === "aniqa";

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Cinematic background */}
      <div
        className="absolute inset-0"
        style={{
          background: isAniqa
            ? "radial-gradient(120% 90% at 50% 0%, var(--surface) 0%, var(--accent-soft) 60%, var(--background) 100%)"
            : "radial-gradient(120% 90% at 50% 0%, var(--surface) 0%, var(--background) 60%, var(--foreground) 100%)",
        }}
      />
      {/* Brothers image slot — renders only if the asset is supplied.
          Until then, the designed bottle composition is shown (no broken image). */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-reveal">
            <span className="text-label text-muted">{site.name}</span>
            <span
              dir="rtl"
              lang="ar"
              className="block text-2xl md:text-3xl font-serif text-muted"
            >
              {site.arabicName}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
              Six chapters.
              <br />
              One bottle.
              <br />
              Your day, collected.
            </h1>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              {isAniqa
                ? "A fragrance ritual for women, following the rhythm of the day."
                : "A fragrance ritual for men, following the rhythm of the day."}
            </p>
            <div className="pt-2">
              <a
                href="#collection"
                className="inline-flex h-12 items-center px-8 border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
              >
                Collect your chapter
              </a>
            </div>
          </div>

          <div className="relative h-72 md:h-[460px] flex items-end justify-center gap-3 md:gap-5">
            {chapters.map((c, i) => (
              <div
                key={c.key}
                className="h-44 w-12 md:h-72 md:w-16"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <MarahilBottle
                  chapter={c.chapter}
                  prayer={c.prayer}
                  plateColor={c.colorHex}
                  branch={branch}
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
