---
type: jira-ticket
ticket_id: SMM-49
ticket_type: Story
status: Open
platform: ConfigHQ
product: SFTP Mailbox Manager
tags: [jira]
---

# SMM-49 — UI: Prompt to auto-configure Remittance/Batch Post file schedule on folder creation

## Summary

Extends the Create Folder flow ([[SMM-42]]) so that, when a user creates a "remittance" or "batch_payment_posting" folder for a client, they're prompted to auto-configure that client's file delivery schedule right then — removing the manual, Analytics-team-gated Terraform step that today can block downstream teams for weeks (see ANALYTICS-4010).

## Description

- Today: Remittance/Batch Post file delivery is a manually-scheduled Looker job, configured per client by Data Analytics.
- Jerome (Analytics) already built a Terraform config that can auto-schedule this for newer clients — but Analytics still has to be informed and manually apply it.
- Motivating example: [ANALYTICS-4010](https://kubra.jira.com/browse/ANALYTICS-4010) ("Please configure 'Kubra Training' to send files to FTS") has sat blocked 4+ weeks, which blocked Team Katalyst's FTS testing for that client.
- Proposal: within the existing Create Folder flow (SMM-42), for the "remittance" and "batch_payment_posting" folder types specifically, add a prompt asking whether the user wants to auto-configure file delivery to that folder now, or defer. Kept high-level/no detailed UI spec — pending Design and an engineering discovery item (flagged for Thomas) on how the UI would actually trigger the Terraform-based schedule.
- Depends on SMM-42 being built first.

## Acceptance criteria

- Demo: creating a "remittance" or "batch_payment_posting" folder for a test client (e.g. "Kubra Training" from ANALYTICS-4010) surfaces the prompt; choosing "Yes" successfully applies the schedule with no manual Analytics involvement.
- No hard deadline set, but flagged as high-value given the existing block on Katalyst.
- Handoff: Thomas's engineering discovery on integration approach should happen before/alongside UI build.

## Related

- [[SFTP-Mailbox-Manager]]
- [SMM-42](https://kubra.jira.com/browse/SMM-42) — base Create Folder flow this extends
- [ANALYTICS-4010](https://kubra.jira.com/browse/ANALYTICS-4010) — motivating blocked ticket
