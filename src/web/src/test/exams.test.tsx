import { screen } from '@testing-library/react';
import { extractMath, referencedResourceIds, renderRich } from '../lib/richContent';
import { duplicateTargets, missingRequired } from '../pages/exams/StudioExamsPage';
import type { ImportInspectResult } from '../api/exams';
import { AttemptPlayer } from '../pages/assessment/AttemptPlayer';
import type { WaveAttempt } from '../pages/assessment/AttemptPlayer';
import { renderWithProviders } from './utils';

const GUID = '0f8fad5b-d9cb-469f-a165-70867728950e';

describe('rich question content', () => {
  it('extracts inline and display math outside code only', () => {
    const { text, math } = extractMath(
      'Area $\\pi r^2$ costs \\$5 and `$x$` stays.\n\n$$\\frac{a}{b}$$\n\n```\n$y$\n```',
    );
    expect(math).toEqual([
      { tex: '\\pi r^2', display: false },
      { tex: '\\frac{a}{b}', display: true },
    ]);
    expect(text).toContain('`$x$`');
    expect(text).toContain('\\$5');
    expect(text).toContain('$y$');
  });

  it('renders KaTeX, escapes raw HTML and drops links and headings', () => {
    const html = renderRich(
      '# Title\n\n**bold** <script>alert(1)</script> [site](https://evil.test) $x^2$ <img src=x onerror=alert(1)>',
    )!;
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('class="katex"');
    expect(html).not.toContain('<script');
    expect(html).not.toMatch(/<img[^>]*onerror/);
    expect(html).not.toContain('<a ');
    expect(html).not.toContain('<h1');
    expect(html).toContain('site');
  });

  it('never throws on bad TeX and keeps a literal dollar', () => {
    const html = renderRich('Price \\$3 and $\\badmacro{$')!;
    expect(html).toContain('$3');
    expect(html).toMatch(/katex|\\badmacro/);
  });

  it('resolves resource images to the learner download URL and ignores other images', () => {
    const html = renderRich(`![chart](resource:${GUID}) ![x](https://evil.test/a.png)`)!;
    expect(html).toContain(`/api/learn/resources/${GUID}/download`);
    expect(html).not.toContain('evil.test');
    expect(referencedResourceIds(`![a](resource:${GUID.toUpperCase()})`)).toEqual([GUID]);
  });

  it('renders tables and code blocks', () => {
    const html = renderRich('| A | B |\n|---|---|\n| 1 | 2 |\n\n```\ncode $z$\n```')!;
    expect(html).toContain('<table>');
    expect(html).toContain('<pre><code>code $z$');
  });
});

describe('import mapping helpers', () => {
  const inspect: ImportInspectResult = {
    format: 'xlsx',
    headers: ['Q', 'Type', 'Extra'],
    suggestedMapping: { Q: 'Stem', Type: 'QuestionType', Extra: null },
    columns: ['Stem', 'QuestionType', 'ExternalId'],
    requiredColumns: ['Stem', 'QuestionType', 'ExternalId'],
    sampleRows: [],
    rowCount: 1,
  };
  it('reports unmapped required columns and duplicate targets', () => {
    expect(missingRequired(inspect, { Q: 'Stem', Type: 'QuestionType', Extra: '' })).toEqual([
      'ExternalId',
    ]);
    expect(duplicateTargets({ Q: 'Stem', Type: 'Stem', Extra: '' })).toEqual(['Stem']);
  });
});

describe('attempt player wave 3', () => {
  const attempt: WaveAttempt = {
    id: 'a1',
    status: 'InProgress',
    deadlineAt: new Date(Date.now() + 30 * 60_000).toISOString(),
    serverNow: new Date().toISOString(),
    extraTimePercent: 50,
    pause: { allowPause: true, paused: false, pausedAt: null, pauseSecondsRemaining: 600 },
    cases: [
      {
        caseGroupId: 'c1',
        title: 'Quarterly figures',
        exhibitMarkdown: '| Q | Revenue |\n|---|---|\n| 1 | 10 |',
        resourceIds: [],
        itemIds: ['i1'],
      },
    ],
    items: [
      {
        itemId: 'i1',
        type: 'SingleChoice',
        stem: 'What is $2+2$?',
        options: [
          { id: 'o1', text: '**four**' },
          { id: 'o2', text: 'five' },
        ],
        selectedOptionIds: [],
        flagged: false,
        caseGroupId: 'c1',
      },
    ],
  };

  it('shows the accommodation, the case exhibit next to the item and the pause budget', () => {
    const { container } = renderWithProviders(
      <AttemptPlayer
        attempt={attempt}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onSubmit={vi.fn()}
        onPause={vi.fn()}
        onResume={vi.fn()}
      />,
    );
    expect(screen.getByText('Your time limit includes 50% extra time.')).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: 'Case exhibit: Quarterly figures' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByTestId('pause-budget')).toHaveTextContent('Pause time left: 10:00');
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    expect(container.querySelector('.katex')).not.toBeNull();
    expect(screen.getByLabelText('four')).toBeInTheDocument();
  });

  it('hides questions while paused and offers resume', () => {
    renderWithProviders(
      <AttemptPlayer
        attempt={{
          ...attempt,
          pause: {
            allowPause: true,
            paused: true,
            pausedAt: new Date().toISOString(),
            pauseSecondsRemaining: 300,
          },
        }}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onSubmit={vi.fn()}
        onPause={vi.fn()}
        onResume={vi.fn()}
      />,
    );
    expect(screen.getByText('Attempt paused')).toBeInTheDocument();
    expect(screen.queryByRole('radio')).toBeNull();
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
  });
});
