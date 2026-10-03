// Shared types for the in-browser practice lab. The lab runs entirely client-side in a Web Worker using a
// WebAssembly engine (currently SQLite via sql.js), so student code never leaves the browser and no server-side
// execution is involved. More engines (JavaScript, Python) plug in behind the same RunRequest/RunResult protocol.

export type LabEngine = 'sql';

/** A single automated check: run `sql` against the database left behind by the student's code and compare rows. */
export interface LabCheck {
  name: string;
  /** Verification query executed after the student's SQL. */
  sql: string;
  /** Expected rows as arrays of cell values (column order as returned). */
  expect: Array<Array<string | number | null>>;
}

export interface LabSpec {
  id: string;
  engine: LabEngine;
  title: string;
  /** Markdown instructions shown beside the editor. */
  instructions: string;
  /** SQL that seeds the sample database before every run (schema + data). */
  seedSql: string;
  /** Code the editor starts with. */
  starterCode: string;
  /** Hidden reference solution revealed on request. */
  solutionCode: string;
  /** Automated checks; the lab passes when all pass. Empty => playground (run only, no grading). */
  checks: LabCheck[];
}

/** One result grid (columns + rows) from a statement that returned data. */
export interface ResultTable {
  columns: string[];
  rows: Array<Array<string | number | null>>;
}

export interface CheckResult {
  name: string;
  passed: boolean;
  detail: string;
}

export interface RunRequest {
  type: 'run';
  seedSql: string;
  code: string;
  checks: LabCheck[];
}

export type RunResult =
  | { type: 'ready' }
  | {
      type: 'result';
      ok: true;
      tables: ResultTable[];
      checks: CheckResult[];
      passed: boolean;
    }
  | { type: 'result'; ok: false; error: string };
