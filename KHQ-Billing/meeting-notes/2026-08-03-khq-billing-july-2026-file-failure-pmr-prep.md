---
type: meeting-note
date: 2026-08-03
attendees: [Dhiren Pansuriya, Francisco Marquez, Mihaela, Judes Soosaithasan, Jerome Myers, Bhavik Gandhi, Luciano Huapaya]
platform: KHQ-Billing
product: KHQ Billing
tags: [meeting-notes, incident, pmr-prep]
---

# 2026-08-03 — KHQ Billing: July 2026 File Failure (PMR prep)

**Status: DRAFT — raw timeline of activity, to be transcribed into the official PMR template once filled in.**

## Summary

The July 2026 KHQ billing file, scheduled for delivery on the 1st of the month (~11 AM), failed to reach DocWeb to be then sent to Epicor as expected. 
Preliminary root cause: a billing-transformation Lambda — still running from test infrastructure, never migrated to production — kept erroring out and retrying on a file rename/upload step, then timed out at 5 minutes; no alerting existed for that failure mode, delaying detection. Separately, additional columns had been added to the KHQ billing report without a matching update to the downstream validator's expected schema, causing a validation failure that also went unnotified. Issue was resolved and the file processed/uploaded to Epicor by Aug 3, ~12:50 PM. Follow-up remediation tracked in ANALYTICS-4299.

## Business impact

**No client impact today** — no clients are currently being invoiced via KHQ Billing, so this incident only delayed the internal finance invoicing business process (Dhiren running the KHQ billing file process, getting the invoice to Epicor for finance). That internal process was delayed to Aug 3, ~12:50 PM.

**Caveat — future client impact:** City of Stamford (product: **MyHQ+**) is scheduled to begin billing via KHQ starting **October 1, 2026**. This process needs to be reliable and production-ready before then — including migrating the billing-transformation Lambda out of test infrastructure (see Root Cause #3 below), since a repeat of this failure mode would have real client-facing impact once Stamford is live on it.

## Timeline (high-level)

- **Scheduled delivery:** Aug 1, ~11:00 AM
- **Issue flagged (client noticed file missing):** Aug 2, 7:28 AM — ~20 hours after scheduled delivery
- **Investigation opened:** Aug 3, 7:22 AM ([ANALYTICS-4297](https://kubra.jira.com/browse/ANALYTICS-4297) created)
- **Root cause identified + fix applied:** over the course of the morning on Aug 3 (Lambda timeout/retry loop diagnosed, additional logging added, re-triggered; schema/validator mismatch also identified)
- **Resolved (file processed and uploaded to Epicor):** Aug 3, ~12:50 PM

**Total elapsed:** ~26 hours from scheduled delivery to resolution (~5.5 hours of active investigation/fix work on the morning of Aug 3, from ticket creation to resolution).

## Root cause (preliminary, pending Epicor confirmation)

1. **Lambda timeout/retry loop:** the file-rename Lambda kept erroring and retrying, then timed out at 5 minutes. No alert existed for this specific failure mode (Lambda alerting has to be configured per error type), so the team wasn't notified promptly.
2. **Schema/validator mismatch:** additional columns were added to the KHQ billing report without updating the downstream validator's expected schema, causing a validation failure — which also had no notification, compounding the detection delay.
3. **Contributing factor:** the billing-transformation Lambda has never been migrated to production and is still running from test infrastructure (prod access issues cited as the blocker).

## Follow-up work — [ANALYTICS-4299](https://kubra.jira.com/browse/ANALYTICS-4299)

- [ ] Update the validator to support the additional columns.
- [ ] Add reliable notifications for validation failures.
- [ ] Migrate the Lambda transformation and supporting resources to production.
- [ ] Complete end-to-end validation through Epicor.
- [ ] Disable the test-based workflow after the production deployment is confirmed.

## Open items

- [ ] Final confirmation that Epicor successfully processed the July 2026 file — root cause is "preliminary" until this lands.
- [ ] Exact timestamps for several Teams messages above weren't in what was shared — pull them from the [Analytics standup transcript](https://docs.google.com/document/d/12jPSFI8KUG7nntk10EezDySLDcNC_Yu9wgBRwwFpV4k/edit?tab=t.ckptmsy91rb4) or the KHQ Billing Teams channel history if exact times are needed for the PMR.
- [ ] A few Teams messages weren't explicitly attributed to a speaker in what was shared (the "thanks Jerome" reply; "July 2026 invoice has been uploaded" / "can you attempt to ingest?" exchange) — confirm speakers before finalizing the PMR.
- [ ] Luciano's 7:22 AM email reply to Dhiren was cut off mid-sentence ("If a window is missed, wh...") — worth confirming what that was going to say in case it belongs in the PMR's prevention/process section.

## Related

- [ANALYTICS-4297](https://kubra.jira.com/browse/ANALYTICS-4297) — investigation ticket
- [ANALYTICS-4299](https://kubra.jira.com/browse/ANALYTICS-4299) — remediation work tracking
- [Analytics standup transcript](https://docs.google.com/document/d/12jPSFI8KUG7nntk10EezDySLDcNC_Yu9wgBRwwFpV4k/edit?tab=t.ckptmsy91rb4)
