import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-soft">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-2 font-heading text-3xl text-text">Aradığın sayfa bulunamadı</h1>
      <p className="mt-3 text-sm text-muted">Bağlantı eski olabilir veya içerik taşınmış olabilir.</p>
      <Link className="mt-6 inline-flex rounded-xl bg-text px-4 py-2 text-sm text-white" href="/">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
