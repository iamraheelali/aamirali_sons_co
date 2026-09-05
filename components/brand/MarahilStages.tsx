import { getChapters } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface MarahilStagesProps {
  className?: string;
}

export function MarahilStages({ className }: MarahilStagesProps) {
  const chapters = getChapters();
  return (
    <div className={cn("w-full", className)}>
      {chapters.map((c, i) => (
        <div
          key={c.key}
          className="grid grid-cols-12 items-center gap-4 border-t border-border py-6 md:py-8"
          style={i === chapters.length - 1 ? undefined : undefined}
        >
          <div className="col-span-2 md:col-span-1 text-label text-muted">
            {c.number}
          </div>
          <div className="col-span-5 md:col-span-4">
            <div className="text-xl md:text-2xl font-serif">{c.chapter}</div>
          </div>
          <div className="col-span-3 md:col-span-3 text-label text-muted">
            {c.prayer}
          </div>
          <div className="col-span-2 md:col-span-4 flex items-center justify-end gap-3">
            <span className="text-label text-muted hidden md:inline">
              {c.colorName}
            </span>
            <span
              className="h-3 w-3 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: c.colorHex }}
              aria-label={c.colorName}
            />
          </div>
        </div>
      ))}
      <div className="border-t border-border" />
    </div>
  );
}
