import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarahilBottle } from "./MarahilBottle";

export function MarahilStores() {
  return (
    <section id="marahil" className="px-6 md:px-10 py-20 md:py-28 border-b border-border">
      <div className="grid md:grid-cols-2 gap-px bg-border">
        {/* AL-ANIQA — links to /aniqa */}
        <StoreCard
          arabic="الأنيقة"
          name="MARAHIL AL-ANIQA"
          body="A women's fragrance collection shaped around elegance, ritual, and the rhythm of her day."
          href="/aniqa"
        />
        {/* AL-FAHL — links to /fahl */}
        <StoreCard
          arabic="الفحل"
          name="MARAHIL AL-FAHL"
          body="A men's fragrance collection shaped around presence, ritual, and the rhythm of his day."
          href="/fahl"
        />
      </div>
    </section>
  );
}

function StoreCard({
  arabic,
  name,
  body,
  href,
}: {
  arabic: string;
  name: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-background p-10 md:p-16 flex flex-col gap-6 min-h-[360px] overflow-hidden hover:bg-surface transition-colors"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="h-64 w-20 opacity-40">
          <MarahilBottle plateColor="#D4AF37" size="50" />
        </div>
      </div>
      <div className="relative flex flex-col gap-4">
        <span
          dir="rtl"
          lang="ar"
          className="text-3xl md:text-4xl font-serif"
        >
          {arabic}
        </span>
        <span className="text-lg font-serif">{name}</span>
        <p className="text-sm text-muted max-w-xs">{body}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-label text-accent">
          Go to this site
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.25} />
        </span>
      </div>
    </Link>
  );
}
