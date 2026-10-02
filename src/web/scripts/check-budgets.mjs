#!/usr/bin/env node
/**
 * Bundle budgets for the client build (run after `vite build`; reads dist/.vite/manifest.json).
 *
 *  - initial JS: the entry chunk plus everything it imports statically (what index.html loads/preloads),
 *    gzip-compressed, must stay <= BUDGET_INITIAL_KB.
 *  - initial CSS: <= BUDGET_CSS_KB gzip.
 *  - every lazy route: the dynamic chunk plus the static imports it pulls in beyond the initial set,
 *    gzip-compressed, must stay <= BUDGET_ROUTE_KB.
 *
 *   node scripts/check-budgets.mjs [distDir] [--json out.json]
 * Exits 1 when a budget is exceeded.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

const BUDGET_INITIAL_KB = Number(process.env.BUDGET_INITIAL_KB ?? 170);
const BUDGET_ROUTE_KB = Number(process.env.BUDGET_ROUTE_KB ?? 250);
const BUDGET_CSS_KB = Number(process.env.BUDGET_CSS_KB ?? 30);

const args = process.argv.slice(2);
const jsonIdx = args.indexOf('--json');
const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;
const dist = path.resolve(args.find((a, i) => !a.startsWith('--') && i !== jsonIdx + 1) ?? 'dist');
const manifest = JSON.parse(readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'));

const gz = new Map();
const gzipKb = (file) => {
  if (!gz.has(file)) gz.set(file, gzipSync(readFileSync(path.join(dist, file)), { level: 9 }).length / 1024);
  return gz.get(file);
};

/** Static closure of a manifest key: the chunk and everything it imports (not dynamic imports). */
function closure(key, seen = new Set()) {
  if (seen.has(key)) return seen;
  seen.add(key);
  for (const imp of manifest[key].imports ?? []) closure(imp, seen);
  return seen;
}

const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry);
const initial = closure(entryKey);
const initialFiles = [...initial].map((k) => manifest[k].file);
const initialKb = initialFiles.reduce((s, f) => s + gzipKb(f), 0);
const cssFiles = new Set([...initial].flatMap((k) => manifest[k].css ?? []));
const cssKb = [...cssFiles].reduce((s, f) => s + gzipKb(f), 0);

const routes = Object.keys(manifest)
  .filter((k) => manifest[k].isDynamicEntry)
  .map((k) => {
    const extra = [...closure(k)].filter((c) => !initial.has(c));
    return {
      route: manifest[k].src ?? k,
      chunk: manifest[k].file,
      kb: extra.reduce((s, c) => s + gzipKb(manifest[c].file), 0),
    };
  })
  .sort((a, b) => b.kb - a.kb);

const fails = [];
if (initialKb > BUDGET_INITIAL_KB)
  fails.push(`initial JS ${initialKb.toFixed(1)} kB > ${BUDGET_INITIAL_KB} kB`);
if (cssKb > BUDGET_CSS_KB) fails.push(`initial CSS ${cssKb.toFixed(1)} kB > ${BUDGET_CSS_KB} kB`);
for (const r of routes)
  if (r.kb > BUDGET_ROUTE_KB) fails.push(`route ${r.route} ${r.kb.toFixed(1)} kB > ${BUDGET_ROUTE_KB} kB`);

console.log(`initial JS (gzip): ${initialKb.toFixed(1)} kB / ${BUDGET_INITIAL_KB} kB in ${initialFiles.length} files`);
for (const f of initialFiles.sort((a, b) => gzipKb(b) - gzipKb(a)))
  console.log(`  ${f.padEnd(48)} ${gzipKb(f).toFixed(1)} kB`);
console.log(`initial CSS (gzip): ${cssKb.toFixed(1)} kB / ${BUDGET_CSS_KB} kB`);
console.log(`lazy routes: ${routes.length}; largest (gzip, beyond initial), budget ${BUDGET_ROUTE_KB} kB:`);
for (const r of routes.slice(0, 12)) console.log(`  ${r.route.padEnd(48)} ${r.kb.toFixed(1)} kB`);
if (jsonOut)
  writeFileSync(jsonOut, JSON.stringify({ initialKb, cssKb, initialFiles, routes }, null, 2));
if (fails.length) {
  console.error('\nBUDGET EXCEEDED:\n  ' + fails.join('\n  '));
  process.exit(1);
}
console.log('\nall bundle budgets met');
