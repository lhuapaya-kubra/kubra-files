---
type: spec
platform: BizHQPlus
product: Reports
tags: [spec, prd, enrollment-data-files, consumer-reports, idoxs-legacy]
---

# Consumer Enrollment Data Files — PRD

**PRD Status:** draft

**Owner:** Luciano Huapaya

**Initiative:** [KUBRA-83 — Consumer Enrollment Data Files](https://kubra.jira.com/browse/KUBRA-83)

> **Note:** These data files are sent every day, and each file contains the last 24 hours of the latest data.

> **Scope:** This is primarily for MyHQ+ clients migrating from iDoxs to KHQ.

**Reference Materials:** [Proposed Jaro data files (Google Drive)](https://drive.google.com/drive/folders/1Dn5Xbq36UVPKkg6m2rKjQRqcwLXK-lnG) — the sample files under this PRD's [KHQconsumerenrollment_datafile_examples](KHQconsumerenrollment_datafile_examples/) folder mirror what's proposed here for Jaro's review.

**Looker Reporting Requirements folder (Confluence):** [Consumer Enrollment Data Files](https://kubra.jira.com/wiki/spaces/AG/folder/2161016845/Consumer+Enrollment+Data+Files)

## Problem

- **Client CIS Reconciliation Need** — MyHQ+ clients migrating from the legacy iDoxs platform to KHQ need to keep their CIS systems in sync with consumer and AutoPay enrollment data. On iDoxs, a client could select specific data files from the iDoxs enrollment reports (AllUsers, NewUsers, DeletedUsers, etc. — see the legacy [KUBRA iDoxs Suite — Enrollment Reports - ImplementationGuide](https://docs.google.com/document/d/12EbO0xZenlF9YCb9OgmU61rtQF60lLF6r2qyBmteNgA/edit?tab=t.0#heading=h.xlomrnfv0lx0), transcribed locally in [idoxs-enrollment-reports-implementation-guide.md](../idoxs-enrollment-reports-implementation-guide.md)), which were scheduled and sent to the client's SFTP daily for automation purposes. KHQ currently has no data files spec'ed out for this kind of automation for MyHQ+ — only a live, pull-based report exists, which requires a manual pull rather than an automated daily SFTP feed. That gap is a blocker for clients migrating to KHQ, since they'd lose the automation their CIS integration depends on; this initiative is meant to help keep that integration intact via the files being sent. It does not map every legacy iDoxs enrollment report 1:1 — see Out-of-Scope below.

## Solution

- **Standardized Consumer & AutoPay Files** — Standardized consumer and AutoPay data files for client automation.

## Use Cases

- In-Scope

| KHQ file | Purpose | Key columns | Looker Requirements & Sample Data |
|---|---|---|---|
| **Consumer Enrollment Report** | Snapshot of active consumer profiles | Enrolled On Time, First/Last Name, Primary Email, Primary Phone, Account Number(s), Locale, External ID | [Requirements](looker-report-requirements/consumer-enrollment-report.md) · [Sample Data](https://docs.google.com/spreadsheets/d/1h69oQ9X2tqmrfcLjtXx1MY8WHEaWPWeAxR_6PIv7DeM/edit?gid=2062623831#gid=2062623831) |
| **Consumer Activity Report** | Event-level consumer history (create/delete/update), for CIS sync | Activity Time, Action Taken, Email, Phone, Name, Account Number, Locale, External ID | [Requirements](looker-report-requirements/consumer-activity-report.md) · [Sample Data](https://docs.google.com/spreadsheets/d/1nmFt0a97hERcV-zzQ8kMCO7z8SFG1CAw6zfsh0ZNdf8/edit?gid=5678582#gid=5678582) |
| **AutoPay Enrollment Report** | Snapshot of active AutoPay profiles | Enrollment Time, Profile Type (Fixed/Dynamic), Schedule Type, Funding Source Type, Masked PAN, End Condition, External ID | [Requirements](looker-report-requirements/autopay-enrollment-report.md) · [Sample Data](https://docs.google.com/spreadsheets/d/1ByZjvF9Mpfcmu9Kkxxv9lCj5c0Ct4S_ZudWHGgWuGS8/edit?gid=1268356411#gid=1268356411) |
| **AutoPay Activity Report** | Event-level history of AutoPay changes | Activity Time, Event Type (e.g. `AUTOPAY_PROFILE_CREATED`, `_DELETED`, `_PAUSED`, `_RESUMED`), Status, External ID | [Requirements](looker-report-requirements/autopay-activity-report.md) · [Sample Data](https://docs.google.com/spreadsheets/d/1LygCgf6iV6D8qoYm4nD7oojddFb0zFnXRvQLh_Ebbno/edit?gid=2136784615#gid=2136784615) |

- Out-of-Scope
    - **Communication Preferences Report** — no data source built yet
    - **8 unmapped legacy reports** — i-doxsAccounts, RecurringDetail, ChangedUsersWithAccount, BankAccounts, UndeliveredEmail, SharedAccess, NOCReport, CustomReports — pending a decision on whether any client still depends on them
    - **CIS field mapping doc** — field-by-field mapping of client-side CIS field ↔ report column, not yet written

## Billing

- **Not Billable** — These reports are part of the standard MyHQ+ implementation.

## Reporting

- **None** — not reports but data files sent to the client on a daily basis.

## Front-End

- **None.**

## Milestones

- **Phase 1** — Jaro to review the consumer data files.
- **Phase 2** — Implement these files being sent and test.

## Related

- [[Reports]]
- [Consumer Enrollment Data Files — Details for Jaro](consumer-enrollment-data-files-jaro-details.md) — full column/report-level detail behind this PRD
- [Looker Reporting Requirements](looker-report-requirements/) — per-report Looker requirements, sample CSV, and sample data links for each of the four in-scope reports
