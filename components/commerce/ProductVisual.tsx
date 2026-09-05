import { MarahilBottle } from "@/components/brand/MarahilBottle";
import Image from "next/image";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

const MATERIAL_COLOR: Record<string, string> = {
  onyx: "#161816",
  gold: "#A8894D",
  aqeeq: "#3A4538",
  rose: "#8E6A66",
  rosegold: "#A8894D",
  pearl: "#F2EFE8",
};

export function ProductVisual({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  if (product.imageUrl) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain"
        />
      </div>
    );
  }

  if (product.category === "fragrance" || product.category === "discovery") {
    return (
      <div className={cn("h-full w-full flex items-center justify-center", className)}>
        <div className="h-full aspect-[5/9] max-h-full">
          <MarahilBottle
            chapter={product.chapter}
            prayer={product.prayer}
            arabic={product.arabicName}
            plateColor={product.colorHex}
            branch={product.branch}
            size={
              product.category === "discovery"
                ? "10×4"
                : "50"
            }
          />
        </div>
      </div>
    );
  }

  if (product.category === "jewelry") {
    return <JewelryVisual material={product.material ?? "gold"} name={product.name} className={className} />;
  }

  // gift
  return <GiftBoxVisual className={className} />;
}

function JewelryVisual({
  material,
  name,
  className,
}: {
  material: string;
  name: string;
  className?: string;
}) {
  const color = MATERIAL_COLOR[material] ?? "#A8894D";
  const isRing = name.toLowerCase().includes("ring");
  const isCuff = name.toLowerCase().includes("cuff");
  const isPendant = name.toLowerCase().includes("pendant");

  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <svg viewBox="0 0 200 200" className="h-32 w-32" fill="none" aria-label={name} role="img">
        <defs>
          <linearGradient id="jgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {isRing && (
          <>
            <circle cx="100" cy="110" r="48" stroke="url(#jgrad)" strokeWidth="10" />
            <rect x="88" y="48" width="24" height="22" rx="4" fill="url(#jgrad)" />
            <circle cx="100" cy="58" r="9" fill={color} opacity="0.85" />
          </>
        )}
        {isCuff && (
          <path
            d="M40 100 C40 70 160 70 160 100 C160 130 40 130 40 100 Z"
            stroke="url(#jgrad)"
            strokeWidth="14"
            fill="none"
          />
        )}
        {isPendant && (
          <>
            <rect x="74" y="70" width="52" height="52" rx="4" stroke="url(#jgrad)" strokeWidth="6" fill="none" />
            <line x1="100" y1="40" x2="100" y2="70" stroke={color} strokeWidth="2" />
          </>
        )}
        {!isRing && !isCuff && !isPendant && (
          <>
            <circle cx="100" cy="100" r="26" fill="url(#jgrad)" />
            <circle cx="100" cy="100" r="40" stroke={color} strokeWidth="3" opacity="0.4" />
          </>
        )}
      </svg>
    </div>
  );
}

function GiftBoxVisual({ className }: { className?: string }) {
  const accent = "#A8894D";
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <svg viewBox="0 0 200 200" className="h-32 w-32" fill="none" role="img" aria-label="Gift box">
        <rect x="40" y="80" width="120" height="80" rx="3" fill="#161816" stroke={accent} strokeWidth="1" />
        <rect x="40" y="80" width="120" height="20" fill="#100E0C" stroke={accent} strokeWidth="1" />
        <rect x="92" y="80" width="16" height="80" fill={accent} opacity="0.7" />
        <rect x="88" y="60" width="24" height="22" rx="2" fill={accent} opacity="0.85" />
      </svg>
    </div>
  );
}
