import { ContentCard } from "@/components/content-card";
import { FilterBar } from "@/components/filter-bar";
import { Pagination } from "@/components/pagination";
import { filterEntries, getAllWritings, paginateEntries } from "@/lib/content";
import { normalizeParam, toPositiveInt } from "@/lib/utils";

const PAGE_SIZE = 6;

type SearchParams = Record<string, string | string[] | undefined>;

export default async function WritingPage({
  searchParams
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const resolvedSearch = await Promise.resolve(searchParams ?? {});
  const q = normalizeParam(resolvedSearch.q);
  const tag = normalizeParam(resolvedSearch.tag);
  const page = toPositiveInt(resolvedSearch.page, 1);

  const allEntries = getAllWritings();
  const tags = Array.from(new Set(allEntries.flatMap((entry) => entry.frontmatter.tags))).sort();
  const filtered = filterEntries(allEntries, { q, tag, type: "note" });
  const paginated = paginateEntries(filtered, page, PAGE_SIZE);

  return (
    <div className="space-y-6">
      <FilterBar
        description="Notlar blog akışı olarak konumlandı. Teknik kararlar ve öğrenimleri konu bazında filtreleyebilirsin."
        query={q}
        selectedTag={tag}
        tags={tags}
        title="Writing"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginated.items.map((entry) => (
          <ContentCard entry={entry} key={entry.frontmatter.slug} />
        ))}
      </div>

      {paginated.items.length === 0 ? <p className="text-sm text-muted">Bu filtrede yazı bulunamadı.</p> : null}

      <Pagination basePath="/writing" page={paginated.page} q={q} tag={tag} totalPages={paginated.totalPages} />
    </div>
  );
}
