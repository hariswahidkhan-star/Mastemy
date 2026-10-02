/**
 * Final wave B client types and helpers. Every shape mirrors a C# record (file noted per block); the
 * server stays the authority for prices, permissions and validation.
 */
import { useQuery } from '@tanstack/react-query';
import { api, qs } from './client';
import type { CourseCardDto } from './types';

type Guid = string;
type IsoDate = string;

// ---------- Commerce: PricingService.cs ----------
/** `CurrencyOptionDto(PackageId, Currency, Countries, Amount, IsBase)` */
export interface CurrencyOptionDto {
  packageId: Guid;
  currency: string;
  countries: string[];
  amount: number;
  isBase: boolean;
}
/** `CommercePolicyDto` */
export interface CommercePolicyDto {
  instructorCouponMaxPercent: number;
  couponReservationMinutes: number;
  promotionMaxPercent: number;
  affiliateMaxPercent: number;
  refundWindowDays: number;
  instructorSharePercent: number;
  payoutMinimumAmount: number;
  maxScholarshipEmails: number;
  maxScholarshipDomains: number;
  maxRegionalCountriesPerPrice: number;
}

export interface CurrencyChoice {
  /** '' = the server default (package base currency). */
  value: string;
  currency: string;
  amount: number;
  countries: string[];
  isBase: boolean;
}

/**
 * Checkout currency choices from `GET /api/commerce/currencies?packageId=`: one entry per currency. A
 * country-specific price only applies with a matching country, so a currency offered only regionally is
 * listed when the entered country matches (or with its country list when none is entered).
 */
export function currencyChoices(rows: CurrencyOptionDto[], country: string): CurrencyChoice[] {
  const c = country.trim().toUpperCase();
  const byCurrency = new Map<string, CurrencyChoice>();
  for (const r of rows) {
    const generic = r.countries.length === 0;
    if (!generic && c && !r.countries.includes(c)) continue;
    const prev = byCurrency.get(r.currency);
    // Country-specific beats generic for the entered country (server rule 1).
    const better = !prev || (!generic && c !== '' && prev.countries.length === 0);
    if (better)
      byCurrency.set(r.currency, {
        value: r.currency,
        currency: r.currency,
        amount: r.amount,
        countries: r.countries,
        isBase: r.isBase,
      });
  }
  return [...byCurrency.values()].sort((a, b) =>
    a.isBase === b.isBase ? a.currency.localeCompare(b.currency) : a.isBase ? -1 : 1,
  );
}

// ---------- Commerce: OrderBrowserService.cs ----------
export const ORDER_STATUSES = [
  'Pending',
  'Paid',
  'Failed',
  'Refunded',
  'PartiallyRefunded',
  'Cancelled',
] as const;
export interface AdminOrderRowDto {
  id: Guid;
  userId: Guid;
  buyerEmail: string;
  status: string;
  kind: string;
  total: number;
  currency: string;
  discountAmount: number;
  refundedAmount: number;
  couponCode: string | null;
  itemCount: number;
  createdAt: IsoDate;
  paidAt: IsoDate | null;
}
export interface AdminOrderDetailDto {
  order: AdminOrderRowDto;
  priceSource: string | null;
  country: string | null;
  listAmount: number;
  items: { id: Guid; packageId: Guid; courseId: Guid; courseTitle: string; unitPrice: number }[];
  payments: {
    id: Guid;
    provider: string;
    providerPaymentId: string;
    amount: number;
    currency: string;
    createdAt: IsoDate;
  }[];
  refunds: {
    id: Guid;
    amount: number;
    reason: string;
    status: string;
    requestedBy: Guid | null;
    decidedBy: Guid | null;
    decidedAt: IsoDate | null;
    providerRefundId: string | null;
    createdAt: IsoDate;
  }[];
  invoices: {
    id: Guid;
    number: string;
    kind: string;
    total: number;
    currency: string;
    issuedAt: IsoDate;
  }[];
  ledger: {
    id: Guid;
    instructorId: Guid;
    courseId: Guid;
    kind: string;
    grossAmount: number;
    instructorAmount: number;
    platformAmount: number;
    currency: string;
    payoutBatchId: Guid | null;
    createdAt: IsoDate;
  }[];
  disputes: {
    id: Guid;
    amount: number;
    currency: string;
    status: string;
    reason: string;
    createdAt: IsoDate;
    closedAt: IsoDate | null;
  }[];
}
export interface OrderPage {
  items: AdminOrderRowDto[];
  total: number;
  page: number;
  pageSize: number;
}
export interface OrderFilters {
  status: string;
  email: string;
  courseId: string;
  /** yyyy-mm-dd (UTC day). */
  from: string;
  to: string;
  currency: string;
  coupon: string;
  page: number;
  pageSize: number;
}
export const EMPTY_ORDER_FILTERS: OrderFilters = {
  status: '',
  email: '',
  courseId: '',
  from: '',
  to: '',
  currency: '',
  coupon: '',
  page: 1,
  pageSize: 25,
};

/** Filters → `/api/admin/orders` query string. Dates are whole UTC days (`to` is inclusive). */
export function orderQuery(f: OrderFilters): string {
  return qs({
    status: f.status || undefined,
    email: f.email.trim() || undefined,
    courseId: f.courseId.trim() || undefined,
    from: f.from ? `${f.from}T00:00:00Z` : undefined,
    to: f.to ? `${f.to}T23:59:59Z` : undefined,
    currency: f.currency.trim().toUpperCase() || undefined,
    coupon: f.coupon.trim() || undefined,
    page: f.page > 1 ? f.page : undefined,
    pageSize: f.pageSize !== 25 ? f.pageSize : undefined,
  });
}

// ---------- Catalog: CategoryAdmin.cs ----------
export interface CategoryAdminDto {
  id: number;
  slug: string;
  nameEn: string;
  nameAr: string;
  parentId: number | null;
  isAcademy: boolean;
  sortOrder: number;
  courseCount: number;
  childCount: number;
}
export interface CategoryAdminInput {
  slug: string;
  nameEn: string;
  nameAr: string;
  parentId: number | null;
  isAcademy: boolean;
  sortOrder: number;
}
export const CATEGORY_MAX_DEPTH = 4;
export interface CategoryNode {
  cat: CategoryAdminDto;
  depth: number;
}

/** Depth-first ordering of the flat list (children after parent, by sort order then English name). */
export function categoryTree(list: CategoryAdminDto[]): CategoryNode[] {
  const kids = new Map<number | null, CategoryAdminDto[]>();
  const ids = new Set(list.map((c) => c.id));
  for (const c of list) {
    const p = c.parentId !== null && ids.has(c.parentId) ? c.parentId : null;
    kids.set(p, [...(kids.get(p) ?? []), c]);
  }
  for (const arr of kids.values())
    arr.sort((a, b) => a.sortOrder - b.sortOrder || a.nameEn.localeCompare(b.nameEn));
  const out: CategoryNode[] = [];
  const seen = new Set<number>();
  const walk = (p: number | null, depth: number) => {
    for (const c of kids.get(p) ?? []) {
      if (seen.has(c.id)) continue;
      seen.add(c.id);
      out.push({ cat: c, depth });
      walk(c.id, depth + 1);
    }
  };
  walk(null, 0);
  return out;
}

/** Ids of a category and all its descendants (cannot become its parent). */
export function descendantIds(list: CategoryAdminDto[], id: number): Set<number> {
  const out = new Set<number>([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const c of list)
      if (c.parentId !== null && out.has(c.parentId) && !out.has(c.id)) {
        out.add(c.id);
        grew = true;
      }
  }
  return out;
}

function depthOf(list: CategoryAdminDto[], id: number | null): number {
  let d = 0;
  let cur = id;
  const byId = new Map(list.map((c) => [c.id, c]));
  while (cur !== null && d <= 50) {
    d++;
    cur = byId.get(cur)?.parentId ?? null;
  }
  return d;
}

/** Height of a subtree (1 = leaf). */
function subtreeHeight(list: CategoryAdminDto[], id: number): number {
  const children = list.filter((c) => c.parentId === id);
  return 1 + Math.max(0, ...children.map((c) => subtreeHeight(list, c.id)));
}

/**
 * Client-side mirror of the server's category checks, to explain problems before saving. Returns a map of
 * field → error code (same codes the API uses). The server re-validates everything.
 */
export function validateCategory(
  input: CategoryAdminInput,
  list: CategoryAdminDto[],
  editingId: number | null,
): Partial<Record<keyof CategoryAdminInput, string>> {
  const e: Partial<Record<keyof CategoryAdminInput, string>> = {};
  if (!/^[a-z0-9](?:[a-z0-9-]{0,98}[a-z0-9])?$/.test(input.slug)) e.slug = 'invalid_slug';
  else if (list.some((c) => c.slug === input.slug && c.id !== editingId)) e.slug = 'slug_taken';
  const name = (s: string) => s.trim().length >= 1 && s.trim().length <= 100 && !/[<>]/.test(s);
  if (!name(input.nameEn)) e.nameEn = 'invalid_name';
  if (!name(input.nameAr)) e.nameAr = 'invalid_name';
  if (!Number.isInteger(input.sortOrder) || Math.abs(input.sortOrder) > 100000)
    e.sortOrder = 'invalid_sort_order';
  if (input.parentId !== null) {
    if (!list.some((c) => c.id === input.parentId)) e.parentId = 'invalid_parent';
    else if (editingId !== null && descendantIds(list, editingId).has(input.parentId))
      e.parentId = 'category_cycle';
    else {
      const height = editingId !== null ? subtreeHeight(list, editingId) : 1;
      if (depthOf(list, input.parentId) + height > CATEGORY_MAX_DEPTH)
        e.parentId = 'category_too_deep';
    }
  }
  return e;
}

// ---------- Taxonomy: TaxonomyModels ----------
export interface ObjectiveMappingDto {
  objectiveId: Guid;
  code: string;
  title: string;
  lessonIds: Guid[];
  questionIds: Guid[];
}
export interface CertificationMappingsDto {
  certificationId: Guid;
  courseId: Guid;
  linked: boolean;
  objectives: ObjectiveMappingDto[];
}
export interface LinkedCourseDto {
  courseId: Guid;
  slug: string;
  title: string;
  status: string;
  isLive: boolean;
  linkedAt: IsoDate;
}
export interface BestsellerRowDto {
  courseId: Guid;
  courseTitle: string;
  courseSlug: string;
  distinctBuyers: number;
  netRevenue: number;
  eligible: boolean;
  windowStart: IsoDate;
  computedAt: IsoDate;
}
export interface NotesLibraryItemDto {
  course: CourseCardDto;
  hasNotes: boolean;
  lessonsWithNotes: number;
}
export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Mapped ids for one objective, preloaded into the mapping dialog. */
export function mappedIds(
  m: CertificationMappingsDto | undefined,
  objectiveId: string,
  kind: 'lessons' | 'questions',
): string[] {
  const o = m?.objectives.find((x) => x.objectiveId === objectiveId);
  if (!o) return [];
  return kind === 'lessons' ? o.lessonIds : o.questionIds;
}

// ---------- Enterprise phase 2: EnterprisePhase2Service.cs / OidcSso.cs ----------
export interface PathwayAssignmentDto {
  id: Guid;
  pathwayId: Guid;
  pathwayTitle: string;
  scope: string;
  userId: Guid | null;
  department: string | null;
  grantsPremium: boolean;
  dueAt: IsoDate | null;
  courseIds: Guid[];
  skippedCourseIds: Guid[];
  createdAt: IsoDate;
}
export interface OrgMaterialDto {
  id: Guid;
  title: string;
  department: string | null;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  scanVerdict: string;
  createdAt: IsoDate;
  downloadUrl: string;
}
export interface SeatRequestDto {
  id: Guid;
  organizationId: Guid;
  organizationName: string;
  quantity: number;
  note: string;
  requestedBy: Guid;
  status: string;
  createdAt: IsoDate;
  decisionNote: string | null;
  enterpriseOrderId: Guid | null;
}
export interface EnterpriseOrderDto {
  id: Guid;
  organizationId: Guid;
  organizationName: string;
  seatRequestId: Guid | null;
  orderId: Guid;
  invoiceId: Guid;
  invoiceNumber: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  total: number;
  status: string;
  paymentInstructions: string;
  createdAt: IsoDate;
  paidAt: IsoDate | null;
  paymentReference: string | null;
  seatLimitBefore: number | null;
  seatLimitAfter: number | null;
}
export interface SsoConfigDto {
  organizationId: Guid;
  issuer: string;
  clientId: string;
  hasClientSecret: boolean;
  allowedDomains: string[];
  enabled: boolean;
  redirectUri: string | null;
  loginUrl: string;
  updatedAt: IsoDate;
}
export interface SsoConfigInput {
  issuer: string;
  clientId: string;
  clientSecret?: string | null;
  allowedDomains: string[];
  enabled: boolean;
}

/** SSO callback / exchange error codes with translated explanations. */
export const SSO_ERROR_CODES = [
  'sso_invalid_state',
  'sso_idp_error',
  'sso_invalid_request',
  'sso_token_exchange_failed',
  'sso_invalid_token',
  'sso_email_missing',
  'sso_email_unverified',
  'sso_domain_not_allowed',
  'sso_link_requires_verified_email',
  'sso_privileged_not_allowed',
  'sso_provider_unavailable',
  'sso_not_available',
  'sso_not_configured',
  'seat_limit_reached',
  'invalid_handoff',
] as const;

/** Only same-site relative paths are followed after SSO (no open redirects). */
export function safeReturnTo(v: string | null | undefined): string {
  if (!v || !v.startsWith('/') || v.startsWith('//') || v.startsWith('/\\')) return '/me';
  return v;
}

export const ORG_SLUG = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;

export const fbKeys = {
  currencies: (packageId: string) => ['commerce', 'currencies', packageId] as const,
  policy: ['studio', 'commerce', 'policy'] as const,
  adminCategories: ['admin', 'categories'] as const,
  orders: (q: string) => ['admin', 'orders', q] as const,
  order: (id: string) => ['admin', 'order', id] as const,
  mappings: (courseId: string, certId: string) =>
    ['studio', 'course', courseId, 'cert', certId, 'mappings'] as const,
  certCourses: (id: string) => ['admin', 'cert', id, 'courses'] as const,
  notes: (q: string, page: number) => ['discover', 'notes-library', q, page] as const,
  pathwayAssignments: (org: string) => ['orgs', org, 'pathway-assignments'] as const,
  materials: (org: string) => ['orgs', org, 'materials'] as const,
  seatRequests: (org: string) => ['orgs', org, 'seat-requests'] as const,
  orgOrders: (org: string) => ['orgs', org, 'enterprise-orders'] as const,
  sso: (org: string) => ['orgs', org, 'sso'] as const,
  staffSeatRequests: (status: string) => ['admin', 'enterprise', 'seat-requests', status] as const,
  staffOrders: ['admin', 'enterprise', 'orders'] as const,
};

export function useCurrencyOptions(packageId: string | undefined) {
  return useQuery({
    queryKey: fbKeys.currencies(packageId ?? ''),
    queryFn: () =>
      api<CurrencyOptionDto[]>(`/api/commerce/currencies${qs({ packageId: packageId ?? '' })}`),
    enabled: !!packageId,
    retry: false,
    staleTime: 60_000,
  });
}

export function useCommercePolicy() {
  return useQuery({
    queryKey: fbKeys.policy,
    queryFn: () => api<CommercePolicyDto>('/api/studio/commerce/policy'),
    staleTime: 5 * 60_000,
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: fbKeys.adminCategories,
    queryFn: () => api<CategoryAdminDto[]>('/api/admin/categories'),
  });
}

export function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  const u = ['KB', 'MB', 'GB', 'TB'];
  let v = n / 1024;
  let i = 0;
  while (v >= 1024 && i < u.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 10 ? 0 : 1)} ${u[i]}`;
}
