---
type: meeting-note
date: 2026-08-03
attendees: [Alfred Sawatzky, Bhavik Gandhi, Luciano Huapaya]
platform: BizHQPlus
product: Reports
tags: [meeting-notes, prioritization, teams-thread]
---

# 2026-08-03 — Alfred prioritization request: PG&E CFM Custom Reports & Suffolk County Consumer Reports

**Status: DRAFT — Luciano is still adding context. Not yet sent to Alfred.**

## Context

Alfred Sawatzky (VP of Product Management) messaged Luciano via Teams (Aug 3, 1:34 PM) asking for rough effort estimates on two features that current **Upgrade Target List** clients depend on, so he can prioritize them relative to each other.

- **Not a commitment to a hard due date** — this is for relative prioritization only.
- Sprints or months is an acceptable level of precision.
- Luciano + Engineering Manager(s) can size each independently in ~5 minutes; no need to wait for both to be sized before replying.
- **Reply requested by August 4.**

Per Luciano: Alfred asked him to inquire about these two initiatives specifically because they sit across two different engineering/product groups.

## Feature 1: Custom Reports for PG&E CFM

- **First needed by:** [Pacific Gas and Electric (CFM)](#)
- **Current estimate on file** (last updated ~1 month ago):
  - Best case: 4 sprints
  - Worst case: 6 sprints
- **New estimate:** _TBD — pending Luciano + Engineering Manager sizing_

**Luciano's original context:** He believed this was **three different reports** scheduled to be sent to the client — see resolution below, this appears to be an overcount relative to the data team's actual scope.

**Bhavik's read (unconfirmed at the time — he couldn't see the actual link Alfred shared):**

> "I can't see the links for what custom reports for PG&E CFM and Suffolk County are but assuming for PG&E CFM that link just says Reconciliation and Batch Post Reports with PaymentSource (+Partner), PaymentProcessor, SpaceName, PrincipalType, PrincipalId, PrincipleKRN and without Product and Channel at 9:30 pm Eastern Time for DocWeb to consume"

**Bhavik's effort estimate (for his assumed scope above):**
- Databricks + Looker + DQ — **1 sprint**, may have to spread over 2 sprints.

**Separate, out-of-scope-for-now discussion:** making this a **self-healing, on-demand pipeline** (triggerable so every transaction processed/remitted can be provided ASAP). This is explicitly a separate architecture discussion — Bhavik's rough estimate is **~2 sprints of work**, but can only be estimated correctly once the architecture is approved, and will likely require coordination with other teams.

### Scope clarification (2026-08-03, later same day)

Jaro Leken shared the middleware architecture diagram: [PGECFM - Middleware for Outbound File processing](https://docs.google.com/drawings/d/1gna6BPG1s6TzxmTgZYOtPb--fY8g2V1AAuDybCFk3vA/edit).

The diagram shows the full outbound pipeline: KHQ sends a **Batch Posting file (BP)** and a **Remittance file (RE)** to Kubra sFTP; a separate **Payment Notifier SP** produces an **Origination (OR)** feed and a **Remittance Generator** produces a **PG** feed. Everything lands in the **DocWeb Inbox**, which fans out to three applications — **Origination**, **Remittance**, and **Returns** — each producing its own output file to KUBRA sFTP (`wnebspge_*.txt`, `epccpgeDep_*.txt`, `nebsmanpgertm_*.txt` / `nebspgertm_*.txt`). All three applications are flagged as "to be enhanced," with the enhancement being: reformat the new incoming KHQ file to match the existing system-app file format so the output-generation process itself doesn't need to change.

**Per Vitalii:** Memo, Returns, and the other output files are handled by **DocWeb/eLockBox special events** — **not the data team**. At the time, this seemed to resolve the "three reports" question in favor of a narrower 2-file scope.

**Data-team scope as understood from Vitalii — two files:**
1. **KHQ Remittance file**
2. **KHQ Batch Post file**

Both delivered to **Kubra sFTP**, consumed by both **iDoxs** and **DocWeb**. This maps to the Remittance/Batch Post File v4 requirement doc already in progress (Payment Source, Payment Processor, Space Name additions — [Remittance and Batch Post File v4](https://kubra.jira.com/wiki/spaces/AG/pages/2111504406/Remittance+and+Batch+Post+File+v4+-+draft+-+07+29+2026)).

### ⚠️ Conflicting info — Jaro's file inventory spreadsheet (2026-08-03, later same day)

Jaro's other spreadsheet, [PGECFM File Processing](https://docs.google.com/spreadsheets/d/1sklnHaMO6kUu2NSl_99C7nARAUlcjJ6fqWbIqD0YpPM/edit?gid=0#gid=0), lists the outbound file inventory (File provider / In-Out / Provided via / File Name / File Type / File Purpose / Processed by App / Platform / Post File Name). Per Luciano, reading this spreadsheet: **the 3 outbound files "we" need to send are:**

1. **Remittance file**
2. **Origination file** (aka the **Memo file**) — spreadsheet: "memo file with pending payments," Processed by App = Origination, output `wnebspge_*`
3. **Return file** — spreadsheet: Processed by App = Returns, output `nebsmanpgertm_*` / `nebspgertm_*`

**Resolved (Luciano, 2026-08-03):** "We" in the spreadsheet meant KUBRA's overall outbound deliverable count to PG&E, not the data team's build scope specifically. **Reading A was correct.**

**Confirmed end-to-end flow:**
- **Data Analytics team scope — still just 2 files:** the **KHQ Remittance file** and the **KHQ Batch Post file**. Both are KHQ-sourced and sent to the **DocWeb Inbox**.
- The **Remittance Generator** and **Payment Notifier SP** feeds come from **iDoxs** — that's other teams' work, not data team's, but it also lands in the DocWeb Inbox.
- **Katalyst** transforms everything inside **DocWeb/eLockBox** to produce the 3 client-facing outbound files: **Origination**, **Remittance**, and **Return**.

So the data team's estimate for Alfred should be scoped to the **2 KHQ files (Remittance, Batch Post)** — this is the Remittance/Batch Post File v4 work already in progress. The 3-outbound-file framing from Jaro's spreadsheet describes the full pipeline's client-facing output, most of which (iDoxs feeds, Katalyst/DocWeb/eLockBox transformation) is other teams' scope.

### High-level summary (for Alfred)

**Unknown team - Payment Notifier & Remittance Generator:**
1. Payment Notifier and Remittance Generator — owning team(s) not yet identified, and it's not yet known whether any additional work is needed on these applications themselves (vs. just consuming their existing output).

**Data team - KHQ files:**
1. Create a v4 draft of the Remittance and Batch Post file for DocWeb ingestion.
2. Get those files into DocWeb for eLockBox transformation.

**Katalyst:**
1. Transform the files — KHQ Remittance file, KHQ Batch Post file, Payment Notifier feed, and Remittance Generator feed — into the 3 outbound files (Origination, Remittance, Return).

**Open / to clarify:**
- [x] Reconcile the Vitalii "2 files" statement against Jaro's spreadsheet "3 outbound files" framing — resolved: 2 files is the data team's scope; the 3 outbound files are the overall pipeline's client-facing output, built by iDoxs + Katalyst/DocWeb/eLockBox, not data team.
- [ ] Engineering Manager sizing input still needed for the "New Best Case" / "New Worst Case" fields Alfred requested, scoped to the 2 KHQ files (Remittance, Batch Post).

## Feature 2: Consumer reports (Suffolk County Water Authority)

- **First needed by:** [Suffolk County Water Authority](#)
- **Current estimate on file** (last updated ~4 months ago):
  - Best case: 1 sprint
  - Worst case: 2 sprints
- **New estimate:** see breakdown below (two workstreams, two different owners)

**Luciano's context:**
- Stakeholder team: **Comms** (one team)
- Engineering Manager: **Phil Rubio**
- Data Analytics: **Bhavik Gandhi**

This is the same body of work as the ongoing Consumer Activity Report / Consumer Enrollment Report effort (epic [ANALYTICS-4293](https://kubra.jira.com/browse/ANALYTICS-4293)) — high-level, the team has now reviewed both reports and landed on two concrete workstreams.

### Workstream 1 — Data team: add External ID column

Add **External ID** as a new column to both the **Consumer Enrollment Report** and the **Consumer Activity Report**.

**Why:** Today, a consumer can only be distinguished in the report by email — but two different consumers can share the same contact email and/or phone number, which makes it hard to tell them apart. External ID gives each consumer a distinct identifier.

**Estimate:** 1 sprint (Data Analytics side).

Tracked in [ANALYTICS-4294](https://kubra.jira.com/browse/ANALYTICS-4294) (assigned to Rho Lall) — Confluence docs already updated.

### Workstream 2 — Consumer data side (Phil Rubio): verification event bug

Phil Rubio is investigating a potential bug where the **contact-verification event isn't triggering correctly**, which is why verified contact info shows up blank in the reports.

**Plan (per Phil):**
1. Next sprint — investigate.
2. Following sprint — implement the fix so verified contact info appears correctly in the consumer reports.

**Estimate:** 2 sprints total (1 investigate + 1 implement), sequential.

Tracked in [ANALYTICS-4295](https://kubra.jira.com/browse/ANALYTICS-4295) (verification failures / duplicate enrollment investigation) and [ANALYTICS-4296](https://kubra.jira.com/browse/ANALYTICS-4296) (AutoPay profile without verified email) — both assigned to Phil Rubio.

**Open / to clarify:**
- [ ] These two workstreams have different owners (Data Analytics vs. Phil Rubio's team) and aren't dependent on each other — confirm with Alfred whether he wants them reported as one combined estimate or two separate ones.
- [ ] Phil's 2-sprint estimate is sequential (investigate, then fix) — confirm whether "next sprint" + "the sprint after" lines up with a specific target date Alfred would want.

## Action items

- [x] Luciano: add more detail on the "three reports" for PG&E CFM — resolved: data team scope is 2 KHQ files (Remittance, Batch Post); the 3 outbound files (Origination, Remittance, Return) are the overall pipeline's client-facing output, built by iDoxs + Katalyst/DocWeb/eLockBox.
- [ ] Luciano + EM(s): size "New Best Case" / "New Worst Case" for PG&E CFM, scoped to the 2 KHQ files (Remittance, Batch Post) — this is the Remittance/Batch Post File v4 work already in progress.
- [x] Luciano + Phil Rubio: size Suffolk County Consumer reports — resolved as two workstreams: Data Analytics External ID column (1 sprint, ANALYTICS-4294) + Phil Rubio's verification-event bug investigate/fix (2 sprints sequential, ANALYTICS-4295/4296).
- [ ] Luciano: reply to Alfred by **August 4** with whichever estimates are ready (per-feature, no need to wait for both).
- [ ] Luciano: send Alfred a high-level overview once this doc is clarified.

## Related

- [[Consumer-Reports]] (if present in knowledge graph — ANALYTICS-4293 epic)
- [Remittance and Batch Post File v4](https://kubra.jira.com/wiki/spaces/AG/pages/2111504406/Remittance+and+Batch+Post+File+v4+-+draft+-+07+29+2026) — confirmed scope match for PG&E CFM's data-team deliverable
- [PGECFM - Middleware for Outbound File processing](https://docs.google.com/drawings/d/1gna6BPG1s6TzxmTgZYOtPb--fY8g2V1AAuDybCFk3vA/edit) (Jaro Leken)
- [PGECFM File Processing spreadsheet](https://docs.google.com/spreadsheets/d/1sklnHaMO6kUu2NSl_99C7nARAUlcjJ6fqWbIqD0YpPM/edit?gid=0#gid=0) (Jaro Leken) — file inventory; source of the conflicting "3 outbound files" framing
