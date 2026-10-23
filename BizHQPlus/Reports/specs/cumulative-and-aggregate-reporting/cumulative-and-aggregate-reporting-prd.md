---
type: spec
platform: BizHQPlus
product: Reports
tags: [spec, prd, cumulative-reporting, aggregate-reporting, remittance-v4.01, docweb, legacy-migration]
---

# Cumulative & Aggregate Level Reporting — PRD

**PRD Status:** Draft  
**Owner:** Luciano Huapaya  
**Initiative:** relates to KUBRA-204 (reference only, not linked in Jira)

> Both report types are **optional add-ons** (nice-to-have, offered this way in the past) for legacy clients migrating to KHQ where Katalyst/Service Delivery has mandated a like-for-like reproduction of the legacy output.

## Background

EZPay+ sends two files per client every day:

- Remittance file (previous effective day) and the
- Batch Post file (all transactions for the past day)

Legacy clients migrating to KHQ often receive outputs on the legacy system that the daily files cannot reproduce: transactions spanning a week or a month, or totals instead of transactions.

Katalyst has mandated like-for-like reproduction of these outputs. Without standard reports, each one becomes a bespoke report definition maintained by the data team.

**Proposal Payment Data Files**:

| | Window | Grain | Contents | Schema |
| --- | --- | --- | --- | --- |
| Daily (today) | 1 day | Transaction | Remittance and Batch Post files | v4.01 |
| **Cumulative reporting** | More than a day (1 week, 1 month, or whatever the client wants) | Transaction | Same transactional rows as the daily files, over a longer window | Same v4.01 schema |
| **Aggregate level reporting** | Any (e.g. a month), and can filter on certain values | Summary | Counts and aggregate sums only, grouped by dimensions such as itemType, businessUnit, Method of Payment, funding source. No transaction rows. | Aggregate Payment Report layout |

Cumulative = more transactions over more time. Aggregate = totals instead of transactions.

**High-level architecture:** KHQ Payment Data Files → DocWeb (file transformation by Katalyst/Service Delivery) → SFTP (client pickup) or email.

Most legacy outputs for the reports above for the top 20 clients, these reports are currently emailed to the client finance department.

## Problem

- The daily Remittance and Batch Post files cover one day only, so they cannot reproduce legacy outputs that span a week or a month.
- The daily files are transactional, so they cannot reproduce legacy outputs that are totals (counts and sums) instead of transactions.
- Katalyst has mandated like-for-like reproduction of legacy outputs, and without standard reports each one becomes a bespoke report definition maintained by the data team.
- The Aggregate Payment Report has requirements drafted but the build has not started, so there is no standard aggregate report to hand to DocWeb today.

## Use Cases

### In Scope

- **Two standard reports, no bespoke definitions.** Every like-for-like legacy request is served by the standard cumulative or the standard aggregate report. Zero new per-client report definitions on the data team.
- **Cumulative reuses v4.01 as-is.** No new columns. The window is the only new parameter versus the daily files. We will append data columns as needed.
- **The Aggregate Payment Report** (requirements drafted, build not started) becomes the single standard aggregate report.
- **Service Delivery can finish the job in DocWeb.** Both reports reach DocWeb in a form that supports each first client's 1:1 transformation.
- **Katalyst has a clear choice.** For each legacy output, Katalyst opts into one aggregate report or one transactional report for a given time period.

First clients (Jaro's "What's needed MATRIX", Aug 2026):

| Client (database) | Current output | Type | Notes |
| --- | --- | --- | --- |
| Middlesex | Monthly aggregate report (memo file) | Aggregate | validationPassed not available today (meaning unknown). |
| Middlesex | Transaction report for the reporting month | Cumulative (1 month) | Final Payment Transactions Report may suffice. |
| EBMUD | AMEX vs. everything-else report, emailed | Aggregate | Purpose unclear. Prefer a standard aggregate report over like-for-like. |
| EBMUDTW | CSV of approved payments, totals at the bottom | Cumulative (last 7 days, Approved) | Street address not available today, likely not required. |
| EBMUDTW (matrix row without client name; assumed, to confirm) | Same shape, Returned payments | Cumulative (last 7 days, Returned) | As above. |
| Unisource Energy Services (TEP, UESGas, UESElectric) | Unknown; SFTP; looks finance-oriented | Unclassified | Purpose unknown; enterprise or not unknown. |

### Out of Scope

- **Per-client custom report definitions.** The point is standard reports that can be passed to DocWeb for file transformation.
- **Changing the daily Remittance / Batch Post files or v4.01.** Cumulative reuses them unchanged.
- **Client self-serve scheduling.** The existing Final Payment Transactions Report (date and status filters, client-scheduled) may already serve some clients, but that is a separate path.
- **Sourcing missing legacy fields** (Middlesex validationPassed, EBMUDTW street address) until confirmed as required.
- Enterprise-client reporting (COPG initiative) and file merging (FTS-443) are future considerations, not MVP.

## Solution

Offer two standard payment data reports. For each like-for-like legacy output, Katalyst opts into **one** of:

1. **One aggregate-level report** — the standard Aggregate Payment Report (totals by grouping dimensions).
2. **One transactional report for a given time period** — cumulative reporting in the v4.01 schema (1 week, 1 month, or whatever the client wants).

Service Delivery then does the specific 1:1 client transformation in DocWeb, with no per-client report definitions on the data team.

### Proposed Data Flow

| Step | Description |
| --- | --- |
| Step 1 | Katalyst/Service Delivery identifies the legacy output a client needs and opts into either the aggregate report or the cumulative (transactional) report. |
| Step 2 | KHQ payment data already exists in the Remittance / Batch Post v4.01 schema. |
| Step 3 | Cumulative: the v4.01 rows for the requested window (and status filter, e.g. Approved or Returned) are produced. Aggregate: the Aggregate Payment Report produces counts and sums by grouping dimension, with a Grand Total row. |
| Step 4 | The file is delivered to DocWeb, where Service Delivery applies the client's 1:1 legacy transformation. |
| Step 5 | The transformed file is picked up by the client from SFTP or sent by email (today mostly to the client finance department). |

### Requirements

**Cumulative reporting**

- **C1.** Transaction-level output for a configurable window longer than one day (1 week, 1 month, or client-specified).
    - Given a window of 1 month, when the report runs, then it contains every v4.01 transaction row in that window and none outside it.
    - Window start/end and timezone behavior are documented and tested at week and month boundaries.
- **C2.** Uses the Remittance / Batch Post v4.01 schema. Column names and order match the v4.01 sample. New data columns are appended, never inserted or renamed.
- **C3.** Status filter (e.g. Approved, Returned). Given a status filter of Returned, only Returned payments appear.
- **C4.** Delivered to DocWeb for Service Delivery transformation, then SFTP or email.

**Aggregate level reporting**

- **A1.** Counts and aggregate sums only, grouped by dimensions (Payment Processor Code, Funding Source Type, Method of Payment, Payment Source, Transaction Status, Business Unit Code, per the Aggregate Payment Report draft), with a Grand Total row.
    - Output contains no transaction-level rows.
    - Count of Payment ID counts distinct payments.
    - Grand Total equals the sum of the group rows.
- **A2.** Terminal transaction states only; Transaction Status is not a user filter.
- **A3.** Repeated dimension values on every row (no blank-fill).
- **A4.** Delivered to DocWeb for Service Delivery transformation, then SFTP or email.

**Nice-to-have**

- Totals footer on cumulative files (depends on FTS-379 header/footer/fixed width).
- Add itemType to the aggregate grouping dimensions.
- Date or day/month grain column on the aggregate report.
- Net-amount / total-fees column on the aggregate report.

**Future considerations**

- Source missing legacy fields if confirmed as required: validationPassed, street address.
- Client self-serve scheduling of cumulative and aggregate reports.
- File merging (FTS-443) if a client needs combined outputs.
- Enterprise-client reporting (COPG initiative), designed so these reports extend to multiple BUs.

## Billing

This PRD proposes both report types as **optional add-ons**. Whether they are billable, and how, is to be decided (see Open Questions).

## Reporting

### Clients (finance departments)

- **Cumulative:** transactional file for a week, month, or client-specified window, in the client's legacy layout after DocWeb transformation.
- **Aggregate:** summary of counts and sums by grouping dimension, in the client's legacy layout after DocWeb transformation.
- Delivered via SFTP (client pickup) or email.

### KUBRA Employees (Service Delivery, Data team)

- Standard cumulative and aggregate reports as the inputs to DocWeb transformation.

## Front-End

- **None.** No new UI. Reports are produced as data files and delivered through DocWeb. Whether the producer is a scheduled Looker delivery or the File Transformation Service is an open question.

## Security

- The aggregate report contains no PII or payment card data (counts and sums only).
- Cumulative files carry the same v4.01 fields as the daily Remittance / Batch Post files, so the same data handling applies. A longer window means more transactions per file.
- Several clients receive these files by email, so emailing month-long transactional files needs a security review (see Open Questions).
- Access to the standard reports restricted to KUBRA employees and the DocWeb pipeline. Clients receive only their own transformed output.

**Risk: Medium** (proposed — larger transactional files, some delivered by email).

## Milestones

- (1) Resolve blocking open questions and confirm first-client classification (Middlesex, EBMUD, EBMUDTW, Unisource),
- (2) Build the Aggregate Payment Report and the cumulative window parameter,
- (3) Service Delivery configures DocWeb transformations for the first clients; test output parity against legacy,
- (4) Deliver via SFTP/email on schedule.

**Dependencies:** v4.01 production rollout (ANALYTICS-4497/4498/4499/4500/4521), FTS-379 (header/footer), DocWeb setup by Service Delivery. No hard deadline identified; confirm against client migration dates.

## Open Questions

| # | Owner | Question | Status |
| --- | --- | --- | --- |
| Q1 | Product / Data | Date basis for the window: effective date (as Remittance) or transaction/settlement date (as the Aggregate draft)? | Open — blocking |
| Q2 | Product / Engineering | Window definition: rolling vs. calendar; timezone and boundaries. | Open — blocking |
| Q3 | Engineering / Platform 1 | Delivery path: scheduled Looker delivery vs. File Transformation Service (FTS-439 vs. a new epic). | Open — blocking |
| Q4 | Product / Data | Which statuses are terminal for the aggregate report? | Open — blocking |
| Q5 | Jaro / Product | Unisource: report purpose, enterprise or not, one EZ-PAY+/MyHQ+ instance or several. | Open — blocking |
| Q6 | Service Delivery | Cadence: who owns the weekly/monthly schedule? | Open |
| Q7 | Engineering | Are month-long files within DocWeb/SFTP/email size limits? | Open |
| Q8 | Jaro | What is Middlesex validationPassed, and is it sourceable? | Open |
| Q9 | Jaro | Is the unnamed matrix row EBMUDTW? | Open |
| Q10 | Product / Finance | Are these add-ons billable, and how? | Open |
| Q11 | Luciano / Bhavik | Stamford paymentDate is still unmapped to v4.01. | Open |
| Q12 | Engineering | How is aggregate data scoped to client and live data without Client Name / Realm filters? | Open |
| Q13 | Security | Is emailing month-long transactional files acceptable, or should SFTP be required? | Open |

## Related Work

- Initiative: KUBRA-204 (reference only, not linked)
- [Aggregate Payment Report requirements](https://kubra.jira.com/wiki/spaces/AG/pages/2216198340/Aggregate+Payment+Report) — local mirror [aggregate-payment-report.md](../../confluence/aggregate-payment-report.md)
- [Remittance and Batch Post File v4.01](https://kubra.jira.com/wiki/spaces/AG/pages/2145190001/Remittance+and+Batch+Post+File+v4.01+-+09+11+2026+finalized)
- Source: Jaro's "What's needed MATRIX — August 2026 — Aggregates"
- [[Reports]]
- [FTS v0.1 superset file and client comparison](../../../../ConfigHQ/File-Transformation-Service/specs/fts-v0.1-superset-file-client-comparison.md)
