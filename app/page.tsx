import Link from "next/link";

import { ContentCard } from "@/components/content-card";
import { HomeSearch } from "@/components/home-search";
import { getAllBookmarks, getAllProjects, getAllWritings, getFeaturedProjects } from "@/lib/content";

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-5 flex items-end justify-between border-b border-border pb-3">
      <h2 className="font-heading text-2xl text-text md:text-3xl">{title}</h2>
      <Link className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent transition hover:border-accent/50" href={href}>
        Tümünü Gör
      </Link>
    </div>
  );
}

export default function HomePage() {
  const featuredProjects = getFeaturedProjects(3);
  const projects = featuredProjects.length > 0 ? featuredProjects : getAllProjects().slice(0, 3);
  const writings = getAllWritings().slice(0, 3);
  const bookmarks = getAllBookmarks().slice(0, 3);
  const latestWriting = writings[0];
  const latestBookmark = bookmarks[0];

  return (
    <div className="space-y-11">
      <section className="grid-ornament relative overflow-hidden rounded-[30px] border border-border bg-surface px-6 py-8 shadow-soft md:px-10 md:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-20 h-48 w-48 rounded-full bg-amber-600/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">Portfolio-first knowledge hub</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.05] text-text md:text-6xl">
              Build log, writing ve kaynak atlasını tek bir arayüzde birleştiriyorum.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Bu alan proje vaka özetleri, teknik yazılar ve seçili bookmark’larla üretim pratiğimi şeffaf şekilde sunuyor.
              Hedef: aradığını en kısa yoldan bulman.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="rounded-full bg-text px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent" href="/projects">
                Projeleri İncele
              </Link>
              <Link className="rounded-full border border-border bg-white/65 px-5 py-2.5 text-sm text-text transition hover:border-accent/50 hover:bg-white" href="/writing">
                Yazıları Oku
              </Link>
              <a className="rounded-full border border-border bg-white/65 px-5 py-2.5 text-sm text-text transition hover:border-accent/50 hover:bg-white" href="mailto:hello@example.com">
                İletişim
              </a>
            </div>
          </div>

          <aside className="soft-panel rounded-2xl p-5">
            <p className="eyebrow">Live Snapshot</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border/90 bg-white/70 p-3 text-center">
                <p className="font-heading text-2xl text-text">{projects.length}</p>
                <p className="text-[11px] uppercase tracking-wide text-muted">Project</p>
              </div>
              <div className="rounded-xl border border-border/90 bg-white/70 p-3 text-center">
                <p className="font-heading text-2xl text-text">{writings.length}</p>
                <p className="text-[11px] uppercase tracking-wide text-muted">Writing</p>
              </div>
              <div className="rounded-xl border border-border/90 bg-white/70 p-3 text-center">
                <p className="font-heading text-2xl text-text">{bookmarks.length}</p>
                <p className="text-[11px] uppercase tracking-wide text-muted">Bookmark</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              {latestWriting ? (
                <Link className="block rounded-xl border border-border/90 bg-white/70 px-3 py-2 transition hover:border-accent/50" href={`/writing/${latestWriting.frontmatter.slug}`}>
                  <span className="eyebrow">Latest Writing</span>
                  <p className="mt-1 font-medium text-text">{latestWriting.frontmatter.title}</p>
                </Link>
              ) : null}
              {latestBookmark ? (
                <Link className="block rounded-xl border border-border/90 bg-white/70 px-3 py-2 transition hover:border-accent/50" href={`/bookmarks/${latestBookmark.frontmatter.slug}`}>
                  <span className="eyebrow">Latest Bookmark</span>
                  <p className="mt-1 font-medium text-text">{latestBookmark.frontmatter.title}</p>
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <HomeSearch />

      <section>
        <SectionHeader href="/projects" title="Öne Çıkan Projeler" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((entry) => (
            <ContentCard entry={entry} key={entry.frontmatter.slug} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader href="/writing" title="Son Yazılar" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {writings.map((entry) => (
            <ContentCard entry={entry} key={entry.frontmatter.slug} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader href="/bookmarks" title="Son Bookmarklar" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((entry) => (
            <ContentCard entry={entry} key={entry.frontmatter.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
