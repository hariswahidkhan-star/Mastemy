import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { suggestionHref, useSuggestions } from '../../api/discover';
import type { SuggestionDto } from '../../api/discover';
import { useI18n } from '../../i18n/I18nProvider';
import { Button } from '../ui/Button';

/** Debounces a value; the returned value settles `delay` ms after the last change. */
export function useDebounced<T>(value: T, delay = 250): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const h = window.setTimeout(() => setV(value), delay);
    return () => window.clearTimeout(h);
  }, [value, delay]);
  return v;
}

/**
 * Search box with server suggestions, following the WAI-ARIA combobox pattern (list autocomplete):
 * the input owns `aria-expanded`/`aria-controls`/`aria-activedescendant`; ArrowUp/Down move through the
 * listbox, Enter opens the active suggestion (or submits the text), Escape closes the list then clears.
 */
export function SearchCombobox({
  id,
  initial = '',
  onSubmit,
  onTextChange,
  submitLabel,
  placeholder,
  label,
}: {
  id?: string;
  initial?: string;
  /** Called with the trimmed text when the user submits without choosing a suggestion. */
  onSubmit: (q: string) => void;
  onTextChange?: (q: string) => void;
  submitLabel?: string;
  placeholder?: string;
  label: string;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const autoId = useId();
  const inputId = id ?? `${autoId}-q`;
  const listId = `${inputId}-list`;
  const [text, setText] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounced = useDebounced(text);
  // optional-query: typeahead hints; the search itself works without them
  const suggestions = useSuggestions(open ? debounced : '');
  const items: SuggestionDto[] =
    open && debounced.trim().length >= 2 ? (suggestions.data ?? []) : [];
  const expanded = open && items.length > 0;
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setText(initial), [initial]);
  useEffect(() => setActive(-1), [debounced]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const choose = (s: SuggestionDto) => {
    setOpen(false);
    navigate(suggestionHref(s));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      if (items.length) setActive((a) => (a + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length) setActive((a) => (a <= 0 ? items.length - 1 : a - 1));
    } else if (e.key === 'Enter' && expanded && active >= 0) {
      e.preventDefault();
      choose(items[active]);
    } else if (e.key === 'Escape') {
      if (expanded) {
        e.preventDefault();
        setOpen(false);
      } else if (text) {
        e.preventDefault();
        setText('');
        onTextChange?.('');
      }
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    onSubmit(text.trim());
  };

  const kindLabel = (k: SuggestionDto['kind']) => t(`discover.search.kind.${k}`);

  return (
    <form className="combo" role="search" onSubmit={submit}>
      <div className="combo__wrap" ref={wrapRef}>
        <label htmlFor={inputId} className="visually-hidden">
          {label}
        </label>
        <input
          id={inputId}
          className="input"
          type="text"
          inputMode="search"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
          value={text}
          placeholder={placeholder}
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
            onTextChange?.(e.target.value);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <ul
          id={listId}
          role="listbox"
          aria-label={t('discover.search.suggestions')}
          className="combo__list"
          hidden={!expanded}
        >
          {items.map((s, i) => (
            <li
              key={`${s.kind}:${s.key}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? 'combo__opt combo__opt--active' : 'combo__opt'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(s)}
              onMouseEnter={() => setActive(i)}
            >
              <span>{s.text}</span>
              <span className="badge badge--neutral">{kindLabel(s.kind)}</span>
            </li>
          ))}
        </ul>
        <span className="visually-hidden" aria-live="polite">
          {expanded ? t('discover.search.count', { n: items.length }) : ''}
        </span>
      </div>
      <Button type="submit">{submitLabel ?? t('courses.searchButton')}</Button>
    </form>
  );
}
