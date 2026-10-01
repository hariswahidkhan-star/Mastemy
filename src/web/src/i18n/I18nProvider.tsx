import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import en from './en.json';
import ar from './ar.json';

export type Lang = 'en' | 'ar';
type Dict = { [key: string]: string | Dict };

const DICTS: Record<Lang, Dict> = { en: en as Dict, ar: ar as Dict };
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
  const template = lookup(DICTS[lang], key) ?? lookup(DICTS.en, key) ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, name: string) =>
    vars[name] !== undefined ? String(vars[name]) : m,
  );
}

export function dirFor(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

function readStoredLang(): Lang {
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
    setLangState(next);
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
