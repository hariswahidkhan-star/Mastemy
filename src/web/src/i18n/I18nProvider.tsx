import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import en from './en.json';

export type Lang = 'en' | 'ar';
type Dict = { [key: string]: string | Dict };

/**
 * Only the core English dictionary (en.json) ships in the main bundle. The English area namespaces
 * (`<area>.en.json`) and the whole Arabic dictionary are separate chunks that `ensureLang` loads before
 * the first render (the browser entry and the SSR renderer await it; it is fetched in parallel with the
 * route chunk). English is also the fallback for keys missing in Arabic.
 */
const DICTS: Partial<Record<Lang, Dict>> = { en: en as Dict };
const loaded: Partial<Record<Lang, boolean>> = {};
const loading: Partial<Record<Lang, Promise<void>>> = {};

function loadEnglishAreas(): Promise<void> {
  loading.en ??= import('./enAreas').then((m) => {
    DICTS.en = Object.assign({}, en as Dict, m.EN_AREAS as Dict);
    loaded.en = true;
  });
  return loading.en;
}

/** Load a language's dictionary (no-op when already loaded). Await it before rendering in that language. */
export function ensureLang(lang: Lang): Promise<void> {
  if (loaded[lang]) return Promise.resolve();
  if (lang === 'en') return loadEnglishAreas();
  loading.ar ??= Promise.all([loadEnglishAreas(), import('./ar')]).then(([, m]) => {
    DICTS.ar = m.AR_DICT as Dict;
    loaded.ar = true;
  });
  return loading.ar;
}

export function isLangLoaded(lang: Lang): boolean {
  return !!loaded[lang];
}

const STORAGE_KEY = 'mastemy.lang';

function lookup(dict: Dict, key: string): string | undefined {
  let node: string | Dict | undefined = dict;
  for (const part of key.split('.')) {
    if (node === undefined || typeof node === 'string') return undefined;
    node = node[part];
  }
  return typeof node === 'string' ? node : undefined;
}

export type TFunction = (key: string, vars?: Record<string, string | number>) => string;

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const dict = DICTS[lang];
  const template = (dict && lookup(dict, key)) ?? lookup(DICTS.en as Dict, key) ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, name: string) =>
    vars[name] !== undefined ? String(vars[name]) : m,
  );
}

export function dirFor(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/** `?lang=ar|en` (the hreflang alternate URLs) wins over the stored preference. */
export function readUrlLang(): Lang | null {
  try {
    const v = new URLSearchParams(window.location.search).get('lang');
    return v === 'ar' || v === 'en' ? v : null;
  } catch {
    return null;
  }
}

export function readStoredLang(): Lang {
  const fromUrl = readUrlLang();
  if (fromUrl) return fromUrl;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'ar' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return 'en';
}

interface I18nValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (lang: Lang) => void;
  t: TFunction;
  /** Locale-aware formatters. */
  fmtNumber: (n: number) => string;
  fmtDate: (iso: string | null | undefined) => string;
  fmtMoney: (amount: number, currency: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(() => initialLang ?? readStoredLang());

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dirFor(lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    void ensureLang(next).then(() => setLangState(next));
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const locale = lang === 'ar' ? 'ar' : 'en';
    return {
      lang,
      dir: dirFor(lang),
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      fmtNumber: (n) => new Intl.NumberFormat(locale).format(n),
      fmtDate: (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        return Number.isNaN(d.getTime())
          ? ''
          : new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d);
      },
      fmtMoney: (amount, currency) => {
        try {
          return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
        } catch {
          return `${amount.toFixed(2)} ${currency}`;
        }
      },
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
