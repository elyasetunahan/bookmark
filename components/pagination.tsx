import Link from "next/link";

import { buildQuery } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  q?: string;
  tag?: string;
}

export function Pagination({ page, totalPages, basePath, q, tag }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-3 text-sm">
      <Link
        aria-disabled={page <= 1}
        className="rounded-full border border-border bg-white/70 px-4 py-2 text-muted transition hover:text-text aria-disabled:pointer-events-none aria-disabled:opacity-40"
        href={`${basePath}${buildQuery({ q, tag, page: prevPage })}`}
      >
        Önceki
      </Link>
      <span className="rounded-full border border-border bg-white/60 px-3 py-1 text-muted">
        Sayfa {page} / {totalPages}
      </span>
      <Link
        aria-disabled={page >= totalPages}
        className="rounded-full border border-border bg-white/70 px-4 py-2 text-muted transition hover:text-text aria-disabled:pointer-events-none aria-disabled:opacity-40"
        href={`${basePath}${buildQuery({ q, tag, page: nextPage })}`}
      >
        Sonraki
      </Link>
    </nav>
  );
}
