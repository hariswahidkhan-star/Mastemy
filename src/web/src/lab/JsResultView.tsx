import type { CheckResult, JsRunResult } from './types';

/** Displays JavaScript execution results: console output, return value, checks, and errors. */
export function JsResultView({
  result,
  hasChecks,
  t,
}: {
  result: JsRunResult | null;
  hasChecks: boolean;
  t: (key: string) => string;
}) {
  if (!result) {
    return <p className="muted">{t('workspace.lab.outputEmpty')}</p>;
  }

  if (result.type === 'result' && !result.ok) {
    return (
      <p className="lab__error" role="alert">
        {t('workspace.lab.error')}: {result.error}
      </p>
    );
  }

  if (result.type !== 'result' || !result.ok) return null;

  const checks: CheckResult[] = result.checks;
  const allPassed = result.passed && hasChecks;

  return (
    <>
      {hasChecks ? (
        <div className={`lab__verdict ${allPassed ? 'is-pass' : 'is-fail'}`} role="status">
          {allPassed ? t('workspace.lab.passed') : t('workspace.lab.notYet')}
        </div>
      ) : null}

      {checks.length > 0 ? (
        <ul className="lab__checks">
          {checks.map((c, i) => (
            <li key={i} className={c.passed ? 'is-pass' : 'is-fail'}>
              <span aria-hidden="true">{c.passed ? '✓' : '✗'}</span> {c.name}
              {!c.passed ? <span className="small muted"> &mdash; {c.detail}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}

      {result.logs.length > 0 ? (
        <div className="lab__grid-wrap">
          <pre
            style={{
              margin: 0,
              padding: 'var(--space-3)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {result.logs.join('\n')}
          </pre>
        </div>
      ) : null}

      {result.result !== undefined ? (
        <p style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', margin: 0 }}>
          <span className="muted">Return value:</span>{' '}
          {typeof result.result === 'string' ? result.result : JSON.stringify(result.result)}
        </p>
      ) : result.logs.length === 0 ? (
        <p className="muted">No output.</p>
      ) : null}
    </>
  );
}
