export default function AboutPage() {
  return (
    <article className="grid-ornament relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-soft">
      <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-accent/15 blur-3xl" />
      <p className="eyebrow">About</p>
      <h1 className="mt-3 font-heading text-4xl text-text md:text-5xl">Merhaba, ben Elyase.</h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
        Bu site, ürün geliştirme pratiğimi net ve aranabilir bir yapıda paylaşmak için oluşturuldu. Proje bölümü, yaptığım
        işlerin problem-çözüm-sonuç tarafını; writing bölümü teknik notlarımı; bookmark bölümü ise sürekli döndüğüm
        kaynakları içeriyor.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <section className="soft-panel rounded-2xl p-4">
          <h2 className="font-heading text-xl text-text">Çalışma Prensibi</h2>
          <p className="mt-2 text-sm text-muted">Ölçülebilir çıktı, açık teknik kararlar ve sürdürülebilir hız.</p>
        </section>
        <section className="soft-panel rounded-2xl p-4">
          <h2 className="font-heading text-xl text-text">Odak Alanları</h2>
          <p className="mt-2 text-sm text-muted">Web uygulamaları, içerik sistemleri, DX ve performans.</p>
        </section>
        <section className="soft-panel rounded-2xl p-4">
          <h2 className="font-heading text-xl text-text">Temas</h2>
          <p className="mt-2 text-sm text-muted">hello@example.com üzerinden ulaşabilirsin.</p>
        </section>
      </div>
    </article>
  );
}
