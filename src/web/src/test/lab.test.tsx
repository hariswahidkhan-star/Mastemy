import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithProviders } from './utils';
import { BUILTIN_LABS } from '../lab/labs';
import type { RunResult } from '../lab/types';

// CodeMirror needs real layout APIs and the lab worker needs a real Worker+WASM — neither exists in jsdom.
// Mock both so we can unit-test the panel's behaviour (selection, running, verdict/checks rendering).
const runMock = vi.fn<(req: unknown) => Promise<RunResult>>();
vi.mock('../lab/useLab', () => ({
  useLab: () => ({ ready: true, running: false, run: runMock }),
}));
vi.mock('../lab/CodeEditor', () => ({
  CodeEditor: ({ value, ariaLabel }: { value: string; ariaLabel: string }) => (
    <textarea aria-label={ariaLabel} defaultValue={value} />
  ),
}));

import PracticeLab from '../lab/PracticeLab';

describe('PracticeLab', () => {
  beforeEach(() => runMock.mockReset());

  it('lists the built-in labs, renders the editor, and shows a passing verdict after Run', async () => {
    runMock.mockResolvedValue({
      type: 'result',
      ok: true,
      tables: [{ columns: ['name', 'salary'], rows: [['Mei Chen', 110000]] }],
      checks: [{ name: 'Returns the correct high earners', passed: true, detail: 'Passed' }],
      passed: true,
    });

    renderWithProviders(<PracticeLab />);

    for (const lab of BUILTIN_LABS) {
      expect(screen.getByRole('option', { name: lab.title })).toBeInTheDocument();
    }
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // the mocked editor

    // The playground has no checks; pick a graded challenge so a verdict is shown.
    await userEvent.selectOptions(screen.getByRole('combobox'), 'sql-filter');
    await userEvent.click(screen.getByRole('button', { name: /run/i }));

    await waitFor(() => expect(runMock).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole('status')).toHaveTextContent(/passed/i);
    expect(screen.getByText('Mei Chen')).toBeInTheDocument();
  });

  it('shows the engine error when a run fails', async () => {
    runMock.mockResolvedValue({ type: 'result', ok: false, error: 'near "SELEC": syntax error' });
    renderWithProviders(<PracticeLab />);
    await userEvent.click(screen.getByRole('button', { name: /run/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/syntax error/i);
  });
});
