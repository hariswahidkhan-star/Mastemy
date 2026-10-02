/**
 * Commerce (wave 3) API surface: prices, quotes, bundles, plans, subscriptions, gifts, invoices, studio pricing
 * tools, payouts and the finance console. Field names mirror the C# DTO records in
 * src/Mastemy.Api/Modules/Commerce/*.cs (camelCase JSON). The client never sends amounts to pay; every price
 * shown comes from the server.
 */
import { useQuery } from '@tanstack/react-query';
import { api, ApiError, qs } from './client';
import type { Guid, IsoDate } from './types';

// ---------- Public ----------
export interface OfferView {
  name: string;
  endsAt: IsoDate;
}
export interface PriceView {
  packageId: Guid;
  title: string;
  includedServices: string;
  accessDays: number;
  currency: string;
  amount: number;
  regularAmount: number;
  compareAtAmount: number | null;
  offer: OfferView | null;
  freeVideoNotice: string;
}
export interface BundleComponentDto {
  packageId: Guid;
  courseId: Guid;
  title: string;
  contents: string;
  listPrice: number;
  accessDays: number;
}
export interface BundleDto {
  id: Guid;
  title: string;
  description: string;
  kind: string;
  categoryId: number | null;
  price: number;
  currency: string;
  status: string;
  componentsListTotal: number;
  components: BundleComponentDto[];
  freeVideoNotice: string;
}
export interface PlanDto {
  id: Guid;
  code: string;
  name: string;
  scope: string;
  categoryId: number | null;
  price: number;
  currency: string;
  interval: string;
  aiAllowance: number;
  includedServices: string;
  isActive: boolean;
  renewalTerms: string;
  freeVideoNotice: string;
}
export interface AffiliateClickDto {
  clickId: Guid;
  attributionExpiresAt: IsoDate;
}

// ---------- Buyer ----------
export interface QuoteInput {
  packageId?: Guid;
  bundleId?: Guid;
  couponCode?: string;
  referralCode?: string;
  affiliateClickId?: Guid;
  currency?: string;
  country?: string;
  gift?: boolean;
}
export interface QuoteItem {
  packageId: Guid;
  courseId: Guid;
  title: string;
  listPrice: number;
  unitPrice: number;
  accessDays: number;
}
export interface QuoteDto {
  kind: string;
  currency: string;
  listAmount: number;
  amount: number;
  discount: number;
  priceSource: string;
  compareAtAmount: number | null;
  offerEndsAt: IsoDate | null;
  couponApplied: boolean;
  items: QuoteItem[];
  freeVideoNotice: string;
}
export interface CheckoutInput {
  packageId?: Guid;
  bundleId?: Guid;
  idempotencyKey: string;
  couponCode?: string;
  referralCode?: string;
  affiliateClickId?: Guid;
  currency?: string;
  country?: string;
  billingName?: string;
  gift?: { recipientEmail?: string; message?: string };
}
export interface CheckoutResponse {
  orderId: Guid;
  checkoutUrl: string | null;
  status: string;
  amount: number;
  currency: string;
  listAmount: number;
  discount: number;
  priceSource: string;
  compareAtAmount: number | null;
  offerEndsAt: IsoDate | null;
}
export interface OrderItemDto {
  packageId: Guid;
  courseId: Guid;
  packageTitle: string;
  courseTitle: string;
  unitPrice: number;
}
export interface OrderDto {
  id: Guid;
  status: string;
  total: number;
  currency: string;
  createdAt: IsoDate;
  paidAt: IsoDate | null;
  items: OrderItemDto[];
  refundStatus: string | null;
  refundEligible: boolean;
  isGift: boolean;
  /** `Pending` before payment, then the gift code status (`Active`/`Redeemed`/`Void`); null for non-gifts. */
  giftStatus: string | null;
  giftCodeRevealed: boolean;
}
export interface RefundDto {
  id: Guid;
  orderId: Guid;
  userId: Guid;
  amount: number;
  currency: string;
  reason: string;
  status: string;
  providerRefundId: string | null;
  createdAt: IsoDate;
}
export interface GiftCodeDto {
  orderId: Guid;
  code: string;
  notice: string;
}
export interface GiftRedeemDto {
  packageId: Guid;
  courseId: Guid;
  endsAt: IsoDate;
}
export interface SubscriptionCheckoutResponse {
  subscriptionId: Guid;
  checkoutUrl: string;
}
export interface SubscriptionDto {
  id: Guid;
  planId: Guid;
  planName: string;
  status: string;
  currentPeriodStart: IsoDate | null;
  currentPeriodEnd: IsoDate | null;
  cancelAtPeriodEnd: boolean;
  graceUntil: IsoDate | null;
  endedAt: IsoDate | null;
  renewalTerms: string;
}
export interface InvoiceLine {
  description: string;
  amount: number;
}
export interface InvoiceDto {
  id: Guid;
  number: string;
  kind: string; // Invoice | CreditNote
  orderId: Guid;
  refundId: Guid | null;
  relatedInvoiceId: Guid | null;
  buyerName: string;
  buyerCountry: string | null;
  currency: string;
  subtotal: number;
  taxAmount: number | null;
  taxRatePercent: number | null;
  taxMode: string;
  total: number;
  lines: InvoiceLine[];
  issuedAt: IsoDate;
}

// ---------- Studio ----------
export interface CouponInput {
  code: string;
  kind: 'Percent' | 'Fixed' | 'Scholarship';
  percentOff?: number | null;
  amountOff?: number | null;
  currency?: string | null;
  scope: 'All' | 'Course' | 'Package' | 'Bundle';
  scopeId?: Guid | null;
  maxRedemptions?: number | null;
  maxPerUser?: number | null;
  startsAt?: IsoDate | null;
  expiresAt?: IsoDate | null;
  minAmount?: number | null;
  allowedEmails?: string[];
  allowedDomains?: string[];
  allowedOrganizationId?: Guid | null;
}
export interface CouponDto {
  id: Guid;
  code: string;
  kind: string;
  percentOff: number | null;
  amountOff: number | null;
  currency: string | null;
  scope: string;
  scopeId: Guid | null;
  maxRedemptions: number | null;
  maxPerUser: number;
  startsAt: IsoDate;
  expiresAt: IsoDate | null;
  minAmount: number | null;
  status: string;
  createdByStaff: boolean;
  createdBy: Guid;
  redemptions: number;
  allowedEmails: string[];
  allowedDomains: string[];
  allowedOrganizationId: Guid | null;
  createdAt: IsoDate;
}
export interface ReferralCodeDto {
  id: Guid;
  code: string;
  courseId: Guid;
  instructorId: Guid;
  isActive: boolean;
  createdAt: IsoDate;
}
export interface PackagePriceDto {
  id: Guid;
  packageId: Guid;
  currency: string;
  countries: string[];
  amount: number;
  status: string;
  createdAt: IsoDate;
}
export interface PromotionDto {
  id: Guid;
  name: string;
  percentOff: number;
  startsAt: IsoDate;
  endsAt: IsoDate;
  status: string;
  packageIds: Guid[];
}
export interface PayoutProfileDto {
  userId: Guid;
  legalName: string;
  country: string;
  method: string;
  destinationMasked: string;
  taxFormStatus: string;
  updatedAt: IsoDate;
}
export interface PayoutProfileInput {
  legalName: string;
  country: string;
  method: 'Email' | 'Iban';
  destination: string;
  taxFormSubmitted?: boolean;
}
export interface PayoutBalanceDto {
  currency: string;
  cleared: number;
  pending: number;
  minimumPayout: number;
}
export interface PayoutRequestDto {
  id: Guid;
  instructorId: Guid;
  currency: string;
  amount: number;
  status: string;
  payoutBatchId: Guid | null;
  entries: number;
  createdAt: IsoDate;
  notes: string | null;
}
export interface StudioPackageDto {
  id: Guid;
  courseId: Guid;
  title: string;
  contents: string;
  price: number;
  currency: string;
  accessDays: number;
  isActive: boolean;
  approvalStatus: string;
  createdAt: IsoDate;
  courseTitle?: string | null;
}

// ---------- Finance ----------
export interface DisputeDto {
  id: Guid;
  providerDisputeId: string;
  orderId: Guid;
  amount: number;
  currency: string;
  status: string;
  reason: string;
  createdAt: IsoDate;
  closedAt: IsoDate | null;
}
export interface ReconciliationRow {
  day: string;
  currency: string;
  payments: number;
  subscriptionPayments: number;
  ledgerSales: number;
  salesDifference: number;
  refunds: number;
  ledgerRefundReversals: number;
  refundDifference: number;
  chargebacks: number;
  status: string;
  /** Package/bundle/gift revenue whose course has no instructor with a revenue share (never in the ledger). */
  platformOnlyPayments: number;
  platformOnlyRefunds: number;
}
export interface ReconciliationDto {
  from: string;
  to: string;
  rows: ReconciliationRow[];
  mismatchedDays: number;
}
export interface TaxRateDto {
  country: string;
  ratePercent: number;
  updatedAt: IsoDate;
}
export interface AffiliateDto {
  id: Guid;
  name: string;
  email: string;
  code: string;
  commissionPercent: number;
  attributionWindowDays: number;
  isActive: boolean;
  createdAt: IsoDate;
}
export interface PayoutLine {
  instructorId: Guid;
  currency: string;
  amount: number;
  entries: number;
}
export interface PayoutBatchDto {
  id: Guid;
  status: string;
  createdBy: Guid;
  approvedBy: Guid | null;
  createdAt: IsoDate;
  lines: PayoutLine[];
}

// ---------- Hooks ----------
export const commerceKeys = {
  plans: ['commerce', 'plans'] as const,
  bundles: ['commerce', 'bundles'] as const,
  orders: ['me', 'orders'] as const,
  invoices: ['commerce', 'me', 'invoices'] as const,
  subscriptions: ['commerce', 'me', 'subscriptions'] as const,
  price: (id: string, currency: string, country: string) =>
    ['commerce', 'price', id, currency, country] as const,
};

export function usePlans() {
  return useQuery({ queryKey: commerceKeys.plans, queryFn: () => api<PlanDto[]>('/api/plans') });
}
export function useBundles() {
  return useQuery({
    queryKey: commerceKeys.bundles,
    queryFn: () => api<BundleDto[]>('/api/bundles'),
  });
}
export function usePackagePrice(id: string, currency = '', country = '') {
  return useQuery({
    queryKey: commerceKeys.price(id, currency, country),
    queryFn: () => api<PriceView>(`/api/packages/${id}/price${qs({ currency, country })}`),
    enabled: !!id,
    retry: false,
  });
}
export function useMyOrders() {
  return useQuery({
    queryKey: commerceKeys.orders,
    queryFn: () => api<OrderDto[]>('/api/me/orders'),
  });
}
export function useMyInvoices() {
  return useQuery({
    queryKey: commerceKeys.invoices,
    queryFn: () => api<InvoiceDto[]>('/api/me/invoices'),
  });
}
export function useMySubscriptions() {
  return useQuery({
    queryKey: commerceKeys.subscriptions,
    queryFn: () => api<SubscriptionDto[]>('/api/me/subscriptions'),
  });
}

/** Problem `type` of an API error, or '' (used to map server error codes to messages). */
export function problemCode(e: unknown): string {
  if (!(e instanceof ApiError)) return '';
  const t = e.type;
  const i = t.lastIndexOf('/');
  return i >= 0 ? t.slice(i + 1) : t;
}
