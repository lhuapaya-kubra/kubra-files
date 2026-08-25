---
type: spec
platform: BizHQPlus
product: Reports
tags: [spec, idoxs-legacy, enrollment-reports, consumer-reports]
---

# Consumer Enrollment Reports (BizHQ+) vs. iDoxs Enrollment Reports

## Scope of this document

**Contains:**
- A mapping between the legacy iDoxs enrollment reports and their current BizHQ+ equivalents.
- Purpose, data source, and update cadence for each report, sourced from the internal iDoxs Implementation Guide plus Confluence PRDs and live BizHQ+ product docs.
- Column/field-level detail for both sides.
- Why the iDoxs reports exist (a daily per-account file drop clients use to keep their own CIS in sync) and how that use case carries over to BizHQ+.
- iDoxs reports that have **no confirmed BizHQ+ equivalent yet** — a real gap list, not a guess.
- Known open issues that affect using these reports for CIS sync.

**Does not contain:**
- A field-by-field CIS mapping (i.e., which specific CIS field on the client's side consumes which report column) — the `external_id` column exists specifically to support this, but no CIS-side mapping doc was found.
- FTS (File Transformation Service) column-remapping mechanics beyond a summary — that's a separate PRD.
- Consumer Communication Preferences Report detail — net-new, no iDoxs legacy equivalent and no data source built yet.

## Sources

- [KUBRA iDoxs Suite — Enrollment Reports Implementation Guide](idoxs-enrollment-reports-implementation-guide.md) — internal PDF, full field-level detail for every legacy report (saved alongside this doc)
- [FTS additions - Consumer and AutoPay Reports](https://kubra.jira.com/wiki/spaces/MIC/pages/1840152626/FTS+additions+-+Consumer+and+AutoPay+Reports) — background on the iDoxs → BizHQ+ consolidation
- [UX: BizHQ+ - Consumer Reporting](https://kubra.jira.com/wiki/spaces/AG/pages/1636925800/UX+BizHQ+-+Consumer+Reporting) — report-to-report mapping table (iDoxs legacy name → BizHQ+ report → data source table)
- [Consumer Enrollment Report (PRD)](https://kubra.jira.com/wiki/spaces/AG/pages/1999339530/Consumer+Enrollment+Report) — filters, columns, business rules
- [Consumer Activity Report (PRD)](https://kubra.jira.com/wiki/spaces/AG/pages/1990328362/Consumer+Activity+Report) — filters, columns, business rules
- [View Consumer Reports](https://kubra.jira.com/wiki/spaces/AG/pages/1783300149/View+Consumer+Reports) and its [ReadMe mirror](https://kubra.jira.com/wiki/spaces/AG/pages/2096332977/ReadMe+Mirror+View+Consumer+Reports) (source of truth: [readme.kubra.io/kubrahq/docs/viewing-consumer-reports](https://readme.kubra.io/kubrahq/docs/viewing-consumer-reports)) — client-facing heading/column glossary
- [Consumer Reporting Requirements - PRD](https://kubra.jira.com/wiki/spaces/AG/pages/1360462111/Consumer+Reporting+Requirements+-+PRD) — earlier requirements pass
- Live report example (sandbox): `https://abcenergy.bizhq.dev.kubra.io/live/report/consumer`
- Related open issues: [ANALYTICS-4294](https://kubra.jira.com/browse/ANALYTICS-4294) (External ID column, for client-system/CIS identification), [KHQS-671](https://kubra.jira.com/browse/KHQS-671) (duplicate consumer rows), [ANALYTICS-4351](https://kubra.jira.com/browse/ANALYTICS-4351) (exclude unverified profiles)

> Note: "KHQ" is treated as BizHQ+ / the KUBRA HQ platform, not a separate product — the platform's own docs use "KHQ" and "BizHQ+" interchangeably (e.g. "Enrolled on Time... the KUBRA HQ (KHQ) platform").

---

## Why the iDoxs reports exist: updating the client's CIS

On iDoxs, enrollment reports run as a **daily, per-account batch job**, gated by a KEIS property (`EnrollmentReports = Yes`) and a per-account field definition table (`Subscriber_EnrollmentReportDefinition`). Output is CSV/TXT (comma-delimited by default), dropped into the account's `Transmissions` folder via the same Daemon routing tool used for remittance and batch-post files. That file drop **is** the CIS integration — the client's CIS has no other way to learn who enrolled, who was deleted, or what changed, so it ingests these daily files directly.

That mechanic is also why the field lists per report are so granular (see the [full implementation guide](idoxs-enrollment-reports-implementation-guide.md)) — a CIS on the other end is expected to parse a fixed, per-account-configured column layout, not call an API.

BizHQ+ replaced the daily push with a live, pull-based report (refreshed every 4 hours) — but the reconciliation need didn't go away. That's the direct motivation for the `external_id` field ("the identifier that exists on the client's system") added to both the Consumer Enrollment Report and Consumer Activity Report ([ANALYTICS-4294](https://kubra.jira.com/browse/ANALYTICS-4294)): without it, a client's CIS has no key to match a BizHQ+ row back to its own record, the way it used to via the flat file.

## Report mapping: iDoxs legacy → BizHQ+ consolidated

| iDoxs legacy report | Report type | BizHQ+ report it lives in now | What it captures | BizHQ+ data source |
|---|---|---|---|---|
| **AllUsers** | `ALL` | **Consumer Enrollment Report** | Point-in-time snapshot of all currently *active* enrolled consumers. If a consumer is deleted, they drop out entirely — not a historical record. | `dim_consumers_data` table |
| **NewUsers** | `NEW` | **Consumer Activity Report**, filtered to `Action Taken = consumer.create.successful` | Consumers who created a profile on MyHQ+ | `consumer_data_history` table (all consumer events) |
| **DeletedUsers** | `DELETED` | **Consumer Activity Report**, filtered to `Action Taken = consumer.delete.successful` | Consumers removed from the platform — identical field shape to NewUsers on iDoxs, same table on BizHQ+, just a different filter value | `consumer_data_history` table |
| **ChangedUsers** | `CHANGED` | **Consumer Activity Report**, filtered to update-type actions (e.g. `consumer.update.successful`, `consumer.contact.verified.successful`, payable linked/unlinked events) | What a consumer changed on their profile | `consumer_data_history` table |
| **RecurringPaymentUsers** | `RECURRING` | **AutoPay Enrollment Report** (snapshot) | Active AutoPay profiles associated with a consumer. Drops off if the profile is deleted, same as AllUsers/Consumer Enrollment. | AutoPay data source ([Confluence ref](https://kubra.jira.com/wiki/spaces/MIC/pages/1500840239)) |
| **ChangedRecurring** (.NET only) | `CHANGEDRECURRING` | **AutoPay Activity Report** | Full AutoPay/recurring event history (created, modified, deleted, paused, resumed, payment skipped/failed) — the activity-log counterpart to RecurringPaymentUsers' snapshot | Same AutoPay data source |
| *(no legacy equivalent)* | — | **Consumer Communication Preferences Report** | SMS/email opt-in/opt-out, paperless vs. paper | Not yet built — "we don't have it yet" per the UX PRD |

### iDoxs reports with no confirmed BizHQ+ equivalent

These exist on iDoxs but weren't found mapped to any current BizHQ+ report — worth confirming with the team whether clients on these still rely on the legacy file, or whether the need was dropped:

| iDoxs report | Report type | Purpose | Status |
|---|---|---|---|
| **i-doxsAccounts** | `DISTINCT` | Distinct list of `SubscriberKey`s only — always generated regardless of definitions | ⚠️ No confirmed BizHQ+ equivalent |
| **RecurringDetail** | `RECURRINGDETAIL` | Full recurring-payment method detail (card expiry/nickname, ACH nickname, group info) — more granular than RecurringPaymentUsers | ⚠️ No confirmed BizHQ+ equivalent |
| **ChangedUsersWithAccount** | `CHANGEDWACCOUNT` | Changed-user events scoped with account-level fields | ⚠️ No confirmed BizHQ+ equivalent |
| **BankAccounts** | `BANKACCOUNT` | Linked bank account nickname/type/routing detail | ⚠️ No confirmed BizHQ+ equivalent |
| **UndeliveredEmail** | `BOUNCED` | Bounced/undelivered email queue detail, including SendGrid status when enabled | ⚠️ No confirmed BizHQ+ equivalent |
| **SharedAccess** | `SHAREDACCESS` | Users with shared/delegated access to an account | ⚠️ No confirmed BizHQ+ equivalent |
| **NOCReport** | `NOC` | Payment correction/reason-code detail (notification of change) | ⚠️ No confirmed BizHQ+ equivalent |
| **CustomReports** | `kcr_{CustomName}` | Per-client custom stored-procedure reports | ⚠️ No confirmed BizHQ+ equivalent |

**Pattern to note:** BizHQ+ collapsed what were 3 separate iDoxs report files (NewUsers, DeletedUsers, ChangedUsers — identical/near-identical field shape on iDoxs) into **one** report (Consumer Activity Report) with a filterable `Action Taken` column, plus a separate point-in-time snapshot report (Consumer Enrollment Report) for "who's active right now." RecurringPaymentUsers/ChangedRecurring follow the same enrollment-snapshot-vs-activity-history split via AutoPay Enrollment/Activity Reports.

## BizHQ+ report reference

All four live reports sit under **BizHQ+ → Report → Consumer tab**, refreshed **every 4 hours** (replacing iDoxs' daily push cadence).

| Report | Purpose | Key columns |
|---|---|---|
| **Consumers Enrollment Report** | Snapshot of active consumer profiles | Enrolled On Time, First/Last Name, Primary Email, Primary Phone, Account Number(s), Locale, External ID |
| **Consumer Activity Report** | Event-level history of consumer actions | Activity Time, Action Taken, Email, Phone, Name, Account Number, Locale, External ID |
| **AutoPay Enrollment Report** | Snapshot of active AutoPay profiles | Enrollment Time, Profile Type (Fixed/Dynamic), Schedule Type, Funding Source Type, Masked PAN, End Condition |
| **AutoPay Activity Report** | Event-level history of AutoPay changes | Activity Time, Event Type (e.g. `AUTOPAY_PROFILE_CREATED`, `_DELETED`, `_PAUSED`, `_RESUMED`), Status |

Business rules worth carrying into a CIS-reconciliation workflow:
- **Active Consumer Rule**: only active-status consumers/profiles appear in the snapshot reports — deleted ones vanish (use the *activity* report to see deletions), mirroring how AllUsers/RecurringPaymentUsers behaved on iDoxs.
- **Duplicate handling**: [KHQS-671](https://kubra.jira.com/browse/KHQS-671) logged a duplicate-row case (City of Stamford) from an unverified in-progress signup — [ANALYTICS-4351](https://kubra.jira.com/browse/ANALYTICS-4351) tracks excluding unverified profiles to fix this.
- **Latest-update precedence**: for Primary Email/Phone/Locale/Name, the report always shows the most recent value, even if updated → deleted → updated again.
- **PII handling**: email/phone are masked or restricted based on user role/export permissions.

## Open gaps to flag before this becomes the CIS-facing reference

- No confirmed field-by-field mapping from BizHQ+ report columns to actual CIS ingestion fields — only the `external_id` reconciliation key is confirmed.
- Eight iDoxs reports (see table above) have no confirmed BizHQ+ replacement — needs a decision on whether any client still depends on them.
- Consumer Communication Preferences has no data source yet.
- FTS work to let clients hide/rename/reorder BizHQ+ columns to match their own CIS format (mirroring the per-account `Subscriber_EnrollmentReportDefinition` flexibility iDoxs had) is still in PRD/design stage, not shipped.

## Related

- [[Reports]]
