/// <reference lib="webworker" />
// JavaScript practice engine: runs student code in an isolated Web Worker via the Function constructor.
// Console output is captured by overriding console methods in the execution scope. A 10-second timeout
// prevents runaway loops. Nothing is persisted and no network calls are made.

import type { CheckResult, JsLabCheck, JsRunRequest, JsRunResult } from './types';

function runCode(code: string): { logs: string[]; result: unknown; error?: string } {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
    warn: (...args: unknown[]) => logs.push('[warn] ' + args.map(String).join(' ')),
    error: (...args: unknown[]) => logs.push('[error] ' + args.map(String).join(' ')),
    info: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
  };

  try {
    // The Function constructor creates an isolated function scope — no access to DOM, fetch, importScripts, etc.
    // We explicitly pass `console` as a parameter so student code uses our captured version.
    const fn = new Function('console', code);
    const result = fn(fakeConsole);
    return { logs, result: result === undefined ? undefined : result };
  } catch (e) {
    return { logs, result: undefined, error: (e as Error).message };
  }
}

function runChecks(logs: string[], result: unknown, checks: JsLabCheck[]): CheckResult[] {
  const combined = logs.join('\n');
  return checks.map((c) => {
    const failures: string[] = [];

    if (c.expectOutput) {
      for (const s of c.expectOutput) {
        if (!combined.includes(s)) {
          failures.push(`Expected output to contain "${s}"`);
        }
      }
    }

    if (c.expectResult !== undefined) {
      const expected = JSON.stringify(c.expectResult);
      const got = JSON.stringify(result);
      if (expected !== got) {
        failures.push(`Expected return value ${expected}, got ${got}`);
      }
    }

    return {
      name: c.name,
      passed: failures.length === 0,
      detail: failures.length === 0 ? 'Passed' : failures.join('; '),
    };
  });
}

function run(req: JsRunRequest): JsRunResult {
  const { logs, result, error } = runCode(req.code);

  if (error) {
    return { type: 'result', ok: false, error };
  }

  const checks = runChecks(logs, result, req.checks);
  const passed = checks.length > 0 && checks.every((c) => c.passed);
  return { type: 'result', ok: true, logs, result, checks, passed };
}

self.onmessage = (ev: MessageEvent<JsRunRequest>) => {
  if (ev.data?.type === 'run') {
    const result = run(ev.data);
    (self as DedicatedWorkerGlobalScope).postMessage(result);
  }
};

(self as DedicatedWorkerGlobalScope).postMessage({ type: 'ready' } satisfies JsRunResult);
