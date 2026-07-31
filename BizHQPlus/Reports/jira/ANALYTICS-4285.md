---
type: jira-ticket
ticket_id: ANALYTICS-4285
ticket_type: Bug
status: Open
platform: BizHQPlus
product: Reports
tags: [jira]
---

# ANALYTICS-4285 — AUTOPAY_PROFILE_RESUMED event not reflected in AutoPay Enrollment Report

## Summary

For luciano.huapaya@kubra.com, AutoPay Activity Report (`look-2304`) shows the latest event as AUTOPAY_PROFILE_RESUMED (active), but AutoPay Enrollment Report (`look-2305`) returns no results for the same email. Assigned to Anantha, Major priority, Analytic Sprint 2616.

## Description

- AutoPay Activity Report (sandbox, `look-2304`): 5 events across accounts 22000004103477 / 22000004242969, most recent AUTOPAY_PROFILE_RESUMED, status active.
- AutoPay Enrollment Report (sandbox, `look-2305`): same email filter → No Results.
- Suspected cause: Enrollment Report's "currently enrolled" logic may not account for RESUMED events, or there's a data lag between the two reports.

## Acceptance criteria

- [ ] Root cause identified for why resumed profiles don't appear in AutoPay Enrollment Report
- [ ] Fix applied so active/resumed profiles are correctly reflected
- [ ] Verified against luciano.huapaya@kubra.com showing up correctly post-fix

## Related

- [[Reports]]
