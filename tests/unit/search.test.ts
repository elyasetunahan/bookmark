import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { getAllContentEntries } from "../../lib/content";
import { searchDocuments, toSearchDocuments } from "../../lib/search";

describe("search", () => {
  it("returns mixed results for a broad query", () => {
    const docs = toSearchDocuments(getAllContentEntries());
    const results = searchDocuments(docs, "nextjs");

    expect(results.length).toBeGreaterThan(0);

    const distinctTypes = new Set(results.map((item) => item.type));
    expect(distinctTypes.size).toBeGreaterThanOrEqual(2);
  });

  it("narrows results by type filter", () => {
    const docs = toSearchDocuments(getAllContentEntries());
    const results = searchDocuments(docs, "nextjs", "bookmark");

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.type === "bookmark")).toBe(true);
  });

  it("matches the generated static search index", () => {
    const entries = getAllContentEntries();
    const expectedDocs = toSearchDocuments(entries);
    const indexPath = path.join(process.cwd(), "public", "search-index.json");
    const actualDocs = JSON.parse(fs.readFileSync(indexPath, "utf8")) as typeof expectedDocs;

    expect(actualDocs).toHaveLength(expectedDocs.length);
    expect(new Set(actualDocs.map((doc) => doc.id))).toEqual(new Set(expectedDocs.map((doc) => doc.id)));
  });
});
