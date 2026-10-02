import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiError } from '../api/client';
import { App } from '../App';
import { AuthProvider } from '../auth/AuthProvider';
import { ToastProvider } from '../components/ui/Toast';
import { I18nProvider } from '../i18n/I18nProvider';
import type { Lang } from '../i18n/I18nProvider';
import { ThemeProvider } from '../theme/ThemeProvider';
import { CompareProvider } from '../lib/compare';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (count, error) => {
          // Client errors are not transient; do not hammer the API.
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false;
          return count < 2;
        },
      },
    },
  });
}

/**
 * The provider tree shared by the browser entry and the SSR renderer. Server and client must render the
 * exact same structure for `hydrateRoot` to adopt the server markup.
 */
export function AppTree({
  queryClient,
  lang,
  router,
}: {
  queryClient: QueryClient;
  lang?: Lang;
  router: (app: ReactNode) => ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider initialLang={lang}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <CompareProvider>{router(<App />)}</CompareProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

/** Shape of `window.__MASTEMY_SSR__`, written by the SSR server. */
export interface SsrPayload {
  lang: Lang;
  /** Dehydrated react-query cache (successful public queries only). */
  state: unknown;
  /** Lazy route components the page rendered; preloaded before hydration (see lib/lazyNamed). */
  lazy?: string[];
}

export const SSR_GLOBAL = '__MASTEMY_SSR__';
