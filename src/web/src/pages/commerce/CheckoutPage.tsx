import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import type {
  CheckoutInput,
  CheckoutResponse,
  PriceView,
  QuoteDto,
  QuoteInput,
} from '../../api/commerce';
import { problemCode, useBundles } from '../../api/commerce';
import { currencyChoices, useCurrencyOptions } from '../../api/finalb';
import { Button } from '../../components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { Spinner } from '../../components/ui/Spinner';
import { useI18n } from '../../i18n/I18nProvider';
import { forgetAttribution, readAttribution } from '../../lib/attribution';
import { newIdempotencyKey, splitLines } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { commerceError, OfferBadge, PriceLine, StudyServicesNotice } from './shared';

const COUNTRY = /^[A-Za-z]{2}$/;

/** Base price view (title, services) plus the sellable currencies listed by the server. */
function useAvailableCurrencies(packageId: string | undefined, country: string) {
  const base = useQuery({
    queryKey: ['commerce', 'price', packageId, '', ''],
    queryFn: () => api<PriceView>(`/api/packages/${packageId}/price`),
    enabled: !!packageId,
    retry: false,
    staleTime: 60_000,
  });
  const options = useCurrencyOptions(packageId);
  return {
    base: packageId ? base : undefined,
    currencies: currencyChoices(options.data ?? [], country),
    pending: options.isPending && !!packageId,
    error: options.isError ? options.error : null,
  };
}

export function CheckoutPage({ kind }: { kind: 'package' | 'bundle' }) {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const { t, fmtMoney } = useI18n();
  const navigate = useNavigate();
  usePageMeta(t('commerce.checkout.title'), undefined, { noindex: true });

  const [currency, setCurrency] = useState('');
  const [countryDraft, setCountryDraft] = useState('');
  const [country, setCountry] = useState('');
  const [couponDraft, setCouponDraft] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [gift, setGift] = useState(kind === 'package' && params.get('gift') === '1');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [billingName, setBillingName] = useState('');
  const [attribution, setAttribution] = useState(() => readAttribution());
  const [attributionNotice, setAttributionNotice] = useState<string | null>(null);
  const [payError, setPayError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const avail = useAvailableCurrencies(kind === 'package' ? id : undefined, country);
  const bundles = useBundles();
  const bundle = kind === 'bundle' ? bundles.data?.find((b) => b.id === id) : undefined;

  const input: QuoteInput = useMemo(
    () => ({
      ...(kind === 'package' ? { packageId: id } : { bundleId: id }),
      ...(currency ? { currency } : {}),
      ...(country ? { country } : {}),
      ...(coupon ? { couponCode: coupon } : {}),
      ...(attribution.referralCode ? { referralCode: attribution.referralCode } : {}),
      ...(attribution.affiliateClickId ? { affiliateClickId: attribution.affiliateClickId } : {}),
      ...(gift ? { gift: true } : {}),
    }),
    [kind, id, currency, country, coupon, attribution, gift],
  );

  const quote = useQuery({
    queryKey: ['commerce', 'quote', input],
    queryFn: () => api<QuoteDto>('/api/checkout/quote', { method: 'POST', body: input }),
    retry: false,
  });

  // Attribution that does not apply to this purchase is dropped (and said so) instead of blocking checkout.
  useEffect(() => {
    if (!quote.isError) return;
    const code = problemCode(quote.error);
    if (code.startsWith('referral_') && attribution.referralCode) {
      forgetAttribution('referral');
      setAttribution(readAttribution());
      setAttributionNotice(t('commerce.checkout.referralDropped'));
    } else if (code.startsWith('affiliate_') && attribution.affiliateClickId) {
      forgetAttribution('affiliate');
      setAttribution(readAttribution());
      setAttributionNotice(t('commerce.checkout.affiliateDropped'));
    }
  }, [quote.isError, quote.error, attribution, t]);

  // A fresh idempotency key per distinct purchase; reused for retries of the same one.
  const keyRef = useRef<{ sig: string; key: string } | null>(null);
  const idempotencyKey = (sig: string) => {
    if (!keyRef.current || keyRef.current.sig !== sig)
      keyRef.current = { sig, key: newIdempotencyKey() };
    return keyRef.current.key;
  };

  const applyCoupon = async () => {
    const code = couponDraft.trim();
    if (!code) return;
    setCheckingCoupon(true);
    setCouponError(null);
    try {
      await api<QuoteDto>('/api/checkout/quote', {
        method: 'POST',
        body: { ...input, couponCode: code },
      });
      setCoupon(code);
    } catch (e) {
      setCouponError(commerceError(e, t));
    } finally {
      setCheckingCoupon(false);
    }
  };

  const pay = async () => {
    setPaying(true);
    setPayError(null);
    const body: CheckoutInput = {
      ...input,
      gift: undefined,
      idempotencyKey: '',
      ...(billingName.trim() ? { billingName: billingName.trim() } : {}),
      ...(gift
        ? {
            gift: {
              ...(recipientEmail.trim() ? { recipientEmail: recipientEmail.trim() } : {}),
              ...(giftMessage.trim() ? { message: giftMessage.trim() } : {}),
            },
          }
        : {}),
    };
    body.idempotencyKey = idempotencyKey(JSON.stringify({ ...body, idempotencyKey: '' }));
    try {
      const res = await api<CheckoutResponse>('/api/checkout', { method: 'POST', body });
      if (res.checkoutUrl) window.location.assign(res.checkoutUrl);
      else navigate(`/me/orders?paid=${res.orderId}`);
    } catch (e) {
      setPayError(commerceError(e, t));
    } finally {
      setPaying(false);
    }
  };

  const base = avail.base?.data;
  const title =
    kind === 'package' ? (base?.title ?? t('commerce.checkout.title')) : (bundle?.title ?? '');

  if (kind === 'package' && avail.base?.isPending)
    return <Spinner label={t('common.loading')} block />;
  if (kind === 'package' && avail.base?.isError)
    return (
      <div className="container page">
        <Notice tone="danger">{commerceError(avail.base.error, t)}</Notice>
      </div>
    );

  return (
    <div className="container page" style={{ maxInlineSize: 760 }}>
      <PageHeader title={t('commerce.checkout.title')} subtitle={title} />
      <StudyServicesNotice />
      <div className="stack" style={{ marginBlockStart: 'var(--space-4)' }}>
        <section className="card" aria-labelledby="co-what">
          <h2 id="co-what">{t('commerce.checkout.whatYouGet')}</h2>
          {kind === 'package' && base ? (
            <>
              <ul className="check-list small">
                {splitLines(base.includedServices).map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="small muted">{t('course.accessTerm', { days: base.accessDays })}</p>
            </>
          ) : bundle ? (
            <ul className="check-list small">
              {bundle.components.map((c) => (
                <li key={c.packageId}>
                  {c.title} · {fmtMoney(c.listPrice, bundle.currency)}
                </li>
              ))}
            </ul>
          ) : bundles.isPending ? (
            <Spinner label={t('common.loading')} />
          ) : null}
        </section>

        {kind === 'package' ? (
          <section className="card" aria-labelledby="co-region">
            <h2 id="co-region">{t('commerce.checkout.region')}</h2>
            <div className="grid-2">
              <Field
                label={t('commerce.checkout.country')}
                hint={t('commerce.checkout.countryHint')}
              >
                <Input
                  value={countryDraft}
                  maxLength={2}
                  autoComplete="country"
                  onChange={(e) => setCountryDraft(e.target.value.toUpperCase())}
                  onBlur={() => {
                    const c = countryDraft.trim();
                    if (c === '' || COUNTRY.test(c)) setCountry(c);
                  }}
                />
              </Field>
              <Field label={t('commerce.checkout.currency')}>
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  options={[
                    {
                      value: '',
                      label: t('commerce.checkout.defaultCurrency', {
                        currency: base?.currency ?? '',
                      }),
                    },
                    ...avail.currencies
                      .filter((c) => c.currency !== base?.currency)
                      .map((c) => ({
                        value: c.value,
                        label: c.countries.length
                          ? t('finalb.checkout.regionalOption', {
                              currency: c.currency,
                              amount: fmtMoney(c.amount, c.currency),
                              countries: c.countries.join(', '),
                            })
                          : `${c.currency} · ${fmtMoney(c.amount, c.currency)}`,
                      })),
                  ]}
                />
              </Field>
            </div>
            <p className="small muted">
              {avail.pending
                ? t('common.loading')
                : avail.error
                  ? commerceError(avail.error, t)
                  : t('commerce.checkout.currencyNote')}
            </p>
          </section>
        ) : null}

        <section className="card" aria-labelledby="co-coupon">
          <h2 id="co-coupon">{t('commerce.checkout.coupon')}</h2>
          {coupon ? (
            <div className="row">
              <span>{t('commerce.checkout.couponApplied', { code: coupon })}</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setCoupon('');
                  setCouponDraft('');
                }}
              >
                {t('commerce.checkout.removeCoupon')}
              </Button>
            </div>
          ) : (
            <form
              className="row"
              onSubmit={(e) => {
                e.preventDefault();
                void applyCoupon();
              }}
            >
              <Field label={t('commerce.checkout.couponCode')} error={couponError ?? undefined}>
                <Input value={couponDraft} onChange={(e) => setCouponDraft(e.target.value)} />
              </Field>
              <Button
                type="submit"
                variant="secondary"
                loading={checkingCoupon}
                disabled={!couponDraft.trim()}
              >
                {t('commerce.checkout.apply')}
              </Button>
            </form>
          )}
        </section>

        {kind === 'package' ? (
          <section className="card" aria-labelledby="co-gift">
            <h2 id="co-gift">{t('commerce.gift.title')}</h2>
            <Checkbox
              label={t('commerce.gift.buyAsGift')}
              checked={gift}
              onChange={(e) => setGift(e.target.checked)}
            />
            {gift ? (
              <div className="stack">
                <p className="small muted">{t('commerce.gift.explain')}</p>
                <Field
                  label={t('commerce.gift.recipientEmail')}
                  hint={t('commerce.gift.recipientHint')}
                >
                  <Input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </Field>
                <Field label={t('commerce.gift.message')}>
                  <Textarea
                    value={giftMessage}
                    maxLength={500}
                    onChange={(e) => setGiftMessage(e.target.value)}
                  />
                </Field>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="card" aria-labelledby="co-sum" aria-live="polite">
          <h2 id="co-sum">{t('commerce.checkout.summary')}</h2>
          {attributionNotice ? <Notice tone="info">{attributionNotice}</Notice> : null}
          {attribution.referralCode ? (
            <p className="small muted">
              {t('commerce.checkout.referralUsed', { code: attribution.referralCode })}
            </p>
          ) : null}
          <QueryState query={quote}>
            {(q) => (
              <div className="stack" data-testid="quote">
                {q.offerEndsAt ? <OfferBadge endsAt={q.offerEndsAt} /> : null}
                <dl className="facts">
                  <div>
                    <dt>{t('commerce.checkout.listPrice')}</dt>
                    <dd>{fmtMoney(q.listAmount, q.currency)}</dd>
                  </div>
                  {q.discount > 0 ? (
                    <div>
                      <dt>{t('commerce.checkout.discount')}</dt>
                      <dd>−{fmtMoney(q.discount, q.currency)}</dd>
                    </div>
                  ) : null}
                </dl>
                <div>
                  <span className="small muted">{t('commerce.checkout.total')}</span>
                  <PriceLine
                    amount={q.amount}
                    currency={q.currency}
                    compareAt={q.compareAtAmount}
                  />
                </div>
                {q.amount === 0 ? (
                  <Notice tone="success">{t('commerce.checkout.noPaymentNeeded')}</Notice>
                ) : null}
              </div>
            )}
          </QueryState>
          <Field
            label={t('commerce.checkout.billingName')}
            hint={t('commerce.checkout.billingHint')}
          >
            <Input
              value={billingName}
              maxLength={200}
              autoComplete="name"
              onChange={(e) => setBillingName(e.target.value)}
            />
          </Field>
          {payError ? <Notice tone="danger">{payError}</Notice> : null}
          <div className="form-actions">
            <Button onClick={() => void pay()} loading={paying} disabled={!quote.isSuccess}>
              {quote.data?.amount === 0
                ? t('commerce.checkout.confirmFree')
                : t('commerce.checkout.pay')}
            </Button>
            <Link to="/me/orders">{t('commerce.orders.title')}</Link>
          </div>
          <p className="small muted">{t('commerce.checkout.serverPrice')}</p>
        </section>
      </div>
    </div>
  );
}

export function PackageCheckoutPage() {
  return <CheckoutPage kind="package" />;
}
export function BundleCheckoutPage() {
  return <CheckoutPage kind="bundle" />;
}
