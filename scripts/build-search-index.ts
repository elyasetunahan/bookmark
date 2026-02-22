import path from "node:path";

import { getAllContentEntries } from "../lib/content";
import { buildStaticSearchIndex } from "../lib/search-index";

const outputPath = path.join(process.cwd(), "public", "search-index.json");
const entries = getAllContentEntries();
const docs = buildStaticSearchIndex(entries, outputPath);

console.log(`Generated ${docs.length} search docs at ${outputPath}`);
