import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { api, downloadFile, qs } from '../../api/client';
import type {
  CouponDto,
  CouponInput,
  PackagePriceDto,
  PayoutBalanceDto,
  PayoutProfileDto,
  PayoutProfileInput,
  PayoutRequestDto,
  PromotionDto,
  ReferralCodeDto,
  StudioPackageDto,
} from '../../api/commerce';
import { useApiMutation, useStudioCourses } from '../../api/hooks';
import type { StudioCourseDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { Spinner } from '../../components/ui/Spinner';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { referralLink } from '../../lib/attribution';
import { usePageMeta } from '../../lib/seo';
import { commerceError, CStatus } from './shared';

const num = (v: string): number | null => (v.trim() === '' ? null : Number(v));
const lines = (v: string) =>
  v
    .split(/[\n,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
/** `datetime-local` value (local time) to ISO UTC, or null. */
export const toIso = (v: string): string | null => (v ? new Date(v).toISOString() : null);

/** Every package of every course the instructor manages. */
function useMyPackages() {
  const courses = useStudioCourses();
  const list = courses.data ?? [];
  const pkgQueries = useQueries({
    queries: list.map((c) => ({
      queryKey: ['studio', 'packages', c.id],
      queryFn: () => api<StudioPackageDto[]>(`/api/studio/courses/${c.id}/packages`),
    })),
  });
  const packages: (StudioPackageDto & { courseTitle: string })[] = pkgQueries.flatMap((q, i) =>
    (q.data ?? []).map((p) => ({ ...p, courseTitle: list[i]?.title ?? '' })),
  );
  return {
    courses,
    list,
    packages,
    pending: courses.isPending || pkgQueries.some((q) => q.isPending),
  };
}

// ---------------- Coupons ----------------
function CouponsTab() {
  const { t, fmtMoney, fmtDate } = useI18n();
  const toast = useToast();
  const mine = useMyPackages();
  const coupons = useQuery({
    queryKey: ['studio', 'coupons'],
    queryFn: () => api<CouponDto[]>('/api/studio/coupons'),
  });
  const [form, setForm] = useState({
    code: '',
    kind: 'Percent' as CouponInput['kind'],
    percentOff: '10',
    amountOff: '',
    currency: '',
    scope: 'Course' as 'Course' | 'Package',
    scopeId: '',
    maxRedemptions: '',
    maxPerUser: '1',
    startsAt: '',
    expiresAt: '',
    minAmount: '',
    emails: '',
    domains: '',
    org: '',
  });
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const create = useApiMutation(
    (body: CouponInput) => api<CouponDto>('/api/studio/coupons', { method: 'POST', body }),
    [['studio', 'coupons']],
    (c) => {
      toast.success(
        c.status === 'PendingApproval'
          ? t('commerce.coupons.createdPending', { code: c.code })
          : t('commerce.coupons.created', { code: c.code }),
      );
      setForm((f) => ({ ...f, code: '' }));
    },
  );
  const disable = useApiMutation(
    (id: string) => api(`/api/studio/coupons/${id}/disable`, { method: 'POST' }),
    [['studio', 'coupons']],
  );
  const submit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate({
      code: form.code.trim(),
      kind: form.kind,
      scope: form.scope,
      scopeId: form.scopeId || null,
      percentOff: form.kind === 'Percent' ? num(form.percentOff) : null,
      amountOff: form.kind === 'Fixed' ? num(form.amountOff) : null,
      currency: form.currency.trim().toUpperCase() || null,
      maxRedemptions: num(form.maxRedemptions),
      maxPerUser: num(form.maxPerUser),
      startsAt: toIso(form.startsAt),
      expiresAt: toIso(form.expiresAt),
      minAmount: num(form.minAmount),
      ...(form.kind === 'Scholarship'
        ? {
            allowedEmails: lines(form.emails),
            allowedDomains: lines(form.domains),
            allowedOrganizationId: form.org.trim() || null,
          }
        : {}),
    });
  };
  const targets =
    form.scope === 'Course'
      ? mine.list.map((c) => ({ value: c.id, label: c.title }))
      : mine.packages
          .filter((p) => p.approvalStatus === 'Approved')
          .map((p) => ({
            value: p.id,
            label: `${p.title} · ${p.courseTitle} (${fmtMoney(p.price, p.currency)})`,
          }));
  return (
    <div className="stack">
      <Notice tone="info" title={t('commerce.coupons.policyTitle')}>
        <ul className="small" style={{ margin: 0 }}>
          <li>{t('commerce.coupons.policyCap')}</li>
          <li>{t('commerce.coupons.policyScope')}</li>
          <li>{t('commerce.coupons.policyScholarship')}</li>
          <li>{t('commerce.coupons.policyNoStack')}</li>
        </ul>
      </Notice>
      <form className="card" onSubmit={submit} aria-labelledby="coupon-new">
        <h3 id="coupon-new">{t('commerce.coupons.new')}</h3>
        <div className="grid-2">
          <Field label={t('commerce.coupons.code')} required>
            <Input value={form.code} onChange={(e) => set('code')(e.target.value)} required />
          </Field>
          <Field label={t('commerce.coupons.kind')}>
            <Select
              value={form.kind}
              onChange={(e) => set('kind')(e.target.value)}
              options={[
                { value: 'Percent', label: t('commerce.coupons.kindPercent') },
                { value: 'Fixed', label: t('commerce.coupons.kindFixed') },
                { value: 'Scholarship', label: t('commerce.coupons.kindScholarship') },
              ]}
            />
          </Field>
          {form.kind === 'Percent' ? (
            <Field label={t('commerce.coupons.percentOff')} required>
              <Input
                type="number"
                min="0.01"
                max="99.99"
                step="0.01"
                value={form.percentOff}
                onChange={(e) => set('percentOff')(e.target.value)}
                required
              />
            </Field>
          ) : null}
          {form.kind === 'Fixed' ? (
            <Field label={t('commerce.coupons.amountOff')} required>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.amountOff}
                onChange={(e) => set('amountOff')(e.target.value)}
                required
              />
            </Field>
          ) : null}
          {form.kind === 'Fixed' || form.minAmount ? (
            <Field label={t('commerce.coupons.currency')} required>
              <Input
                value={form.currency}
                maxLength={3}
                onChange={(e) => set('currency')(e.target.value.toUpperCase())}
                required
              />
            </Field>
          ) : null}
          <Field label={t('commerce.coupons.scope')}>
            <Select
              value={form.scope}
              onChange={(e) =>
                setForm((f) => ({ ...f, scope: e.target.value as 'Course', scopeId: '' }))
              }
              options={[
                { value: 'Course', label: t('commerce.coupons.scopeCourse') },
                { value: 'Package', label: t('commerce.coupons.scopePackage') },
              ]}
            />
          </Field>
          <Field label={t('commerce.coupons.target')} required>
            <Select
              value={form.scopeId}
              onChange={(e) => set('scopeId')(e.target.value)}
              placeholder={mine.pending ? t('common.loading') : t('commerce.common.choose')}
              options={targets}
              required
            />
          </Field>
          <Field label={t('commerce.coupons.maxRedemptions')} hint={t('commerce.common.optional')}>
            <Input
              type="number"
              min="1"
              value={form.maxRedemptions}
              onChange={(e) => set('maxRedemptions')(e.target.value)}
            />
          </Field>
          <Field label={t('commerce.coupons.maxPerUser')}>
            <Input
              type="number"
              min="1"
              max="100"
              value={form.maxPerUser}
              onChange={(e) => set('maxPerUser')(e.target.value)}
            />
          </Field>
          <Field label={t('commerce.coupons.startsAt')} hint={t('commerce.common.optional')}>
            <Input
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => set('startsAt')(e.target.value)}
            />
          </Field>
          <Field label={t('commerce.coupons.expiresAt')} hint={t('commerce.common.optional')}>
            <Input
              type="datetime-local"
              value={form.expiresAt}
              onChange={(e) => set('expiresAt')(e.target.value)}
            />
          </Field>
          <Field label={t('commerce.coupons.minAmount')} hint={t('commerce.common.optional')}>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={form.minAmount}
              onChange={(e) => set('minAmount')(e.target.value)}
            />
          </Field>
        </div>
        {form.kind === 'Scholarship' ? (
          <div className="grid-2">
            <Field
              label={t('commerce.coupons.allowedEmails')}
              hint={t('commerce.coupons.listHint')}
            >
              <Textarea value={form.emails} onChange={(e) => set('emails')(e.target.value)} />
            </Field>
            <Field
              label={t('commerce.coupons.allowedDomains')}
              hint={t('commerce.coupons.listHint')}
            >
              <Textarea value={form.domains} onChange={(e) => set('domains')(e.target.value)} />
            </Field>
            <Field label={t('commerce.staff.orgId')} hint={t('commerce.common.optional')}>
              <Input
                value={form.org}
                className="mono"
                onChange={(e) => set('org')(e.target.value)}
              />
            </Field>
          </div>
        ) : null}
        {create.isError ? <Notice tone="danger">{commerceError(create.error, t)}</Notice> : null}
        <div className="form-actions">
          <Button type="submit" loading={create.isPending}>
            {t('commerce.coupons.create')}
          </Button>
        </div>
      </form>
      <section className="card" aria-labelledby="coupon-list">
        <h3 id="coupon-list">{t('commerce.coupons.mine')}</h3>
        <QueryState query={coupons}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.coupons.none')}</p>
            ) : (
              <CouponTable
                list={list}
                actions={(c) =>
                  c.status === 'Active' || c.status === 'PendingApproval' ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      loading={disable.isPending && disable.variables === c.id}
                      onClick={() => disable.mutate(c.id)}
                    >
                      {t('commerce.coupons.disable')}
                    </Button>
                  ) : null
                }
                fmtDate={fmtDate}
              />
            )
          }
        </QueryState>
        {disable.isError ? <Notice tone="danger">{commerceError(disable.error, t)}</Notice> : null}
      </section>
    </div>
  );
}

export function CouponTable({
  list,
  actions,
  fmtDate,
}: {
  list: CouponDto[];
  actions: (c: CouponDto) => ReactNode;
  fmtDate: (iso: string | null | undefined) => string;
}) {
  const { t, fmtMoney } = useI18n();
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t('commerce.coupons.code')}</th>
            <th scope="col">{t('commerce.coupons.discount')}</th>
            <th scope="col">{t('commerce.coupons.scope')}</th>
            <th scope="col">{t('commerce.coupons.used')}</th>
            <th scope="col">{t('commerce.coupons.expiresAt')}</th>
            <th scope="col">{t('dashboard.status')}</th>
            <th scope="col">{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id}>
              <td className="mono">{c.code}</td>
              <td>
                {c.kind === 'Percent'
                  ? `${c.percentOff}%`
                  : c.kind === 'Fixed' && c.amountOff != null
                    ? fmtMoney(c.amountOff, c.currency ?? 'USD')
                    : t('commerce.coupons.kindScholarship')}
              </td>
              <td>{c.scope}</td>
              <td>
                {c.redemptions}
                {c.maxRedemptions ? ` / ${c.maxRedemptions}` : ''}
              </td>
              <td>{c.expiresAt ? fmtDate(c.expiresAt) : '—'}</td>
              <td>
                <CStatus status={c.status} />
              </td>
              <td>{actions(c)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------- Regional prices ----------------
function PackagePrices({ pkg }: { pkg: StudioPackageDto & { courseTitle: string } }) {
  const { t, fmtMoney, fmtDate } = useI18n();
  const toast = useToast();
  const key = ['studio', 'prices', pkg.id];
  const prices = useQuery({
    queryKey: key,
    queryFn: () => api<PackagePriceDto[]>(`/api/studio/packages/${pkg.id}/prices`),
  });
  const [currency, setCurrency] = useState('');
  const [countries, setCountries] = useState('');
  const [amount, setAmount] = useState('');
  const propose = useApiMutation(
    () =>
      api<PackagePriceDto>(`/api/studio/packages/${pkg.id}/prices`, {
        method: 'POST',
        body: {
          currency: currency.trim().toUpperCase(),
          countries: lines(countries).map((c) => c.toUpperCase()),
          amount: Number(amount),
        },
      }),
    [key],
    () => {
      toast.success(t('commerce.prices.proposed'));
      setAmount('');
    },
  );
  return (
    <section className="card card--flat" aria-label={pkg.title}>
      <h4>
        {pkg.title} <span className="small muted">· {pkg.courseTitle}</span>
      </h4>
      <p className="small">
        {t('commerce.prices.base', { price: fmtMoney(pkg.price, pkg.currency) })}
      </p>
      <QueryState query={prices}>
        {(list) =>
          list.length === 0 ? (
            <p className="small muted">{t('commerce.prices.none')}</p>
          ) : (
            <ul className="small">
              {list.map((p) => (
                <li key={p.id}>
                  {fmtMoney(p.amount, p.currency)} ·{' '}
                  {p.countries.length ? p.countries.join(', ') : t('commerce.prices.allCountries')}{' '}
                  · <CStatus status={p.status} /> · {fmtDate(p.createdAt)}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <form
        className="grid"
        onSubmit={(e) => {
          e.preventDefault();
          propose.mutate(undefined);
        }}
      >
        <Field label={t('commerce.prices.currency')} required>
          <Input
            value={currency}
            maxLength={3}
            onChange={(e) => setCurrency(e.target.value.toUpperCase())}
            required
          />
        </Field>
        <Field label={t('commerce.prices.countries')} hint={t('commerce.prices.countriesHint')}>
          <Input value={countries} onChange={(e) => setCountries(e.target.value)} />
        </Field>
        <Field label={t('commerce.prices.amount')} required>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Field>
        <div className="form-actions">
          <Button type="submit" variant="secondary" loading={propose.isPending}>
            {t('commerce.prices.propose')}
          </Button>
        </div>
      </form>
      {propose.isError ? <Notice tone="danger">{commerceError(propose.error, t)}</Notice> : null}
    </section>
  );
}

function PricesTab() {
  const { t } = useI18n();
  const mine = useMyPackages();
  const approved = mine.packages.filter((p) => p.approvalStatus === 'Approved');
  if (mine.pending) return <Spinner label={t('common.loading')} block />;
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.prices.explain')}</Notice>
      {approved.length === 0 ? (
        <p className="muted">{t('commerce.prices.noPackages')}</p>
      ) : (
        approved.map((p) => <PackagePrices key={p.id} pkg={p} />)
      )}
    </div>
  );
}

// ---------------- Offers ----------------
function OffersTab() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const mine = useMyPackages();
  const promos = useQuery({
    queryKey: ['studio', 'promotions'],
    queryFn: () => api<PromotionDto[]>('/api/studio/promotions'),
  });
  const toggle = useApiMutation(
    (p: { promo: string; pkg: string; join: boolean }) =>
      api<PromotionDto>(`/api/studio/promotions/${p.promo}/${p.join ? 'opt-in' : 'opt-out'}`, {
        method: 'POST',
        body: { packageId: p.pkg },
      }),
    [['studio', 'promotions']],
    (_r, v) => toast.success(v.join ? t('commerce.offers.joined') : t('commerce.offers.left')),
  );
  const approved = mine.packages.filter((p) => p.approvalStatus === 'Approved');
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.offers.explain')}</Notice>
      {toggle.isError ? <Notice tone="danger">{commerceError(toggle.error, t)}</Notice> : null}
      <QueryState query={promos}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('commerce.offers.none')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((pr) => (
                <li key={pr.id} className="card card--flat">
                  <div className="row row--between">
                    <strong>
                      {pr.name} · {t('commerce.offers.percent', { n: pr.percentOff })}
                    </strong>
                    <CStatus status={pr.status} />
                  </div>
                  <p className="small">
                    {t('commerce.offers.window', {
                      from: fmtDate(pr.startsAt),
                      to: fmtDate(pr.endsAt),
                    })}
                  </p>
                  {pr.status === 'Scheduled' ? (
                    <ul className="small" style={{ listStyle: 'none', padding: 0 }}>
                      {approved.map((p) => {
                        const joined = pr.packageIds.includes(p.id);
                        return (
                          <li key={p.id} className="row row--between">
                            <span>
                              {p.title} · {p.courseTitle}
                            </span>
                            <Button
                              size="sm"
                              variant={joined ? 'secondary' : 'primary'}
                              loading={
                                toggle.isPending &&
                                toggle.variables?.promo === pr.id &&
                                toggle.variables.pkg === p.id
                              }
                              onClick={() =>
                                toggle.mutate({ promo: pr.id, pkg: p.id, join: !joined })
                              }
                            >
                              {joined ? t('commerce.offers.optOut') : t('commerce.offers.optIn')}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

// ---------------- Referral links ----------------
function CourseReferrals({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const key = ['studio', 'referrals', course.id];
  const codes = useQuery({
    queryKey: key,
    queryFn: () => api<ReferralCodeDto[]>(`/api/studio/courses/${course.id}/referral-codes`),
  });
  const [code, setCode] = useState('');
  const create = useApiMutation(
    () =>
      api<ReferralCodeDto>(`/api/studio/courses/${course.id}/referral-codes`, {
        method: 'POST',
        body: code.trim() ? { code: code.trim() } : {},
      }),
    [key],
    () => setCode(''),
  );
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('commerce.referrals.copied'));
    } catch {
      toast.error(t('commerce.referrals.copyFailed'));
    }
  };
  return (
    <section className="card card--flat" aria-label={course.title}>
      <h4>{course.title}</h4>
      <QueryState query={codes}>
        {(list) =>
          list.length === 0 ? (
            <p className="small muted">{t('commerce.referrals.none')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((r) => {
                const link = referralLink(origin, course.slug, r.code);
                return (
                  <li key={r.id} className="row">
                    <Input
                      readOnly
                      value={link}
                      aria-label={t('commerce.referrals.linkFor', { code: r.code })}
                      style={{ flex: 1, minInlineSize: 200 }}
                    />
                    <Button size="sm" variant="secondary" onClick={() => void copy(link)}>
                      {t('commerce.referrals.copy')}
                    </Button>
                    {!r.isActive ? <CStatus status="Inactive" /> : null}
                  </li>
                );
              })}
            </ul>
          )
        }
      </QueryState>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate(undefined);
        }}
      >
        <Field label={t('commerce.referrals.code')} hint={t('commerce.referrals.codeHint')}>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </Field>
        <Button type="submit" variant="secondary" loading={create.isPending}>
          {t('commerce.referrals.create')}
        </Button>
      </form>
      {create.isError ? <Notice tone="danger">{commerceError(create.error, t)}</Notice> : null}
    </section>
  );
}

function ReferralsTab() {
  const { t } = useI18n();
  const courses = useStudioCourses();
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.referrals.explain')}</Notice>
      <QueryState query={courses}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('commerce.referrals.noCourses')}</p>
          ) : (
            list.map((c) => <CourseReferrals key={c.id} course={c} />)
          )
        }
      </QueryState>
    </div>
  );
}

export function StudioCommercePage() {
  const { t } = useI18n();
  const [tab, setTab] = useState('coupons');
  usePageMeta(t('commerce.studio.title'), undefined, { noindex: true });
  return (
    <div className="page">
      <PageHeader title={t('commerce.studio.title')} subtitle={t('commerce.studio.subtitle')} />
      <Tabs
        label={t('commerce.studio.title')}
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'coupons', label: t('commerce.coupons.title'), content: <CouponsTab /> },
          { id: 'prices', label: t('commerce.prices.title'), content: <PricesTab /> },
          { id: 'offers', label: t('commerce.offers.title'), content: <OffersTab /> },
          { id: 'referrals', label: t('commerce.referrals.title'), content: <ReferralsTab /> },
        ]}
      />
    </div>
  );
}

// ---------------- Payouts ----------------
function PayoutProfileForm({ profile }: { profile: PayoutProfileDto | null }) {
  const { t } = useI18n();
  const toast = useToast();
  const [form, setForm] = useState<PayoutProfileInput>({
    legalName: profile?.legalName ?? '',
    country: profile?.country ?? '',
    method: (profile?.method as 'Iban' | 'Email' | undefined) ?? 'Iban',
    destination: '',
    taxFormSubmitted: false,
  });
  const save = useApiMutation(
    (body: PayoutProfileInput) =>
      api<PayoutProfileDto>('/api/studio/payout-profile', { method: 'PUT', body }),
    [['studio', 'payout-profile']],
    () => {
      toast.success(t('commerce.payouts.profileSaved'));
      setForm((f) => ({ ...f, destination: '' }));
    },
  );
  return (
    <form
      className="card"
      aria-labelledby="pp-h"
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate({
          ...form,
          legalName: form.legalName.trim(),
          country: form.country.trim().toUpperCase(),
          destination: form.destination.replace(/\s+/g, form.method === 'Iban' ? '' : ' ').trim(),
        });
      }}
    >
      <h3 id="pp-h">{t('commerce.payouts.profile')}</h3>
      {profile ? (
        <dl className="facts">
          <div>
            <dt>{t('commerce.payouts.destination')}</dt>
            <dd className="mono" data-testid="masked-destination">
              {profile.destinationMasked}
            </dd>
          </div>
          <div>
            <dt>{t('commerce.payouts.taxForm')}</dt>
            <dd>
              <CStatus status={profile.taxFormStatus} />
            </dd>
          </div>
        </dl>
      ) : (
        <p className="muted">{t('commerce.payouts.noProfile')}</p>
      )}
      <p className="small muted">{t('commerce.payouts.maskedNote')}</p>
      <div className="grid-2">
        <Field label={t('commerce.payouts.legalName')} required>
          <Input
            value={form.legalName}
            autoComplete="name"
            onChange={(e) => setForm({ ...form, legalName: e.target.value })}
            required
          />
        </Field>
        <Field
          label={t('commerce.payouts.country')}
          required
          hint={t('commerce.checkout.countryHint')}
        >
          <Input
            value={form.country}
            maxLength={2}
            onChange={(e) => setForm({ ...form, country: e.target.value.toUpperCase() })}
            required
          />
        </Field>
        <Field label={t('commerce.payouts.method')}>
          <Select
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value as 'Iban' | 'Email' })}
            options={[
              { value: 'Iban', label: t('commerce.payouts.iban') },
              { value: 'Email', label: t('commerce.payouts.email') },
            ]}
          />
        </Field>
        <Field
          label={form.method === 'Iban' ? t('commerce.payouts.iban') : t('commerce.payouts.email')}
          required
          hint={t('commerce.payouts.destinationHint')}
        >
          <Input
            value={form.destination}
            autoComplete="off"
            type={form.method === 'Email' ? 'email' : 'text'}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            required
          />
        </Field>
      </div>
      <Checkbox
        label={t('commerce.payouts.taxSubmitted')}
        checked={!!form.taxFormSubmitted}
        onChange={(e) => setForm({ ...form, taxFormSubmitted: e.target.checked })}
      />
      {save.isError ? <Notice tone="danger">{commerceError(save.error, t)}</Notice> : null}
      <div className="form-actions">
        <Button type="submit" loading={save.isPending}>
          {t('commerce.payouts.saveProfile')}
        </Button>
      </div>
    </form>
  );
}

function BalancesAndRequests() {
  const { t, fmtMoney, fmtDate } = useI18n();
  const toast = useToast();
  const balances = useQuery({
    queryKey: ['studio', 'balances'],
    queryFn: () => api<PayoutBalanceDto[]>('/api/studio/balances'),
  });
  const requests = useQuery({
    queryKey: ['studio', 'payout-requests'],
    queryFn: () => api<PayoutRequestDto[]>('/api/studio/payout-requests'),
  });
  const request = useApiMutation(
    (currency: string) =>
      api<PayoutRequestDto>('/api/studio/payout-requests', { method: 'POST', body: { currency } }),
    [
      ['studio', 'balances'],
      ['studio', 'payout-requests'],
    ],
    (r) =>
      toast.success(t('commerce.payouts.requested', { amount: fmtMoney(r.amount, r.currency) })),
  );
  return (
    <>
      <section className="card" aria-labelledby="bal-h">
        <h3 id="bal-h">{t('commerce.payouts.balances')}</h3>
        <p className="small muted">{t('commerce.payouts.balancesExplain')}</p>
        {request.isError ? <Notice tone="danger">{commerceError(request.error, t)}</Notice> : null}
        <QueryState query={balances}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.payouts.noBalance')}</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('commerce.prices.currency')}</th>
                      <th scope="col">{t('commerce.payouts.cleared')}</th>
                      <th scope="col">{t('commerce.payouts.pending')}</th>
                      <th scope="col">{t('commerce.payouts.minimum')}</th>
                      <th scope="col">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((b) => (
                      <tr key={b.currency}>
                        <td>{b.currency}</td>
                        <td>{fmtMoney(b.cleared, b.currency)}</td>
                        <td>{fmtMoney(b.pending, b.currency)}</td>
                        <td>{fmtMoney(b.minimumPayout, b.currency)}</td>
                        <td>
                          <Button
                            size="sm"
                            disabled={b.cleared < b.minimumPayout}
                            loading={request.isPending && request.variables === b.currency}
                            onClick={() => request.mutate(b.currency)}
                          >
                            {t('commerce.payouts.request')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </QueryState>
      </section>
      <section className="card" aria-labelledby="req-h">
        <h3 id="req-h">{t('commerce.payouts.requests')}</h3>
        <QueryState query={requests}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.payouts.noRequests')}</p>
            ) : (
              <PayoutRequestTable list={list} fmtDate={fmtDate} />
            )
          }
        </QueryState>
      </section>
    </>
  );
}

export function PayoutRequestTable({
  list,
  fmtDate,
  select,
  actions,
}: {
  list: PayoutRequestDto[];
  fmtDate: (iso: string | null | undefined) => string;
  select?: { selected: Set<string>; toggle: (id: string) => void };
  actions?: (r: PayoutRequestDto) => ReactNode;
}) {
  const { t, fmtMoney } = useI18n();
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {select ? <th scope="col">{t('commerce.common.select')}</th> : null}
            <th scope="col">{t('dashboard.date')}</th>
            <th scope="col">{t('commerce.payouts.amount')}</th>
            <th scope="col">{t('commerce.payouts.entries')}</th>
            <th scope="col">{t('dashboard.status')}</th>
            {actions ? <th scope="col">{t('common.actions')}</th> : null}
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id}>
              {select ? (
                <td>
                  <input
                    type="checkbox"
                    aria-label={t('commerce.payouts.selectRequest', {
                      amount: fmtMoney(r.amount, r.currency),
                    })}
                    checked={select.selected.has(r.id)}
                    disabled={r.status !== 'Requested'}
                    onChange={() => select.toggle(r.id)}
                  />
                </td>
              ) : null}
              <td>{fmtDate(r.createdAt)}</td>
              <td>{fmtMoney(r.amount, r.currency)}</td>
              <td>{r.entries}</td>
              <td>
                <CStatus status={r.status} />
                {r.notes ? <div className="small muted">{r.notes}</div> : null}
              </td>
              {actions ? <td>{actions(r)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatementDownload({ path }: { path: string }) {
  const { t } = useI18n();
  const now = new Date();
  const prev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const [year, setYear] = useState(String(prev.getUTCFullYear()));
  const [month, setMonth] = useState(String(prev.getUTCMonth() + 1));
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const get = async (format: 'csv' | 'pdf') => {
    setBusy(format);
    setError(null);
    try {
      await downloadFile(
        `${path}${qs({ year, month, format })}`,
        `statement-${year}-${month.padStart(2, '0')}.${format}`,
      );
    } catch (e) {
      setError(commerceError(e, t));
    } finally {
      setBusy(null);
    }
  };
  return (
    <div className="stack">
      <div className="row">
        <Field label={t('commerce.payouts.year')}>
          <Input
            type="number"
            min="2020"
            max="2100"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Field>
        <Field label={t('commerce.payouts.month')}>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            options={Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1),
              label: String(i + 1),
            }))}
          />
        </Field>
      </div>
      <div className="row">
        <Button variant="secondary" loading={busy === 'csv'} onClick={() => void get('csv')}>
          {t('commerce.payouts.downloadCsv')}
        </Button>
        <Button variant="secondary" loading={busy === 'pdf'} onClick={() => void get('pdf')}>
          {t('commerce.payouts.downloadPdf')}
        </Button>
      </div>
      {error ? <Notice tone="danger">{error}</Notice> : null}
    </div>
  );
}

export function StudioPayoutsPage() {
  const { t } = useI18n();
  usePageMeta(t('commerce.payouts.title'), undefined, { noindex: true });
  const profile = useQuery({
    queryKey: ['studio', 'payout-profile'],
    queryFn: async () =>
      (await api<PayoutProfileDto | undefined>('/api/studio/payout-profile')) ?? null,
  });
  return (
    <div className="page stack">
      <PageHeader title={t('commerce.payouts.title')} subtitle={t('commerce.payouts.subtitle')} />
      <QueryState query={profile}>
        {(p) => <PayoutProfileForm key={p?.updatedAt ?? 'none'} profile={p} />}
      </QueryState>
      <BalancesAndRequests />
      <section className="card" aria-labelledby="st-h">
        <h3 id="st-h">{t('commerce.payouts.statements')}</h3>
        <StatementDownload path="/api/studio/statements" />
      </section>
    </div>
  );
}
