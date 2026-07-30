---
type: jira-ticket
ticket_id: ANALYTICS-4284
ticket_type: Task
status: Open
platform: BizHQPlus
product: Reports
tags: [jira]
---

# ANALYTICS-4284 — Investigate null Notification Status and Template values — Notifications Summary report

## Summary

In the Notifications Summary Looker report (`look-1984`, prod), the Notification Status pivot is null for all rows, and 40 messages over the last 30 days have a null Template value. Assigned to Anantha Sethumadhavan for the notification team to debug.

## Description

- Notification Status column shows only null (Ø) — no actual status values populate here, despite being populated elsewhere (e.g. Notifications Details Summary).
- Template dimension has a null (Ø) row totaling 40 messages/30 days — not attributable to any known template, unidentifiable in the aggregate view.
- Questions to resolve: is this a broken join/mapping vs. genuinely null at source; what are the 40 null-Template messages; any correlation with channel/delivery status.

## Acceptance criteria

- [ ] Root cause identified for why Notification Status is null for all rows
- [ ] Root cause identified for the 40 null-Template messages
- [ ] Fix applied, or follow-up ticket created if it requires broader pipeline work

## Related

- [[Reports]]
