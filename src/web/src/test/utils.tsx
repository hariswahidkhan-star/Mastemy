import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../auth/AuthProvider';
import { ToastProvider } from '../components/ui/Toast';
import { I18nProvider } from '../i18n/I18nProvider';
import type { Lang } from '../i18n/I18nProvider';
import { ThemeProvider } from '../theme/ThemeProvider';
import { CompareProvider } from '../lib/compare';

export function renderWithProviders(ui: ReactElement, opts: { lang?: Lang; route?: string } = {}) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={qc}>
      <I18nProvider initialLang={opts.lang ?? 'en'}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <CompareProvider>
                <MemoryRouter initialEntries={[opts.route ?? '/']}>{children}</MemoryRouter>
              </CompareProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
  return render(ui, { wrapper: Wrapper });
}
