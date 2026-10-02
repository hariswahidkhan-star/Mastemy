import { useMemo } from 'react';
import 'katex/dist/katex.min.css';
import { renderRich } from '../lib/richContent';
import '../styles/exams.css';

/**
 * Question content (restricted Markdown + KaTeX math + course images), sanitized.
 * `inline` renders inside a span (option labels); otherwise a block div. During SSR (no DOM to
 * sanitize with) it shows the source as plain, escaped text.
 */
export function RichContent({
  source,
  inline,
  className,
  id,
}: {
  source: string;
  inline?: boolean;
  className?: string;
  id?: string;
}) {
  const html = useMemo(() => renderRich(source ?? '', { inline }), [source, inline]);
  const cls = ['rich', inline ? 'rich--inline' : null, className].filter(Boolean).join(' ');
  const Tag = inline ? 'span' : 'div';
  if (html === null) {
    return (
      <Tag id={id} className={cls} style={{ whiteSpace: 'pre-wrap' }} suppressHydrationWarning>
        {source}
      </Tag>
    );
  }
  // Sanitized by DOMPurify in renderRich.
  return <Tag id={id} className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
}
