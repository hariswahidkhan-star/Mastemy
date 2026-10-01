import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiError } from './api/client';
import { App } from './App';
import { AuthProvider } from './auth/AuthProvider';
import { ToastProvider } from './components/ui/Toast';
import { I18nProvider } from './i18n/I18nProvider';
import { ThemeProvider } from './theme/ThemeProvider';
import './styles/tokens.css';
import './styles/global.css';

const queryClient = new QueryClient({
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

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  </StrictMode>,
);
