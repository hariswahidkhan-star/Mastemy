import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes, useLocation } from 'react-router';
import {
  categoryTree,
  currencyChoices,
  EMPTY_ORDER_FILTERS,
  mappedIds,
  orderQuery,
  safeReturnTo,
  validateCategory,
} from '../api/finalb';
import type { CategoryAdminDto, CurrencyOptionDto } from '../api/finalb';
import type { StudioCourseDto } from '../api/types';
import { getRefreshToken, setSession } from '../api/client';
import { translate } from '../i18n/I18nProvider';
import finalbEn from '../i18n/finalb.en.json';
import finalbAr from '../i18n/finalb.ar.json';
import { CheckoutPage } from '../pages/commerce/CheckoutPage';
import { OrderBrowserPage } from '../pages/finalb/CommerceB';
import { SsoCompletePage } from '../pages/finalb/Sso';
import { StudioTaxonomyPanel } from '../pages/discover/StudioTaxonomyPanel';
import { renderWithProviders } from './utils';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const problem = (status: number, code: string) =>
  new Response(JSON.stringify({ status, type: code, title: code }), {
    status,
    headers: { 'Content-Type': 'application/problem+json' },
  });

function flatKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'string' ? [`${prefix}${k}`] : flatKeys(v as object, `${prefix}${k}.`),
  );
}

function Where() {
  const loc = useLocation();
  return <output data-testid="where">{loc.pathname + loc.search}</output>;
}

afterEach(() => {
  vi.unstubAllGlobals();
  setSession(null);
});

describe('finalb dictionaries', () => {
  it('have identical keys in English and Arabic under one namespace and are merged', () => {
    expect(flatKeys(finalbAr).sort()).toEqual(flatKeys(finalbEn).sort());
    expect(Object.keys(finalbEn)).toEqual(['finalb']);
    expect(translate('ar', 'finalb.nav.orders')).toBe('الطلبات');
  });
});

// ---------------- currency selector ----------------
const PKG = '11111111-1111-1111-1111-111111111111';
const rows: CurrencyOptionDto[] = [
  { packageId: PKG, currency: 'USD', countries: [], amount: 50, isBase: true },
  { packageId: PKG, currency: 'EUR', countries: [], amount: 45, isBase: false },
  { packageId: PKG, currency: 'EUR', countries: ['DE'], amount: 40, isBase: false },
  { packageId: PKG, currency: 'INR', countries: ['IN'], amount: 2000, isBase: false },
];

describe('currencyChoices', () => {
  it('lists one entry per currency, base first, with country-only prices kept for matching countries', () => {
    expect(currencyChoices(rows, '').map((c) => [c.currency, c.amount])).toEqual([
      ['USD', 50],
      ['EUR', 45],
      ['INR', 2000],
    ]);
    // Country-specific beats generic for the entered country; other countries' prices disappear.
    expect(currencyChoices(rows, 'de').map((c) => [c.currency, c.amount])).toEqual([
      ['USD', 50],
      ['EUR', 40],
    ]);
  });

  it('renders the checkout selector from GET /api/commerce/currencies without probing prices', async () => {
    const fetchMock = vi.fn((url: string) => {
      if (url === `/api/packages/${PKG}/price`)
        return Promise.resolve(
          json({
            packageId: PKG,
            title: 'Premium notes',
            includedServices: 'Notes',
            accessDays: 365,
            currency: 'USD',
            amount: 50,
            regularAmount: 50,
            compareAtAmount: null,
            offer: null,
            freeVideoNotice: 'Videos are free',
          }),
        );
      if (url === `/api/commerce/currencies?packageId=${PKG}`) return Promise.resolve(json(rows));
      if (url === '/api/checkout/quote')
        return Promise.resolve(
          json({
            kind: 'Package',
            currency: 'USD',
            listAmount: 50,
            amount: 50,
            discount: 0,
            priceSource: 'Base',
            compareAtAmount: null,
            offerEndsAt: null,
            couponApplied: false,
            items: [],
            freeVideoNotice: 'Videos are free',
          }),
        );
      return Promise.resolve(json([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderWithProviders(
      <Routes>
        <Route path="/checkout/package/:id" element={<CheckoutPage kind="package" />} />
      </Routes>,
      { route: `/checkout/package/${PKG}` },
    );
    const select = await screen.findByLabelText('Currency');
    await waitFor(() =>
      expect(Array.from((select as HTMLSelectElement).options).map((o) => o.value)).toEqual([
        '',
        'EUR',
        'INR',
      ]),
    );
    expect(screen.getByRole('option', { name: /INR .*IN/ })).toBeInTheDocument();
    const urls = fetchMock.mock.calls.map((c) => c[0]);
    expect(urls.some((u) => u.includes('/price?currency='))).toBe(false);
  });
});

// ---------------- order browser ----------------
describe('order browser filters', () => {
  it('maps filters to the query string', () => {
    expect(orderQuery(EMPTY_ORDER_FILTERS)).toBe('');
    expect(
      orderQuery({
        ...EMPTY_ORDER_FILTERS,
        status: 'Paid',
        email: ' Buyer@Example.com ',
        currency: 'eur',
        from: '2026-01-01',
        to: '2026-01-31',
        coupon: 'SAVE10',
        page: 2,
      }),
    ).toBe(
      '?status=Paid&email=Buyer%40Example.com&from=2026-01-01T00%3A00%3A00Z&to=2026-01-31T23%3A59%3A59Z&currency=EUR&coupon=SAVE10&page=2',
    );
  });

  it('requests /api/admin/orders with the submitted filters and opens the detail drawer', async () => {
    const order = {
      id: 'o1',
      userId: 'u1',
      buyerEmail: 'b@example.com',
      status: 'Paid',
      kind: 'Package',
      total: 50,
      currency: 'USD',
      discountAmount: 0,
      refundedAmount: 0,
      couponCode: null,
      itemCount: 1,
      createdAt: '2026-01-02T00:00:00Z',
      paidAt: '2026-01-02T00:00:00Z',
    };
    const fetchMock = vi.fn((url: string) => {
      if (url.startsWith('/api/admin/orders/o1'))
        return Promise.resolve(
          json({
            order,
            priceSource: 'Base',
            country: null,
            listAmount: 50,
            items: [
              { id: 'i1', packageId: 'p', courseId: 'c', courseTitle: 'Algebra', unitPrice: 50 },
            ],
            payments: [
              {
                id: 'pay1',
                provider: 'Stripe',
                providerPaymentId: 'pi_123',
                amount: 50,
                currency: 'USD',
                createdAt: order.createdAt,
              },
            ],
            refunds: [],
            invoices: [],
            ledger: [],
            disputes: [],
          }),
        );
      if (url.startsWith('/api/admin/orders'))
        return Promise.resolve(json({ items: [order], total: 1, page: 1, pageSize: 25 }));
      return Promise.resolve(json([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderWithProviders(<OrderBrowserPage />);
    await screen.findByText('b@example.com');
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'Paid' } });
    fireEvent.change(screen.getByLabelText('Buyer email (exact)'), {
      target: { value: 'b@example.com' },
    });
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/admin/orders?status=Paid&email=b%40example.com',
        expect.anything(),
      ),
    );
    await userEvent.click(await screen.findByRole('button', { name: 'Details' }));
    expect(await screen.findByText('pi_123', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/Algebra/)).toBeInTheDocument();
  });
});

// ---------------- category tree ----------------
const cat = (
  id: number,
  slug: string,
  parentId: number | null,
  sortOrder = 0,
): CategoryAdminDto => ({
  id,
  slug,
  nameEn: slug,
  nameAr: slug,
  parentId,
  isAcademy: false,
  sortOrder,
  courseCount: 0,
  childCount: 0,
});

describe('category tree validation', () => {
  const list = [
    cat(1, 'tech', null, 2),
    cat(2, 'ai', 1),
    cat(3, 'ml', 2),
    cat(4, 'deep', 3),
    cat(5, 'arts', null, 1),
  ];
  const input = {
    slug: 'new',
    nameEn: 'New',
    nameAr: 'جديد',
    parentId: null,
    isAcademy: false,
    sortOrder: 0,
  };

  it('orders depth-first by sort order', () => {
    expect(categoryTree(list).map((n) => `${n.depth}:${n.cat.slug}`)).toEqual([
      '0:arts',
      '0:tech',
      '1:ai',
      '2:ml',
      '3:deep',
    ]);
  });

  it('mirrors the server checks', () => {
    expect(validateCategory(input, list, null)).toEqual({});
    expect(validateCategory({ ...input, slug: '-bad' }, list, null).slug).toBe('invalid_slug');
    expect(validateCategory({ ...input, slug: 'ai' }, list, null).slug).toBe('slug_taken');
    expect(validateCategory({ ...input, slug: 'ai' }, list, 2).slug).toBeUndefined();
    expect(validateCategory({ ...input, nameAr: ' ' }, list, null).nameAr).toBe('invalid_name');
    expect(validateCategory({ ...input, nameEn: '<b>' }, list, null).nameEn).toBe('invalid_name');
    expect(validateCategory({ ...input, sortOrder: 200000 }, list, null).sortOrder).toBe(
      'invalid_sort_order',
    );
    expect(validateCategory({ ...input, parentId: 99 }, list, null).parentId).toBe(
      'invalid_parent',
    );
    // Moving "tech" under its grandchild is a cycle.
    expect(validateCategory({ ...input, slug: 'tech', parentId: 3 }, list, 1).parentId).toBe(
      'category_cycle',
    );
    // A fifth level is too deep; moving "ai" (height 3) under "arts" fits exactly (1 + 3 = 4).
    expect(validateCategory({ ...input, parentId: 4 }, list, null).parentId).toBe(
      'category_too_deep',
    );
    expect(validateCategory({ ...input, slug: 'ai', parentId: 5 }, list, 2)).toEqual({});
    expect(validateCategory({ ...input, slug: 'ai', parentId: 4 }, list, 2).parentId).toBe(
      'category_cycle',
    );
  });
});

// ---------------- SSO completion ----------------
const AUTH = {
  accessToken: 'at',
  refreshToken: 'rt',
  expiresAt: '2099-01-01T00:00:00Z',
  status: 'ok',
  user: {
    id: 'u1',
    email: 'm@acme.test',
    displayName: 'Member',
    roles: ['Student'],
    emailVerified: true,
  },
};

describe('SSO completion page', () => {
  it('exchanges the handoff once, signs in and follows a safe returnTo', async () => {
    const fetchMock = vi.fn((url: string, init?: RequestInit) => {
      if (url === '/api/sso/exchange') {
        expect(JSON.parse(String(init?.body))).toEqual({ handoff: 'h-123' });
        return Promise.resolve(json(AUTH));
      }
      return Promise.resolve(json(AUTH.user));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderWithProviders(
      <>
        <Routes>
          <Route path="/sso/complete" element={<SsoCompletePage />} />
          <Route path="*" element={<p>landed</p>} />
        </Routes>
        <Where />
      </>,
      { route: '/sso/complete?handoff=h-123&returnTo=%2Fme%2Forders' },
    );
    await waitFor(() => expect(screen.getByTestId('where')).toHaveTextContent('/me/orders'));
    expect(fetchMock.mock.calls.filter((c) => c[0] === '/api/sso/exchange')).toHaveLength(1);
    expect(getRefreshToken()).toBe('rt');
    await act(async () => {});
  });

  it('maps callback and exchange error codes to explanations', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(problem(401, 'invalid_handoff'))),
    );
    renderWithProviders(<SsoCompletePage />, {
      route: '/sso/complete?error=sso_domain_not_allowed',
    });
    expect(await screen.findByTestId('sso-error')).toHaveTextContent(
      'Your email domain is not allowed for this organization.',
    );
  });

  it('explains an expired handoff code', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(problem(401, 'invalid_handoff'))),
    );
    renderWithProviders(
      <Routes>
        <Route path="/sso/complete" element={<SsoCompletePage />} />
      </Routes>,
      { route: '/sso/complete?handoff=old' },
    );
    expect(await screen.findByTestId('sso-error')).toHaveTextContent('invalid or has expired');
  });

  it('never follows an off-site returnTo', () => {
    expect(safeReturnTo('//evil.example')).toBe('/me');
    expect(safeReturnTo('https://evil.example')).toBe('/me');
    expect(safeReturnTo('/learn/x')).toBe('/learn/x');
  });
});

// ---------------- objective mapping preload ----------------
describe('objective mapping dialog', () => {
  it('preloads the current mapping from GET mappings', async () => {
    const course = {
      id: 'c1',
      slug: 'course',
      title: 'Course',
      description: '',
      audience: '',
      prerequisites: '',
      outcomes: [],
      language: 'en',
      level: 'Beginner',
      status: 'Draft',
      modules: [
        {
          id: 'm1',
          title: 'Module 1',
          lessons: [
            { id: 'l1', title: 'Lesson one', objective: '' },
            { id: 'l2', title: 'Lesson two', objective: '' },
          ],
        },
      ],
    } as unknown as StudioCourseDto;
    const fetchMock = vi.fn((url: string) => {
      if (url === '/api/certifications')
        return Promise.resolve(json([{ id: 'cert1', title: 'Cert', examCode: 'X-1' }]));
      if (url === '/api/studio/courses/c1/certifications/cert1/coverage')
        return Promise.resolve(
          json({
            certificationId: 'cert1',
            certificationTitle: 'Cert',
            courseId: 'c1',
            objectiveCount: 1,
            gapCount: 0,
            coveredWeightPercent: 100,
            objectives: [
              {
                objectiveId: 'o1',
                code: 'D1',
                title: 'Domain one',
                weightPercent: 100,
                lessonCount: 1,
                activeQuestionCount: 0,
                gap: true,
                gaps: ['no_active_questions'],
              },
            ],
          }),
        );
      if (url === '/api/studio/courses/c1/certifications/cert1/mappings')
        return Promise.resolve(
          json({
            certificationId: 'cert1',
            courseId: 'c1',
            linked: true,
            objectives: [
              {
                objectiveId: 'o1',
                code: 'D1',
                title: 'Domain one',
                lessonIds: ['l2'],
                questionIds: [],
              },
            ],
          }),
        );
      return Promise.resolve(json([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderWithProviders(<StudioTaxonomyPanel course={course} />);
    const select = await screen.findByLabelText('Certification');
    await waitFor(() =>
      expect(screen.getByRole('option', { name: 'Cert (X-1)' })).toBeInTheDocument(),
    );
    fireEvent.change(select, { target: { value: 'cert1' } });
    await userEvent.click(await screen.findByRole('button', { name: 'Map lessons to D1' }));
    await waitFor(() => expect(screen.getByLabelText('Lesson two')).toBeChecked());
    expect(screen.getByLabelText('Lesson one')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Save mapping (1)' })).toBeEnabled();
  });

  it('mappedIds picks the objective and kind', () => {
    const m = {
      certificationId: 'c',
      courseId: 'k',
      linked: true,
      objectives: [
        { objectiveId: 'o', code: 'A', title: 'A', lessonIds: ['l'], questionIds: ['q'] },
      ],
    };
    expect(mappedIds(m, 'o', 'questions')).toEqual(['q']);
    expect(mappedIds(m, 'x', 'lessons')).toEqual([]);
  });
});
