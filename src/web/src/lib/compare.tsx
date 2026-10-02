import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

/** The compare endpoint accepts 2-4 distinct live courses. */
export const COMPARE_MIN = 2;
export const COMPARE_MAX = 4;
const STORAGE_KEY = 'mastemy.compare';

export interface CompareItem {
  id: string;
  slug: string;
  title: string;
}

export type CompareResult = { list: CompareItem[]; rejected?: 'full' };

/** Pure toggle used by the tray: removes a selected course, or adds it unless the tray is full. */
export function toggleCompare(list: CompareItem[], item: CompareItem): CompareResult {
  if (list.some((c) => c.id === item.id)) return { list: list.filter((c) => c.id !== item.id) };
  if (list.length >= COMPARE_MAX) return { list, rejected: 'full' };
  return { list: [...list, item] };
}

export function canCompare(list: CompareItem[]): boolean {
  return list.length >= COMPARE_MIN && list.length <= COMPARE_MAX;
}

export function compareHref(list: CompareItem[]): string {
  return `/compare?ids=${list.map((c) => c.id).join(',')}`;
}

interface CompareValue {
  items: CompareItem[];
  has: (id: string) => boolean;
  /** Returns false when the tray is already full. */
  toggle: (item: CompareItem) => boolean;
  remove: (id: string) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareValue | null>(null);

function readStored(): CompareItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CompareItem[]) : [];
    return Array.isArray(parsed)
      ? parsed.filter((c) => c && typeof c.id === 'string').slice(0, COMPARE_MAX)
      : [];
  } catch {
    return [];
  }
}

/** Compare selection, kept per browser. Storage is read after mount so server and first client render match. */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(readStored());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: selection lasts for this page only */
    }
  }, [items, loaded]);

  const toggle = useCallback(
    (item: CompareItem) => {
      const res = toggleCompare(items, item);
      if (res.rejected) return false;
      setItems(res.list);
      return true;
    },
    [items],
  );

  const value = useMemo<CompareValue>(
    () => ({
      items,
      has: (id) => items.some((c) => c.id === id),
      toggle,
      remove: (id) => setItems((list) => list.filter((c) => c.id !== id)),
      clear: () => setItems([]),
    }),
    [items, toggle],
  );
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

const NOOP: CompareValue = {
  items: [],
  has: () => false,
  toggle: () => false,
  remove: () => undefined,
  clear: () => undefined,
};

export function useCompareTray(): CompareValue {
  return useContext(CompareContext) ?? NOOP;
}
