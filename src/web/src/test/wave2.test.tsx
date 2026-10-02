import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApiError } from '../api/client';
import type { BulkPreviewDto, CourseDiffDto, NotificationPageDto } from '../api/wave2';
import { CompareToggle, CompareTray } from '../components/Discovery';
import { CourseDiffView, diffCounts } from '../components/CourseDiffView';
import { NotificationBellView, safeLink, unreadBadge } from '../components/NotificationBell';
import { translate } from '../i18n/I18nProvider';
import { canCompare, COMPARE_MAX, toggleCompare } from '../lib/compare';
import type { CompareItem } from '../lib/compare';
import { resourceUploadMessage } from '../lib/resourceErrors';
import { parseVtt } from '../pages/engagement/LessonExtras';
import { BulkPreviewView } from '../pages/orgs/OrgPages';
import { renderWithProviders } from './utils';

const t = (k: string, v?: Record<string, string | number>) => translate('en', k, v);
const item = (n: number): CompareItem => ({
  id: `c${n}`,
  slug: `course-${n}`,
  title: `Course ${n}`,
});
const problem = (status: number, type: string, title = type) =>
  new ApiError(status, { status, type, title }, title);

describe('compare tray limits', () => {
  it('adds up to four courses, rejects a fifth and removes on second toggle', () => {
    let list: CompareItem[] = [];
    for (let i = 1; i <= COMPARE_MAX; i++) {
      const r = toggleCompare(list, item(i));
      expect(r.rejected).toBeUndefined();
      list = r.list;
    }
    expect(list).toHaveLength(4);
    const fifth = toggleCompare(list, item(5));
    expect(fifth.rejected).toBe('full');
    expect(fifth.list).toBe(list);
    expect(toggleCompare(list, item(2)).list.map((c) => c.id)).toEqual(['c1', 'c3', 'c4']);
  });

  it('requires between two and four courses to compare', () => {
    expect(canCompare([item(1)])).toBe(false);
    expect(canCompare([item(1), item(2)])).toBe(true);
    expect(canCompare([item(1), item(2), item(3), item(4)])).toBe(true);
  });

  it('tray enables "Compare now" only from two courses and refuses a fifth with a message', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        {[1, 2, 3, 4, 5].map((n) => (
          <CompareToggle key={n} item={item(n)} />
        ))}
        <CompareTray />
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Compare Course 1' }));
    const tray = screen.getByRole('complementary', { name: 'Courses selected for comparison' });
    expect(within(tray).getByRole('button', { name: 'Compare now' })).toBeDisabled();
    expect(within(tray).getByText('Select at least 2 courses.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Compare Course 2' }));
    expect(within(tray).getByRole('button', { name: 'Compare now' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Compare Course 3' }));
    await user.click(screen.getByRole('button', { name: 'Compare Course 4' }));
    await user.click(screen.getByRole('button', { name: 'Compare Course 5' }));
    expect(
      await screen.findByText('You can compare at most 4 courses. Remove one first.'),
    ).toBeInTheDocument();
    expect(within(tray).getByText('Compare (4/4)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Compare Course 5' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});

describe('notification bell', () => {
  const page = (unreadCount: number, n = 2): NotificationPageDto => ({
    items: Array.from({ length: n }, (_, i) => ({
      id: `n${i}`,
      kind: 'reply',
      title: `Reply ${i}`,
      link: '/courses/x/discussions/t1',
      readAt: i === 0 ? null : '2026-09-01T00:00:00Z',
      createdAt: '2026-09-01T00:00:00Z',
    })),
    total: n,
    page: 1,
    pageSize: 6,
    unreadCount,
  });

  it('formats the unread badge', () => {
    expect(unreadBadge(0)).toBeNull();
    expect(unreadBadge(3)).toBe('3');
    expect(unreadBadge(99)).toBe('99');
    expect(unreadBadge(150)).toBe('99+');
  });

  it('shows the unread count in the badge and the accessible name', () => {
    renderWithProviders(
      <NotificationBellView
        data={page(3)}
        open={false}
        onToggle={vi.fn()}
        onOpenItem={vi.fn()}
        onReadAll={vi.fn()}
      />,
    );
    expect(screen.getByTestId('bell-count')).toHaveTextContent('3');
    expect(screen.getByRole('button', { name: 'Notifications, 3 unread' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('hides the badge at zero and disables "Mark all read"', () => {
    renderWithProviders(
      <NotificationBellView
        data={page(0)}
        open
        onToggle={vi.fn()}
        onOpenItem={vi.fn()}
        onReadAll={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('bell-count')).toBeNull();
    expect(screen.getByRole('button', { name: 'Notifications' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Mark all read' })).toBeDisabled();
  });

  it('opens an item and only follows in-app links', async () => {
    const onOpen = vi.fn();
    renderWithProviders(
      <NotificationBellView
        data={page(1)}
        open
        onToggle={vi.fn()}
        onOpenItem={onOpen}
        onReadAll={vi.fn()}
      />,
    );
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Reply 0/ }));
    });
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'n0' }));
    expect(safeLink('/courses/a')).toBe('/courses/a');
    expect(safeLink('https://evil.example')).toBe('/me/notifications');
    expect(safeLink('//evil.example')).toBe('/me/notifications');
  });
});

describe('resource upload error mapping', () => {
  it('tells instructors to use YouTube for video files', () => {
    const msg = resourceUploadMessage(
      problem(415, 'video_not_allowed', 'Videos must be on YouTube.'),
      t,
    );
    expect(msg).toMatch(/Upload the video to YouTube/);
  });

  it.each([
    ['archive_not_allowed', 415, /Archives/],
    ['file_type_not_allowed', 415, /file type is not allowed/],
    ['file_content_mismatch', 415, /does not match its extension/],
    ['duplicate_resource', 409, /already uploaded/],
    ['quota_exceeded', 413, /storage quota/],
    ['course_not_editable', 409, /not editable/],
    ['invalid_caption_file', 400, /caption file could not be read/],
    ['captions_must_be_free', 400, /cannot be premium/],
  ])('maps %s', (code, status, re) => {
    expect(resourceUploadMessage(problem(status, code), t)).toMatch(re);
  });

  it('includes the size limit for file_too_large when known', () => {
    expect(
      resourceUploadMessage(problem(413, 'file_too_large'), t, { maxFileBytes: 25 * 1024 * 1024 }),
    ).toBe('The file is larger than the per-file limit of 25 MB.');
  });

  it('falls back to the server text for unknown problems', () => {
    expect(resourceUploadMessage(problem(400, 'something_else', 'Odd failure.'), t)).toBe(
      'Odd failure.',
    );
  });
});

describe('course diff rendering', () => {
  const diff: CourseDiffDto = {
    courseId: 'c1',
    status: 'Updating',
    baseVersion: 2,
    hasChanges: true,
    courseFields: [{ field: 'title', before: 'Old title', after: 'New title' }],
    modulesAdded: [{ id: 'm2', title: 'Module Two' }],
    modulesRemoved: [],
    modulesChanged: [],
    lessonsAdded: [],
    lessonsRemoved: [{ id: 'l9', moduleId: 'm1', title: 'Retired lesson' }],
    lessonsChanged: [
      {
        id: 'l1',
        title: 'Lesson One',
        changes: [
          { field: 'premiumNotesMarkdown', before: null, after: '## Secret' },
          { field: 'mysteryField', before: 'a', after: 'b' },
        ],
      },
    ],
  };

  it('counts changes by kind', () => {
    expect(diffCounts(diff)).toEqual({ course: 1, added: 1, removed: 1, changed: 1 });
  });

  it('renders field labels, before/after values and grouped entities', () => {
    renderWithProviders(<CourseDiffView diff={diff} />);
    expect(screen.getByText('Compared with published version 2.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Course details/ })).toBeInTheDocument();
    expect(screen.getByText('Old title')).toBeInTheDocument();
    expect(screen.getByText('New title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Modules added/ })).toBeInTheDocument();
    expect(screen.getByText('Module Two')).toBeInTheDocument();
    expect(screen.getByText('Retired lesson')).toBeInTheDocument();
    expect(screen.getByText('Premium notes')).toBeInTheDocument();
    expect(screen.getByText('(empty)')).toBeInTheDocument();
    // Unknown fields are shown verbatim rather than as a missing translation key.
    expect(screen.getByText('mysteryField')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Modules removed/ })).toBeNull();
  });

  it('says when nothing changed and when the course was never published', () => {
    renderWithProviders(
      <CourseDiffView
        diff={{
          ...diff,
          baseVersion: null,
          hasChanges: false,
          courseFields: [],
          modulesAdded: [],
          lessonsRemoved: [],
          lessonsChanged: [],
        }}
      />,
    );
    expect(screen.getByText('Never published: everything is new.')).toBeInTheDocument();
    expect(screen.getByText('No changes compared with the published version.')).toBeInTheDocument();
  });
});

describe('enterprise bulk preview', () => {
  const base: BulkPreviewDto = {
    total: 2,
    valid: 1,
    seatsAvailable: 10,
    canCommit: false,
    rows: [
      { line: 1, email: 'a@x.test', error: null },
      { line: 2, email: 'nobody@x.test', error: 'Invalid email address.' },
    ],
  };

  it('disables commit while any row has an error', () => {
    renderWithProviders(<BulkPreviewView preview={base} onCommit={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Invite 1 people' })).toBeDisabled();
    expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
    expect(screen.getByText('1 with errors')).toBeInTheDocument();
  });

  it('keeps commit disabled when the API says it cannot commit (seats)', () => {
    renderWithProviders(
      <BulkPreviewView
        preview={{
          total: 3,
          valid: 3,
          seatsAvailable: 1,
          canCommit: false,
          rows: [1, 2, 3].map((line) => ({ line, email: `u${line}@x.test`, error: null })),
        }}
        onCommit={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Invite 3 people' })).toBeDisabled();
    expect(screen.getByText(/Not enough seats/)).toBeInTheDocument();
  });

  it('enables commit for a clean batch', async () => {
    const onCommit = vi.fn();
    renderWithProviders(
      <BulkPreviewView
        preview={{
          ...base,
          valid: 2,
          canCommit: true,
          rows: base.rows.map((r) => ({ ...r, error: null })),
        }}
        onCommit={onCommit}
      />,
    );
    const btn = screen.getByRole('button', { name: 'Invite 2 people' });
    expect(btn).toBeEnabled();
    await act(async () => {
      await userEvent.click(btn);
    });
    expect(onCommit).toHaveBeenCalled();
  });
});

describe('transcript cues', () => {
  it('parses WebVTT cues with hours, settings and tags', () => {
    const cues = parseVtt(
      'WEBVTT\n\n1\n00:00:01.000 --> 00:00:03.500 align:start\n<v Ana>Hello</v> there\n\n01:02:03.250 --> 01:02:04.000\nLater line\n',
    );
    expect(cues).toEqual([
      { start: 1, end: 3.5, text: 'Hello there' },
      { start: 3723.25, end: 3724, text: 'Later line' },
    ]);
  });
});
