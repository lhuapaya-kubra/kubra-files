---
type: spec
platform: BizHQPlus
product: Reports
tags: [spec, enrollment-data-files, consumer-reports, idoxs-legacy]
---

# Consumer Enrollment Data Files — Details

Full column- and report-level detail behind the [Consumer Enrollment Data Files — PRD](consumer-enrollment-data-files-prd.md). Per-report Looker Reporting Requirements, sample CSVs, and sample data links live under [looker-report-requirements/](looker-report-requirements/).

> **Note:** These data files are sent every day, and each file contains the last 24 hours of the latest data.

**Reference Materials:** [Proposed Jaro data files (Google Drive)](https://drive.google.com/drive/folders/1Dn5Xbq36UVPKkg6m2rKjQRqcwLXK-lnG)

**Looker Reporting Requirements folder (Confluence):** [Consumer Enrollment Data Files](https://kubra.jira.com/wiki/spaces/AG/folder/2161016845/Consumer+Enrollment+Data+Files)

## KHQ enrollment data files: current reference

Proposed data files that will get sent to Jaro for client implementation.

| KHQ file | Purpose | Key columns | Looker requirements / samples |
|---|---|---|---|
| **Consumer Enrollment Report** | Snapshot of active consumer profiles | Enrolled On Time, First/Last Name, Primary Email, Primary Phone, Account Number(s), Locale, External ID | [Requirements](looker-report-requirements/consumer-enrollment-report.md) · [CSV](KHQconsumerenrollment_datafile_examples/Consumers%20Enrollment%20Report%202026-08-25T1333.csv) · [Sheet](https://docs.google.com/spreadsheets/d/1h69oQ9X2tqmrfcLjtXx1MY8WHEaWPWeAxR_6PIv7DeM/edit?gid=2062623831#gid=2062623831) |
| **Consumer Activity Report** | Event-level history of consumer actions | Activity Time, Action Taken, Email, Phone, Name, Account Number, Locale, External ID | [Requirements](looker-report-requirements/consumer-activity-report.md) · [CSV](KHQconsumerenrollment_datafile_examples/Consumer%20Activity%20Report%202026-08-25T1332.csv) · [Sheet](https://docs.google.com/spreadsheets/d/1nmFt0a97hERcV-zzQ8kMCO7z8SFG1CAw6zfsh0ZNdf8/edit?gid=5678582#gid=5678582) |
| **AutoPay Enrollment Report** | Snapshot of active AutoPay profiles | Enrollment Time, Profile Type (Fixed/Dynamic), Schedule Type, Funding Source Type, Masked PAN, End Condition, External ID | [Requirements](looker-report-requirements/autopay-enrollment-report.md) · [CSV](KHQconsumerenrollment_datafile_examples/AutoPay%20Enrollment%20Report%202026-08-25T1332.csv) · [Sheet](https://docs.google.com/spreadsheets/d/1ByZjvF9Mpfcmu9Kkxxv9lCj5c0Ct4S_ZudWHGgWuGS8/edit?gid=1268356411#gid=1268356411) |
| **AutoPay Activity Report** | Event-level history of AutoPay changes | Activity Time, Event Type (e.g. `AUTOPAY_PROFILE_CREATED`, `_DELETED`, `_PAUSED`, `_RESUMED`), Status, External ID | [Requirements](looker-report-requirements/autopay-activity-report.md) · [CSV](KHQconsumerenrollment_datafile_examples/AutoPay%20Activity%20Report%202026-08-25T1332.csv) · [Sheet](https://docs.google.com/spreadsheets/d/1LygCgf6iV6D8qoYm4nD7oojddFb0zFnXRvQLh_Ebbno/edit?gid=2136784615#gid=2136784615) |

> **Note:** The Consumer Communication Preferences Report (SMS/email opt-in/opt-out, paperless vs. paper) isn't configured from the BizHQ+ Reports section — it's part of Service Delivery implementation, not this report catalog.

Business rules worth carrying into a CIS-reconciliation workflow:
- **Active Consumer Rule**: only active-status consumers/profiles appear in the snapshot files — deleted ones vanish (use the *activity* report to see deletions), mirroring how AllUsers/RecurringPaymentUsers behaved on iDoxs.
- **Latest-update precedence**: for Primary Email/Phone/Locale/Name, the report always shows the most recent value, even if updated → deleted → updated again.
- **Active consumer =**: *created user & verified contact.*

## Legacy background: iDoxs report → KHQ file mapping

Source: [KUBRA iDoxs Suite — Enrollment Reports - ImplementationGuide](https://docs.google.com/document/d/12EbO0xZenlF9YCb9OgmU61rtQF60lLF6r2qyBmteNgA/edit?tab=t.0#heading=h.xlomrnfv0lx0) (CONFIDENTIAL — KUBRA Internal Use Only), transcribed locally in [idoxs-enrollment-reports-implementation-guide.md](../idoxs-enrollment-reports-implementation-guide.md).

| iDoxs legacy report | Report type | KHQ file it lives in now | What it captures | KHQ data source |
|---|---|---|---|---|
| **AllUsers** | `ALL` | **Consumer Enrollment Report** | Point-in-time snapshot of all currently *active* enrolled consumers. If a consumer is deleted, they drop out entirely — not a historical record. | `dim_consumers_data` table |
| **NewUsers** | `NEW` | **Consumer Activity Report**, filtered to `Action Taken = consumer.create.successful` | Consumers who created a profile on MyHQ+ | `consumer_data_history` table (all consumer events) |
| **DeletedUsers** | `DELETED` | **Consumer Activity Report**, filtered to `Action Taken = consumer.delete.successful` | Consumers removed from the platform — identical field shape to NewUsers on iDoxs, same table on KHQ, just a different filter value | `consumer_data_history` table |
| **ChangedUsers** | `CHANGED` | **Consumer Activity Report**, filtered to update-type actions (e.g. `consumer.update.successful`, `consumer.contact.verified.successful`, payable linked/unlinked events) | What a consumer changed on their profile | `consumer_data_history` table |
| **RecurringPaymentUsers** | `RECURRING` | **AutoPay Enrollment Report** (snapshot) | Active AutoPay profiles associated with a consumer. Drops off if the profile is deleted, same as AllUsers/Consumer Enrollment. | AutoPay data source |
| **ChangedRecurring** (.NET only) | `CHANGEDRECURRING` | **AutoPay Activity Report** | Full AutoPay/recurring event history (created, modified, deleted, paused, resumed, payment skipped/failed) — the activity-log counterpart to RecurringPaymentUsers' snapshot | Same AutoPay data source |

**Pattern:** KHQ collapsed 3 near-identical iDoxs files (NewUsers, DeletedUsers, ChangedUsers) into **one** Consumer Activity Report with a filterable `Action Taken` column, plus a separate Consumer Enrollment Report snapshot for "who's active right now." AutoPay Enrollment/Activity Reports follow the same snapshot-vs-history split for RecurringPaymentUsers/ChangedRecurring.

## iDoxs reports with no confirmed KHQ equivalent

| iDoxs report | Report type | Purpose | Status |
|---|---|---|---|
| **i-doxsAccounts** | `DISTINCT` | Distinct list of `SubscriberKey`s only — always generated regardless of definitions | ⚠️ No confirmed KHQ equivalent |
| **RecurringDetail** | `RECURRINGDETAIL` | Full recurring-payment method detail (card expiry/nickname, ACH nickname, group info) — more granular than RecurringPaymentUsers | ⚠️ No confirmed KHQ equivalent |
| **ChangedUsersWithAccount** | `CHANGEDWACCOUNT` | Changed-user events scoped with account-level fields | ⚠️ No confirmed KHQ equivalent |
| **BankAccounts** | `BANKACCOUNT` | Linked bank account nickname/type/routing detail | ⚠️ No confirmed KHQ equivalent |
| **UndeliveredEmail** | `BOUNCED` | Bounced/undelivered email queue detail, including SendGrid status when enabled | ⚠️ No confirmed KHQ equivalent |
| **SharedAccess** | `SHAREDACCESS` | Users with shared/delegated access to an account | ⚠️ No confirmed KHQ equivalent |
| **NOCReport** | `NOC` | Payment correction/reason-code detail (notification of change) | ⚠️ No confirmed KHQ equivalent |
| **CustomReports** | `kcr_{CustomName}` | Per-client custom stored-procedure reports | ⚠️ No confirmed KHQ equivalent |

## Open gaps

- No confirmed field-by-field mapping from KHQ file columns to actual CIS ingestion fields — only the `external_id` reconciliation key is confirmed. `external_id` is the consumer's FusionAuth user ID, now added to all four report requirements docs.
- Eight iDoxs reports (see table above) have no confirmed KHQ replacement — needs a decision on whether any client still depends on them.
- Consumer Communication Preferences Report is handled through Service Delivery implementation, not configured via BizHQ+ Reports — not tracked as a gap in this catalog.
- FTS work to let clients hide/rename/reorder KHQ columns to match their own CIS format is still in PRD/design stage, not shipped.

## Related

- [[Reports]]
- [Consumer Enrollment Data Files — PRD](consumer-enrollment-data-files-prd.md)
- [Looker Reporting Requirements](looker-report-requirements/) — per-report Looker requirements, sample CSV, and sample data links
