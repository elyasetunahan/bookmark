interface FilterBarProps {
  title: string;
  description: string;
  query: string;
  selectedTag: string;
  tags: string[];
}

export function FilterBar({ title, description, query, selectedTag, tags }: FilterBarProps) {
  return (
    <section className="soft-panel rounded-3xl p-5 md:p-6">
      <p className="eyebrow">Discover</p>
      <h1 className="mt-2 font-heading text-3xl text-text md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
      <form className="mt-5 grid gap-3 md:grid-cols-[1fr_220px_auto]" method="get">
        <label className="sr-only" htmlFor="q">
          Search
        </label>
        <input
          className="h-11 rounded-2xl border border-border bg-white/70 px-4 text-sm text-text outline-none transition focus:border-accent"
          defaultValue={query}
          id="q"
          name="q"
          placeholder="Ara: başlık, özet, etiket..."
          type="search"
        />

        <label className="sr-only" htmlFor="tag">
          Tag
        </label>
        <select
          className="h-11 rounded-2xl border border-border bg-white/70 px-3 text-sm text-text outline-none transition focus:border-accent"
          defaultValue={selectedTag}
          id="tag"
          name="tag"
        >
          <option value="">Tüm etiketler</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <button className="h-11 rounded-2xl bg-text px-5 text-sm font-semibold text-white transition hover:bg-accent" type="submit">
          Filtrele
        </button>
      </form>
    </section>
  );
}
