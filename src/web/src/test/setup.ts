import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { ensureLang } from '../i18n/I18nProvider';

// Tests render Arabic synchronously; load its dictionary up front as the browser entry does.
await ensureLang('ar');

afterEach(() => {
  cleanup();
  try {
    localStorage.clear();
  } catch {
    /* ignore */
  }
});
