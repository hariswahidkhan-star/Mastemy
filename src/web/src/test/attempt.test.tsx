import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AttemptView } from '../api/types';
import { formatCountdown, remainingMs, serverOffsetMs } from '../lib/countdown';
import { AttemptPlayer } from '../pages/assessment/AttemptPlayer';
import { renderWithProviders } from './utils';

function makeAttempt(overrides: Partial<AttemptView> = {}): AttemptView {
  return {
    id: 'a1',
    status: 'InProgress',
    deadlineAt: null,
    serverNow: new Date().toISOString(),
    items: [
      {
        itemId: 'i1',
        type: 'SingleChoice',
        stem: 'Which layer routes packets?',
        options: [
          { id: 'o1', text: 'Network' },
          { id: 'o2', text: 'Session' },
        ],
        selectedOptionIds: [],
        flagged: false,
      },
      {
        itemId: 'i2',
        type: 'MultipleSelect',
        stem: 'Which are transport protocols?',
        options: [
          { id: 'p1', text: 'TCP' },
          { id: 'p2', text: 'UDP' },
          { id: 'p3', text: 'HTTP' },
        ],
        selectedOptionIds: [],
        flagged: false,
      },
    ],
    ...overrides,
  };
}

describe('AttemptPlayer', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('never renders correctness before a result exists', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { container } = renderWithProviders(
      <AttemptPlayer attempt={makeAttempt()} onSave={onSave} onSubmit={vi.fn()} />,
    );
    await act(async () => {
      await userEvent.click(screen.getByLabelText('Network'));
    });
    expect(onSave).toHaveBeenCalledWith('i1', ['o1'], false);
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    });
    await act(async () => {
      await userEvent.click(screen.getByLabelText('TCP'));
    });
    expect(container.querySelector('.option--correct, .option--incorrect')).toBeNull();
    expect(screen.queryByText(/^Correct/)).toBeNull();
    expect(screen.queryByText(/^Incorrect/)).toBeNull();
    expect(screen.queryByRole('button', { name: 'Check answer' })).toBeNull();
  });

  it('uses radio for single choice and labelled checkboxes for multiple select in a fieldset', async () => {
    renderWithProviders(
      <AttemptPlayer
        attempt={makeAttempt()}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onSubmit={vi.fn()}
      />,
    );
    const group = screen.getByRole('group');
    expect(within(group).getAllByRole('radio')).toHaveLength(2);
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    });
    expect(within(screen.getByRole('group')).getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getByText('Select all that apply.')).toBeInTheDocument();
  });

  it('lists unanswered questions in the submit confirmation', async () => {
    renderWithProviders(
      <AttemptPlayer
        attempt={makeAttempt()}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onSubmit={vi.fn()}
      />,
    );
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Submit assessment' }));
    });
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText('2 questions are unanswered and will be marked incorrect.'),
    ).toBeInTheDocument();
    expect(within(dialog).getByText('Q1')).toBeInTheDocument();
    expect(within(dialog).getByText('Q2')).toBeInTheDocument();
  });

  it('countdown uses the server clock offset, not the local clock', () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    const local = new Date('2026-10-01T12:00:00Z');
    vi.setSystemTime(local);
    // Server clock is one hour behind the (wrong) local clock; 10 minutes remain on the server.
    const serverNow = new Date('2026-10-01T11:00:00Z');
    const deadline = new Date(serverNow.getTime() + 10 * 60_000);
    renderWithProviders(
      <AttemptPlayer
        attempt={makeAttempt({
          serverNow: serverNow.toISOString(),
          deadlineAt: deadline.toISOString(),
        })}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onSubmit={vi.fn()}
      />,
    );
    expect(screen.getByTestId('timer')).toHaveTextContent('10:00');
    act(() => {
      vi.advanceTimersByTime(61_000);
    });
    expect(screen.getByTestId('timer')).toHaveTextContent('08:59');
  });
});

describe('countdown helpers', () => {
  it('computes offset and remaining time', () => {
    const offset = serverOffsetMs('2026-10-01T10:00:00Z', Date.parse('2026-10-01T10:00:30Z'));
    expect(offset).toBe(-30_000);
    expect(remainingMs('2026-10-01T10:05:00Z', offset, Date.parse('2026-10-01T10:00:30Z'))).toBe(
      300_000,
    );
    expect(remainingMs('2026-10-01T09:00:00Z', 0, Date.parse('2026-10-01T10:00:00Z'))).toBe(0);
    expect(formatCountdown(3_725_000)).toBe('1:02:05');
  });
});
