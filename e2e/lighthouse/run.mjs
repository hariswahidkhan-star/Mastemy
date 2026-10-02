#!/usr/bin/env node
/**
 * Runs Lighthouse 12 (mobile default + desktop preset) on the key public pages and writes
 * <OUT>/<page>.<formFactor>.json, summary.json and summary.md. Exits 1 when any category < LH_MIN or a
 * Core Web Vital lab metric misses its budget (LCP < 2.5 s, CLS < 0.1, TBT < 200 ms).
 *
 * Environment: BASE_URL, SEED (seed.json from seed.mjs), OUT, LH_MIN (95), LH_RUNS (1), CHROME_PATH,
 * LH_PAGES (comma-separated page names to limit the run).
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:6401';
const OUT = process.env.OUT ?? 'lighthouse-results';
const MIN = Number(process.env.LH_MIN ?? 95);
const RUNS = Number(process.env.LH_RUNS ?? 1);
const seed = JSON.parse(readFileSync(process.env.SEED ?? path.join(OUT, 'seed.json'), 'utf8'));

let pages = [
  ['home', '/'],
  ['courses', '/courses'],
  ['course-detail', `/courses/${seed.courseSlug}`],
  ['category', `/categories/${seed.categorySlug}`],
  ['certifications', '/certifications'],
  ['article', '/articles/how-mcq-certificates-work'],
  ['login', '/login'],
  ['verify', '/verify'],
];
if (process.env.LH_PAGES) {
  const only = process.env.LH_PAGES.split(',');
  pages = pages.filter(([n]) => only.includes(n));
}
const CATS = ['performance', 'accessibility', 'best-practices', 'seo'];

function lighthouse(url, formFactor, file) {
  const args = [
    '-y',
    'lighthouse@12',
    url,
    '--quiet',
    '--output=json',
    `--output-path=${file}`,
    `--only-categories=${CATS.join(',')}`,
    '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage',
  ];
  if (formFactor === 'desktop') args.push('--preset=desktop');
  execFileSync('npx', args, { stdio: ['ignore', 'ignore', 'inherit'], env: process.env });
  return JSON.parse(readFileSync(file, 'utf8'));
}

const rows = [];
const failures = [];
for (const [name, p] of pages) {
  for (const ff of ['mobile', 'desktop']) {
    const file = path.join(OUT, `${name}.${ff}.json`);
    const reports = [];
    for (let i = 0; i < RUNS; i++) reports.push(lighthouse(BASE + p, ff, file));
    // Median by performance score; the kept report is rewritten to <file>.
    reports.sort((a, b) => a.categories.performance.score - b.categories.performance.score);
    const r = reports[Math.floor(reports.length / 2)];
    writeFileSync(file, JSON.stringify(r));
    const a = r.audits;
    const row = {
      page: name,
      path: p,
      formFactor: ff,
      ...Object.fromEntries(CATS.map((c) => [c, Math.round(r.categories[c].score * 100)])),
      lcpMs: Math.round(a['largest-contentful-paint'].numericValue),
      fcpMs: Math.round(a['first-contentful-paint'].numericValue),
      tbtMs: Math.round(a['total-blocking-time'].numericValue),
      cls: Number(a['cumulative-layout-shift'].numericValue.toFixed(3)),
      failedAudits: Object.values(a)
        .filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== 'informative' && x.scoreDisplayMode !== 'manual' && x.scoreDisplayMode !== 'notApplicable')
        .map((x) => x.id),
    };
    rows.push(row);
    console.log(
      `${name.padEnd(15)} ${ff.padEnd(8)} perf ${row.performance} a11y ${row.accessibility} bp ${row['best-practices']} seo ${row.seo} | LCP ${row.lcpMs}ms TBT ${row.tbtMs}ms CLS ${row.cls}` +
        (row.failedAudits.length ? `  [${row.failedAudits.join(', ')}]` : ''),
    );
    if (MIN > 0) {
      for (const c of CATS) if (row[c] < MIN) failures.push(`${name} ${ff} ${c} ${row[c]} < ${MIN}`);
      if (row.lcpMs >= 2500) failures.push(`${name} ${ff} LCP ${row.lcpMs}ms >= 2500`);
      if (row.cls >= 0.1) failures.push(`${name} ${ff} CLS ${row.cls} >= 0.1`);
      if (row.tbtMs >= 200) failures.push(`${name} ${ff} TBT ${row.tbtMs}ms >= 200`);
    }
  }
}

writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(rows, null, 2));
const md = [
  '| Page | Form factor | Performance | Accessibility | Best Practices | SEO | LCP (ms) | TBT (ms) | CLS |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map(
    (r) =>
      `| ${r.page} (\`${r.path.replace(/\/courses\/.+/, '/courses/<slug>').replace(/\/categories\/.+/, '/categories/<slug>')}\`) | ${r.formFactor} | ${r.performance} | ${r.accessibility} | ${r['best-practices']} | ${r.seo} | ${r.lcpMs} | ${r.tbtMs} | ${r.cls} |`,
  ),
].join('\n');
writeFileSync(path.join(OUT, 'summary.md'), md + '\n');
console.log('\n' + md);
if (failures.length) {
  console.error('\nLighthouse thresholds not met:\n  ' + failures.join('\n  '));
  process.exit(1);
}
