"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Drawer({ open, onClose, children, className, title }: DrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 animate-overlay cursor-pointer"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Drawer"}
        className={cn(
          "absolute right-0 top-0 h-full w-full sm:w-[460px] bg-surface text-foreground border-l border-border flex flex-col animate-drawer",
          className,
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="text-label">{title ?? "Drawer"}</span>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="p-1 text-muted hover:text-accent transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.25} />
          </button>
        </div>
        {children}
      </aside>
    </div>,
    document.body,
  );
}
