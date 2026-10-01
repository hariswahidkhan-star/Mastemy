import type { Paged } from './types';

/** Accept either a bare array or a paged envelope from list endpoints. */
export function asList<T>(d: T[] | Paged<T> | { items: T[] }): T[] {
  return Array.isArray(d) ? d : d.items;
}
