import { cn } from "@/lib/utils";

export interface MarahilBottleProps {
  /** Chapter label shown on the plate, e.g. "Bad’" */
  chapter?: string;
  /** Arabic chapter label */
  arabic?: string;
  /** Prayer / time, e.g. "Fajr" */
  prayer?: string;
  /** Plate color hex */
  plateColor?: string;
  /** Branch retained for the shared component API */
  branch?: "fahl" | "aniqa";
  /** Size label shown on the base, e.g. "50" / "100" */
  size?: string;
  className?: string;
}

const DEFAULT_PLATE = "#A8894D";

export function MarahilBottle({
  chapter,
  arabic,
  prayer,
  plateColor = DEFAULT_PLATE,
  size = "50",
  className,
}: MarahilBottleProps) {
  const capColor = "#A8894D";
  const bodyTop = "#161816";
  const bodyBottom = "#1B1D1B";

  return (
    <svg
      viewBox="0 0 200 360"
      role="img"
      aria-label={`Marahil bottle, chapter ${chapter ?? ""}${prayer ? `, ${prayer}` : ""}`}
      className={cn("block h-full w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={bodyTop} />
          <stop offset="45%" stopColor="#3A4538" />
          <stop offset="55%" stopColor="#1B1D1B" />
          <stop offset="100%" stopColor={bodyBottom} />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={capColor} />
          <stop offset="50%" stopColor="#6F5A31" />
          <stop offset="100%" stopColor={capColor} />
        </linearGradient>
        <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={plateColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={plateColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect x="78" y="6" width="44" height="34" rx="3" fill="url(#capGrad)" />
      <rect x="78" y="6" width="44" height="34" rx="3" fill="url(#sheen)" />
      {/* Collar */}
      <rect x="84" y="40" width="32" height="8" fill="#6F5A31" />

      {/* Body — rounded shoulders */}
      <path
        d="M66 48
           C66 44 70 42 74 42
           L126 42
           C130 42 134 44 134 48
           L138 96
           C140 108 140 116 140 128
           L140 320
           C140 332 134 340 124 340
           L76 340
           C66 340 60 332 60 320
           L60 128
           C60 116 60 108 62 96
           Z"
        fill="url(#bodyGrad)"
      />

      {/* Sheen on body */}
      <path
        d="M70 60 L78 80 L78 300 L70 320 Z"
        fill="url(#sheen)"
        opacity="0.5"
      />

      {/* Chapter plate */}
      <rect x="74" y="180" width="52" height="64" rx="2" fill="url(#plateGrad)" />
      <rect
        x="74"
        y="180"
        width="52"
        height="64"
        rx="2"
        fill="none"
        stroke="#000000"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />

      {chapter && (
        <text
          x="100"
          y="208"
          textAnchor="middle"
          fontFamily="var(--font-serif), serif"
          fontSize="16"
          fontWeight="600"
          fill="#1a1a1a"
        >
          {chapter}
        </text>
      )}
      {prayer && (
        <text
          x="100"
          y="226"
          textAnchor="middle"
          fontFamily="var(--font-sans), sans-serif"
          fontSize="7"
          letterSpacing="2"
          fill="#1a1a1a"
          opacity="0.7"
        >
          {prayer.toUpperCase()}
        </text>
      )}
      {arabic && (
        <text
          x="100"
          y="240"
          textAnchor="middle"
          fontFamily="var(--font-serif), serif"
          fontSize="10"
          fill="#1a1a1a"
          opacity="0.6"
        >
          {arabic}
        </text>
      )}

      {/* Brand etch */}
      <text
        x="100"
        y="294"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="6"
        letterSpacing="3"
          fill="#A8894D"
        opacity="0.55"
      >
        MARAHIL
      </text>

      {/* Size */}
      <text
        x="100"
        y="326"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="7"
        letterSpacing="1.5"
          fill="#AEB5AA"
      >
        {size}ML
      </text>
    </svg>
  );
}
