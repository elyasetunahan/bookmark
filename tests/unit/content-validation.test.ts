import { describe, expect, it } from "vitest";

import { assertUniqueSlugs, getAllBookmarks, getAllProjects, getAllWritings } from "../../lib/content";
import type { UnifiedEntry } from "../../lib/types";

describe("content validation", () => {
  it("loads all collections with required fields", () => {
    const projects = getAllProjects();
    const writings = getAllWritings();
    const bookmarks = getAllBookmarks();

    expect(projects.length).toBeGreaterThan(0);
    expect(writings.length).toBeGreaterThan(0);
    expect(bookmarks.length).toBeGreaterThan(0);

    for (const entry of [...projects, ...writings, ...bookmarks]) {
      expect(entry.frontmatter.title.length).toBeGreaterThan(1);
      expect(entry.frontmatter.slug).toMatch(/^[a-z0-9-]+$/);
      expect(entry.frontmatter.tags.length).toBeGreaterThan(0);
    }
  });

  it("throws on duplicate slugs across content types", () => {
    const fakeEntries = [
      {
        type: "project",
        frontmatter: {
          title: "A",
          slug: "same",
          summary: "summary long enough",
          tags: ["x"],
          publishedAt: "2025-01-01"
        },
        body: "A",
        excerpt: "A",
        readingTimeMinutes: 1
      },
      {
        type: "note",
        frontmatter: {
          title: "B",
          slug: "same",
          summary: "summary long enough",
          tags: ["x"],
          publishedAt: "2025-01-02"
        },
        body: "B",
        excerpt: "B",
        readingTimeMinutes: 1
      }
    ] as UnifiedEntry[];

    expect(() => assertUniqueSlugs(fakeEntries)).toThrow(/Duplicate slug detected/);
  });
});
