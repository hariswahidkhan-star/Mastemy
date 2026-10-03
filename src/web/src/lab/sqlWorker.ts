/// <reference lib="webworker" />
// SQL practice engine: runs entirely inside a Web Worker using SQLite compiled to WebAssembly (sql.js).
// For each run we build a fresh in-memory database, apply the lab's seed SQL, then the student's code, collect
// every result grid, and finally run the lab's verification queries to grade the attempt. Nothing is persisted
// and no network call is made beyond fetching the same-origin .wasm asset.

import initSqlJs from 'sql.js';
// Vite resolves this to the hashed, same-origin asset URL; the worker fetches it (connect-src 'self').
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import type { CheckResult, ResultTable, RunRequest, RunResult } from './types';

type SqlValue = string | number | null;

let sqlJsPromise: ReturnType<typeof initSqlJs> | null = null;
function getSqlJs() {
  if (!sqlJsPromise) sqlJsPromise = initSqlJs({ locateFile: () => wasmUrl });
  return sqlJsPromise;
}

interface ExecResult {
  columns: string[];
  values: SqlValue[][];
}

function normalizeCell(v: unknown): SqlValue {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number' || typeof v === 'string') return v;
  if (typeof v === 'bigint') return Number(v);
  if (v instanceof Uint8Array) return `[blob ${v.length} bytes]`;
  return String(v);
}

function toTables(results: ExecResult[]): ResultTable[] {
  return results.map((r) => ({
    columns: r.columns,
    rows: r.values.map((row) => row.map(normalizeCell)),
  }));
}

/** Compares two row sets for exact, order-sensitive equality. */
function rowsEqual(a: SqlValue[][], b: Array<Array<SqlValue>>): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;
    for (let j = 0; j < a[i].length; j++) {
      if (normalizeCell(a[i][j]) !== normalizeCell(b[i][j])) return false;
    }
  }
  return true;
}

async function run(req: RunRequest): Promise<RunResult> {
  let SQL: Awaited<ReturnType<typeof initSqlJs>>;
  try {
    SQL = await getSqlJs();
  } catch (e) {
    return { type: 'result', ok: false, error: `Failed to load the SQL engine: ${String(e)}` };
  }
  const db = new SQL.Database();
  try {
    if (req.seedSql.trim()) db.run(req.seedSql);
    let tables: ResultTable[] = [];
    try {
      tables = toTables(db.exec(req.code) as ExecResult[]);
    } catch (e) {
      return { type: 'result', ok: false, error: (e as Error).message };
    }
    const checks: CheckResult[] = req.checks.map((c) => {
      try {
        const res = db.exec(c.sql) as ExecResult[];
        const got = res.length ? res[res.length - 1].values : [];
        const passed = rowsEqual(got, c.expect);
        return {
          name: c.name,
          passed,
          detail: passed
            ? 'Passed'
            : `Expected ${c.expect.length} row(s) to match; got ${got.length}.`,
        };
      } catch (e) {
        return { name: c.name, passed: false, detail: (e as Error).message };
      }
    });
    const passed = checks.length > 0 && checks.every((c) => c.passed);
    return { type: 'result', ok: true, tables, checks, passed };
  } finally {
    db.close();
  }
}

self.onmessage = async (ev: MessageEvent<RunRequest>) => {
  if (ev.data?.type === 'run') {
    const result = await run(ev.data);
    (self as DedicatedWorkerGlobalScope).postMessage(result);
  }
};

// Announce readiness once the module is evaluated (the engine itself loads lazily on first run).
(self as DedicatedWorkerGlobalScope).postMessage({ type: 'ready' } satisfies RunResult);
