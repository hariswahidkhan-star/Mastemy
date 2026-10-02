import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { afterEach, vi } from 'vitest';
import {
  normalizeRecoveryCode,
  parseInterests,
  timeZones,
  FALLBACK_TIME_ZONES,
} from '../api/account';
import { ApiError } from '../api/client';
import { translate } from '../i18n/I18nProvider';
import en from '../i18n/account.en.json';
import ar from '../i18n/account.ar.json';
import { accountError, QrCode, RecoveryCodesPanel } from '../pages/account/Mfa';
import { isValidProfileUrl } from '../pages/account/ProfilePages';
import { describeAgent } from '../pages/account/SecurityPage';
import { LoginPage } from '../pages/public/AuthPages';
import { renderWithProviders } from './utils';

const t = (k: string, v?: Record<string, string | number>) => translate('en', k, v);

function flatKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'string' ? [`${prefix}${k}`] : flatKeys(v as object, `${prefix}${k}.`),
  );
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

afterEach(() => vi.unstubAllGlobals());

describe('account dictionaries', () => {
  it('English and Arabic account dictionaries have identical keys under one namespace', () => {
    expect(Object.keys(en)).toEqual(['account']);
    expect(flatKeys(ar).sort()).toEqual(flatKeys(en).sort());
  });
  it('are merged into the main translator', () => {
    expect(translate('en', 'account.nav.security')).toBe('Security');
    expect(translate('ar', 'account.nav.security')).toBe('الأمان');
    // Existing keys are untouched by the merge.
    expect(translate('en', 'common.pageOf', { page: 1, pages: 2 })).toBe('Page 1 of 2');
  });
  it('skill evidence labels never claim verification', () => {
    for (const type of ['self_declared', 'mcq_assessed', 'external_credential']) {
      const label = t(`account.skills.evidence.${type}`) + t(`account.skills.type.${type}`);
      expect(
        label.toLowerCase().replace(/not verified|unverified|does not verify/g, ''),
      ).not.toMatch(/verified/);
    }
  });
});

describe('account helpers', () => {
  it('parses skills of interest: trims, de-duplicates case-insensitively', () => {
    expect(parseInterests(' SQL, python ,sql,\nData ethics,, ')).toEqual([
      'SQL',
      'python',
      'Data ethics',
    ]);
  });
  it('validates profile links like the server (https only, no credentials)', () => {
    expect(isValidProfileUrl('https://example.com/me')).toBe(true);
    expect(isValidProfileUrl('http://example.com')).toBe(false);
    expect(isValidProfileUrl('https://user:pw@example.com')).toBe(false);
    expect(isValidProfileUrl('javascript:alert(1)')).toBe(false);
  });
  it('normalizes recovery codes case- and dash-insensitively', () => {
    expect(normalizeRecoveryCode('abcde-12345 ')).toBe('ABCDE12345');
  });
  it('lists time zones and keeps an unknown current zone selectable', () => {
    const zones = timeZones('Mars/Olympus');
    expect(zones[0]).toBe('Mars/Olympus');
    expect(zones).toContain('UTC');
    expect(FALLBACK_TIME_ZONES).toContain('Europe/London');
  });
  it('describes user agents briefly', () => {
    expect(
      describeAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36',
      ),
    ).toBe('Chrome · Linux');
  });
  it('maps problem codes to messages, including email_not_configured (503)', () => {
    const err = new ApiError(503, { status: 503, type: 'email_not_configured', title: 'x' }, 'x');
    expect(accountError(err, t)).toMatch(/contact support/);
  });
});

describe('MFA components', () => {
  it('renders the otpauth URI as an accessible SVG QR code', () => {
    renderWithProviders(
      <QrCode
        value="otpauth://totp/Mastemy:a%40b.c?secret=JBSWY3DPEHPK3PXP&issuer=Mastemy"
        label="QR"
      />,
    );
    const img = screen.getByRole('img', { name: 'QR' });
    expect(img.tagName.toLowerCase()).toBe('svg');
    expect(img.querySelector('path')?.getAttribute('d')?.length).toBeGreaterThan(100);
  });

  it('recovery codes need an explicit acknowledgement before continuing', async () => {
    const user = userEvent.setup();
    const done = vi.fn();
    renderWithProviders(
      <RecoveryCodesPanel codes={['AAAAA-BBBBB', 'CCCCC-DDDDD']} onDone={done} />,
    );
    expect(screen.getByText('AAAAA-BBBBB')).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: 'Done' });
    expect(btn).toBeDisabled();
    await user.click(screen.getByLabelText('I have saved my recovery codes'));
    await user.click(btn);
    expect(done).toHaveBeenCalled();
  });

  it('login with mfa_required asks for a code and completes the session after /mfa/verify', async () => {
    const user = userEvent.setup();
    const calls: { url: string; body: unknown }[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init?: RequestInit) => {
        calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : undefined });
        const u = {
          id: 'u1',
          email: 'a@b.c',
          displayName: 'A',
          preferredLanguage: 'en',
          roles: ['Admin'],
        };
        if (url.endsWith('/api/auth/login'))
          return json({
            accessToken: null,
            refreshToken: null,
            expiresAt: null,
            user: u,
            status: 'mfa_required',
            mfaToken: 'mt',
          });
        if (url.endsWith('/api/auth/mfa/verify'))
          return json({
            accessToken: 'at',
            refreshToken: 'rt',
            expiresAt: null,
            user: u,
            status: 'ok',
          });
        return json({}, 404);
      }),
    );
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<p>dashboard</p>} />
      </Routes>,
      { route: '/login' },
    );
    await user.type(screen.getByLabelText(/^Email/), 'a@example.com');
    await user.type(screen.getByLabelText(/^Password/), 'secret-123');
    await user.click(screen.getByRole('button', { name: 'Log in' }));
    const code = await screen.findByLabelText(/Authentication code/);
    expect(screen.queryByText('dashboard')).not.toBeInTheDocument();
    await user.type(code, '123456');
    await user.click(screen.getByRole('button', { name: 'Verify' }));
    await waitFor(() => expect(screen.getByText('dashboard')).toBeInTheDocument());
    expect(calls.find((c) => c.url.endsWith('/mfa/verify'))?.body).toEqual({
      mfaToken: 'mt',
      code: '123456',
    });
    expect(localStorage.getItem('mastemy.refreshToken')).toBe('rt');
  });
});
