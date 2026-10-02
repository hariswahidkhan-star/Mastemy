import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { hydrate } from '@tanstack/react-query';
import { hasSessionHint } from './api/client';
import { ensureLang, readStoredLang } from './i18n/I18nProvider';
import { AppTree, createQueryClient, SSR_GLOBAL } from './ssr/AppTree';
import type { SsrPayload } from './ssr/AppTree';
import './styles/tokens.css';
import './styles/global.css';

const queryClient = createQueryClient();
function readSsrPayload(): SsrPayload | undefined {
  const el = document.getElementById(SSR_GLOBAL);
  if (!el?.textContent) return undefined;
  try {
    return JSON.parse(el.textContent) as SsrPayload;
  } catch {
    return undefined;
  }
}

const ssr = readSsrPayload();
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
  !hasSessionHint() &&
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

// Arabic visitors fetch their dictionary (a separate chunk) before the first render.
void ensureLang(canHydrate ? ssr.lang : readStoredLang()).then(() => {
  if (canHydrate) {
    hydrateRoot(container, tree);
  } else {
    container.textContent = '';
    createRoot(container).render(tree);
  }
});
