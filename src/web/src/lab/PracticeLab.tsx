import { useEffect, useMemo, useState } from 'react';
import { Markdown } from '../components/Markdown';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nProvider';
import { CodeEditor } from './CodeEditor';
import { useLab } from './useLab';
import { BUILTIN_LABS } from './labs';
import type { CheckResult, LabSpec, ResultTable, RunResult } from './types';
import './lab.css';

function ResultGrid({ table }: { table: ResultTable }) {
  return (
    <div className="lab__grid-wrap">
      <table className="lab__grid">
        <thead>
          <tr>
            {table.columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>
                  {cell === null ? <span className="muted">NULL</span> : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PracticeLab(_props: { courseId?: string; lessonId?: string }) {
  const { t } = useI18n();
  const { ready, running, run } = useLab();
  const [labId, setLabId] = useState(BUILTIN_LABS[0].id);
  const lab = useMemo<LabSpec>(
    () => BUILTIN_LABS.find((l) => l.id === labId) ?? BUILTIN_LABS[0],
    [labId],
  );
  const [code, setCode] = useState(lab.starterCode);
  const [editorKey, setEditorKey] = useState(0);
  const [result, setResult] = useState<RunResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  // Reset editor + output when switching labs.
  useEffect(() => {
    setCode(lab.starterCode);
    setResult(null);
    setShowSolution(false);
    setEditorKey((k) => k + 1);
  }, [lab]);

  const doRun = async () => {
    const r = await run({ seedSql: lab.seedSql, code, checks: lab.checks });
    setResult(r);
  };
  const reset = () => {
    setCode(lab.starterCode);
    setResult(null);
    setShowSolution(false);
    setEditorKey((k) => k + 1);
  };

  const checks: CheckResult[] =
    result && result.type === 'result' && result.ok ? result.checks : [];
  const allPassed =
    result?.type === 'result' && result.ok && result.passed && lab.checks.length > 0;

  return (
    <div className="lab">
      <div className="lab__bar">
        <label className="lab__pick">
          <span className="small muted">{t('workspace.lab.selectLabel')}</span>
          <select
            value={labId}
            onChange={(e) => setLabId(e.target.value)}
            aria-label={t('workspace.lab.selectLabel')}
          >
            {BUILTIN_LABS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </label>
        <span className="lab__engine small muted">{t('workspace.lab.engineSql')}</span>
      </div>

      <p className="small muted lab__privacy">{t('workspace.lab.privacy')}</p>

      <div className="lab__body">
        <div className="lab__instructions prose">
          <Markdown source={lab.instructions} />
        </div>

        <div className="lab__work">
          <CodeEditor
            key={editorKey}
            value={code}
            onChange={setCode}
            ariaLabel={t('workspace.lab.editorLabel')}
          />
          <div className="lab__actions">
            <Button onClick={doRun} disabled={running} aria-busy={running || !ready}>
              {running ? t('workspace.lab.running') : t('workspace.lab.run')}
            </Button>
            <Button variant="secondary" onClick={reset} disabled={running}>
              {t('workspace.lab.reset')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowSolution((s) => !s)}
              disabled={running}
            >
              {showSolution ? t('workspace.lab.hideSolution') : t('workspace.lab.showSolution')}
            </Button>
          </div>

          {showSolution ? (
            <pre className="lab__solution" aria-label={t('workspace.lab.solutionLabel')}>
              {lab.solutionCode}
            </pre>
          ) : null}

          <div className="lab__output" aria-live="polite">
            {!result ? (
              <p className="muted">{t('workspace.lab.outputEmpty')}</p>
            ) : result.type === 'result' && !result.ok ? (
              <p className="lab__error" role="alert">
                {t('workspace.lab.error')}: {result.error}
              </p>
            ) : result.type === 'result' && result.ok ? (
              <>
                {lab.checks.length > 0 ? (
                  <div
                    className={`lab__verdict ${allPassed ? 'is-pass' : 'is-fail'}`}
                    role="status"
                  >
                    {allPassed ? t('workspace.lab.passed') : t('workspace.lab.notYet')}
                  </div>
                ) : null}
                {checks.length > 0 ? (
                  <ul className="lab__checks">
                    {checks.map((c, i) => (
                      <li key={i} className={c.passed ? 'is-pass' : 'is-fail'}>
                        <span aria-hidden="true">{c.passed ? '✓' : '✗'}</span> {c.name}
                        {!c.passed ? <span className="small muted"> — {c.detail}</span> : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {result.tables.length === 0 ? (
                  <p className="muted">{t('workspace.lab.noRows')}</p>
                ) : (
                  result.tables.map((tbl, i) => <ResultGrid key={i} table={tbl} />)
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
