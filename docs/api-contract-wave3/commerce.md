# Commerce (wave 3) — pricing, offers, subscriptions, finance

Spec §18 and §2: everything sold is a **study service** (premium notes, MCQ banks, mock exams, analytics, explicit AI
allowances). Course videos are free YouTube embeds and are never sold, unlocked or gated. Package, bundle and plan
texts that advertise video access are rejected (`package_sells_video_access`); plans may not claim "unlimited"
(`unlimited_claim`). Every price-bearing response carries `freeVideoNotice`.

Errors use RFC 7807 problem details; the machine code is in `type`. All amounts are decimals in major units and are
validated against the currency's minor units (JPY etc. have 0 decimals). The client never sends amounts to pay;
the server computes every price.

## Roles

| Policy | Roles |
|---|---|
| Instructor | Instructor, Admin, SuperAdmin — plus course **manager** (Owner/CoInstructor) for pricing actions. Editors get `403 editor_scope`. |
| Staff | Admin, SuperAdmin |
| Finance | Finance, Admin, SuperAdmin |

## Public (anonymous)

| Method | Path | Notes |
|---|---|---|
| GET | `/api/packages/{id}/price?currency=&country=` | `PriceView`: amount, regularAmount, `compareAtAmount` (only if honest), `offer {name, endsAt}` (the real end time — no countdowns), includedServices, accessDays. 400 `currency_not_available`, `invalid_currency`, `invalid_country`. |
| GET | `/api/commerce/currencies?packageId=` or `?courseId=` | Exactly one parameter (400 `invalid_query`). Sellable currencies of the package (or of every active approved package of a live course): `[{packageId, currency, countries[], amount, isBase}]` — the base price (omitted when a generic approved price in the base currency overrides it) plus approved regional prices; proposed/rejected/retired prices are never listed. 404 when the package/course is not live. Checkout uses this instead of probing currencies. |
| GET | `/api/bundles` | Active bundles whose components are all sellable, with component list prices. |
| GET | `/api/plans` | Active subscription plans with `renewalTerms`, `aiAllowance`, `includedServices`. |
| POST | `/api/affiliates/clicks` `{code}` | Cookie-less affiliate attribution: returns `{clickId, attributionExpiresAt}`; pass `affiliateClickId` to checkout. |

## Buyer (authenticated)

| Method | Path | Notes |
|---|---|---|
| POST | `/api/checkout/quote` | Body as checkout minus `idempotencyKey`/`billingName`. Returns `QuoteDto` (no order created). |
| POST | `/api/checkout` | `{packageId? | bundleId?, idempotencyKey, couponCode?, referralCode?, affiliateClickId?, currency?, country?, billingName?, gift?: {recipientEmail?, message?}}` → `CheckoutResponse {orderId, checkoutUrl, status, amount, currency, listAmount, discount, priceSource, compareAtAmount, offerEndsAt}`. Zero-amount orders (100% scholarship) are fulfilled immediately: `status:"Paid"`, `checkoutUrl:null`, no provider call. Same key + different purchase → 409 `idempotency_key_reused`. 503 `payments_not_configured` when a payment is needed and Stripe is not configured. |
| GET | `/api/me/orders` | Orders now include `isGift`, `giftStatus` (`Pending` before payment, then the gift code status `Active`/`Redeemed`/`Void`; null for non-gifts) and `giftCodeRevealed`. |
| POST | `/api/me/orders/{id}/refund-request` | Requests a refund of the remaining amount (window `Commerce:RefundWindowDays`). 409 `gift_already_redeemed`; 400 `subscription_refund_not_supported`, `nothing_to_refund`. |
| GET | `/api/me/orders/{id}/gift-code` | Shows a gift code **once** (409 `gift_code_already_revealed`; 409 `gift_code_emailed` when it was sent to a recipient). |
| POST | `/api/gifts/redeem` `{code}` | Grants the package entitlement to the redeemer. 400 `gift_invalid`/`gift_void`, 409 `gift_already_redeemed`. |
| POST | `/api/subscriptions/checkout` `{planId, idempotencyKey}` | Stripe Checkout `mode=subscription` → `{subscriptionId, checkoutUrl}`. 409 `already_subscribed`. |
| GET | `/api/me/subscriptions` | Status, current period, `cancelAtPeriodEnd`, `graceUntil`, renewal terms. |
| POST | `/api/me/subscriptions/{id}/cancel` / `/resume` | Sets `cancel_at_period_end` at Stripe first; local state changes only after the provider confirms (502 otherwise). Access continues to period end. |
| GET | `/api/me/invoices` | Invoices and credit notes of the caller. |
| GET | `/api/me/invoices/{id}/pdf` | PDF rendered from the seller snapshot captured when the document was issued (`Commerce_InvoiceSellerSnapshots`). Documents issued before snapshots existed fall back to the current `Invoice:SellerName`, `Invoice:SellerAddress`, `Invoice:SellerTaxId`; 503 `invoicing_not_configured` only when neither is available. |

### Pricing rules (server-side)
1. **Regular price**: approved regional `PackagePrice` matching currency and country (country-specific beats generic), else the package base price when the currency is the package currency, else 400 `currency_not_available`.
2. **Scheduled offer**: a staff `Promotion` (≤ 31 days, 5–`Commerce:PromotionMaxPercent`% off) applies only to packages whose instructor **opted in**. Opt-in requires an honest reference price.
3. **Honest reference price**: the regular price may be shown as `compareAtAmount` only if `PriceHistory` shows that exact amount as the regular price for ≥ 30 of the last 90 days; otherwise no compare-at is shown and opt-in fails with `reference_price_not_established`.
4. **Coupon** (one per order, never stacked): applies to the regular price and must beat a running offer (`coupon_does_not_stack`). Codes are case-insensitive. Checks: status, start/expiry (`coupon_not_started`/`coupon_expired`), scope All/Course/Package/Bundle (`coupon_not_applicable`), min amount (`coupon_min_amount`), currency for Fixed/min amount (`coupon_currency_mismatch`), total limit counting paid redemptions + pending orders reserved in the last `Commerce:CouponReservationMinutes` (`coupon_exhausted`), per-user limit (`coupon_already_used`), scholarship recipients (`coupon_not_eligible`), course authors on their own course (`coupon_self_use`), instructor policy cap (`coupon_exceeds_policy`), gifts (`coupon_gift_not_allowed`: a coupon that would make a gift free, or any staff Percent coupon, is rejected on gift purchases unless the coupon was created by staff with `allowsGifts: true`; default false). Usage limits are enforced under a row lock: checkout locks the coupon row (`SELECT … FOR UPDATE`) in the same transaction that counts redemptions + reservations and inserts the order (and fulfils a zero-amount order), so concurrent checkouts can never exceed `maxRedemptions`. Redemption is recorded idempotently (unique per order) when the paid webhook is processed.
5. **Bundles**: price is split across components pro-rata by component list price (floored, remainder on the last item); each component gets its own entitlement and commission.
6. **Referral code** (instructor, per course): stored on the order; the course's instructor pool becomes `Commission:ReferralInstructorSharePercent` instead of `Commission:InstructorSharePercent`, split by revenue shares. Self-use → `referral_self_use`.
7. **Affiliate**: `affiliateClickId` must be within the affiliate's attribution window (`affiliate_expired`); the affiliate's own email cannot earn (`affiliate_self_referral`). Ledger kind `Affiliate`: `InstructorId` = affiliate id, `InstructorAmount` = floor(total × %), `PlatformAmount` = −same (paid from the platform share).

## Instructor workspace (`Instructor` policy; course-manager scope)

| Method | Path | Notes |
|---|---|---|
| GET | `/api/studio/commerce/policy` | Read-only limits: `{instructorCouponMaxPercent, couponReservationMinutes, promotionMaxPercent, affiliateMaxPercent, refundWindowDays, instructorSharePercent, payoutMinimumAmount, maxScholarshipEmails, maxScholarshipDomains, maxRegionalCountriesPerPrice}`. |
| POST/GET | `/api/studio/coupons` | Own course/package coupons only; percent ≤ `Commerce:InstructorCouponMaxPercent` (default 50), fixed ≤ same % of the package price. Scholarship kind → `PendingApproval`. |
| POST | `/api/studio/coupons/{id}/disable` | Creator only. |
| POST/GET | `/api/studio/courses/{id}/referral-codes` | `{code?}` (generated when omitted). |
| POST/GET | `/api/studio/packages/{id}/prices` | Propose regional price `{currency, countries?[], amount}` → `Proposed` until staff approve. |
| GET | `/api/studio/promotions` | Current/recent promotions. |
| POST | `/api/studio/promotions/{id}/opt-in` / `/opt-out` | `{packageId}`. |
| GET/PUT | `/api/studio/payout-profile` | `{legalName, country, method: Email|Iban, destination, taxFormSubmitted?}`. Destination is encrypted (Data Protection via `SecretProtector`) and only a mask is returned (`DE** **** 3000`). IBAN mod-97 validated (`invalid_iban`). GET returns 204 when no profile. |
| GET | `/api/studio/balances` | Per currency: `cleared` (unbatched, unclaimed, positive entries older than the refund window + all negative entries), `pending`, `minimumPayout`. |
| POST/GET | `/api/studio/payout-requests` | `{currency}` claims the whole cleared balance. Needs profile with tax form `Verified` (`payout_profile_incomplete`) and ≥ `Payouts:MinimumAmount` (`below_minimum_payout`). |
| GET | `/api/studio/statements?year=&month=&format=csv|pdf` | Transaction-level monthly statement with opening/net/closing per currency. CSV cells are formula-injection safe. |

## Staff (`Staff` policy)

| Method | Path | Notes |
|---|---|---|
| POST/GET | `/api/admin/coupons` | Any scope/kind. Scholarship: `allowedEmails[]`, `allowedDomains[]`, `allowedOrganizationId` (at least one, else `scholarship_unrestricted`). Emails and domains are stored trimmed and lower-case, with IDN domains converted to punycode (a leading `@` is dropped); eligibility compares the buyer's normalized email/domain case-insensitively, so rows stored upper-case by earlier versions still match. |
| POST | `/api/admin/coupons/{id}/decision` | `Approve` (PendingApproval only, approver ≠ creator → 403), `Reject`, `Disable`. Audited. |
| GET | `/api/admin/package-prices` | Proposed regional prices. |
| POST | `/api/admin/package-prices/{id}/decision` | `Approve` (retires the previous approved price for the same currency/countries, writes price history), `Reject`, `Retire`. |
| POST/GET | `/api/admin/promotions`, POST `/api/admin/promotions/{id}/cancel` | |
| POST | `/api/admin/bundles` | `{title, description, kind: Category|Certification, categoryId?, price, currency, packageIds[2..50]}`; all packages approved, same currency, price below the component sum (`bundle_price_not_lower`). |
| GET | `/api/admin/bundles?includeInactive=true` | All bundles for staff (active only by default; inactive ones included on request so they can be re-activated). |
| POST | `/api/admin/bundles/{id}/status` | `{active}`. |
| POST/GET | `/api/admin/plans`, PUT `/api/admin/plans/{id}` | Plan: code, name, scope AllCourses|Category, price, currency, interval month|year, `aiAllowance`, `includedServices`. Price/interval/scope immutable after creation. |

## Finance (`Finance` policy)

| Method | Path | Notes |
|---|---|---|
| POST | `/api/admin/orders/{id}/refunds` | `{amount, reason, revokeEntitlements?}` partial or full refund (≤ remaining, `refund_exceeds_remaining`). Provider refund is idempotent per refund id. Entitlements are revoked on a full refund, or on a partial one when `revokeEntitlements=true`. Credit note issued. Gifts: full refund only before redemption. Provider failure → 502 and the refund is marked `Failed`, nothing else changes. |
| POST | `/api/admin/refunds/{id}/decision` | (existing) learner refund requests; now uses the same engine. |
| GET | `/api/admin/disputes?status=` | Chargebacks. |
| GET | `/api/admin/reconciliation?from=&to=` | ≤ 93 days. Per UTC day + currency: `payments`, `subscriptionPayments`, `ledgerSales` (Σ instructor+platform of Sale entries), `salesDifference = payments − subscriptionPayments − ledgerSales`, `refunds` (package orders), `ledgerRefundReversals`, `refundDifference = refunds + reversals`, `chargebacks`, `status` ok|mismatch, plus `platformOnlyPayments` / `platformOnlyRefunds`: the part of package/bundle/gift orders whose course has no instructor with a revenue share (expected platform-only revenue, never in the ledger). These are subtracted in `salesDifference = payments − subscriptionPayments − platformOnlyPayments − ledgerSales` and `refundDifference = refunds − platformOnlyRefunds + reversals`, so they are not flagged. Shares are read from the current course instructors. |
| GET | `/api/admin/invoices?orderId=&year=`, `/api/admin/invoices/{id}/pdf` | |
| GET / PUT / DELETE | `/api/admin/tax-rates[/{country}]` | `{ratePercent}` 0–50. Only used when `Tax:Mode=Inclusive`. No built-in rates. |
| GET | `/api/admin/payout-profiles`; PUT `/api/admin/payout-profiles/{userId}/tax-form-status` `{status}` | NotSubmitted, Submitted, Verified, Rejected. |
| GET | `/api/admin/payout-requests?status=` | |
| POST | `/api/admin/payout-requests/batch` `{requestIds[]}` | Creates a Draft `PayoutBatch` (approve via `/api/admin/payout-batches/{id}/approve` by a different user). 409 `payout_request_decided`. |
| POST | `/api/admin/payout-requests/{id}/reject` `{notes}` | Releases the claimed ledger entries. |
| GET | `/api/admin/instructors/{id}/statements?year=&month=&format=` | |
| POST/GET | `/api/admin/affiliates`, POST `/api/admin/affiliates/{id}/active` `{active}` | `{name, email, code, commissionPercent (≤ Commerce:AffiliateMaxPercent), attributionWindowDays 1–90}` |
| POST | `/api/admin/subscription-pool/allocate` `{year, month}` | Idempotent per (year, month, currency); 400 `period_not_closed`. |
| GET | `/api/admin/subscription-pool?year=` | Allocations with per-course lines. |

The legacy sweep `POST /api/admin/payout-batches` no longer takes ledger entries reserved by a payout request.

## Stripe webhooks (`POST /api/webhooks/stripe`)

Signature (`Stripe-Signature`, HMAC-SHA256, 5-minute tolerance) is verified over the raw body first (400 `invalid_signature`).
Each event id is processed once (`duplicate`). Handled types:

| Type | Effect |
|---|---|
| `checkout.session.completed` / `async_payment_succeeded` (payment) | Amount/currency must match the order; then payment, entitlements or gift code, commission (referral/bundle/affiliate), coupon redemption, invoice. |
| `checkout.session.completed` (mode=subscription) | Links the provider subscription id to the local subscription. |
| `customer.subscription.created` / `updated` | active/trialing → Active, entitlements `EndsAt = current_period_end`; past_due → PastDue with grace; canceled/unpaid → ends access. Stale events cannot revive an ended subscription. |
| `customer.subscription.deleted` | Canceled; subscription entitlements end now. |
| `invoice.paid` | Records a `SubscriptionInvoice` + Order/Payment + invoice, extends the period. Not yet linked → **409** (no processed-event row, Stripe retries). |
| `invoice.payment_failed` | PastDue; `graceUntil = now + Subscriptions:GraceDays` (default 7); access lasts until max(period end, grace). The background job ends it after grace. |
| `charge.dispute.created` | Dispute recorded; instructor commission for the disputed share reversed immediately (ledger kind `Chargeback`). |
| `charge.dispute.closed` | won/warning_closed → `ChargebackReversal` reinstates; lost → purchase entitlements (and premium-earned certificates) revoked, unredeemed gift voided. Audited. |
| `charge.dispute.updated`, `charge.refunded`, `refund.*` | Recorded only. |

## Subscription pool formula

For each calendar month (UTC) and currency:

- `R` = Σ subscription invoice payments in the month − Σ completed refunds of subscription orders decided in the month.
- `P` = floor(R × `Commission:SubscriptionPoolPercent` / 100) (default: `Commission:InstructorSharePercent`).
- A **unit** is a distinct `(subscriber s, course c, refId, UTC day)` where `refId` is the assessment id of a submitted premium MCQ attempt or the resource id of a premium resource download (`Commerce_ConsumptionEvents.RefId`), made in the month while *s* held a subscription entitlement for *c*. Repeating the same attempt/download on the same day adds nothing; download events are also deduplicated on `(user, RefId, UTC day)` when recorded.
- `U_c` = Σ over eligible subscribers *s* of min(`Subscriptions:MaxUnitsPerSubscriberPerCourse` (default 30), units of (*s*, *c*)).
- Excluded subscribers: the course's own instructors and owner (for that course), staff (any role other than Student/Instructor), and users whose subscription payment was refunded (completed refund decided in the month) or charged back (dispute not won, open during the month).
- `A_c` = floor(P × U_c / ΣU), split between the course's instructors by `RevenueSharePercent`; rounding remainders and courses without payees stay with the platform; ΣU = 0 → nothing allocated.
- Ledger kind `SubscriptionPool`. Never based on YouTube views.

## Ledger provenance

`Commerce_LedgerSources` records the real order and source document of each entry written by this module.
`CommissionLedgerEntry.OrderId` holds the document id that keeps the unique (OrderId, InstructorId, Kind) index
meaningful: the order (single-item sale), the order item (multi-item sale), a derived id per (refund|dispute, original
entry) for reversals, or the pool line id.

## Invoices

Numbers `INV-YYYY-NNNNNN` and `CN-YYYY-NNNNNN`, sequential per kind and year without gaps (counter row incremented in
the same transaction as the document insert). Buyer name (checkout `billingName` or display name), email, country,
lines. Tax fields only when `Tax:Mode=Inclusive` and an admin rate exists for the buyer country. The seller name, address and
tax id are copied onto each invoice/credit note at issue time (1:1 side table `Commerce_InvoiceSellerSnapshots`); a credit
note issued after the seller configuration was removed reuses the original invoice's snapshot.

## Configuration keys

| Key | Default |
|---|---|
| `Commission:InstructorSharePercent` | 70 |
| `Commission:ReferralInstructorSharePercent` | = InstructorSharePercent |
| `Commission:SubscriptionPoolPercent` | = InstructorSharePercent |
| `Commerce:RefundWindowDays` | 30 |
| `Commerce:InstructorCouponMaxPercent` | 50 |
| `Commerce:CouponReservationMinutes` | 60 |
| `Commerce:PromotionMaxPercent` | 70 |
| `Commerce:AffiliateMaxPercent` | 30 |
| `Commerce:BackgroundJobsEnabled` | true |
| `Commerce:JobIntervalMinutes` | 60 |
| `Commerce:PoolAllocationDelayDays` | 3 |
| `Subscriptions:GraceDays` | 7 |
| `Subscriptions:MaxUnitsPerSubscriberPerCourse` | 30 |
| `Payouts:MinimumAmount` | 50 |
| `Invoice:SellerName`, `Invoice:SellerAddress`, `Invoice:SellerTaxId` | — (PDF 503 when missing) |
| `Tax:Mode` | None (`Inclusive` to enable) |
| `Stripe:SecretKey`, `Stripe:WebhookSecret`, `Stripe:ApiBaseUrl`, `Stripe:SuccessUrl`, `Stripe:CancelUrl` | existing |

## Order browser (final wave)

`GET /api/admin/orders` — policy Finance (Finance, Admin, SuperAdmin). Query: `status` (OrderStatus, case-insensitive),
`email` (exact buyer email, case-insensitive), `courseId`, `from`/`to` (UTC, on CreatedAt), `currency` (ISO-3),
`coupon` (code, case-insensitive), `page` (>=1), `pageSize` (1-100, default 25). Newest first.
Response `{ items: [{ id, userId, buyerEmail, status, kind, total, currency, discountAmount, refundedAmount, couponCode,
itemCount, createdAt, paidAt }], total, page, pageSize }`. 400 on invalid filters.

`GET /api/admin/orders/{id}` — Finance. `{ order, priceSource, country, listAmount, items[{courseTitle,...}], payments
(full provider ids), refunds, invoices, ledger (commission entries linked by order or ledger source), disputes }`.

`GET /api/support/orders?email=&orderId=` — policy Support (Support, Admin, SuperAdmin), read-only, at least one filter
(400 `lookup_required`), max 50. `{ id, userId, maskedBuyerEmail, status, total, currency, createdAt, paidAt, courseTitles,
maskedPaymentIds ("pi_…WXYZ"), refunds[{amount,status,createdAt}], invoiceNumbers }` — no ledger/commission data.
