---
type: jira-ticket
ticket_id: ANALYTICS-4283
ticket_type: Task
status: Open
platform: BizHQPlus
product: Reports
tags: [jira]
---

# ANALYTICS-4283 — Revamp Notifications Details Summary & Notifications Summary report descriptions

## Summary

Draft descriptions on the "[ReadMe Mirror] View Notification Reports" Confluence page didn't accurately describe what each report shows. Rewrote both based on actual Looker report output.

## Description

- **Notifications Details Summary** (`look-1985`): "Transaction-level overview of all sent notifications, showing the latest delivery status for each individual email or text message." — one row per message, latest delivery status.
- **Notifications Summary** (`look-1984`): "High-level overview of all sent notifications, showing the total number of messages sent grouped by template." — aggregate count pivoted by Template.

Applies wherever the text lives: Confluence draft mirror page, live ReadMe.com page, and Figma source copy if that's where it originates. Related to the broader doc effort tracked in DOCU-589 (Documentation project — not this ticket's owner).

## Acceptance criteria

- [ ] Notifications Details Summary description updated to the new wording, everywhere it appears
- [ ] Notifications Summary description updated to the new wording, everywhere it appears

## Related

- [[Reports]]
