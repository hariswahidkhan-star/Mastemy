import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApiError } from '../api/client';
import type { InvoiceDto } from '../api/commerce';
import { problemCode } from '../api/commerce';
import { translate } from '../i18n/I18nProvider';
import commerceEn from '../i18n/commerce.en.json';
import commerceAr from '../i18n/commerce.ar.json';
import {
  forgetAttribution,
  parseAttributionParams,
  readAttribution,
  referralLink,
  writeAttribution,
} from '../lib/attribution';
import { refundAmountError } from '../pages/commerce/FinanceConsole';
import { InvoicesTable } from '../pages/commerce/MeCommerce';
import { commerceError, CStatus, OfferBadge, PriceLine } from '../pages/commerce/shared';
import { renderWithProviders } from './utils';

const t = (k: string, v?: Record<string, string | number>) => translate('en', k, v);
const problem = (status: number, type: string, title = type) =>
  new ApiError(status, { status, type, title }, title);

function flatKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'string' ? [`${prefix}${k}`] : flatKeys(v as object, `${prefix}${k}.`),
  );
}

describe('commerce dictionaries', () => {
  it('English and Arabic commerce dictionaries have identical keys under the commerce namespace', () => {
    expect(flatKeys(commerceAr).sort()).toEqual(flatKeys(commerceEn).sort());
    expect(Object.keys(commerceEn)).toEqual(['commerce']);
  });
  it('are merged into the main dictionary', () => {
    expect(translate('en', 'commerce.plans.title')).toBe('Subscription plans');
    expect(translate('ar', 'commerce.plans.title')).toBe('خطط الاشتراك');
    expect(translate('en', 'nav.courses')).not.toBe('nav.courses');
  });
});

describe('attribution capture', () => {
  beforeEach(() => sessionStorage.clear());

  it('accepts only well-formed ?ref= / ?aff= codes', () => {
    expect(parseAttributionParams('?ref=ALICE-10&aff=partner_1')).toEqual({
      ref: 'ALICE-10',
      aff: 'partner_1',
    });
    expect(parseAttributionParams('?ref=<script>&aff=')).toEqual({
      ref: undefined,
      aff: undefined,
    });
  });

  it('round-trips through sessionStorage and drops expired affiliate clicks', () => {
    writeAttribution({
      referralCode: 'R1',
      affiliateClickId: 'c1',
      affiliateCode: 'A',
      affiliateExpiresAt: '2026-01-02T00:00:00Z',
    });
    expect(readAttribution(new Date('2026-01-01T00:00:00Z')).affiliateClickId).toBe('c1');
    const later = readAttribution(new Date('2026-01-03T00:00:00Z'));
    expect(later.affiliateClickId).toBeUndefined();
    expect(later.referralCode).toBe('R1');
    forgetAttribution('referral');
    expect(readAttribution(new Date('2026-01-01T00:00:00Z')).referralCode).toBeUndefined();
  });

  it('never throws when storage is unavailable or corrupt', () => {
    sessionStorage.setItem('mastemy.attribution', '{not json');
    expect(readAttribution()).toEqual({});
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceeded');
    });
    expect(() => writeAttribution({ referralCode: 'X' })).not.toThrow();
    spy.mockRestore();
  });

  it('builds a shareable referral link', () => {
    expect(referralLink('https://mastemy.test/', 'data-101', 'ALICE')).toBe(
      'https://mastemy.test/courses/data-101?ref=ALICE',
    );
  });
});

describe('commerce errors', () => {
  it('extracts the problem code and maps it to a translated message', () => {
    const e = problem(400, 'https://mastemy/errors/coupon_expired', 'Coupon has expired.');
    expect(problemCode(e)).toBe('coupon_expired');
    expect(commerceError(e, t)).toBe('This coupon has expired.');
  });
  it('falls back to the server message for unmapped codes (e.g. the coupon policy cap)', () => {
    const e = new ApiError(
      400,
      {
        status: 400,
        type: 'coupon_exceeds_policy',
        title: 'Instructor coupons may give at most 50% off.',
      },
      'x',
    );
    expect(commerceError(e, t)).toBe('Instructor coupons may give at most 50% off.');
  });
});

describe('finance refund validation', () => {
  it('requires a positive amount with at most two decimals', () => {
    expect(refundAmountError('', t)).toBe(t('commerce.finance.amountPositive'));
    expect(refundAmountError('0', t)).toBe(t('commerce.finance.amountPositive'));
    expect(refundAmountError('1.234', t)).toBe(t('commerce.finance.amountDecimals'));
    expect(refundAmountError('12.5', t)).toBeNull();
  });
});

describe('price display', () => {
  it('shows a compare-at price only when the server provides one above the amount', () => {
    const { rerender } = renderWithProviders(
      <PriceLine amount={40} currency="USD" compareAt={null} />,
    );
    expect(screen.getByTestId('price').querySelector('s')).toBeNull();
    rerender(<PriceLine amount={40} currency="USD" compareAt={50} />);
    expect(screen.getByTestId('price').querySelector('s')).toHaveTextContent('$50.00');
  });

  it('offer badge states the real end time and has no live countdown', () => {
    renderWithProviders(<OfferBadge name="Spring" endsAt="2026-05-01T12:00:00Z" />);
    const badge = screen.getByText(/Spring · ends/);
    expect(badge).toHaveTextContent('UTC');
    expect(badge).not.toHaveAttribute('role', 'timer');
  });

  it('status badges translate known values and show unknown ones verbatim', () => {
    renderWithProviders(
      <>
        <CStatus status="PendingApproval" />
        <CStatus status="SomethingNew" />
      </>,
    );
    expect(screen.getByText('Pending approval')).toBeInTheDocument();
    expect(screen.getByText('SomethingNew')).toBeInTheDocument();
  });
});

describe('invoice download', () => {
  afterEach(() => vi.restoreAllMocks());
  const inv: InvoiceDto = {
    id: 'i1',
    number: 'INV-2026-000001',
    kind: 'Invoice',
    orderId: 'o1',
    refundId: null,
    relatedInvoiceId: null,
    buyerName: 'B',
    buyerCountry: null,
    currency: 'USD',
    subtotal: 10,
    taxAmount: null,
    taxRatePercent: null,
    taxMode: 'None',
    total: 10,
    lines: [],
    issuedAt: '2026-01-01T00:00:00Z',
  };

  it('explains 503 invoicing_not_configured instead of failing silently', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 503,
          title: 'Invoicing is not configured',
          type: 'invoicing_not_configured',
        }),
        { status: 503, headers: { 'content-type': 'application/problem+json' } },
      ),
    );
    renderWithProviders(<InvoicesTable list={[inv]} />);
    await userEvent.click(screen.getByRole('button', { name: 'Download INV-2026-000001 as PDF' }));
    await waitFor(() =>
      expect(screen.getByText(/seller details have not been configured/)).toBeInTheDocument(),
    );
  });
});
