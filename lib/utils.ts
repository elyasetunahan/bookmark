export function formatDate(dateValue: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateValue));
}

export function normalizeParam(value?: string | string[]): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export function toPositiveInt(value?: string | string[], fallback = 1): number {
  const parsed = Number.parseInt(normalizeParam(value), 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
}

export function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }

    const stringValue = String(value).trim();
    if (!stringValue) {
      continue;
    }

    search.set(key, stringValue);
  }

  const encoded = search.toString();
  return encoded ? `?${encoded}` : "";
}

export function toTitleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}
