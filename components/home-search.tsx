"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { ContentType, SearchDocument } from "@/lib/types";
import { searchDocuments } from "@/lib/search";

const labels: Record<ContentType, string> = {
  project: "Project",
  note: "Writing",
  bookmark: "Bookmark"
};

export function HomeSearch() {
  const [docs, setDocs] = useState<SearchDocument[]>([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | ContentType>("all");

  useEffect(() => {
    let canceled = false;

    async function loadIndex(): Promise<void> {
      try {
        const response = await fetch("/search-index.json", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as SearchDocument[];
        if (!canceled) {
          setDocs(data);
        }
      } catch {
        // Index fetch can fail before first build; keep UI usable.
      }
    }

    void loadIndex();

    return () => {
      canceled = true;
    };
  }, []);

  const results = useMemo(
    () => searchDocuments(docs, query, type === "all" ? undefined : type, 8),
    [docs, query, type]
  );

  return (
    <section className="soft-panel rounded-3xl p-5 md:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Unified Search</p>
          <h2 className="mt-1 font-heading text-2xl text-text">Hızlı Arama</h2>
          <p className="mt-1 text-sm text-muted">Project, writing ve bookmark içinde tek arama kutusuyla keşfet.</p>
        </div>
        <span className="hidden rounded-full border border-border bg-white/75 px-3 py-1 text-xs text-muted md:inline-flex">
          Live Index
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px]">
        <input
          className="h-11 rounded-2xl border border-border bg-white/75 px-4 text-sm text-text outline-none transition focus:border-accent"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Örn: caching, monitoring, DX"
          value={query}
        />
        <select
          className="h-11 rounded-2xl border border-border bg-white/75 px-3 text-sm text-text outline-none transition focus:border-accent"
          onChange={(event) => setType(event.target.value as "all" | ContentType)}
          value={type}
        >
          <option value="all">Tüm tipler</option>
          <option value="project">Projects</option>
          <option value="note">Writing</option>
          <option value="bookmark">Bookmarks</option>
        </select>
      </div>

      <ul className="mt-4 space-y-2">
        {results.map((result) => (
          <li key={result.id}>
            <Link
              className="flex items-center justify-between rounded-2xl border border-border bg-white/65 px-3 py-2 text-sm transition hover:-translate-y-0.5 hover:border-accent/60"
              href={result.url}
            >
              <span className="truncate text-text">{result.title}</span>
              <span className="ml-3 shrink-0 text-xs text-muted">{labels[result.type]}</span>
            </Link>
          </li>
        ))}
        {results.length === 0 ? <li className="text-sm text-muted">Sonuç bulunamadı.</li> : null}
      </ul>
    </section>
  );
}
