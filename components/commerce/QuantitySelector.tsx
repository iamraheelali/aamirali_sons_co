"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div
      className={cn(
        "inline-flex items-center border border-border",
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="h-10 w-10 flex items-center justify-center text-muted hover:text-accent disabled:opacity-30 transition-colors"
      >
        <Minus className="w-3.5 h-3.5" strokeWidth={1.25} />
      </button>
      <span
        className="w-10 text-center text-sm font-sans"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="h-10 w-10 flex items-center justify-center text-muted hover:text-accent disabled:opacity-30 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={1.25} />
      </button>
    </div>
  );
}
