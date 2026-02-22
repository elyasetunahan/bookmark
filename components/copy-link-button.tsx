"use client";

import { useState } from "react";

export function CopyLinkButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy(): Promise<void> {
    const url = `${window.location.origin}${path}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      className="rounded-lg border border-border px-3 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-text"
      onClick={onCopy}
      type="button"
    >
      {copied ? "Kopyalandı" : "Linki Kopyala"}
    </button>
  );
}
