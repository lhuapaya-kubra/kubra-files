# Example (illustrative — not a real Jira ticket)

> This is a synthetic example to calibrate tone/format, written while the Atlassian connection was unavailable. Replace it with a real ticket pulled from under ANALYTICS-3204 the next time this skill runs with working Jira access, so field names/conventions are verified against reality rather than assumed.

## Jira Fields

| Field | Value |
|---|---|
| Project | ANALYTICS |
| Issue Type | Bug |
| Client (Customer) | PG&E |
| Severity (Priority) | Major |
| Epic | ANALYTICS-3204 — Notifi Reporting 2026 - Support/SD |

## Summary

PG&E — Notifi payment status report shows duplicate rows for split payments

## Description

**Problem**
The Payment Status report in Notifi is returning two rows for a single split payment (one per payment leg) instead of one row per transaction. Totals on the report are inflated as a result.

**Impact on client**
PG&E's ops team uses this report daily to reconcile payment counts against their own system. The duplication is causing a reconciliation mismatch they've flagged twice this week. No workaround — they're manually de-duping in a spreadsheet in the meantime.

**Source URL**
https://notifi.kubra.com/reports/payment-status?client=pge&range=last-7-days

**Screenshot**
https://internal-screenshots.kubra.com/tickets/example-pge-duplicate-rows.png
(If no hosted URL exists: "Screenshot to be attached directly in the Jira UI after ticket creation.")

## Assignee

Unclear from the description alone which engineer owns Notifi report generation logic — falling back to **Bhavik**, status set to **Backlog**, flagged for triage.
