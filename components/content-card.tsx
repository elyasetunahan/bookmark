import Link from "next/link";

import type { UnifiedEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function typeLabel(type: UnifiedEntry["type"]): string {
  if (type === "project") {
    return "Project";
  }
  if (type === "note") {
    return "Writing";
  }
  return "Bookmark";
}

function typeTone(type: UnifiedEntry["type"]): string {
  if (type === "project") {
    return "from-cyan-600/18 to-transparent text-cyan-800";
  }
  if (type === "note") {
    return "from-amber-600/20 to-transparent text-amber-800";
  }
  return "from-emerald-600/20 to-transparent text-emerald-800";
}

function entryHref(entry: UnifiedEntry): string {
  if (entry.type === "project") {
    return `/projects/${entry.frontmatter.slug}`;
  }
  if (entry.type === "note") {
    return `/writing/${entry.frontmatter.slug}`;
  }
  return `/bookmarks/${entry.frontmatter.slug}`;
}

export function ContentCard({ entry }: { entry: UnifiedEntry }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-accent/50">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition duration-500 group-hover:scale-125" />
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`rounded-full bg-gradient-to-r ${typeTone(entry.type)} px-2.5 py-1 text-xs font-semibold tracking-wide`}
        >
          {typeLabel(entry.type)}
        </span>
        <span className="text-xs text-muted">{formatDate(entry.frontmatter.publishedAt)}</span>
      </div>
      <h3 className="font-heading text-[1.35rem] leading-tight text-text transition group-hover:text-accent">
        <Link href={entryHref(entry)}>{entry.frontmatter.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{entry.frontmatter.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {entry.frontmatter.tags.map((tag) => (
          <Link
            href={`/tags/${tag}`}
            key={`${entry.frontmatter.slug}-${tag}`}
            className="rounded-full border border-border bg-white/70 px-2.5 py-1 text-xs text-muted transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-text"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
