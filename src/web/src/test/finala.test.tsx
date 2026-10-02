import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validateMessageBody, isLinkedInAddUrl } from '../api/finala';
import en from '../i18n/finala.en.json';
import ar from '../i18n/finala.ar.json';
import { MessageComposer } from '../pages/finala/Messaging';
import { NegativeMarkingDisclosure, SelfGradePanel } from '../pages/finala/Learning';
import { ReauthBanner } from '../pages/finala/Reauth';
import { renderWithProviders } from './utils';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
const USER = {
  id: 'u1',
  email: 'a@b.c',
  displayName: 'Ann',
  preferredLanguage: 'en',
  roles: ['Student'],
};

beforeEach(() => localStorage.clear());
afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

function keys(o: object, prefix = ''): string[] {
  return Object.entries(o).flatMap(([k, v]) =>
    typeof v === 'object' ? keys(v as object, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('finala dictionaries', () => {
  it('Arabic covers every English key', () => {
    expect(keys(ar).sort()).toEqual(keys(en).sort());
  });
});

describe('cookie refresh client', () => {
  it('removes a legacy stored refresh token on startup and exchanges it once', async () => {
    localStorage.setItem('mastemy.refreshToken', 'legacy-rt');
    const calls: { url: string; init: RequestInit }[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        return json({ accessToken: 'at', refreshToken: null, expiresAt: null, user: USER });
      }),
    );
    const client = await import('../api/client');
    expect(client.hasSessionHint()).toBe(true);
    expect(localStorage.getItem('mastemy.refreshToken')).toBeNull();
    expect(await client.refreshSession()).toBe(true);
    expect(JSON.parse(String(calls[0].init.body))).toEqual({ refreshToken: 'legacy-rt' });
    expect(await client.refreshSession()).toBe(true);
    // Second refresh relies on the cookie only.
    expect(String(calls[1].init.body)).toBe('{}');
    expect(localStorage.getItem('mastemy.refreshToken')).toBeNull();
  });

  it('refreshes via the cookie with credentials and the CSRF header, single-flight', async () => {
    localStorage.setItem('mastemy.session', '1');
    let resolve!: (r: Response) => void;
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((r) => {
          resolve = r;
        }),
    );
    vi.stubGlobal('fetch', fetchMock);
    const client = await import('../api/client');
    const a = client.refreshSession();
    const b = client.refreshSession();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/api\/auth\/refresh$/);
    expect(init.credentials).toBe('include');
    expect((init.headers as Record<string, string>)['X-Requested-With']).toBe('mastemy');
    resolve(json({ accessToken: 'at2', refreshToken: 'ignored', expiresAt: null, user: USER }));
    expect(await a).toBe(true);
    expect(await b).toBe(true);
    expect(client.getAccessToken()).toBe('at2');
    expect(localStorage.getItem('mastemy.refreshToken')).toBeNull();
  });

  it('does not call refresh without a session hint and clears the hint when refresh fails', async () => {
    const fetchMock = vi.fn(async () => json({ title: 'no' }, 401));
    vi.stubGlobal('fetch', fetchMock);
    const client = await import('../api/client');
    expect(await client.refreshSession()).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    localStorage.setItem('mastemy.session', '1');
    expect(await client.refreshSession()).toBe(false);
    expect(localStorage.getItem('mastemy.session')).toBeNull();
  });

  it('logout posts to the cookie endpoint and clears the session', async () => {
    localStorage.setItem('mastemy.session', '1');
    const fetchMock = vi.fn(async () => new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);
    const client = await import('../api/client');
    await client.logoutSession();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/api\/auth\/logout$/);
    expect(init.credentials).toBe('include');
    expect(localStorage.getItem('mastemy.session')).toBeNull();
  });
});

describe('reauth banner', () => {
  it('shows a non-blocking banner when /api/auth/me reports requiresReauth', async () => {
    localStorage.setItem('mastemy.session', '1');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (url.endsWith('/api/auth/refresh'))
          return json({ accessToken: 'at', refreshToken: null, expiresAt: null, user: USER });
        if (url.endsWith('/api/auth/me')) return json({ ...USER, requiresReauth: true });
        return json({}, 404);
      }),
    );
    renderWithProviders(
      <>
        <ReauthBanner />
        <p>page content</p>
      </>,
    );
    expect(await screen.findByText('Your access changed — sign in again')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in again' })).toBeInTheDocument();
    expect(screen.getByText('page content')).toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole('button', { name: 'Later' }));
    expect(screen.queryByText('Your access changed — sign in again')).not.toBeInTheDocument();
  });

  it('stays hidden when no re-auth is needed', async () => {
    renderWithProviders(<ReauthBanner />);
    await waitFor(() =>
      expect(screen.queryByText('Your access changed — sign in again')).not.toBeInTheDocument(),
    );
  });
});

describe('self-grade', () => {
  it('offers 0–5 with plain-language labels and posts the chosen quality', async () => {
    const fetchMock = vi.fn(async () =>
      json({
        questionId: 'q',
        dueAt: '2026-10-10T00:00:00Z',
        intervalDays: 6,
        repetitions: 2,
        easeFactor: 2.5,
        lastQuality: 4,
      }),
    );
    vi.stubGlobal('fetch', fetchMock);
    renderWithProviders(<SelfGradePanel sessionId="s1" itemId="i1" />);
    for (let q = 0; q <= 5; q++)
      expect(screen.getByRole('button', { name: new RegExp(`^${q} – `) })).toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole('button', { name: /Right, after a little/ }));
    await screen.findByTestId('self-graded');
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/api\/practice\/sessions\/s1\/items\/i1\/self-grade$/);
    expect(JSON.parse(String(init.body))).toEqual({ quality: 4 });
  });

  it('explains a 409 already_graded', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        json({ status: 409, title: 'x', type: 'https://mastemy/errors/already_graded' }, 409),
      ),
    );
    renderWithProviders(<SelfGradePanel sessionId="s1" itemId="i1" />);
    await userEvent.setup().click(screen.getByRole('button', { name: /^5 – / }));
    expect(await screen.findByText('You already graded this item.')).toBeInTheDocument();
  });

  it('shows the recorded grade instead of buttons', () => {
    renderWithProviders(<SelfGradePanel sessionId="s1" itemId="i1" initial={2} />);
    expect(screen.getByTestId('self-graded')).toHaveTextContent('Wrong, but it felt familiar');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('negative-marking disclosure', () => {
  it('renders nothing when the assessment has no penalty', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    renderWithProviders(<NegativeMarkingDisclosure assessmentId="a1" rate={0} />);
    expect(screen.queryByTestId('negative-marking')).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('discloses the server rules before start', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        json({
          id: 'a1',
          title: 'Exam',
          negativeMarkingPerWrong: 0.25,
          negativeMarkingRules: 'Each wrong answer costs 0.25 points.',
        }),
      ),
    );
    renderWithProviders(<NegativeMarkingDisclosure assessmentId="a1" rate={0.25} />);
    expect(screen.getByText('Negative marking')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId('negative-marking')).toHaveTextContent(
        'Each wrong answer costs 0.25 points.',
      ),
    );
    expect(screen.getByText(/Unanswered questions are never penalised/)).toBeInTheDocument();
  });
});

describe('messaging composer limits', () => {
  it('validates length and HTML like the server', () => {
    expect(validateMessageBody('   ')).toBe('empty');
    expect(validateMessageBody('a'.repeat(2000))).toBeNull();
    expect(validateMessageBody('a'.repeat(2001))).toBe('tooLong');
    expect(validateMessageBody('hello <b>there</b>')).toBe('html');
    expect(validateMessageBody('2 < 3 and 5 > 4')).toBeNull();
  });

  it('counts characters, blocks over-long and HTML bodies and resets after sending', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn((_b: string, reset: () => void) => reset());
    renderWithProviders(<MessageComposer label="Your message" max={10} onSend={onSend} />);
    const box = screen.getByLabelText(/^Your message/);
    const send = screen.getByRole('button', { name: 'Send' });
    expect(send).toBeDisabled();
    await user.type(box, 'hello world!');
    expect(screen.getByTestId('composer-count')).toHaveTextContent('12 / 10');
    expect(screen.getByText('Messages can be at most 10 characters.')).toBeInTheDocument();
    expect(send).toBeDisabled();
    await user.clear(box);
    await user.type(box, '<i>x</i>');
    expect(send).toBeDisabled();
    await user.clear(box);
    await user.type(box, ' hi ');
    expect(send).toBeEnabled();
    await user.click(send);
    expect(onSend).toHaveBeenCalledWith('hi', expect.any(Function));
    expect(box).toHaveValue('');
  });
});

describe('LinkedIn url guard', () => {
  it('accepts only the LinkedIn add-to-profile endpoint', () => {
    expect(
      isLinkedInAddUrl('https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=x'),
    ).toBe(true);
    expect(isLinkedInAddUrl('javascript:alert(1)')).toBe(false);
    expect(isLinkedInAddUrl('https://evil.example/profile/add')).toBe(false);
  });
});
