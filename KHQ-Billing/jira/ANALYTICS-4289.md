---
type: jira-ticket
ticket_id: ANALYTICS-4289
ticket_type: Story
status: Open
platform:
product: KHQ Billing
tags: [jira]
---

# ANALYTICS-4289 — Audit Product + Channel references and move to Payment Source

## Summary

KHQ billing's 208-column Epicor billing file structure is built on legacy PaySource groupings (VBS, ONE, IVR, EFT, CSR, CHK, MET, RPS, ORC, OTH, PRI, GYR), which may have corresponding mappings to the old Product + Channel model. Product + Channel is being deprecated company-wide in favor of the new Payment Source model.

## Description

Audit the KHQ billing logic to identify any mappings/groupings that still reference Product + Channel, so we can move toward Payment Source as the standard approach going forward. A new column will be added to the KHQ billing Report Requirements doc describing the change from Product + Channel → Payment Source per affected column, before any implementation — for Luciano and Bhavik to review.

## Acceptance criteria

- [ ] KHQ billing logic audited for any remaining Product + Channel references
- [ ] New column added to the KHQ billing Report Requirements doc describing Product+Channel → Payment Source changes per affected column, where applicable
- [ ] Luciano and Bhavik review the proposed mapping before implementation

## Related

- [[KHQ-Billing]]
