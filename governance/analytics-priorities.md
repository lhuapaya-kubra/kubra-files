---
title: Analytics (Data Team) Priorities — 2026-09-15
scope: Data & Analytics (ANALYTICS)
last_updated: 2026-09-15
source: "2026 - Data roadmap revamp (High) 9/3 + (Med/Low) 9/3 slides; 'Data Team Priorities' meeting 2026-09-15 (Cynthia Hayward, Alfred Sawatzky, Luciano Huapaya); [[initiatives-epics]]"
---

# Analytics (Data Team) Priorities — 2026-09-15

## Purpose

The Data & Analytics team's roadmap for 2026 is a "data roadmap revamp" centered on **KHQ client upgrades** as the primary focus area — enabling client automation and migrating clients off legacy systems — with KHQ data migration work supporting that effort. This doc is the Analytics-side counterpart to [[platform1-priorities]], tracking the team's confirmed priority order so sprint scoping can be checked against it rather than re-litigated each sprint.

The 9/3 roadmap slides were reviewed live in the 2026-09-15 "Data Team Priorities" meeting; Cynthia Hayward flagged one sequencing issue (below) which Alfred Sawatzky and the roadmap owner agreed to, so the order below reflects that correction, not the original slide layout.

## Priorities — High tier (rank order, top = highest)

1. **Payment Outbound – Remittance & Batch Post (EZ-PAY+)** — *Outbound Data Files, client automation.* Automated remittance/batch-post file delivery for EZ-PAY+ clients; required before those clients can move over, since "clients will [not] want to move over if automation isn't integrated."
2. **KHQ Data Migration Efforts** — *Data Ingestion & Manipulation.* MyHQ+ Data Migration (not payments data) and Document Data Migration (legacy → platform), using the iDoxs pipeline built by the Data Analytics team. Cynthia argued resourcing should concentrate on migration before the next item, since it's a dependency for it; Alfred agreed.
3. **Consumer Enrollment Outbound – Consumer Data Files (MyHQ+)** — *Outbound Data Files, client automation.* The legacy ID-docs enrollment report (new user, etc.) sent daily for MyHQ+ clients. **Moved below migration** in the 9/15 meeting: it can't fully land without the migration above, so Cynthia had it separated from item 1 (rather than treated as one combined "outbound files" bucket) and de-prioritized beneath migration — data-engineering work behind the scenes can still start early so the report is ready once migration lands.
4. **KHQ Reports (BizHQ+ Reports)** — Paper Mail Delivery (MyHQ+), User Audit (MyHQ+), Distribution Subscriber (KUBRA), Mapping (IW+). Unchanged from the slide — stays at the bottom of the High tier per Cynthia's "everything on the bottom arrow remains where it is." User Audit / subscriber reporting was explicitly de-prioritized in this meeting since it isn't currently blocking anything.

## Priorities — Med/Low tier (rank order, top = highest; unchanged from the 9/3 slide)

1. Notifi Reporting Support
2. **PG&E Product Analytics Dashboard** — why: #1 client, ~$1M/month, client-retention project (see [[project_pge_analytics_dashboard]] memory / CPERD board)
3. Document Migration KHQ (MongoDB → postgres); old document pulls from Databricks
4. Looker tech debt, CI validation error fixes
5. Fraud Automation
6. IVR/IVR+ Internal Dashboard, cost analysis
7. Payment Ops Dashboard
8. KHQ Level 1 Reports

## Epic cross-reference (per [[initiatives-epics]])

- **KHQ Data Migration Efforts** ↔ `KUBRA-35` — "KHQ Data Migration" (In Progress), epics `ANALYTICS-4186`, `ANALYTICS-4509`, `ANALYTICS-4539`. Clear name match.
- **Consumer Enrollment Outbound – Consumer Data Files (MyHQ+)** ↔ `KUBRA-83` — "Consumer Enrollment Data Files" (Open), epic `ANALYTICS-4438`. Clear name match (also see [[project_consumer_enrollment_data_files]] memory).
- **KHQ Reports — Mapping (IW+)** ↔ `KUBRA-111` — "BizHQ+ Reports - Mapping Reports" (Open), epic `ANALYTICS-4364`.
- **KHQ Reports — User Audit (MyHQ+)** ↔ `KUBRA-40` — "BizHQ+ Reports - Subscriber Reports" (Open), epic `ANALYTICS-4368`. *Naming is close but not exact ("User Audit" vs. "Subscriber Reports") — worth confirming these are the same line item rather than two separate ones.*
- **PG&E Product Analytics Dashboard** ↔ `KUBRA-116` — "PG&E Analytics Dashboards MVP [Payments Reporting]" (In Progress), epic `ANALYTICS-4304`.
- **Payment Outbound – Remittance & Batch Post (EZ-PAY+)** — no confident match yet. `ANALYTICS-4535` ("Improving Remittance and Batch Post Data File sending via RBO") and `KUBRA-92`/`ANALYTICS-4183` ("[Outbound File Pipeline] v4 remittance and batch post files to DocWeb", In Progress) are both plausible candidates, but neither is confirmed as *this* EZ-PAY+ client-automation effort specifically — flagging rather than asserting.
- **KHQ Reports — Paper Mail Delivery (MyHQ+)** — likely `KUBRA-115`/`ANALYTICS-4204` "Paper Mail Enrollment Report", but that Initiative's description (client ask from City of Stamford) doesn't clearly match "Paper Mail Delivery" as a recurring MyHQ+ line item — needs confirmation.
- **KHQ Reports — Distribution Subscriber (KUBRA)**, and every item in the Med/Low tier except PG&E — no matching epic identified in [[initiatives-epics]] yet.

## Open questions

- Confirm the two close-but-not-exact matches above (User Audit ↔ `KUBRA-40`, Paper Mail Delivery ↔ `KUBRA-115`) with Alfred or Cynthia rather than treating them as settled.
- No epic found yet for "Payment Outbound – Remittance & Batch Post (EZ-PAY+)" specifically, despite it being the #1 High-tier item — worth checking whether it's covered by `ANALYTICS-4535`/`ANALYTICS-4183` or needs its own epic, similar to how [[initiatives-epics]] flags `ANALYTICS-4545` (PM Revenue Visibility) as unlinked.
- Most of the Med/Low tier (Notifi Reporting Support, Document Migration KHQ Mongo→postgres, Looker tech debt, Fraud Automation, IVR/IVR+ Internal Dashboard, Payment Ops Dashboard, KHQ Level 1 Reports) has no epic cross-reference done yet — a full pass against [[initiatives-epics]]'s unlinked-epic table (e.g. `ANALYTICS-4237` Notifi Reporting - Tech Debt, `ANALYTICS-4187` Looker CI debugging, `ANALYTICS-3614` Fraud Management - AI, `ANALYTICS-3057` IVR+ Ingestion and Reporting, `ANALYTICS-2998` Internal reports Level 1/2) would likely resolve most of these but hasn't been done here.
