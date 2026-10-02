import { Marked } from 'marked';
import type { Tokens } from 'marked';
import katex from 'katex';
import DOMPurify from 'dompurify';
import { apiUrl } from '../api/client';

/**
 * Safe renderer for question content (stems, options, rationales, explanations, case exhibits).
 *
 * The server validates restricted Markdown (no raw HTML, headings, rules or links; images only as
 * `resource:<guid>`; balanced `$`/`$$` math). The client still treats the text as untrusted:
 *  - raw HTML is escaped, headings degrade to paragraphs, links render as their text, rules vanish;
 *  - images render only for `resource:<guid>` and resolve to the learner download URL;
 *  - math is rendered by KaTeX with `trust: false` and `throwOnError: false`;
 *  - the final HTML goes through DOMPurify.
 * Without a DOM (SSR), `renderRich` returns null and callers show escaped plain text instead.
 */

const GUID = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';
const RESOURCE_RX = new RegExp(`^resource:(${GUID})$`);

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Download URL for a course resource image referenced as `resource:<id>`. */
export function resourceImageUrl(id: string): string {
  return apiUrl(`/api/learn/resources/${encodeURIComponent(id)}/download`);
}

/** Resource ids referenced as images in a piece of content. */
export function referencedResourceIds(source: string): string[] {
  const rx = new RegExp(`!\\[[^\\]]*\\]\\(resource:(${GUID})\\)`, 'g');
  const out = new Set<string>();
  for (const m of source.matchAll(rx)) out.add(m[1].toLowerCase());
  return [...out];
}

export interface MathSegment {
  tex: string;
  display: boolean;
}

const PH = (i: number) => `MSTMATHPH${i}X`;
const PH_RX = /MSTMATHPH(\d+)X/g;

/**
 * Replaces `$...$` / `$$...$$` outside code (fenced blocks and inline code spans) with placeholders.
 * `\$` stays as is (Markdown turns it into a literal dollar). Unclosed delimiters are kept literally.
 */
export function extractMath(source: string): { text: string; math: MathSegment[] } {
  const math: MathSegment[] = [];
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let buffer: string[] = [];
  let fence: string | null = null;
  const flush = () => {
    if (buffer.length) out.push(scanInline(buffer.join('\n'), math));
    buffer = [];
  };
  for (const line of lines) {
    const m = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
    if (fence) {
      out.push(line);
      if (m && m[1][0] === fence[0] && m[1].length >= fence.length && line.trim() === m[1]) {
        fence = null;
      }
      continue;
    }
    if (m) {
      flush();
      fence = m[1];
      out.push(line);
      continue;
    }
    buffer.push(line);
  }
  flush();
  return { text: out.join('\n'), math };
}

function scanInline(text: string, math: MathSegment[]): string {
  let out = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === '\\' && i + 1 < text.length) {
      out += c + text[i + 1];
      i += 2;
      continue;
    }
    if (c === '`') {
      let run = 1;
      while (text[i + run] === '`') run++;
      const ticks = '`'.repeat(run);
      const close = text.indexOf(ticks, i + run);
      if (close < 0) {
        out += ticks;
        i += run;
        continue;
      }
      out += text.slice(i, close + run);
      i = close + run;
      continue;
    }
    if (c === '$') {
      const display = text[i + 1] === '$';
      const open = display ? 2 : 1;
      const close = findClosing(text, i + open, display);
      if (close < 0) {
        out += display ? '$$' : '$';
        i += open;
        continue;
      }
      const tex = text.slice(i + open, close);
      math.push({ tex, display });
      out += PH(math.length - 1);
      i = close + open;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

function findClosing(text: string, from: number, display: boolean): number {
  for (let j = from; j < text.length; j++) {
    if (text[j] === '\\') {
      j++;
      continue;
    }
    if (text[j] !== '$') continue;
    if (display) {
      if (text[j + 1] === '$') return j;
    } else if (j > from) {
      return j;
    }
  }
  return -1;
}

export function renderMath(seg: MathSegment): string {
  try {
    return katex.renderToString(seg.tex, {
      displayMode: seg.display,
      throwOnError: false,
      trust: false,
      strict: 'ignore',
      output: 'htmlAndMathml',
      maxSize: 20,
      maxExpand: 500,
    });
  } catch {
    return `<code>${escapeHtml(seg.tex)}</code>`;
  }
}

const restricted = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    html({ text }: Tokens.HTML | Tokens.Tag) {
      return escapeHtml(text);
    },
    heading({ tokens }: Tokens.Heading) {
      return `<p>${this.parser.parseInline(tokens)}</p>\n`;
    },
    hr() {
      return '';
    },
    link({ tokens }: Tokens.Link) {
      return this.parser.parseInline(tokens);
    },
    image({ href, text }: Tokens.Image) {
      const m = RESOURCE_RX.exec(href ?? '');
      if (!m) return escapeHtml(text ?? '');
      return `<img src="${escapeHtml(resourceImageUrl(m[1]))}" alt="${escapeHtml(text ?? '')}" loading="lazy" class="rich__img">`;
    },
  },
});

const PURIFY = {
  USE_PROFILES: { html: true, mathMl: true, svg: true },
  FORBID_TAGS: ['style', 'iframe', 'form', 'input', 'button', 'object', 'embed', 'a', 'script'],
  ALLOW_DATA_ATTR: false,
};

export function canSanitize(): boolean {
  return typeof window !== 'undefined' && DOMPurify.isSupported;
}

/**
 * Renders restricted Markdown + math to sanitized HTML. Returns null when no DOM is available (SSR),
 * because DOMPurify cannot sanitize there.
 */
export function renderRich(source: string, opts: { inline?: boolean } = {}): string | null {
  if (!canSanitize()) return null;
  const { text, math } = extractMath(source ?? '');
  let html = restricted.parse(text, { async: false }) as string;
  html = html.replace(PH_RX, (_, n: string) => {
    const seg = math[Number(n)];
    return seg ? renderMath(seg) : '';
  });
  if (opts.inline) {
    const single = /^<p>([\s\S]*)<\/p>\s*$/.exec(html.trim());
    if (single && !single[1].includes('<p>')) html = single[1];
  }
  return DOMPurify.sanitize(html, PURIFY) as string;
}
