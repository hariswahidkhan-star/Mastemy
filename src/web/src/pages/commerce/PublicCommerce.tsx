import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { api } from '../../api/client';
import type { GiftRedeemDto, PlanDto, SubscriptionCheckoutResponse } from '../../api/commerce';
import { useBundles, useMySubscriptions, usePlans } from '../../api/commerce';
import { useAuth } from '../../auth/AuthProvider';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Input } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState, QueryStatus } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { newIdempotencyKey, splitLines } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { commerceError, StudyServicesNotice } from './shared';

function PlanCard({ plan, current }: { plan: PlanDto; current: boolean }) {
  const { t, fmtMoney, fmtNumber } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const key = useRef(newIdempotencyKey());

  const subscribe = async () => {
    if (!user) {
      navigate(`/login?next=${encodeURIComponent('/plans')}`);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await api<SubscriptionCheckoutResponse>('/api/subscriptions/checkout', {
        method: 'POST',
        body: { planId: plan.id, idempotencyKey: key.current },
      });
      window.location.assign(res.checkoutUrl);
    } catch (e) {
      setError(commerceError(e, t));
      setBusy(false);
    }
  };

  const headingId = `plan-${plan.id}`;
  return (
    <article className="package" aria-labelledby={headingId}>
      <h2 id={headingId} style={{ marginBlockEnd: 'var(--space-2)' }}>
        {plan.name}
      </h2>
      <p className="package__price">
        {t(plan.interval === 'year' ? 'commerce.plans.perYear' : 'commerce.plans.perMonth', {
          price: fmtMoney(plan.price, plan.currency),
        })}
      </p>
      <p className="small">
        {plan.scope === 'Category'
          ? t('commerce.plans.scopeCategory')
          : t('commerce.plans.scopeAll')}
      </p>
      <p className="small" style={{ fontWeight: 600, marginBlockEnd: 'var(--space-1)' }}>
        {t('commerce.plans.included')}
      </p>
      <ul className="check-list small">
        {splitLines(plan.includedServices).map((l) => (
          <li key={l}>{l}</li>
        ))}
        <li>
          {plan.aiAllowance > 0
            ? t('commerce.plans.aiAllowance', { n: fmtNumber(plan.aiAllowance) })
            : t('commerce.plans.noAi')}
        </li>
      </ul>
      <p className="small muted">{plan.renewalTerms}</p>
      <p className="small muted">{plan.freeVideoNotice}</p>
      {error ? <Notice tone="danger">{error}</Notice> : null}
      {current ? (
        <Badge tone="success">{t('commerce.plans.current')}</Badge>
      ) : (
        <Button onClick={() => void subscribe()} loading={busy} style={{ inlineSize: '100%' }}>
          {t('commerce.plans.subscribe')}
        </Button>
      )}
    </article>
  );
}

function SignedInCurrentPlans({ children }: { children: (ids: Set<string>) => ReactNode }) {
  const subs = useMySubscriptions();
  const ids = new Set(
    (subs.data ?? [])
      .filter((s) => s.status === 'Active' || s.status === 'PastDue')
      .map((s) => s.planId),
  );
  return (
    <>
      <QueryStatus query={subs} />
      {children(ids)}
    </>
  );
}

export function PlansPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const plans = usePlans();
  usePageMeta(t('commerce.plans.title'), t('commerce.plans.subtitle'));
  const grid = (current: Set<string>) => (
    <QueryState query={plans}>
      {(list) =>
        list.length === 0 ? (
          <EmptyState title={t('commerce.plans.none')} />
        ) : (
          <div className="grid">
            {list.map((p) => (
              <PlanCard key={p.id} plan={p} current={current.has(p.id)} />
            ))}
          </div>
        )
      }
    </QueryState>
  );
  return (
    <div className="container page">
      <PageHeader title={t('commerce.plans.title')} subtitle={t('commerce.plans.subtitle')} />
      <StudyServicesNotice />
      <div style={{ marginBlockStart: 'var(--space-4)' }}>
        {user ? <SignedInCurrentPlans>{grid}</SignedInCurrentPlans> : grid(new Set())}
      </div>
    </div>
  );
}

export function BundlesPage() {
  const { t, fmtMoney } = useI18n();
  const bundles = useBundles();
  usePageMeta(t('commerce.bundles.title'), t('commerce.bundles.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('commerce.bundles.title')} subtitle={t('commerce.bundles.subtitle')} />
      <StudyServicesNotice />
      <div style={{ marginBlockStart: 'var(--space-4)' }}>
        <QueryState query={bundles}>
          {(list) =>
            list.length === 0 ? (
              <EmptyState title={t('commerce.bundles.none')} />
            ) : (
              <div className="grid">
                {list.map((b) => (
                  <article key={b.id} className="package">
                    <h2>
                      <Link to={`/bundles/${b.id}`}>{b.title}</Link>
                    </h2>
                    <p className="package__price">{fmtMoney(b.price, b.currency)}</p>
                    <p className="small muted">
                      {t('commerce.bundles.components', { n: b.components.length })}
                    </p>
                  </article>
                ))}
              </div>
            )
          }
        </QueryState>
      </div>
    </div>
  );
}

export function BundleDetailPage() {
  const { id = '' } = useParams();
  const { t, fmtMoney } = useI18n();
  const bundles = useBundles();
  const bundle = bundles.data?.find((b) => b.id === id);
  usePageMeta(bundle?.title ?? t('commerce.bundles.title'), bundle?.description);
  return (
    <div className="container page" style={{ maxInlineSize: 820 }}>
      <QueryState query={bundles}>
        {() =>
          !bundle ? (
            <EmptyState
              title={t('commerce.bundles.notFound')}
              action={{ label: t('commerce.bundles.title'), to: '/bundles' }}
            />
          ) : (
            <>
              <PageHeader title={bundle.title} subtitle={bundle.description} />
              <StudyServicesNotice />
              <section className="card" style={{ marginBlockStart: 'var(--space-4)' }}>
                <h2>{t('commerce.bundles.contents')}</h2>
                <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                  {bundle.components.map((c) => (
                    <li key={c.packageId} className="card card--flat">
                      <div className="row row--between">
                        <strong>{c.title}</strong>
                        <span>{fmtMoney(c.listPrice, bundle.currency)}</span>
                      </div>
                      <ul className="check-list small">
                        {splitLines(c.contents).map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                      <p className="small muted">
                        {t('course.accessTerm', { days: c.accessDays })}
                      </p>
                    </li>
                  ))}
                </ul>
                <p>
                  {t('commerce.bundles.separately', {
                    amount: fmtMoney(bundle.componentsListTotal, bundle.currency),
                  })}
                </p>
                <p className="package__price">{fmtMoney(bundle.price, bundle.currency)}</p>
                <p className="small muted">{bundle.freeVideoNotice}</p>
                <ButtonLink to={`/checkout/bundle/${bundle.id}`}>
                  {t('commerce.bundles.buy')}
                </ButtonLink>
              </section>
            </>
          )
        }
      </QueryState>
    </div>
  );
}

export function GiftRedeemPage() {
  const { t, fmtDate } = useI18n();
  const [params] = useSearchParams();
  const [code, setCode] = useState(params.get('code') ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<GiftRedeemDto | null>(null);
  usePageMeta(t('commerce.gift.redeemTitle'), undefined, { noindex: true });

  const redeem = async () => {
    setBusy(true);
    setError(null);
    try {
      setDone(
        await api<GiftRedeemDto>('/api/gifts/redeem', {
          method: 'POST',
          body: { code: code.trim() },
        }),
      );
    } catch (e) {
      setError(commerceError(e, t));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container page" style={{ maxInlineSize: 560 }}>
      <PageHeader
        title={t('commerce.gift.redeemTitle')}
        subtitle={t('commerce.gift.redeemSubtitle')}
      />
      <StudyServicesNotice />
      {done ? (
        <Notice tone="success" title={t('commerce.gift.redeemed')}>
          <p>{t('commerce.gift.redeemedBody', { date: fmtDate(done.endsAt) })}</p>
          <Link to="/me">{t('nav.dashboard')}</Link>
        </Notice>
      ) : (
        <form
          className="card"
          style={{ marginBlockStart: 'var(--space-4)' }}
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim()) void redeem();
          }}
        >
          <Field label={t('commerce.gift.code')} required error={error ?? undefined}>
            <Input
              value={code}
              autoComplete="off"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Field>
          <div className="form-actions">
            <Button type="submit" loading={busy} disabled={!code.trim()}>
              {t('commerce.gift.redeem')}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
