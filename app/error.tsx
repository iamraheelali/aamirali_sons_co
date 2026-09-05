"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <span className="text-label text-muted">Error</span>
        <h1 className="text-3xl md:text-4xl font-serif">
          Something interrupted the ritual.
        </h1>
        <p className="text-sm text-muted max-w-sm mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center px-8 border border-foreground/30 text-label uppercase tracking-nav hover:border-accent hover:text-accent transition-colors"
        >
          Return to MARAHIL
        </Link>
      </div>
    </div>
  );
}
