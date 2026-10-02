import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import type {
  BundleDto,
  CouponDto,
  PackagePriceDto,
  PlanDto,
  PromotionDto,
  StudioPackageDto,
} from '../../api/commerce';
import { commerceKeys } from '../../api/commerce';
import { useApiMutation, useCategories } from '../../api/hooks';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState, QueryStatus } from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { commerceError, CStatus } from './shared';
import { CouponTable, toIso } from './StudioCommerce';

function useApprovedPackages() {
  return useQuery({
    queryKey: ['admin', 'packages', 'Approved'],
    queryFn: () => api<StudioPackageDto[]>('/api/admin/packages?status=Approved'),
  });
}

// ---------------- Plans ----------------
function PlanEditor({ plan }: { plan: PlanDto }) {
  const { t, fmtMoney } = useI18n();
  const toast = useToast();
  const [name, setName] = useState(plan.name);
  const [ai, setAi] = useState(String(plan.aiAllowance));
  const [services, setServices] = useState(plan.includedServices);
  const save = useApiMutation(
    (body: {
      name?: string;
      aiAllowance?: number;
      includedServices?: string;
      isActive?: boolean;
    }) => api<PlanDto>(`/api/admin/plans/${plan.id}`, { method: 'PUT', body }),
    [['admin', 'plans'], commerceKeys.plans],
    () => toast.success(t('commerce.common.saved')),
  );
  return (
    <li className="card card--flat">
      <div className="row row--between">
        <strong>
          {plan.code} · {fmtMoney(plan.price, plan.currency)} / {plan.interval} · {plan.scope}
        </strong>
        <CStatus status={plan.isActive ? 'Active' : 'Inactive'} />
      </div>
      <p className="small muted">{t('commerce.staff.planImmutable')}</p>
      <div className="grid-2">
        <Field label={t('commerce.staff.planName')}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label={t('commerce.staff.aiAllowance')}>
          <Input type="number" min="0" value={ai} onChange={(e) => setAi(e.target.value)} />
        </Field>
      </div>
      <Field label={t('commerce.staff.includedServices')} hint={t('commerce.staff.servicesHint')}>
        <Textarea value={services} onChange={(e) => setServices(e.target.value)} />
      </Field>
      {save.isError ? <Notice tone="danger">{commerceError(save.error, t)}</Notice> : null}
      <div className="form-actions">
        <Button
          size="sm"
          loading={save.isPending}
          onClick={() =>
            save.mutate({ name: name.trim(), aiAllowance: Number(ai), includedServices: services })
          }
        >
          {t('commerce.common.save')}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => save.mutate({ isActive: !plan.isActive })}
        >
          {plan.isActive ? t('commerce.common.deactivate') : t('commerce.common.activate')}
        </Button>
      </div>
    </li>
  );
}

function PlansTab() {
  const { t, lang } = useI18n();
  const toast = useToast();
  const cats = useCategories();
  const plans = useQuery({
    queryKey: ['admin', 'plans'],
    queryFn: () => api<PlanDto[]>('/api/admin/plans'),
  });
  const empty = {
    code: '',
    name: '',
    scope: 'AllCourses',
    categoryId: '',
    price: '',
    currency: 'USD',
    interval: 'month',
    aiAllowance: '0',
    includedServices: '',
  };
  const [f, setF] = useState(empty);
  const create = useApiMutation(
    () =>
      api<PlanDto>('/api/admin/plans', {
        method: 'POST',
        body: {
          code: f.code.trim(),
          name: f.name.trim(),
          scope: f.scope,
          categoryId: f.scope === 'Category' && f.categoryId ? Number(f.categoryId) : null,
          price: Number(f.price),
          currency: f.currency.trim().toUpperCase(),
          interval: f.interval,
          aiAllowance: Number(f.aiAllowance),
          includedServices: f.includedServices,
        },
      }),
    [['admin', 'plans'], commerceKeys.plans],
    () => {
      toast.success(t('commerce.staff.planCreated'));
      setF(empty);
    },
  );
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.staff.planRules')}</Notice>
      <form
        className="card"
        aria-labelledby="plan-new"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate(undefined);
        }}
      >
        <h3 id="plan-new">{t('commerce.staff.newPlan')}</h3>
        <div className="grid-2">
          <Field label={t('commerce.staff.planCode')} required>
            <Input value={f.code} onChange={(e) => setF({ ...f, code: e.target.value })} required />
          </Field>
          <Field label={t('commerce.staff.planName')} required>
            <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
          </Field>
          <Field label={t('commerce.coupons.scope')}>
            <Select
              value={f.scope}
              onChange={(e) => setF({ ...f, scope: e.target.value })}
              options={[
                { value: 'AllCourses', label: t('commerce.plans.scopeAll') },
                { value: 'Category', label: t('commerce.plans.scopeCategory') },
              ]}
            />
          </Field>
          {f.scope === 'Category' ? <QueryStatus query={cats} /> : null}
          {f.scope === 'Category' ? (
            <Field label={t('commerce.staff.category')} required>
              <Select
                value={f.categoryId}
                onChange={(e) => setF({ ...f, categoryId: e.target.value })}
                placeholder={t('commerce.common.choose')}
                options={(cats.data ?? []).map((c) => ({
                  value: String(c.id),
                  label: lang === 'ar' ? c.nameAr : c.nameEn,
                }))}
                required
              />
            </Field>
          ) : null}
          <Field label={t('commerce.staff.price')} required>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={f.price}
              onChange={(e) => setF({ ...f, price: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.prices.currency')} required>
            <Input
              value={f.currency}
              maxLength={3}
              onChange={(e) => setF({ ...f, currency: e.target.value.toUpperCase() })}
              required
            />
          </Field>
          <Field label={t('commerce.staff.interval')}>
            <Select
              value={f.interval}
              onChange={(e) => setF({ ...f, interval: e.target.value })}
              options={[
                { value: 'month', label: t('commerce.staff.monthly') },
                { value: 'year', label: t('commerce.staff.yearly') },
              ]}
            />
          </Field>
          <Field label={t('commerce.staff.aiAllowance')} required hint={t('commerce.staff.aiHint')}>
            <Input
              type="number"
              min="0"
              value={f.aiAllowance}
              onChange={(e) => setF({ ...f, aiAllowance: e.target.value })}
              required
            />
          </Field>
        </div>
        <Field
          label={t('commerce.staff.includedServices')}
          required
          hint={t('commerce.staff.servicesHint')}
        >
          <Textarea
            value={f.includedServices}
            onChange={(e) => setF({ ...f, includedServices: e.target.value })}
            required
          />
        </Field>
        {create.isError ? <Notice tone="danger">{commerceError(create.error, t)}</Notice> : null}
        <div className="form-actions">
          <Button type="submit" loading={create.isPending}>
            {t('commerce.staff.createPlan')}
          </Button>
        </div>
      </form>
      <QueryState query={plans}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('commerce.plans.none')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((p) => (
                <PlanEditor
                  key={`${p.id}-${p.name}-${p.aiAllowance}-${p.includedServices}`}
                  plan={p}
                />
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

// ---------------- Bundles ----------------
function BundlesTab() {
  const { t, fmtMoney } = useI18n();
  const toast = useToast();
  const packages = useApprovedPackages();
  const bundles = useQuery({
    queryKey: [...commerceKeys.bundles, 'admin', 'all'],
    queryFn: () => api<BundleDto[]>('/api/admin/bundles?includeInactive=true'),
  });
  const cats = useCategories();
  const [f, setF] = useState({
    title: '',
    description: '',
    kind: 'Category',
    categoryId: '',
    price: '',
    currency: 'USD',
  });
  const [ids, setIds] = useState<Set<string>>(new Set());
  const create = useApiMutation(
    () =>
      api<BundleDto>('/api/admin/bundles', {
        method: 'POST',
        body: {
          title: f.title.trim(),
          description: f.description.trim(),
          kind: f.kind,
          categoryId: f.categoryId ? Number(f.categoryId) : null,
          price: Number(f.price),
          currency: f.currency.trim().toUpperCase(),
          packageIds: [...ids],
        },
      }),
    [commerceKeys.bundles],
    () => {
      toast.success(t('commerce.staff.bundleCreated'));
      setIds(new Set());
      setF({ ...f, title: '', description: '', price: '' });
    },
  );
  const status = useApiMutation(
    (p: { id: string; active: boolean }) =>
      api<BundleDto>(`/api/admin/bundles/${p.id}/status`, {
        method: 'POST',
        body: { active: p.active },
      }),
    [commerceKeys.bundles],
  );
  const selectedSum = (packages.data ?? [])
    .filter((p) => ids.has(p.id))
    .reduce((s, p) => s + p.price, 0);
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.staff.bundleRules')}</Notice>
      <form
        className="card"
        aria-labelledby="bundle-new"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate(undefined);
        }}
      >
        <h3 id="bundle-new">{t('commerce.staff.newBundle')}</h3>
        <div className="grid-2">
          <Field label={t('commerce.staff.bundleTitle')} required>
            <Input
              value={f.title}
              onChange={(e) => setF({ ...f, title: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.staff.bundleKind')}>
            <Select
              value={f.kind}
              onChange={(e) => setF({ ...f, kind: e.target.value })}
              options={[
                { value: 'Category', label: t('commerce.staff.kindCategory') },
                { value: 'Certification', label: t('commerce.staff.kindCertification') },
              ]}
            />
          </Field>
          <QueryStatus query={cats} />
          <Field label={t('commerce.staff.category')} hint={t('commerce.common.optional')}>
            <Select
              value={f.categoryId}
              onChange={(e) => setF({ ...f, categoryId: e.target.value })}
              placeholder={t('commerce.common.none')}
              options={(cats.data ?? []).map((c) => ({ value: String(c.id), label: c.nameEn }))}
            />
          </Field>
          <Field label={t('commerce.staff.price')} required>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={f.price}
              onChange={(e) => setF({ ...f, price: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.prices.currency')} required>
            <Input
              value={f.currency}
              maxLength={3}
              onChange={(e) => setF({ ...f, currency: e.target.value.toUpperCase() })}
              required
            />
          </Field>
        </div>
        <Field label={t('commerce.staff.bundleDescription')} required>
          <Textarea
            value={f.description}
            onChange={(e) => setF({ ...f, description: e.target.value })}
            required
          />
        </Field>
        <fieldset className="card card--flat">
          <legend>{t('commerce.staff.bundlePackages')}</legend>
          <QueryState query={packages}>
            {(list) =>
              list.length === 0 ? (
                <p className="muted">{t('commerce.staff.noApprovedPackages')}</p>
              ) : (
                <div className="stack">
                  {list.map((p) => (
                    <Checkbox
                      key={p.id}
                      label={`${p.title} · ${p.courseTitle ?? ''} (${fmtMoney(p.price, p.currency)})`}
                      checked={ids.has(p.id)}
                      onChange={() =>
                        setIds((s) => {
                          const n = new Set(s);
                          if (n.has(p.id)) n.delete(p.id);
                          else n.add(p.id);
                          return n;
                        })
                      }
                    />
                  ))}
                </div>
              )
            }
          </QueryState>
          <p className="small muted">
            {t('commerce.staff.selectedSum', { n: ids.size, sum: selectedSum.toFixed(2) })}
          </p>
        </fieldset>
        {create.isError ? <Notice tone="danger">{commerceError(create.error, t)}</Notice> : null}
        <div className="form-actions">
          <Button type="submit" loading={create.isPending} disabled={ids.size < 2}>
            {t('commerce.staff.createBundle')}
          </Button>
        </div>
      </form>
      <section className="card" aria-labelledby="bundle-active">
        <h3 id="bundle-active">{t('commerce.staff.activeBundles')}</h3>
        <p className="small muted">{t('finalb.bundles.allNote')}</p>
        {status.isError ? <Notice tone="danger">{commerceError(status.error, t)}</Notice> : null}
        <QueryState query={bundles}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.bundles.none')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((b) => (
                  <li key={b.id} className="row row--between">
                    <span>
                      {b.title} · {fmtMoney(b.price, b.currency)} <CStatus status={b.status} />
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      loading={status.isPending && status.variables?.id === b.id}
                      onClick={() => status.mutate({ id: b.id, active: b.status !== 'Active' })}
                    >
                      {b.status === 'Active'
                        ? t('commerce.common.deactivate')
                        : t('finalb.bundles.activate')}
                    </Button>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
    </div>
  );
}

// ---------------- Offers ----------------
function OffersTab() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const promos = useQuery({
    queryKey: ['admin', 'promotions'],
    queryFn: () => api<PromotionDto[]>('/api/admin/promotions'),
  });
  const [f, setF] = useState({ name: '', percent: '20', startsAt: '', endsAt: '' });
  const create = useApiMutation(
    () =>
      api<PromotionDto>('/api/admin/promotions', {
        method: 'POST',
        body: {
          name: f.name.trim(),
          percentOff: Number(f.percent),
          startsAt: toIso(f.startsAt),
          endsAt: toIso(f.endsAt),
        },
      }),
    [['admin', 'promotions']],
    () => {
      toast.success(t('commerce.staff.offerCreated'));
      setF({ name: '', percent: '20', startsAt: '', endsAt: '' });
    },
  );
  const cancel = useApiMutation(
    (id: string) => api(`/api/admin/promotions/${id}/cancel`, { method: 'POST' }),
    [['admin', 'promotions']],
  );
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.staff.offerRules')}</Notice>
      <form
        className="card"
        aria-labelledby="offer-new"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate(undefined);
        }}
      >
        <h3 id="offer-new">{t('commerce.staff.newOffer')}</h3>
        <div className="grid-2">
          <Field label={t('commerce.staff.offerName')} required>
            <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
          </Field>
          <Field label={t('commerce.coupons.percentOff')} required>
            <Input
              type="number"
              min="5"
              max="90"
              step="1"
              value={f.percent}
              onChange={(e) => setF({ ...f, percent: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.coupons.startsAt')} required>
            <Input
              type="datetime-local"
              value={f.startsAt}
              onChange={(e) => setF({ ...f, startsAt: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.staff.endsAt')} required>
            <Input
              type="datetime-local"
              value={f.endsAt}
              onChange={(e) => setF({ ...f, endsAt: e.target.value })}
              required
            />
          </Field>
        </div>
        {create.isError ? <Notice tone="danger">{commerceError(create.error, t)}</Notice> : null}
        <div className="form-actions">
          <Button type="submit" loading={create.isPending}>
            {t('commerce.staff.createOffer')}
          </Button>
        </div>
      </form>
      {cancel.isError ? <Notice tone="danger">{commerceError(cancel.error, t)}</Notice> : null}
      <QueryState query={promos}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('commerce.offers.none')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((p) => (
                <li key={p.id} className="card card--flat">
                  <div className="row row--between">
                    <strong>
                      {p.name} · {t('commerce.offers.percent', { n: p.percentOff })}
                    </strong>
                    <CStatus status={p.status} />
                  </div>
                  <p className="small">
                    {t('commerce.offers.window', {
                      from: fmtDate(p.startsAt),
                      to: fmtDate(p.endsAt),
                    })}{' '}
                    · {t('commerce.staff.optedIn', { n: p.packageIds.length })}
                  </p>
                  {p.status === 'Scheduled' ? (
                    <Button
                      size="sm"
                      variant="danger"
                      loading={cancel.isPending && cancel.variables === p.id}
                      onClick={() => cancel.mutate(p.id)}
                    >
                      {t('commerce.common.cancel')}
                    </Button>
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

// ---------------- Coupons & scholarships ----------------
function CouponsTab() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const coupons = useQuery({
    queryKey: ['admin', 'coupons'],
    queryFn: () => api<CouponDto[]>('/api/admin/coupons'),
  });
  const decide = useApiMutation(
    (p: { id: string; decision: 'Approve' | 'Reject' | 'Disable' }) =>
      api<CouponDto>(`/api/admin/coupons/${p.id}/decision`, {
        method: 'POST',
        body: { decision: p.decision, notes: null },
      }),
    [['admin', 'coupons']],
    (c) => toast.success(t('commerce.staff.couponDecided', { code: c.code })),
  );
  const [f, setF] = useState({
    code: '',
    kind: 'Scholarship',
    percentOff: '10',
    amountOff: '',
    currency: '',
    scope: 'All',
    scopeId: '',
    emails: '',
    domains: '',
    org: '',
    maxRedemptions: '',
    expiresAt: '',
  });
  const list = (v: string) =>
    v
      .split(/[\n,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  const create = useApiMutation(
    () =>
      api<CouponDto>('/api/admin/coupons', {
        method: 'POST',
        body: {
          code: f.code.trim(),
          kind: f.kind,
          percentOff: f.kind === 'Percent' ? Number(f.percentOff) : null,
          amountOff: f.kind === 'Fixed' ? Number(f.amountOff) : null,
          currency: f.currency.trim().toUpperCase() || null,
          scope: f.scope,
          scopeId: f.scope === 'All' ? null : f.scopeId.trim() || null,
          maxRedemptions: f.maxRedemptions ? Number(f.maxRedemptions) : null,
          maxPerUser: 1,
          startsAt: null,
          expiresAt: toIso(f.expiresAt),
          minAmount: null,
          allowedEmails: list(f.emails),
          allowedDomains: list(f.domains),
          allowedOrganizationId: f.org.trim() || null,
        },
      }),
    [['admin', 'coupons']],
    (c) => {
      toast.success(
        c.status === 'PendingApproval'
          ? t('commerce.coupons.createdPending', { code: c.code })
          : t('commerce.coupons.created', { code: c.code }),
      );
      setF({ ...f, code: '' });
    },
  );
  return (
    <div className="stack">
      <Notice tone="warning" title={t('commerce.staff.secondPersonTitle')}>
        {t('commerce.staff.secondPerson')}
      </Notice>
      <form
        className="card"
        aria-labelledby="scoupon-new"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate(undefined);
        }}
      >
        <h3 id="scoupon-new">{t('commerce.coupons.new')}</h3>
        <div className="grid-2">
          <Field label={t('commerce.coupons.code')} required>
            <Input value={f.code} onChange={(e) => setF({ ...f, code: e.target.value })} required />
          </Field>
          <Field label={t('commerce.coupons.kind')}>
            <Select
              value={f.kind}
              onChange={(e) => setF({ ...f, kind: e.target.value })}
              options={[
                { value: 'Scholarship', label: t('commerce.coupons.kindScholarship') },
                { value: 'Percent', label: t('commerce.coupons.kindPercent') },
                { value: 'Fixed', label: t('commerce.coupons.kindFixed') },
              ]}
            />
          </Field>
          {f.kind === 'Percent' ? (
            <Field label={t('commerce.coupons.percentOff')} required>
              <Input
                type="number"
                min="0.01"
                max="99.99"
                step="0.01"
                value={f.percentOff}
                onChange={(e) => setF({ ...f, percentOff: e.target.value })}
                required
              />
            </Field>
          ) : null}
          {f.kind === 'Fixed' ? (
            <>
              <Field label={t('commerce.coupons.amountOff')} required>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={f.amountOff}
                  onChange={(e) => setF({ ...f, amountOff: e.target.value })}
                  required
                />
              </Field>
              <Field label={t('commerce.coupons.currency')} required>
                <Input
                  value={f.currency}
                  maxLength={3}
                  onChange={(e) => setF({ ...f, currency: e.target.value.toUpperCase() })}
                  required
                />
              </Field>
            </>
          ) : null}
          <Field label={t('commerce.coupons.scope')}>
            <Select
              value={f.scope}
              onChange={(e) => setF({ ...f, scope: e.target.value })}
              options={['All', 'Course', 'Package', 'Bundle'].map((s) => ({ value: s, label: s }))}
            />
          </Field>
          {f.scope !== 'All' ? (
            <Field label={t('commerce.staff.scopeId')} required>
              <Input
                value={f.scopeId}
                className="mono"
                onChange={(e) => setF({ ...f, scopeId: e.target.value })}
                required
              />
            </Field>
          ) : null}
          <Field label={t('commerce.coupons.maxRedemptions')} hint={t('commerce.common.optional')}>
            <Input
              type="number"
              min="1"
              value={f.maxRedemptions}
              onChange={(e) => setF({ ...f, maxRedemptions: e.target.value })}
            />
          </Field>
          <Field label={t('commerce.coupons.expiresAt')} hint={t('commerce.common.optional')}>
            <Input
              type="datetime-local"
              value={f.expiresAt}
              onChange={(e) => setF({ ...f, expiresAt: e.target.value })}
            />
          </Field>
        </div>
        {f.kind === 'Scholarship' ? (
          <div className="grid-2">
            <Field
              label={t('commerce.coupons.allowedEmails')}
              hint={t('commerce.coupons.listHint')}
            >
              <Textarea value={f.emails} onChange={(e) => setF({ ...f, emails: e.target.value })} />
            </Field>
            <Field
              label={t('commerce.coupons.allowedDomains')}
              hint={t('commerce.coupons.listHint')}
            >
              <Textarea
                value={f.domains}
                onChange={(e) => setF({ ...f, domains: e.target.value })}
              />
            </Field>
            <Field label={t('commerce.staff.orgId')} hint={t('commerce.common.optional')}>
              <Input
                value={f.org}
                className="mono"
                onChange={(e) => setF({ ...f, org: e.target.value })}
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
      {decide.isError ? <Notice tone="danger">{commerceError(decide.error, t)}</Notice> : null}
      <QueryState query={coupons}>
        {(items) =>
          items.length === 0 ? (
            <p className="muted">{t('commerce.coupons.none')}</p>
          ) : (
            <CouponTable
              list={items}
              fmtDate={fmtDate}
              actions={(c) => (
                <div className="row">
                  {c.status === 'PendingApproval' ? (
                    c.createdBy === user?.id ? (
                      <span className="small muted">{t('commerce.staff.ownCoupon')}</span>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          onClick={() => decide.mutate({ id: c.id, decision: 'Approve' })}
                          aria-label={t('commerce.staff.approveCode', { code: c.code })}
                        >
                          {t('commerce.common.approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => decide.mutate({ id: c.id, decision: 'Reject' })}
                        >
                          {t('commerce.common.reject')}
                        </Button>
                      </>
                    )
                  ) : null}
                  {c.status === 'Active' ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => decide.mutate({ id: c.id, decision: 'Disable' })}
                    >
                      {t('commerce.coupons.disable')}
                    </Button>
                  ) : null}
                  {c.kind === 'Scholarship' &&
                  (c.allowedEmails.length > 0 || c.allowedDomains.length > 0) ? (
                    <span className="small muted">
                      {[...c.allowedEmails, ...c.allowedDomains.map((d) => `@${d}`)]
                        .slice(0, 3)
                        .join(', ')
                        .toLowerCase()}
                    </span>
                  ) : null}
                </div>
              )}
            />
          )
        }
      </QueryState>
    </div>
  );
}

// ---------------- Regional price approvals ----------------
function PricesTab() {
  const { t, fmtMoney, fmtDate } = useI18n();
  const prices = useQuery({
    queryKey: ['admin', 'package-prices'],
    queryFn: () => api<PackagePriceDto[]>('/api/admin/package-prices'),
  });
  const packages = useApprovedPackages();
  const byId = new Map((packages.data ?? []).map((p) => [p.id, p]));
  const decide = useApiMutation(
    (p: { id: string; decision: 'Approve' | 'Reject' | 'Retire' }) =>
      api(`/api/admin/package-prices/${p.id}/decision`, {
        method: 'POST',
        body: { decision: p.decision, notes: null },
      }),
    [['admin', 'package-prices']],
  );
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.staff.pricesExplain')}</Notice>
      {decide.isError ? <Notice tone="danger">{commerceError(decide.error, t)}</Notice> : null}
      <QueryState query={prices}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('commerce.staff.noProposedPrices')}</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('commerce.staff.package')}</th>
                    <th scope="col">{t('commerce.prices.amount')}</th>
                    <th scope="col">{t('commerce.prices.countries')}</th>
                    <th scope="col">{t('dashboard.date')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => {
                    const pkg = byId.get(p.packageId);
                    return (
                      <tr key={p.id}>
                        <td>
                          {pkg ? (
                            <>
                              {pkg.title}
                              <div className="small muted">
                                {pkg.courseTitle} ·{' '}
                                {t('commerce.prices.base', {
                                  price: fmtMoney(pkg.price, pkg.currency),
                                })}
                              </div>
                            </>
                          ) : (
                            <span className="mono small">{p.packageId}</span>
                          )}
                        </td>
                        <td>{fmtMoney(p.amount, p.currency)}</td>
                        <td>
                          {p.countries.length
                            ? p.countries.join(', ')
                            : t('commerce.prices.allCountries')}
                        </td>
                        <td>{fmtDate(p.createdAt)}</td>
                        <td>
                          <CStatus status={p.status} />
                        </td>
                        <td>
                          <div className="row">
                            {p.status === 'Proposed' ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => decide.mutate({ id: p.id, decision: 'Approve' })}
                                >
                                  {t('commerce.common.approve')}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => decide.mutate({ id: p.id, decision: 'Reject' })}
                                >
                                  {t('commerce.common.reject')}
                                </Button>
                              </>
                            ) : p.status === 'Approved' ? (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => decide.mutate({ id: p.id, decision: 'Retire' })}
                              >
                                {t('commerce.staff.retire')}
                              </Button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
    </div>
  );
}

export function StaffCommercePage() {
  const { t } = useI18n();
  const [tab, setTab] = useState('plans');
  usePageMeta(t('commerce.staff.title'), undefined, { noindex: true });
  return (
    <div className="page">
      <PageHeader title={t('commerce.staff.title')} subtitle={t('commerce.staff.subtitle')} />
      <Tabs
        label={t('commerce.staff.title')}
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'plans', label: t('commerce.plans.title'), content: <PlansTab /> },
          { id: 'bundles', label: t('commerce.bundles.title'), content: <BundlesTab /> },
          { id: 'offers', label: t('commerce.offers.title'), content: <OffersTab /> },
          { id: 'coupons', label: t('commerce.staff.couponsTab'), content: <CouponsTab /> },
          { id: 'prices', label: t('commerce.prices.title'), content: <PricesTab /> },
        ]}
      />
    </div>
  );
}
