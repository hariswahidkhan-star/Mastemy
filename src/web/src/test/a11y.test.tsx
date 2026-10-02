import axe from 'axe-core';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import type { AttemptView } from '../api/types';
import { MegaMenu } from '../components/discover/MegaMenu';
import { AttemptPlayer } from '../pages/assessment/AttemptPlayer';
import { LoginPage } from '../pages/public/AuthPages';
import { renderWithProviders } from './utils';

/**
 * Fast structural accessibility checks (axe-core) on components in jsdom, in English and Arabic. jsdom has no
 * layout, so colour contrast and other rendering-dependent rules are checked by the browser suite instead
 * (e2e/tests/a11y.spec.ts); here every other WCAG A/AA rule must pass with no violations at all.
 */
async function violations(container: Element) {
  const res = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return res.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

const json = (body: unknown, status = 200) =>
  Promise.resolve(
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }),
  );

const attempt: AttemptView = {
  id: 'a1',
  status: 'InProgress',
  deadlineAt: new Date(Date.now() + 20 * 60_000).toISOString(),
  serverNow: new Date().toISOString(),
  items: [
    {
      itemId: 'i1',
      type: 'SingleChoice',
      stem: 'Which key moves focus forward?',
      options: [
        { id: 'o1', text: 'Tab' },
        { id: 'o2', text: 'F12' },
      ],
      selectedOptionIds: [],
      flagged: false,
    },
    {
      itemId: 'i2',
      type: 'MultipleSelect',
      stem: 'Which keys activate a button?',
      options: [
        { id: 'p1', text: 'Enter' },
        { id: 'p2', text: 'Space' },
        { id: 'p3', text: 'Escape' },
      ],
      selectedOptionIds: [],
      flagged: false,
    },
  ],
};

describe('axe-core component checks', () => {
  afterEach(() => vi.unstubAllGlobals());

  for (const lang of ['en', 'ar'] as const) {
    it(`attempt player has no violations (${lang})`, async () => {
      const { container } = renderWithProviders(
        <main>
          <h1>Quiz</h1>
          <AttemptPlayer
            attempt={attempt}
            onSave={vi.fn().mockResolvedValue(undefined)}
            onSubmit={vi.fn()}
          />
        </main>,
        { lang },
      );
      expect(await violations(container)).toEqual([]);
    });

    it(`login form and MFA challenge have no violations (${lang})`, async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn((url: string) =>
          url.endsWith('/api/auth/login')
            ? json({
                accessToken: null,
                refreshToken: null,
                expiresAt: null,
                user: { id: 'u1', email: 'a@example.com', displayName: 'A', roles: ['Admin'] },
                status: 'mfa_required',
                mfaToken: 'mt',
              })
            : json({}, 401),
        ),
      );
      const user = userEvent.setup();
      const { container } = renderWithProviders(
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>,
        { lang, route: '/login' },
      );
      expect(await violations(container)).toEqual([]);
      await user.type(container.querySelector('input[type="email"]')!, 'a@example.com');
      await user.type(container.querySelector('input[type="password"]')!, 'secret-123');
      await user.click(container.querySelector('form button[type="submit"]')!);
      await act(async () => {
        await screen.findByRole('textbox', { name: lang === 'en' ? /Authentication code/ : /.+/ });
      });
      expect(container.querySelector('input[autocomplete="one-time-code"]')).not.toBeNull();
      expect(await violations(container)).toEqual([]);
    });

    it(`open mega-menu has no violations (${lang})`, async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn((url: string) =>
          url.startsWith('/api/categories')
            ? json([
                {
                  id: 1,
                  slug: 'data',
                  nameEn: 'Data',
                  nameAr: 'البيانات',
                  parentId: null,
                  isAcademy: false,
                  courseCount: 2,
                },
              ])
            : json([]),
        ),
      );
      const { container } = renderWithProviders(
        <nav aria-label="Primary">
          <MegaMenu />
        </nav>,
        { lang },
      );
      await userEvent.click(screen.getByRole('button', { expanded: false }));
      await screen.findByRole('link', { name: lang === 'en' ? 'Data' : 'البيانات' });
      expect(await violations(container)).toEqual([]);
    });
  }
});
