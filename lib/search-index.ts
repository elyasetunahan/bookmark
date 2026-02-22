import fs from "node:fs";
import path from "node:path";

import { toSearchDocuments } from "./search";
import type { SearchDocument, UnifiedEntry } from "./types";

export function buildStaticSearchIndex(entries: UnifiedEntry[], outputPath?: string): SearchDocument[] {
  const docs = toSearchDocuments(entries);
  const targetPath = outputPath ?? path.join(process.cwd(), "public", "search-index.json");
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, JSON.stringify(docs, null, 2), "utf8");
  return docs;
}
