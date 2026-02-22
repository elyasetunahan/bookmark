export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Signal Atlas</p>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Portfolio, writing ve bookmark arşivinin tek bir editorial keşif katmanında birleştiği kişisel çalışma alanı.
          </p>
        </div>
        <p className="text-sm text-muted">
          İletişim:{" "}
          <a className="font-medium text-accent transition hover:opacity-80" href="mailto:hello@example.com">
            hello@example.com
          </a>
        </p>
      </div>
    </footer>
  );
}
