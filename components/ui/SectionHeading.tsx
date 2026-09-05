import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  arabic?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  arabic,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-label text-muted">{eyebrow}</span>
      )}
      <h2 className="text-2xl md:text-3xl font-serif">{title}</h2>
      {arabic && (
        <span
          dir="rtl"
          lang="ar"
          className="text-lg md:text-xl text-muted font-serif"
        >
          {arabic}
        </span>
      )}
    </div>
  );
}
