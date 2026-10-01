import { screen } from '@testing-library/react';
import { App } from '../App';
import { renderWithProviders } from './utils';

function json(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('App smoke', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        Promise.resolve(
          url.startsWith('/api/categories')
            ? json([])
            : json({ items: [], total: 0, page: 1, pageSize: 12 }),
        ),
      ),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it('renders the home page with honest empty collections', async () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect((await screen.findAllByText('No courses here yet')).length).toBeGreaterThan(0);
  });

  it('renders the 404 page for unknown routes', () => {
    renderWithProviders(<App />, { route: '/does-not-exist' });
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('redirects anonymous users away from the dashboard', () => {
    renderWithProviders(<App />, { route: '/me' });
    expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument();
  });
});
