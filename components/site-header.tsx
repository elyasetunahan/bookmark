import Link from "next/link";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-8 w-8 place-content-center rounded-full border border-border bg-white/70 text-xs font-bold text-accent transition group-hover:rotate-12">
            EY
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight text-text">Signal Atlas</span>
        </Link>
        <nav className="flex max-w-[72vw] items-center gap-2 overflow-x-auto rounded-full border border-border bg-white/55 p-1 text-sm text-muted md:max-w-none">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-white hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
