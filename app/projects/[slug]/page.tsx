import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CopyLinkButton } from "@/components/copy-link-button";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllProjects().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const entry = getProjectBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
      <p className="text-sm uppercase tracking-wide text-accent">Project Case Study</p>
      <h1 className="mt-2 font-heading text-4xl leading-tight text-text">{entry.frontmatter.title}</h1>
      <p className="mt-3 text-sm text-muted">{formatDate(entry.frontmatter.publishedAt)} · {entry.readingTimeMinutes} dk okuma</p>
      <p className="mt-4 text-base leading-relaxed text-muted">{entry.frontmatter.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {entry.frontmatter.tags.map((tag) => (
          <Link className="rounded-full border border-border px-2 py-1 text-xs text-muted" href={`/tags/${tag}`} key={tag}>
            #{tag}
          </Link>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <CopyLinkButton path={`/projects/${entry.frontmatter.slug}`} />
        {entry.frontmatter.links?.map((link) => (
          <a
            className="rounded-lg border border-border px-3 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-text"
            href={link.url}
            key={link.url}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="prose-content mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
      </div>
    </article>
  );
}
