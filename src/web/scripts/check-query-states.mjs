#!/usr/bin/env node
/**
 * Loading / error state audit: every react-query result a component reads `.data` from must also handle
 * its loading and error states — rendered through <QueryState>/<QueryStatus>, or checked explicitly
 * (isPending / isLoading / isError / error / status). A query whose data is genuinely optional (a
 * permission flag with a safe default, typeahead suggestions, ...) is marked on the line above with
 *   // optional-query: <reason>
 * Exits 1 listing the offenders.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const src = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = path.join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(src).filter((f) => !f.includes(`${path.sep}test${path.sep}`));

// Hooks that return a query result: useQuery itself plus `export function useX(...) { ... return useQuery(`.
const hooks = new Set(['useQuery']);
for (const f of files.filter((f) => /\.(ts|tsx)$/.test(f))) {
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/export function (use\w+)\([^)]*\)[^{]*\{\s*(?:const [^;]+;\s*)*return useQuery/g))
    hooks.add(m[1]);
}
const hookRe = new RegExp(`const (\\w+) = (${[...hooks].join('|')})[<(]`, 'g');

const problems = [];
for (const f of files.filter((f) => f.endsWith('.tsx'))) {
  const s = readFileSync(f, 'utf8');
  const lines = s.split('\n');
  for (const m of s.matchAll(hookRe)) {
    const v = m[1];
    const line = s.slice(0, m.index).split('\n').length;
    if (/optional-query:/.test(lines[line - 2] ?? '')) continue;
    if (!new RegExp(`\\b${v}\\.data\\b`).test(s)) continue;
    const handled = new RegExp(
      `query=\\{[^}]*\\b${v}\\b|\\b${v}\\.(isLoading|isPending|isError|error|status|isSuccess)\\b|\\[[^\\]]*\\b${v}\\b[^\\]]*\\]\\.(find|some)`,
    ).test(s);
    if (!handled) problems.push(`${path.relative(src, f)}:${line} ${v} = ${m[2]}(...) reads .data without loading/error handling`);
  }
}
if (problems.length) {
  console.error(`queries without loading/error states:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log('loading/error states: every query read in a component handles them (or is marked optional)');
