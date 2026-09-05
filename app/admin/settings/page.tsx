import { siteConfig } from "@/lib/site";
import { BRAND } from "@/lib/site";

export const metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  const sites = Object.values(siteConfig);
  return (
    <div className="space-y-8">
      <div>
        <span className="text-label text-muted">Configuration</span>
        <h1 className="mt-2 text-2xl font-serif">Settings</h1>
      </div>

      <div className="border border-border p-6 space-y-3">
        <span className="text-sm font-serif">Storefront</span>
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-muted">Currency</dt>
          <dd>{BRAND.currency}</dd>
          <dt className="text-muted">Charity</dt>
          <dd>{BRAND.charityLabel}</dd>
          <dt className="text-muted">Parent email</dt>
          <dd>{BRAND.parentEmail}</dd>
        </dl>
      </div>

      <div className="border border-border p-6">
        <span className="text-sm font-serif">Sites & domains</span>
        <div className="mt-4 space-y-3">
          {sites.map((s) => (
            <div key={s.key} className="flex items-center justify-between text-sm">
              <span className="font-serif">{s.name}</span>
              <span className="text-muted text-xs">{s.domain}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
