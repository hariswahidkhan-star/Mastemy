import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { hydrate } from '@tanstack/react-query';
import { getRefreshToken } from './api/client';
import { readStoredLang } from './i18n/I18nProvider';
import { AppTree, createQueryClient, SSR_GLOBAL } from './ssr/AppTree';
import type { SsrPayload } from './ssr/AppTree';
import './styles/tokens.css';
import './styles/global.css';

const queryClient = createQueryClient();
const ssr = (window as unknown as Record<string, SsrPayload | undefined>)[SSR_GLOBAL];
if (ssr?.state) hydrate(queryClient, ssr.state);

function hasStoredTheme(): boolean {
  try {
    return !!localStorage.getItem('mastemy.theme');
  } catch {
    return false;
  }
}

const container = document.getElementById('root') as HTMLElement;
// The server renders anonymously, in the URL language, with the system theme. Hydrate only when this
// visitor's first render will match; otherwise render fresh (the dehydrated data still avoids a refetch).
const canHydrate =
  !!ssr &&
  container.hasChildNodes() &&
  readStoredLang() === ssr.lang &&
  !getRefreshToken() &&
  !hasStoredTheme();

const tree = (
  <StrictMode>
    <AppTree
      queryClient={queryClient}
      lang={canHydrate ? ssr.lang : undefined}
      router={(app) => <BrowserRouter>{app}</BrowserRouter>}
    />
  </StrictMode>
);

if (canHydrate) {
  hydrateRoot(container, tree);
} else {
  container.textContent = '';
  createRoot(container).render(tree);
}
