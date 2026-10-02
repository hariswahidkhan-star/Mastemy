import { useId, useRef, useState } from 'react';
import { IMAGE_TYPES, useCourseResources } from '../../api/exams';
import { RichContent } from '../../components/RichContent';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nProvider';

/**
 * Markdown editor for question content: write / preview tabs, a math cheat sheet and an image picker
 * that inserts `![name](resource:<id>)` for the course's non-premium image resources (the only images
 * the server accepts).
 */
export function RichEditor({
  label,
  value,
  onChange,
  courseId,
  error,
  required,
  rows = 5,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  courseId: string;
  error?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
}) {
  const { t } = useI18n();
  const id = useId();
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [help, setHelp] = useState(false);
  const [picker, setPicker] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);
  const resources = useCourseResources(picker ? courseId : '');
  const images = (resources.data ?? []).filter(
    (r) => !r.isPremium && IMAGE_TYPES.includes(r.contentType),
  );

  const insert = (snippet: string) => {
    const el = area.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const next = value.slice(0, start) + snippet + value.slice(end);
    onChange(next);
    setMode('write');
    requestAnimationFrame(() => {
      if (!area.current) return;
      area.current.focus();
      area.current.selectionStart = area.current.selectionEnd = start + snippet.length;
    });
  };

  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-err` : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={['field', 'rich-editor', error ? 'field--error' : ''].join(' ')}>
      <div className="row row--between">
        <label className="field__label" htmlFor={id}>
          {label}
          {required ? (
            <span className="field__req" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </label>
        <div className="row" role="group" aria-label={t('exams.editor.tools', { label })}>
          <Button
            size="sm"
            variant={mode === 'write' ? 'secondary' : 'ghost'}
            aria-pressed={mode === 'write'}
            onClick={() => setMode('write')}
          >
            {t('exams.editor.write')}
          </Button>
          <Button
            size="sm"
            variant={mode === 'preview' ? 'secondary' : 'ghost'}
            aria-pressed={mode === 'preview'}
            onClick={() => setMode('preview')}
          >
            {t('exams.editor.preview')}
          </Button>
          <Button size="sm" variant="ghost" aria-expanded={help} onClick={() => setHelp((h) => !h)}>
            {t('exams.editor.mathHelp')}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            aria-expanded={picker}
            onClick={() => setPicker((p) => !p)}
          >
            {t('exams.editor.insertImage')}
          </Button>
        </div>
      </div>
      <textarea
        id={id}
        ref={area}
        rows={rows}
        className="input textarea"
        value={value}
        hidden={mode !== 'write'}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {mode === 'preview' ? (
        <div className="rich-editor__preview" aria-label={t('exams.editor.previewOf', { label })}>
          {value.trim() ? (
            <RichContent source={value} />
          ) : (
            <p className="muted small">{t('exams.editor.empty')}</p>
          )}
        </div>
      ) : null}
      {help ? (
        <div className="rich-editor__help small">
          <p>{t('exams.editor.syntax')}</p>
          <ul>
            <li>
              <code>**bold**</code>, <code>*italic*</code>, <code>`code`</code>
            </li>
            <li>
              <code>$x^2 + y^2$</code> → {t('exams.editor.inlineMath')}
            </li>
            <li>
              <code>$$\frac{'{a}{b}'}$$</code> → {t('exams.editor.displayMath')}
            </li>
            <li>
              <code>\$</code> → {t('exams.editor.literalDollar')}
            </li>
            <li>
              <code>| A | B |</code> → {t('exams.editor.tables')}
            </li>
          </ul>
          <p className="muted">{t('exams.editor.notAllowed')}</p>
          <div className="row">
            {['$x^2$', '$\\sqrt{x}$', '$\\frac{a}{b}$', '$\\sum_{i=1}^{n} x_i$', '$\\alpha$'].map(
              (s) => (
                <Button key={s} size="sm" variant="secondary" onClick={() => insert(s)}>
                  <code>{s}</code>
                </Button>
              ),
            )}
          </div>
        </div>
      ) : null}
      {picker ? (
        <div className="rich-editor__help small" aria-live="polite">
          {resources.isPending ? (
            <p>{t('common.loading')}</p>
          ) : resources.isError ? (
            <p role="alert">{t('exams.editor.imagesError')}</p>
          ) : images.length === 0 ? (
            <p>{t('exams.editor.noImages')}</p>
          ) : (
            <ul className="row" style={{ listStyle: 'none', padding: 0 }}>
              {images.map((r) => (
                <li key={r.id}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      insert(`![${r.fileName.replace(/[[\]]/g, '')}](resource:${r.id})`);
                      setPicker(false);
                    }}
                  >
                    {t('exams.editor.insertNamed', { name: r.fileName })}
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <p className="muted">{t('exams.editor.imageRule')}</p>
        </div>
      ) : null}
      {hint ? (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={`${id}-err`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
