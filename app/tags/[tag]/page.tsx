import { ContentCard } from "@/components/content-card";
import { getUnifiedTagEntries } from "@/lib/content";
import { toTitleCase } from "@/lib/utils";

export default async function TagPage({
  params
}: {
  params: Promise<{ tag: string }> | { tag: string };
}) {
  const { tag: rawTag } = await Promise.resolve(params);
  const tag = decodeURIComponent(rawTag).toLowerCase();
  const entries = getUnifiedTagEntries(tag);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
        <p className="text-sm uppercase tracking-widest text-accent">Tag View</p>
        <h1 className="mt-2 font-heading text-3xl text-text">#{toTitleCase(tag)}</h1>
        <p className="mt-2 text-sm text-muted">Bu etikette project, writing ve bookmark içerikleri birlikte listelenir.</p>
      </section>

      {entries.length === 0 ? (
        <p className="text-sm text-muted">Bu etikete ait içerik bulunamadı.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <ContentCard entry={entry} key={`${entry.type}-${entry.frontmatter.slug}`} />
          ))}
        </div>
      )}
    </div>
  );
}
