import { marked } from 'marked';

/**
 * Static-markdown articles (no CMS exists). Files in src/content/articles/*.md are bundled at build time,
 * so the same content renders on the server and the client. The content is first-party and reviewed in
 * code review, so it is converted with `marked` directly.
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  published: string;
  body: string;
}

/** Parses a `---`-delimited `key: value` front matter block followed by the markdown body. */
export function parseArticle(raw: string): Article | null {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return null;
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  if (!meta.slug || !meta.title) return null;
  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description ?? '',
    published: meta.published ?? '',
    body: m[2].trim(),
  };
}

const files = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const ARTICLES: Article[] = Object.values(files)
  .map(parseArticle)
  .filter((a): a is Article => a !== null)
  .sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function articleHtml(a: Article): string {
  return marked.parse(a.body, { async: false, gfm: true }) as string;
}
