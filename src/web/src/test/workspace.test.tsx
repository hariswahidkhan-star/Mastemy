import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { extractGuid, groupByDay, parseLessonList } from '../api/workspace';
import type { StudyPlanItemDto } from '../api/workspace';
import type { StudioLessonDto } from '../api/types';
import { translate } from '../i18n/I18nProvider';
import { readConsentCookie, useTrackEvent } from '../lib/analytics';
import { SseParser } from '../lib/sse';
import { applyTutorEvent } from '../pages/workspace/AiPanels';
import { NotesEditor } from '../pages/workspace/Authoring';
import { niceMax } from '../pages/workspace/Charts';
import { KNOWN_CODES } from '../pages/workspace/common';
import { ConsentBanner } from '../pages/workspace/Consent';
import { renderWithProviders } from './utils';

interface Call {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: unknown;
}

/** Minimal fetch router: each handler returns [status, body, headers?]. */
function mockFetch(
  handler: (c: Call) => [number, unknown, Record<string, string>?] | undefined,
): Call[] {
  const calls: Call[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const c: Call = {
        method: init?.method ?? 'GET',
        url,
        headers: (init?.headers ?? {}) as Record<string, string>,
        body: init?.body ? JSON.parse(String(init.body)) : undefined,
      };
      calls.push(c);
      const r = handler(c) ?? [404, { status: 404, title: 'nf', type: 'not_found' }];
      const [status, body, headers] = r;
      return new Response(body === undefined ? null : JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...(headers ?? {}) },
      });
    }),
  );
  return calls;
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.cookie = 'mastemy_consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
});

describe('SSE parser', () => {
  it('parses events split across chunks, CRLF and multi-line data', () => {
    const p = new SseParser();
    expect(p.push('event: delta\ndata: {"te')).toEqual([]);
    expect(p.push('xt":"Hi"}\n\n')).toEqual([{ event: 'delta', data: '{"text":"Hi"}' }]);
    expect(p.push(': comment\r\nevent: done\r\ndata: a\r\ndata: b\r\n\r\n')).toEqual([
      { event: 'done', data: 'a\nb' },
    ]);
  });
});

describe('tutor stream folding', () => {
  it('appends deltas, then replaces the text with the authoritative done content', () => {
    let m: Parameters<typeof applyTutorEvent>[0] = {
      key: 'a',
      role: 'assistant',
      content: '',
      citations: [],
      streaming: true,
    };
    m = applyTutorEvent(m, 'delta', '{"text":"Part"}').msg;
    m = applyTutorEvent(m, 'delta', '{"text":"ial [[S1]]"}').msg;
    expect(m.content).toBe('Partial [[S1]]');
    const cite = {
      chunkId: 'c',
      lessonId: 'l',
      lessonTitle: 'L',
      section: 's',
      sourceKind: 'notes',
      startSeconds: 12,
    };
    const r = applyTutorEvent(
      m,
      'done',
      JSON.stringify({ content: 'Final [1]', citations: [cite], outcome: 'answered' }),
    );
    expect(r.done).toBe(true);
    expect(r.msg.content).toBe('Final [1]');
    expect(r.msg.citations).toHaveLength(1);
    expect(r.msg.streaming).toBe(false);
    expect(applyTutorEvent(m, 'error', '{"code":"ai_unavailable"}').error).toBe('ai_unavailable');
  });
});

describe('small helpers', () => {
  it('parses a pasted lesson list', () => {
    expect(parseLessonList('- Intro\n2. Basics\n\n  * Wrap up  \n• Extra')).toEqual([
      'Intro',
      'Basics',
      'Wrap up',
      'Extra',
    ]);
  });
  it('reads the consent cookie', () => {
    expect(readConsentCookie('a=1; mastemy_consent=analytics')).toBe('analytics');
    expect(readConsentCookie('mastemy_consent=necessary')).toBe('necessary');
    expect(readConsentCookie('x=y')).toBeNull();
  });
  it('groups plan items by day and finds GUIDs in links', () => {
    const item = (id: string, at: string) => ({ id, scheduledAt: at }) as StudyPlanItemDto;
    const g = groupByDay([
      item('1', '2026-10-05T18:00:00Z'),
      item('2', '2026-10-05T18:20:00Z'),
      item('3', '2026-10-07T18:00:00Z'),
    ]);
    expect(g.map((d) => [d.day, d.items.length])).toEqual([
      ['2026-10-05', 2],
      ['2026-10-07', 1],
    ]);
    expect(
      extractGuid('https://x/courses/a/discussions/3F2504E0-4F89-11D3-9A0C-0305E82C3301'),
    ).toBe('3f2504e0-4f89-11d3-9a0c-0305e82c3301');
    expect(extractGuid('nope')).toBeNull();
  });
  it('picks nice axis maxima', () => {
    expect(niceMax(0)).toBe(1);
    expect(niceMax(7)).toBe(10);
    expect(niceMax(18)).toBe(20);
    expect(niceMax(230)).toBe(250);
  });
  it('has English and Arabic text for every mapped problem code', () => {
    for (const code of KNOWN_CODES) {
      expect(translate('en', `workspace.errors.${code}`)).not.toContain('workspace.errors');
      expect(translate('ar', `workspace.errors.${code}`)).not.toBe(
        translate('en', `workspace.errors.${code}`),
      );
    }
  });
});

function TextEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return <textarea aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} />;
}

describe('lesson notes concurrency', () => {
  it('sends If-Match, shows a conflict dialog on 412 and overwrites with the latest ETag', async () => {
    let serverVersion = 1;
    let serverText = 'Original';
    const calls = mockFetch((c) => {
      if (c.url.endsWith('/api/studio/lessons/L1/notes') && c.method === 'GET')
        return [
          200,
          {
            lessonId: 'L1',
            notesVersion: serverVersion,
            eTag: `"n${serverVersion}"`,
            notesMarkdown: serverText,
            premiumNotesMarkdown: null,
          },
        ];
      if (c.url.endsWith('/api/studio/lessons/L1/notes') && c.method === 'PUT') {
        if (c.headers['If-Match'] !== `"n${serverVersion}"`)
          return [412, { status: 412, title: 'stale', type: 'precondition_failed' }];
        serverVersion++;
        serverText = (c.body as { notesMarkdown: string }).notesMarkdown;
        return [200, { id: 'L1', notesVersion: serverVersion }, { ETag: `"n${serverVersion}"` }];
      }
      return undefined;
    });
    const user = userEvent.setup();
    renderWithProviders(
      <NotesEditor
        lesson={{ id: 'L1', title: 'L' } as StudioLessonDto}
        courseId="C1"
        Editor={TextEditor}
      />,
    );
    const box = await screen.findByRole('textbox', { name: 'Study notes' });
    expect(box).toHaveValue('Original');
    // Someone else saves in the meantime.
    serverVersion = 2;
    serverText = 'Their change';
    await user.clear(box);
    await user.type(box, 'My change');
    await user.click(screen.getByRole('button', { name: 'Save notes' }));
    const dialog = await screen.findByRole('alertdialog', {
      name: 'These notes were changed by someone else',
    });
    expect(dialog).toHaveTextContent('Their change');
    expect(dialog).toHaveTextContent('My change');
    const puts = calls.filter((c) => c.method === 'PUT');
    expect(puts[0].headers['If-Match']).toBe('"n1"');
    await user.click(screen.getByRole('button', { name: 'Overwrite with my version' }));
    await waitFor(() => expect(serverText).toBe('My change'));
    expect(calls.filter((c) => c.method === 'PUT')[1].headers['If-Match']).toBe('"n2"');
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  });
});

function Tracker() {
  useTrackEvent('course_view', 'course-1');
  return null;
}

describe('analytics consent', () => {
  it('shows the banner before a choice and sends no events until consent', async () => {
    let analytics = false;
    const calls = mockFetch((c) => {
      if (c.url.endsWith('/api/analytics/consent') && c.method === 'GET')
        return [200, { analytics, source: 'cookie' }];
      if (c.url.endsWith('/api/analytics/consent') && c.method === 'PUT') {
        analytics = (c.body as { analytics: boolean }).analytics;
        document.cookie = `mastemy_consent=${analytics ? 'analytics' : 'necessary'}; path=/`;
        return [200, { analytics, source: 'cookie' }];
      }
      if (c.url.endsWith('/api/analytics/events')) return [202, { accepted: 1, rejected: 0 }];
      return undefined;
    });
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <ConsentBanner />
        <Tracker />
      </>,
    );
    const accept = await screen.findByRole('button', { name: 'Accept analytics' });
    expect(calls.some((c) => c.url.endsWith('/api/analytics/events'))).toBe(false);
    await user.click(accept);
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Accept analytics' })).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(calls.filter((c) => c.url.endsWith('/api/analytics/events'))).toHaveLength(1),
    );
    const ev = calls.find((c) => c.url.endsWith('/api/analytics/events'))!;
    expect((ev.body as { events: { type: string }[] }).events[0].type).toBe('course_view');
  });
});
