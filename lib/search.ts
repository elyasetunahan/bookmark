import type { ContentType, SearchDocument, UnifiedEntry } from "./types";

export function toSearchDocuments(entries: UnifiedEntry[]): SearchDocument[] {
  return entries.map((entry) => {
    const url =
      entry.type === "project"
        ? `/projects/${entry.frontmatter.slug}`
        : entry.type === "note"
          ? `/writing/${entry.frontmatter.slug}`
          : `/bookmarks/${entry.frontmatter.slug}`;

    return {
      id: `${entry.type}:${entry.frontmatter.slug}`,
      type: entry.type,
      title: entry.frontmatter.title,
      summary: entry.frontmatter.summary,
      tags: entry.frontmatter.tags.join(" "),
      content: entry.body.slice(0, 1200),
      url
    };
  });
}

export function searchDocuments(
  docs: SearchDocument[],
  query: string,
  type?: ContentType,
  limit = 20
): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return docs.filter((doc) => (type ? doc.type === type : true)).slice(0, limit);
  }

  return docs
    .filter((doc) => {
      if (type && doc.type !== type) {
        return false;
      }

      const haystack = `${doc.title} ${doc.summary} ${doc.tags} ${doc.content}`.toLowerCase();
      return haystack.includes(q);
    })
    .sort((left, right) => {
      const leftTitle = left.title.toLowerCase().startsWith(q) ? 2 : 0;
      const rightTitle = right.title.toLowerCase().startsWith(q) ? 2 : 0;
      const leftTags = left.tags.toLowerCase().includes(q) ? 1 : 0;
      const rightTags = right.tags.toLowerCase().includes(q) ? 1 : 0;
      return rightTitle + rightTags - (leftTitle + leftTags);
    })
    .slice(0, limit);
}
