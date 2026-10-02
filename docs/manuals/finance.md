# Finance Manual (Finance, Admin, SuperAdmin)

The Finance role needs two-factor authentication. All finance actions are audited. Amounts are in major currency units
with each currency's own decimals. Mastemy never stores card data; Stripe processes payments.

## What Mastemy sells

Packages, bundles, subscriptions and gifts sell **study services**: premium notes, MCQ banks, mocks, analytics and AI
allowances. Course videos are free YouTube embeds and are never sold. Instructors are never paid on YouTube views.

## Payment lifecycle

1. Checkout creates a pending order with a server-computed price (regional price, offer, one coupon).
2. Stripe calls `POST /api/webhooks/stripe`. The signature is checked, each event is processed once, and the amount
   and currency must match the order.
3. On payment, the server:
   - grants the entitlement or creates the gift code;
   - writes commission ledger entries (instructor shares, referral share, affiliate share paid from the platform
     share);
   - records the coupon redemption;
   - issues the invoice.
4. A redirect back from Stripe is never treated as payment. If Stripe shows failed webhook deliveries, replay them from
   the Stripe dashboard (processing is idempotent).

## Refunds (Finance → Refunds)

- **Learner refund requests** arrive within `Commerce:RefundWindowDays` (30 by default). Approve or reject them.
- **Staff refunds** on any order: full or partial, up to the remaining amount, with a reason.
  - A full refund revokes the order's entitlements. For a partial one, you choose whether to revoke.
  - Organization, subscription and grant access is never touched.
  - A credit note is issued.
  - Gifts can be refunded only before redemption.
- If Stripe fails, the refund is marked Failed and nothing else changes. Retry after checking Stripe.
- Learners cannot request subscription refunds (`subscription_refund_not_supported`). Cancellation stops renewal.

## Disputes (chargebacks)

Disputes appear in Finance → Disputes.

- **Opened**: the instructor commission for the disputed share is reversed at once.
- **Won**: the commission is reinstated.
- **Lost**: purchase entitlements and premium-earned certificates are revoked, and an unredeemed gift is voided.

Evidence is submitted in the Stripe dashboard.

## Reconciliation

Finance → Reconciliation, up to 93 days. For each UTC day and currency it compares:

- payments with ledger sales;
- refunds with ledger reversals;
- chargebacks.

A day with a difference is marked `mismatch`. Expected mismatch: orders for courses without revenue-share instructors.
Investigate any other mismatch before you approve payouts. Compare totals with the Stripe balance report monthly.

## Invoices and tax

- Invoice and credit-note numbers are sequential per year with no gaps (`INV-YYYY-NNNNNN`, `CN-YYYY-NNNNNN`).
- PDFs work only when `Invoice:SellerName`, `Invoice:SellerAddress` and `Invoice:SellerTaxId` are configured.
- `Tax:Mode=Inclusive` turns on the per-country tax rates you enter (Finance → Tax rates, 0–50%). Mastemy has no
  built-in tax rules. A qualified tax adviser must decide registrations, rates and invoice wording for each market
  before launch.

## Instructor payouts

1. **Payout profiles**: check each instructor's tax documentation outside Mastemy, then set the tax-form status
   (NotSubmitted, Submitted, Verified, Rejected). Only Verified instructors can request payouts.
2. **Requests**: an instructor claims their cleared balance, meaning entries older than the refund window. The minimum
   is `Payouts:MinimumAmount`.
3. **Batch**: select requests to create a Draft payout batch. A *different* Finance user approves it.
4. **Pay**: make the transfers outside Mastemy (bank or payment provider) from the instructor's payout details. Mastemy
   shows the destination masked, so confirm the full details through your own verified channel. Record your reference.
5. **Reject** a request with notes to release its entries.
6. **Held batches**: these belong to suspended instructors and cannot be approved until the instructor is reinstated.
7. **Statements**: per instructor and month (CSV or PDF) for queries.

## Subscription pool

Each month, subscription revenue (minus refunds) times `Commission:SubscriptionPoolPercent` is shared between courses
in proportion to subscribers' premium usage units. Usage units are capped, and the following are excluded: authors,
staff, and refunded or charged-back subscribers. The job allocates automatically `Commerce:PoolAllocationDelayDays`
after month end. You can also run it from Finance → Subscription pool; it is idempotent. The formula is in
`docs/api-contract-wave3/commerce.md`.

## Affiliates

Create affiliates with a code, a commission (at most `Commerce:AffiliateMaxPercent`) and an attribution window
(1–90 days). Deactivate them when the contract ends. Affiliates cannot earn on their own purchases.

## Month-end checklist

1. Reconciliation shows no unexplained mismatch.
2. Disputes have been reviewed.
3. The subscription pool has been allocated.
4. Payout requests have been batched and approved by a second person.
5. Transfers have been made.
6. Invoices and credit notes have been exported for the accountant.
