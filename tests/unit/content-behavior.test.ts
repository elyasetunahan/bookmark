import { describe, expect, it } from "vitest";

import { filterEntries, getAllProjects, getAllWritings, getFeaturedProjects, paginateEntries } from "../../lib/content";

describe("content behavior", () => {
  it("returns featured projects before fallback", () => {
    const featured = getFeaturedProjects(3);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((entry) => entry.frontmatter.featured)).toBe(true);
  });

  it("filters writing entries by tag and query", () => {
    const writings = getAllWritings();
    const filtered = filterEntries(writings, { tag: "search", q: "index" });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((entry) => entry.frontmatter.tags.includes("search"))).toBe(true);
  });

  it("paginates collections predictably", () => {
    const projects = getAllProjects();
    const paged = paginateEntries(projects, 1, 2);

    expect(paged.items.length).toBeLessThanOrEqual(2);
    expect(paged.totalPages).toBeGreaterThanOrEqual(1);
    expect(paged.page).toBe(1);
  });
});
