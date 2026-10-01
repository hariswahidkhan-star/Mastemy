import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

/** Converts untrusted markdown to sanitized HTML. Scripts, event handlers and javascript: URLs are stripped. */
export function renderMarkdown(source: string): string {
  const html = marked.parse(source ?? '', { async: false, gfm: true, breaks: false }) as string;
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'iframe', 'form', 'input', 'button', 'object', 'embed'],
    FORBID_ATTR: ['style'],
  });
}

let hookInstalled = false;
function ensureLinkHook() {
  if (hookInstalled) return;
  hookInstalled = true;
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('href')?.match(/^https?:/)) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  ensureLinkHook();
  const html = useMemo(() => renderMarkdown(source), [source]);
  return (
    <div
      className={['prose', className].filter(Boolean).join(' ')}
      // Sanitized by DOMPurify above.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
