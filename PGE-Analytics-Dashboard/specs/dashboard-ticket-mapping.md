# PG&E Analytics Dashboard — Dashboard-to-Ticket Mapping

**Source of truth (as written today):** [PG&E Analytics Dashboards (ANALYTICS-4304)](https://kubra.jira.com/wiki/spaces/AG/pages/2118811866) — authored by Prat, Confluence page id `2118811866`, under folder `AG/2128478389`.
**Backlog:** [CPERD board 3546](https://kubra.jira.com/jira/software/c/projects/CPERD/boards/3546/backlog), epic `CPERD-24` ("Payments").
**Status:** draft analysis — nothing written back to Confluence yet, per request.

## Why this doc exists

The Confluence page defines 5 dashboards and explicitly cites **11 CPERD tickets** as the "11 CPERD asks" in scope. But the `Payments` epic in Jira (`CPERD-24`) actually has **22 child tickets**. That means 11 tickets under the same epic aren't mentioned anywhere in the scope doc. This maps all 22 — the 11 already-cited ones plus the 11 that aren't — to the 5 dashboards, so gaps are visible before anyone edits the Confluence page.

Confidence is marked because the 11 "new" mappings are inferred from ticket title + description, not confirmed by Prat/Luciano.

## The 5 dashboards, as currently scoped in Confluence

| # | Dashboard | Problem statement (one-line) | Officially cited tickets |
|---|---|---|---|
| 1 | **Payment Mix** | How customers choose to pay (mode × channel) and how that's shifting over time | CPERD-56, 58, 35 |
| 2 | **Payment Health** | Why payments fail to complete cleanly — rejections, returns, autopay reliability | CPERD-40, 65, 62 |
| 3 | **Card Analysis** | Card behavior — brand, debit/credit, commercial vs. residential | CPERD-57, 59, 64 |
| 4 | **Reconciliation & Settlement** | Expected settlement vs. actual banked amounts, anomaly alerting (KUBRA Treasury) | CPERD-4 |
| 5 | **Billing & Collections** | How many payers pay after their due date, and by how long | CPERD-54 |

## Full mapping — all 22 tickets under the Payments epic (CPERD-24)

| Ticket | Summary | Officially cited in Confluence? | Proposed dashboard | Confidence | Notes |
|---|---|---|---|---|---|
| CPERD-56 | Payment Breakdown by Mode | ✅ Yes | Payment Mix | Confirmed | — |
| CPERD-58 | Payment Mode over Channel | ✅ Yes | Payment Mix | Confirmed | — |
| CPERD-35 | Adoption trends across payment channels/methods | ✅ Yes | Payment Mix | Confirmed | — |
| CPERD-33 | Payment trend analysis dashboard (YoY/QoQ/MoM, filter by status/method/channel/autopay) | ❌ No | **Payment Mix** | High | Reads as the overarching macro-trend ask that 56/58/35 were broken out from — near-duplicate of the Payment Mix "solution" description |
| CPERD-36 | Seasonality of client payments (monthly volume/amount) | ❌ No | **Payment Mix** | High | Time-based trend of payment mix, matches "trendlines...MoM" ask |
| CPERD-37 | Utilization & value concentration (count vs. amount by type/status, channel overlay) | ❌ No | **Payment Mix** | High | Dimensions (mode, channel, status, count, amount) are an exact match to Payment Mix's listed minimum dimensions |
| CPERD-38 | Shifts in payment method preferences (ACH vs. CC, Visa vs. Mastercard, Apple Pay vs. CC) | ❌ No | **Payment Mix** | Medium | Mostly Payment Mix, but the Visa-vs-Mastercard comparison overlaps with Card Analysis |
| CPERD-61 | Wallet payments segmented by funding source (ACH, CC) | ❌ No | **Payment Mix** | High | Wallet is explicitly listed as a Payment Mix mode; this is a drill-down of it |
| CPERD-40 | Payment rejections over time by reason, exportable | ✅ Yes | Payment Health | Confirmed | — |
| CPERD-65 | Returns broken down by return reason | ✅ Yes | Payment Health | Confirmed | — |
| CPERD-62 | Autopay usage, counts/value/failure rate | ✅ Yes | Payment Health | Confirmed | — |
| CPERD-39 | Payment approval health % with threshold color-coding | ❌ No | **Payment Health** | High | Directly matches the "why payments fail to complete cleanly" problem statement |
| CPERD-41 | Payment returns over time (sorted by reason, exportable) | ❌ No | **Payment Health** | High | Near-duplicate of CPERD-65, just the trend/export view of the same data |
| CPERD-66 | Rejects broken down by rejection reason (auth error, expired card, timeout) | ❌ No | **Payment Health** | High | Near-duplicate of CPERD-40 |
| CPERD-57 | Payment Breakdown by Card Type | ✅ Yes | Card Analysis | Confirmed | — |
| CPERD-59 | Payment Mode vs. Debit/Credit | ✅ Yes | Card Analysis | Confirmed | — |
| CPERD-64 | Commercial vs. residential card payments | ✅ Yes | Card Analysis | Confirmed | — |
| CPERD-4 | Reconciliation & Settlement dashboard (actual vs. forecasted deposits) | ✅ Yes | Reconciliation & Settlement | Confirmed | — |
| CPERD-54 | Payers past due date, avg days past due | ✅ Yes | Billing & Collections | Confirmed | — |
| CPERD-55 | Invoiced amount vs. payment amount (under/over-payment) | ❌ No | **Billing & Collections** | Medium | Ticket's own "how will this be used" cites both reconciliation *and* billing accuracy — could arguably split with dashboard 4, but the payer-facing framing (did they pay what they owed) fits Billing & Collections better |
| CPERD-3 | Identify likely duplicate payments (same account/amount/period/funding source) | ❌ No | **Unclear — no clean fit** | Low | Not a "failure" (Payment Health) or a settlement-anomaly (Reconciliation & Settlement) in the strict sense — it's payment-quality/fraud detection. Flag for Prat/Luciano: possibly a 6th category or a Payment Health sub-metric |
| CPERD-53 | Payments made by new (first-time) customers | ❌ No | **Unclear — no clean fit** | Low | This is an acquisition/onboarding metric, not mode, health, card, reconciliation, or collections. Doesn't belong under any of the 5 as currently scoped |

## Direct answers to your two examples

- **1. Payment Mix** → officially 3 tickets (56, 58, 35); with the unmapped-but-clearly-fitting additions, **8 tickets total**: 56, 58, 35, 33, 36, 37, 38, 61.
- **5. Billing & Collections** → officially 1 ticket (54); with one likely addition, **2 tickets total**: 54, 55.

## Flags worth resolving before touching Confluence

1. **CPERD-3** (duplicate payments) and **CPERD-53** (new-customer payments) don't fit any of the 5 dashboards as scoped. Either they need a 6th dashboard/bucket, or they're out of scope for ANALYTICS-4223 and should stay unassigned.
2. There's a same-named-but-different-thing trap: the **`Billing`** epic (`CPERD-23`) is a separate Jira epic from the **Billing & Collections** dashboard. `CPERD-23` only has one child (`CPERD-22`, billing file processing/load times) and is unrelated to payment delinquency — don't conflate the two when searching Jira by "billing."
3. 11 of 22 Payments-epic tickets are undocumented in the current Confluence scope. Worth confirming with Prat whether that's intentional (out of the 11-ask scope for ANALYTICS-4223) or an oversight before the page is edited.
