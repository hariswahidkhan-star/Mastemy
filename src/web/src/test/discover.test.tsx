import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes, useLocation } from 'react-router';
import { App } from '../App';
import {
  activeFilterCount,
  normalizeHome,
  readCatalogQuery,
  suggestionHref,
  withFilter,
} from '../api/discover';
import type { CertificationAdminDto } from '../api/discover';
import { buildMenuTree, MegaMenu } from '../components/discover/MegaMenu';
import { move } from '../components/discover/Pickers';
import { SearchCombobox } from '../components/discover/SearchCombobox';
import { ARTICLES, findArticle, parseArticle } from '../lib/articles';
import { verificationChecks } from '../pages/discover/AdminDiscoverPages';
import { renderWithProviders } from './utils';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function Where() {
  const loc = useLocation();
  return <output data-testid="where">{loc.pathname + loc.search}</output>;
}

describe('catalogue query helpers', () => {
  it('keeps valid filters and drops invalid ones', () => {
    const q = readCatalogQuery(
      new URLSearchParams(
        'q=ml&duration=short&updatedWithinDays=99999&minPrice=abc&maxPrice=50&minRating=4.5&sort=bogus&page=1&skill=py',
      ),
    );
    expect(q).toEqual({
      q: 'ml',
      duration: 'short',
      maxPrice: '50',
      minRating: '4.5',
      skill: 'py',
    });
  });

  it('a filter change resets paging; clearing removes the key', () => {
    const p = new URLSearchParams('q=a&page=3&skill=x');
    expect(withFilter(p, 'duration', 'long').toString()).toBe('q=a&skill=x&duration=long');
    expect(withFilter(p, 'skill', '').toString()).toBe('q=a');
    expect(withFilter(p, 'page', '4').get('page')).toBe('4');
  });

  it('counts active filters but not text, sort, page or a fixed category', () => {
    expect(
      activeFilterCount({ q: 'a', sort: 'title', page: '2', skill: 'x', category: 'c' }, 'c'),
    ).toBe(1);
  });

  it('routes suggestions by kind', () => {
    expect(suggestionHref({ kind: 'course', text: 'A', key: 'a-b' })).toBe('/courses/a-b');
    expect(suggestionHref({ kind: 'skill', text: 'Py', key: 'py.3' })).toBe('/courses?skill=py.3');
    expect(suggestionHref({ kind: 'certification', text: 'X', key: 'x' })).toBe(
      '/certifications/x',
    );
  });

  it('normalizes a partial home response', () => {
    expect(normalizeHome({}).bestselling).toEqual([]);
  });
});

describe('ordered picker and menu tree', () => {
  it('moves items within bounds only', () => {
    expect(move(['a', 'b', 'c'], 2, -1)).toEqual(['a', 'c', 'b']);
    expect(move(['a', 'b'], 0, -1)).toEqual(['a', 'b']);
  });

  it('separates academies from the topic tree', () => {
    const cat = (id: number, parentId: number | null, isAcademy = false) => ({
      id,
      slug: `c${id}`,
      nameEn: `C${id}`,
      nameAr: '',
      parentId,
      isAcademy,
      courseCount: 0,
    });
    const tree = buildMenuTree([cat(1, null), cat(2, 1), cat(3, null, true), cat(4, 3)]);
    expect(tree.academies.map((a) => a.id)).toEqual([3]);
    expect(tree.topics.map((t) => [t.category.id, t.children.map((c) => c.id)])).toEqual([
      [1, [2]],
    ]);
  });
});

describe('articles', () => {
  it('parses front matter and ships the three articles', () => {
    expect(parseArticle('---\nslug: a\ntitle: T\n---\nBody')).toMatchObject({
      slug: 'a',
      title: 'T',
      body: 'Body',
    });
    expect(parseArticle('no front matter')).toBeNull();
    expect(ARTICLES).toHaveLength(3);
    expect(findArticle('how-mcq-certificates-work')?.body).toContain(
      'does **not** verify practical',
    );
  });
});

describe('certification verification preview', () => {
  const base: Pick<
    CertificationAdminDto,
    | 'officialSourceUrl'
    | 'lastCheckedAt'
    | 'lastEditedBy'
    | 'hasNonMcqTasks'
    | 'nonMcqDisclosure'
    | 'objectives'
  > = {
    officialSourceUrl: 'https://issuer.example/exam',
    lastCheckedAt: new Date().toISOString(),
    lastEditedBy: 'editor',
    hasNonMcqTasks: true,
    nonMcqDisclosure: '',
    objectives: [],
  };
  it('flags the second-person rule, missing disclosure and objectives', () => {
    const checks = verificationChecks(base, 'PublishedPreparation', 'editor');
    const byKey = Object.fromEntries(checks.map((c) => [c.key, c.ok]));
    expect(byKey).toEqual({
      https: true,
      fresh: true,
      reviewer: false,
      nonMcq: false,
      objectives: false,
      liveCourse: null,
    });
  });
  it('has no checks for non-verified states and fails stale or http sources', () => {
    expect(verificationChecks(base, 'ResearchCandidate', 'x')).toEqual([]);
    const stale = verificationChecks(
      { ...base, officialSourceUrl: 'http://x', lastCheckedAt: '2020-01-01T00:00:00Z' },
      'Verified',
      'other',
    );
    expect(stale.filter((c) => !c.ok).map((c) => c.key)).toEqual(['https', 'fresh', 'nonMcq']);
  });
});

describe('search combobox', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows debounced suggestions and opens the active one with the keyboard', async () => {
    const fetchMock = vi.fn((url: string) =>
      Promise.resolve(
        url.startsWith('/api/search/suggestions')
          ? json([
              { kind: 'course', text: 'Python Basics', key: 'python-basics' },
              { kind: 'skill', text: 'Python', key: 'python' },
            ])
          : json([]),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    const onSubmit = vi.fn();
    renderWithProviders(
      <Routes>
        <Route
          path="*"
          element={
            <>
              <SearchCombobox label="Search" onSubmit={onSubmit} />
              <Where />
            </>
          }
        />
      </Routes>,
    );
    const input = screen.getByRole('combobox', { name: 'Search' });
    await userEvent.type(input, 'py');
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(2);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(fetchMock).toHaveBeenCalledWith('/api/search/suggestions?q=py', expect.anything());
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
    await userEvent.keyboard('{Enter}');
    expect(screen.getByTestId('where')).toHaveTextContent('/courses?skill=python');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits free text when no suggestion is active', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(json([]))),
    );
    const onSubmit = vi.fn();
    renderWithProviders(<SearchCombobox label="Search" onSubmit={onSubmit} />);
    await userEvent.type(screen.getByRole('combobox'), '  data  {Enter}');
    expect(onSubmit).toHaveBeenCalledWith('data');
  });
});

describe('mega-menu disclosure', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('toggles with aria-expanded and closes on Escape, returning focus', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        Promise.resolve(
          url.startsWith('/api/categories')
            ? json([
                {
                  id: 1,
                  slug: 'ai',
                  nameEn: 'AI Academy',
                  nameAr: '',
                  parentId: null,
                  isAcademy: true,
                  courseCount: 2,
                },
              ])
            : json([]),
        ),
      ),
    );
    renderWithProviders(<MegaMenu />);
    const button = screen.getByRole('button', { name: /Explore/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('link', { name: 'AI Academy' })).toHaveAttribute(
      'href',
      '/academies/ai',
    );
    screen.getByRole('link', { name: 'All categories' }).focus();
    await userEvent.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });
});

describe('all courses page', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('sends extended filters from the URL and offers didYouMean', async () => {
    const fetchMock = vi.fn((url: string) => {
      if (url.startsWith('/api/courses?'))
        return Promise.resolve(
          json({ items: [], total: 0, page: 1, pageSize: 20, didYouMean: 'python' }),
        );
      if (url.startsWith('/api/instructors'))
        return Promise.resolve(json({ items: [], total: 0, page: 1, pageSize: 50 }));
      return Promise.resolve(json([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderWithProviders(
      <>
        <App />
        <Where />
      </>,
      { route: '/courses?q=pyton&duration=long&minRating=4' },
    );
    const link = await screen.findByRole('link', { name: 'python' });
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/courses?q=pyton&duration=long&minRating=4',
      expect.anything(),
    );
    await userEvent.click(link);
    await waitFor(() =>
      expect(screen.getByTestId('where')).toHaveTextContent(
        '/courses?q=python&duration=long&minRating=4',
      ),
    );

    // Changing a filter writes it to the URL.
    fireEvent.change(screen.getByLabelText('Video length'), { target: { value: 'short' } });
    await waitFor(() => expect(screen.getByTestId('where')).toHaveTextContent('duration=short'));
    await act(async () => {});
  });
});
