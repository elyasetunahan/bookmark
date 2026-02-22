export type ContentType = "project" | "note" | "bookmark";

export interface BaseFrontmatter {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  publishedAt: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectFrontmatter extends BaseFrontmatter {
  role?: string;
  stack?: string[];
  links?: ProjectLink[];
  featured?: boolean;
  impact?: string;
}

export interface NoteFrontmatter extends BaseFrontmatter {
  topic?: string;
}

export interface BookmarkFrontmatter extends BaseFrontmatter {
  url: string;
  why?: string;
}

export interface ContentEntry<TFrontmatter extends BaseFrontmatter> {
  type: ContentType;
  frontmatter: TFrontmatter;
  body: string;
  excerpt: string;
  readingTimeMinutes: number;
}

export type UnifiedEntry =
  | ContentEntry<ProjectFrontmatter>
  | ContentEntry<NoteFrontmatter>
  | ContentEntry<BookmarkFrontmatter>;

export interface SearchDocument {
  id: string;
  type: ContentType;
  title: string;
  summary: string;
  tags: string;
  content: string;
  url: string;
}

export interface QueryOptions {
  q?: string;
  tag?: string;
  type?: ContentType;
}
