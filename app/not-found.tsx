import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <span className="text-label text-muted">404</span>
        <h1 className="text-3xl md:text-4xl font-serif">
          The chapter could not be found.
        </h1>
        <p className="text-sm text-muted max-w-sm mx-auto">
          The page you seek is not within these stages.
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
