---
title: Initiatives ↔ Epics Tracker
scope: Platform 1 (DF, FTS, SMM) + Data & Analytics (ANALYTICS)
last_updated: 2026-08-31
source: kubra.jira.com JQL — project in (DF, SMM, FTS, ANALYTICS) AND issuetype = Epic AND statusCategory != Done
---

# Initiatives ↔ Epics Tracker

Running list for the new Jira policy of linking Epics to Initiatives. Initiatives live in the **KUBRA** project (issue type `Initiative`, hierarchy level above Epic) and are linked via each Epic's `parent` field. Scope below is every **open or in-progress** Epic across Platform 1 (Datafeed, FTS, SMM) and the Data & Analytics team (ANALYTICS).

**Snapshot: 65 open/in-progress epics total — 14 (22%) are linked to an Initiative: 9 in ANALYTICS, 3 in FTS, 2 in SMM.**

| Project | Open/In Progress Epics | Linked to an Initiative |
|---|---|---|
| ANALYTICS | 41 | 9 |
| DF | 8 | 0 |
| FTS | 12 | 3 |
| SMM | 4 | 2 |
| **Total** | **65** | **14** |

---

## 1. Epics currently linked to an Initiative

### KUBRA-83 — Consumer Enrollment Data Files (Open)
- ANALYTICS-4438 — Consumer Enrollment Data Files (Open)

### KUBRA-35 — KHQ Data Migration (In Progress)
- ANALYTICS-4186 — KHQ migration - Data Migration (Data Analytics) 2026 (Open)

### KUBRA-111 — BizHQ+ Reports - Mapping Reports (Open)
- ANALYTICS-4364 — BizHQ+ Reports - Mapping Report (In Progress)

### KUBRA-92 — Origination (memo), Remittance and Return files for PGE CFM (In Progress)
- ANALYTICS-4183 — [Outbound File Pipeline] v4 remittance and batch post files to DocWeb (In Progress)

### KUBRA-106 — BizHQ+ Reports - Activity Report (Open)
- ANALYTICS-4030 — BizHQ+ Report - Activity Reports (In Progress)

### KUBRA-7 — Switch from Product/Channel to Payment Sources (In Progress)
- ANALYTICS-3312 — Payment Sources - BizHQ+ Reports (In Progress)

### KUBRA-40 — BizHQ+ Reports - Subscriber Reports (Open)
- ANALYTICS-4368 — BizHQ+ Report - Subscriber Reports (Open) *(linked 2026-08-26 — confirmed by name match and by the epic's own description, which already named KUBRA-40 as its parent initiative; the `parent` field just hadn't been set)*

### KUBRA-115 — Paper Mail Enrollment Report (Open)
- ANALYTICS-4204 — Paper Mail Enrollment Report (Open) *(new Initiative created and linked 2026-08-26 — client ask from City of Stamford (WPCA), sourced from Aha idea [BIZHQ-I-27](https://kubra.aha.io/ideas/ideas/BIZHQ-I-27); no existing Initiative covered this)*

### KUBRA-116 — PG&E Analytics Dashboards MVP [Payments Reporting] (In Progress)
- ANALYTICS-4304 — PG&E Analytics Dashboards MVP [Payments Reporting] (In Progress) *(new Initiative created and linked 2026-08-26 — internal, CSM-driven ask to help retain PG&E, KUBRA's largest client (~$1M/month gross profit on payments transactions), following prior vendor-switch tension; scoped to payments-dashboarding MVP only)*

### KUBRA-118 — SFTP Mailbox Manager (In Progress)
- SMM-1 — SFTP Mailbox Manager (In Progress) *(new Initiative created and linked 2026-08-26 — Platform 1's first Initiative-linked epic; internal/engineering-driven, to retire the manually-configured "DSO SFTP mailbox" in GitHub and let Service Delivery self-serve SFTP mailbox creation via UI instead of depending on engineering, for clients receiving remittance/batch post files daily over SFTP. Epic description updated with links to the PRD ([SFTP Mailbox Manager - PRD](https://kubra.jira.com/wiki/spaces/MIC/pages/1916043435/SFTP+Mailbox+Manager+-+PRD), APPROVED) and TRD ([SFTP Mailbox Manager API](https://kubra.jira.com/wiki/spaces/MIC/pages/1927479332/SFTP+Mailbox+Manager+API))*

### KUBRA-122 — FTS - Header, Footer, Fixed Width Support (Open)
- FTS-379 — FTS File Header, Footer & Fixed Width (In Progress) *(linked 2026-08-28 — pre-existing Initiative and Epic; parent field just hadn't been set)*

### KUBRA-121 — External Destination - SFTP outside KUBRA (Open)
- SMM-70 — SMM SFTP - External (Open) *(created + linked 2026-08-27, missed by the 2026-08-28 scan below — Platform 1's second Initiative-linked epic, and its first cross-team one)*
- FTS-403 — External SFTP Support (Open) *(epic pre-existed since 2026-06-17; parent link to KUBRA-121 set 2026-08-31 — Team Katalyst's review found 17 clients need files delivered to a client-hosted, not KUBRA-hosted, SFTP location. New PRD: [FTS - External Destination PRD](https://kubra.jira.com/wiki/spaces/MIC/pages/2158952478/FTS+-+External+Destination+PRD), scoping this SFTP work as Phase 1 of a broader "External Destination" concept — Phase 2 (email) not yet scoped. 9 historical Done stories/bugs from FTS's original file-copy/"Destination" feature work (FTS-30, 52, 63, 182, 183, 186, 271, 277, 280) were also re-parented here 2026-08-31 for traceability, plus 6 SMM stories (SMM-17, 23, 24, 25, 26, 27) re-parented to SMM-70.*)*

### KUBRA-181 — External Destination - Email (Open)
- FTS-439 — FTS - External Destination email (Open) *(new Initiative + placeholder Epic created 2026-08-31 — Phase 2 sibling to KUBRA-121, covering the "ad-hoc payment report by email" channel identified alongside SFTP. Deliberately no SMM epic yet: unclear whether email delivery needs any SMM-owned work, or is entirely FTS/reporting-side — revisit once scoped. No stories under the epic yet; see the PRD's Phase 2 section.)*

---

## 2. Epics not linked to any Initiative

### ANALYTICS (32)

| Key | Summary | Status |
|---|---|---|
| ANALYTICS-4392 | iDoxs Pipeline — Future PG&E Data Sources (Post-Payments MVP) | Open |
| ANALYTICS-4363 | Sumo Logic to Splunk Migration - Data Analytics | Open |
| ANALYTICS-4343 | Looker Operations 2026 | Open |
| ANALYTICS-4342 | Data Analytics Spike Backlog - Pending Triage | Open |
| ANALYTICS-4341 | Text-to-Report POC — Natural Language Report Generation | Open |
| ANALYTICS-4339 | External Partner (Data Analytics) Tech Debt Q2 2026 | Open |
| ANALYTICS-4338 | Payguard - KHQ Analytics 2026 | Open |
| ANALYTICS-4251 | BizHQ+ Report - Client Funded Model | Open |
| ANALYTICS-4237 | Notifi Reporting - Tech Debt (Looker) | Open |
| ANALYTICS-4187 | Looker CI debugging 2026 | Open |
| ANALYTICS-4132 | Post-Storm/Event Reporting POC - Notifi | Open |
| ANALYTICS-3682 | Phrasebook Data Ingestion & Reporting 2026 | Open |
| ANALYTICS-3614 | Fraud Management - AI | Open |
| ANALYTICS-4293 | Consumer Reports - 2026 | In Progress |
| ANALYTICS-4252 | DMS Task Errors - HydroOne | In Progress |
| ANALYTICS-4087 | Agora Decommission & Migration to DMS/Databricks | In Progress |
| ANALYTICS-3963 | KHQ billing tech debt Q2 | In Progress |
| ANALYTICS-3915 | idoxs pipeline, for PG&E - DSO, DBA Blocked Tickets | In Progress |
| ANALYTICS-3637 | Incident Watch+, IW+ Reconciliation Report, Data Analytics 2026 | In Progress |
| ANALYTICS-3570 | Serverless Migration - Analytics | In Progress |
| ANALYTICS-3569 | Legacy Incident Watch Pipeline & Reporting | In Progress |
| ANALYTICS-3481 | Analytics Incidents - 2026 | In Progress |
| ANALYTICS-3386 | Notifi Backend 2026 - Data Analytics | In Progress |
| ANALYTICS-3212 | BizHQ+ Reporting Enhancements 2026 | In Progress |
| ANALYTICS-3211 | Misc Tickets 2026 | In Progress |
| ANALYTICS-3209 | QA Implementation 2026 | In Progress |
| ANALYTICS-3206 | BizHQ+ Backend 2026 | In Progress |
| ANALYTICS-3205 | Analytics Learning & Training - 2026 | In Progress |
| ANALYTICS-3204 | Notifi Reporting 2026 - Support/SD | In Progress |
| ANALYTICS-3057 | IVR+ Ingestion and Reporting | In Progress |
| ANALYTICS-2998 | Internal reports - Level 1/level 2. | In Progress |
| ANALYTICS-2782 | Payment Ops - Data Analytics 2026 | In Progress |

### DF — Datafeed (8)

| Key | Summary | Status |
|---|---|---|
| DF-1322 | Datafeed Migration | Open |
| DF-1418 | KHQ Datafeed Status integration | In Progress |
| DF-1414 | Datafeed v1 KARP Review Compliance | In Progress |
| DF-1377 | Datafeed v3 KARP Review Compliance | In Progress |
| DF-1362 | File Statuses | In Progress |
| DF-1138 | Datafeed v3 bugs and tech debt | In Progress |
| DF-1087 | DF Tech Debt | In Progress |
| DF-1036 | Datafeed ConfigHQ UI Updates | In Progress |

### FTS — File Transformation Service (9)

| Key | Summary | Status |
|---|---|---|
| FTS-370 | Migrate to SFTP Mailbox Manager | Open |
| FTS-305 | FTS Custom File Imports | Open |
| FTS-227 | FTS UI Audit - UX/UI | Open |
| FTS-15 | Code-Based FTS Service | Open |
| FTS-383 | FTS Improvements 2Q 2026 | In Progress |
| FTS-346 | FTS KARP Review Compliance | In Progress |
| FTS-228 | FTS / Datafeed Integration | In Progress |
| FTS-200 | FTS - Tech Debt 1H 2026 | In Progress |
| FTS-1 | FTS API | In Progress |

### SMM — SFTP Mailbox Manager (2)

| Key | Summary | Status |
|---|---|---|
| SMM-60 | PGP Support | Open |
| SMM-50 | SMM Improvements & Ideas | Open |

---

## Notes / open questions

- All Initiatives observed so far live in the **KUBRA** project. Platform 1 (DF/FTS/SMM) now has two Initiatives with linked epics (KUBRA-118 ↔ SMM-1, KUBRA-122 ↔ FTS-379) plus a third that's cross-team (KUBRA-121 ↔ SMM-70 + FTS-403) — DF still has none; worth checking with the team whether a DF-scoped initiative exists yet or still needs to be created.
- Linkage is via the Epic's `parent` field (not an issue link or label) — confirm this is the sanctioned mechanism under the new policy before treating unlinked epics as non-compliant.
- **2026-08-31: SMM-70 was missing from this tracker entirely** — it was created 2026-08-27 (one day before the 2026-08-28 scan) already linked to KUBRA-121, but the scan that produced §2's SMM table below didn't pick it up. Caught while wiring up KUBRA-121 (renamed from "External SFTP File Delivery" to "External Destination - SFTP outside KUBRA" the same day, to reflect that SFTP is Phase 1 of a two-channel concept — email is Phase 2, not yet scoped). Worth a full re-run of the source JQL to check for other silent gaps like this one rather than trusting incremental edits going forward.
- The KUBRA project holds 61 Initiatives total (60 open/in-progress, 1 Done) after KUBRA-181 was created 2026-08-31. §1 above covers the 14 with a linked epic: 6 from the original epic-parent scan, plus KUBRA-40 ↔ ANALYTICS-4368 and KUBRA-122 ↔ FTS-379 (existing Initiatives, link had never been set), KUBRA-115 ↔ ANALYTICS-4204 and KUBRA-116 ↔ ANALYTICS-4304 (net-new Initiatives, created for those epics), KUBRA-121 ↔ SMM-70 + FTS-403 (existing Initiative, SMM-70 link pre-existing, FTS-403 link set 2026-08-31), and KUBRA-181 ↔ FTS-439 (net-new Initiative + placeholder Epic, both created 2026-08-31 as KUBRA-121's Phase 2/email sibling). Most of the other ~47 pre-existing Initiatives look scoped to other platforms (Payments, MyHQ+, BizPAY+, KHQ, etc.), but that hasn't been individually verified — a full name-match pass against the remaining unlinked epics in §2 would catch any other gaps like these.
- This is a point-in-time pull (2026-08-26, updated 2026-08-28 for FTS-379, updated 2026-08-31 for KUBRA-121/SMM-70/FTS-403 and again same day for KUBRA-181/FTS-439); re-run the JQL above to refresh rather than hand-editing counts.
