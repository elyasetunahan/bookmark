import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import type {
  BookmarkFrontmatter,
  ContentEntry,
  ContentType,
  NoteFrontmatter,
  ProjectFrontmatter,
  QueryOptions,
  UnifiedEntry
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");
const NOTES_DIR = path.join(CONTENT_ROOT, "notes");
const BOOKMARKS_DIR = path.join(CONTENT_ROOT, "bookmarks");

const dateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "publishedAt must be a valid date string");

const baseSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  summary: z.string().min(8),
  tags: z.array(z.string().min(1)).min(1),
  publishedAt: dateString
});

const projectSchema = baseSchema.extend({
  role: z.string().min(2).optional(),
  stack: z.array(z.string().min(1)).optional(),
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url()
      })
    )
    .optional(),
  featured: z.boolean().optional(),
  impact: z.string().min(2).optional()
});

const noteSchema = baseSchema.extend({
  topic: z.string().min(2).optional()
});

const bookmarkSchema = baseSchema.extend({
  url: z.string().url(),
  why: z.string().min(2).optional()
});

type BaseSchema = typeof baseSchema;

type FrontmatterForType<T extends ContentType> = T extends "project"
  ? ProjectFrontmatter
  : T extends "note"
    ? NoteFrontmatter
    : BookmarkFrontmatter;

function normalizeTags(tags: string[]): string[] {
  return Array.from(new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))).sort();
}

function toExcerpt(markdown: string): string {
  const normalized = markdown.replace(/[#>*`_\-\n\r]/g, " ").replace(/\s+/g, " ").trim();
  return normalized.slice(0, 220);
}

function readCollection<T extends ContentType>(
  directory: string,
  type: T,
  schema: BaseSchema | typeof projectSchema | typeof noteSchema | typeof bookmarkSchema
): ContentEntry<FrontmatterForType<T>>[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(directory, filename);
      const source = fs.readFileSync(filePath, "utf8");
      const parsed = matter(source);
      const frontmatter = schema.parse(parsed.data);
      const normalizedFrontmatter = {
        ...frontmatter,
        tags: normalizeTags(frontmatter.tags)
      };

      return {
        type,
        frontmatter: normalizedFrontmatter,
        body: parsed.content.trim(),
        excerpt: toExcerpt(parsed.content),
        readingTimeMinutes: Math.max(1, Math.round(readingTime(parsed.content).minutes))
      } as ContentEntry<FrontmatterForType<T>>;
    })
    .sort(
      (left, right) =>
        new Date(right.frontmatter.publishedAt).getTime() - new Date(left.frontmatter.publishedAt).getTime()
    );
}

export function assertUniqueSlugs(entries: UnifiedEntry[]): void {
  const seen = new Map<string, ContentType>();

  for (const entry of entries) {
    const slug = entry.frontmatter.slug;
    const existingType = seen.get(slug);

    if (existingType) {
      throw new Error(`Duplicate slug detected: "${slug}" is used by ${existingType} and ${entry.type}`);
    }

    seen.set(slug, entry.type);
  }
}

export function getAllProjects(): ContentEntry<ProjectFrontmatter>[] {
  return readCollection(PROJECTS_DIR, "project", projectSchema);
}

export function getProjectBySlug(slug: string): ContentEntry<ProjectFrontmatter> | undefined {
  return getAllProjects().find((entry) => entry.frontmatter.slug === slug);
}

export function getAllWritings(): ContentEntry<NoteFrontmatter>[] {
  return readCollection(NOTES_DIR, "note", noteSchema);
}

export function getWritingBySlug(slug: string): ContentEntry<NoteFrontmatter> | undefined {
  return getAllWritings().find((entry) => entry.frontmatter.slug === slug);
}

export function getAllBookmarks(): ContentEntry<BookmarkFrontmatter>[] {
  return readCollection(BOOKMARKS_DIR, "bookmark", bookmarkSchema);
}

export function getBookmarkBySlug(slug: string): ContentEntry<BookmarkFrontmatter> | undefined {
  return getAllBookmarks().find((entry) => entry.frontmatter.slug === slug);
}

export function getAllContentEntries(): UnifiedEntry[] {
  const entries: UnifiedEntry[] = [...getAllProjects(), ...getAllWritings(), ...getAllBookmarks()].sort(
    (left, right) =>
      new Date(right.frontmatter.publishedAt).getTime() - new Date(left.frontmatter.publishedAt).getTime()
  );

  assertUniqueSlugs(entries);
  return entries;
}

export function getFeaturedProjects(limit = 3): ContentEntry<ProjectFrontmatter>[] {
  return getAllProjects()
    .filter((entry) => entry.frontmatter.featured)
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();

  for (const entry of getAllContentEntries()) {
    for (const tag of entry.frontmatter.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}

export function filterEntries<T extends UnifiedEntry>(entries: T[], options: QueryOptions): T[] {
  const q = options.q?.trim().toLowerCase();
  const tag = options.tag?.trim().toLowerCase();

  return entries.filter((entry) => {
    if (options.type && entry.type !== options.type) {
      return false;
    }

    if (tag && !entry.frontmatter.tags.includes(tag)) {
      return false;
    }

    if (!q) {
      return true;
    }

    const haystack = [
      entry.frontmatter.title,
      entry.frontmatter.summary,
      entry.frontmatter.tags.join(" "),
      entry.body
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function paginateEntries<T>(entries: T[], page: number, pageSize: number): {
  items: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
} {
  const totalItems = entries.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Number.isFinite(page) ? Math.min(Math.max(page, 1), totalPages) : 1;
  const start = (safePage - 1) * pageSize;

  return {
    items: entries.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalPages,
    totalItems
  };
}

export function getUnifiedTagEntries(tag: string): UnifiedEntry[] {
  return filterEntries(getAllContentEntries(), { tag }).sort(
    (left, right) =>
      new Date(right.frontmatter.publishedAt).getTime() - new Date(left.frontmatter.publishedAt).getTime()
  );
}
