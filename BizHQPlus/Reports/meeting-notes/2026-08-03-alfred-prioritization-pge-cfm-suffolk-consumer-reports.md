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

### Bhavik exchange (2026-08-04, 9:26 AM) — correction + open hypothesis

**Bhavik (9:26 AM):** On "Create a v4 draft of the Remittance and Batch Post file for DocWeb ingestion" — asked that requirements be listed somewhere clearly for broad alignment. If it's what he called out in his earlier message (the Reconciliation/Batch Post scope with PaymentSource, PaymentProcessor, SpaceName, etc.), he'd call it a 1-sprint effort that needs to be spread out over 2 sprints — left it to Luciano how to characterize that.

**Requirements are documented:** [Remittance and Batch Post File v4](https://kubra.jira.com/wiki/spaces/AG/pages/2111504406/Remittance+and+Batch+Post+File+v4+-+draft+-+07+29+2026) on Confluence — this should be shared with Bhavik directly to close his alignment ask.

**Correction from Luciano:** The earlier note that "Bhavik is working with Vitalii to finalize this" was **wrong** — Luciano clarified he is **not** working with Vitalii on this. All he knows: the file needs to be sent to DocWeb. The exact location hasn't been confirmed but is expected to be an **S3 location**, which — barring access issues — shouldn't be a problem.

**Gap Luciano flagged:** What DocWeb needs to do to actually consume that file, and where they are on that (or whether tickets need to be cut for it), is **not something Luciano is aware of** — separate unknown from the Katalyst-scheduling question below.

**What Bhavik *is* working with Vitalii on — a separate matter:** how to ensure the 9:30 PM file has all payments up through 8 PM, given that PBO needs to process and push to Kafka, Databricks needs to process, and Looker needs to send the file — and every one of those steps has lag. Related to that: how to design the system to be **self-healing**, so files don't have to be manually re-sent from Looker if something fails or if payments/remittances process late.

**Luciano's own assessment:** he wouldn't categorize either of these two things — the DocWeb-consumption unknown, or the Vitalii self-healing/timing work — as complete blockers for CFM, but he'll let leadership decide.

**Luciano's follow-up hypothesis to Bhavik (open question, not yet confirmed):** If that's the case, does the data team really just need help from **Katalyst** to schedule sending the Remittance and Batch Post files to DocWeb for inbound eLockBox configuration? And once the data team has access to schedule sending those files, is that the end of the data team's duty — meaning this could potentially be **done in 1-2 sprints total** and be finished with sending files to eLockBox?

**This is not yet confirmed by Bhavik.** If true, it would revise the data-team estimate down significantly from the working 3-5 sprint range below.

### High-level summary (for Alfred)

**Unknown team - Payment Notifier & Remittance Generator:**
1. Payment Notifier and Remittance Generator — owning team(s) not yet identified, and it's not yet known whether any additional work is needed on these applications themselves (vs. just consuming their existing output).

**Data team - KHQ files:**
1. Create a v4 draft of the Remittance and Batch Post file for DocWeb ingestion — per Bhavik, ~1 sprint of effort, spread over 2 sprints.
2. Get those files into DocWeb for eLockBox transformation. **Open question:** may just require Katalyst's help to schedule sending the files — if so, this could be the end of the data team's duty on this feature. Not yet confirmed by Bhavik.

**Katalyst:**
1. Transform the files — KHQ Remittance file, KHQ Batch Post file, Payment Notifier feed, and Remittance Generator feed — into the 3 outbound files (Origination, Remittance, Return).

**Open / to clarify:**
- [x] Reconcile the Vitalii "2 files" statement against Jaro's spreadsheet "3 outbound files" framing — resolved: 2 files is the data team's scope; the 3 outbound files are the overall pipeline's client-facing output, built by iDoxs + Katalyst/DocWeb/eLockBox, not data team.
- [ ] **Confirm with Bhavik:** is item 2 (getting files into DocWeb) really just a Katalyst-scheduling dependency, ending the data team's duty once access is granted? If yes, revise estimate down to 1-2 sprints total.
- [ ] Share the Remittance and Batch Post File v4 Confluence doc with Bhavik directly, per his alignment ask.
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

### Terminology + strategic context: "Consumer Reports" vs. "Enrollment Reports," and the SCWA schema question

**Question (Luciano): is "Consumer Reports" the same thing as "Enrollment Reports"?**

Answer, researched via Atlassian Rovo and cross-checked against domain-knowledgeable colleagues — **no, Enrollment Report is one specific report inside the broader Consumer Reports category:**

- **Similarities:** both are part of the BizHQ+ reporting suite tracking MyHQ+ platform interactions; both share common headings (Account Number, Email, Activity Time); both update every 4 hours; both are accessed via the Consumer tab in the BizHQ+ Reports dashboard. ([View Consumer Reports](https://kubra.jira.com/wiki/spaces/AG/pages/1783300149/View+Consumer+Reports))
- **Scope/purpose:** the **Enrollment Report** is a snapshot of currently active enrolled consumers (excludes deleted consumers — [Consumer Reporting Requirements PRD](https://kubra.jira.com/wiki/spaces/AG/pages/1360462111/Consumer+Reporting+Requirements+-+PRD)). **Consumer Reports** (the category) is wider and includes the **Consumer Activity Report**, which tracks specific actions (profile creation, linking/unlinking accounts, verifying contact details) rather than just a point-in-time state ([View Consumer Reports](https://kubra.jira.com/wiki/spaces/AG/pages/1783300149/View+Consumer+Reports)).
- **Consolidation vs. legacy:** legacy enrollment reports (iDoxs) were sent daily as separate, rigid files (AllUser, NewUser, DeletedUser, etc.). The new BizHQ+ Consumer Reports consolidate those legacy files into **4 standardized reports**: Consumer Enrollment, Consumer Activity, AutoPay Enrollment, AutoPay Activity ([FTS additions - Consumer and AutoPay Reports](https://kubra.jira.com/wiki/spaces/MIC/pages/1840152626/FTS+additions+-+Consumer+and+AutoPay+Reports)).
- **Customization:** the new reports support FTS additions (clients can hide/rename/rearrange columns) — a departure from the rigid legacy structure.

**Luciano's added context:** BizHQ+ Consumer Reports were deliberately designed to be **generic**, and today they satisfy most legacy "enrollment report" use cases. But — same pattern as PG&E CFM's "Custom Reports" — **every client has their own legacy file format** for receiving these enrollment-style reports.

**SCWA-specific analysis (Luciano, a few weeks ago):** [Client Deep-dive - REPORTS § SCWA](https://kubra.jira.com/wiki/spaces/AG/pages/2070544397/Client+Deep-dive+-+REPORTS#SCWA---Suffolk-County-Water-Authority). SCWA's legacy reports are scheduled daily for client automation purposes, and map to the new BizHQ+ reports as follows (per Jaro's analysis):

| Legacy report (iDoxs) | New BizHQ+ report |
|---|---|
| AllUsers | Consumer Enrollment Report |
| ChangedUser | Consumer Activity Report (via filter) |
| DeletedUser | Consumer Activity Report (via filter) |
| NewUser | Consumer Activity Report (via filter) |
| RecurringDetail | AutoPay Enrollment Report |

**The core gap:** the BizHQ+ reports already have the underlying data for all of the above — but **removing, renaming, or reordering columns to match a client's legacy schema isn't something we have today.** This needs a separate internal decision:

- **Option A — self-service:** force the client onto the new BizHQ+ schema as-is (no custom formatting). If chosen, the existing Consumer Reports tabs are sufficient — no extra engineering scope.
- **Option B — legacy parity:** KUBRA keeps the client's exact legacy schema. If chosen, this requires additional engineering discussion around custom file formatting, which **increases the scope** of the Consumer Reports work being estimated here.

**Who owns deciding this?** Not currently anyone — Luciano confirmed no one is having this "static schema vs. self-service" conversation yet. His pick for who should drive finding the answer: **Jaro**.

**Historical framing (from designing these reports last year with Jaro and Erik):** the team hoped for self-service reporting rather than eLockbox-ing every report.
- *Pros of eLockbox:* can custom-transform any file per client — fast, easy way to satisfy client reporting requirements.
- *Cons of eLockbox:* custom file transformation becomes tech debt once it's baked into a client's automation flow (see: the extra work now required for PG&E CFM's strict formatting), plus a minor ongoing compute cost.
- **Luciano's preference:** self-service scheduling from BizHQ+ — but the con is the client has to adjust their own systems to a new file schema, it eliminates an established legacy business process for MyHQ enrollment reports, and Luciano notes there's been **"a change of heart recently"** on this approach given how KUBRA ultimately handled PG&E CFM (i.e., caved to custom eLockbox formatting there).

**Why this matters for Alfred's estimate:** if SCWA needs Option B (legacy schema parity via custom formatting), the Suffolk County Consumer Reports scope is larger than the two workstreams sized below — this open architectural question isn't priced in yet.

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
- [ ] **Bigger open question:** does SCWA actually need legacy-schema parity (Option B above)? If so, this feature's scope grows beyond the 2 workstreams sized here. Nobody currently owns driving this decision — Luciano's suggestion is Jaro. Worth flagging to Alfred as a scope risk, not baking into the sprint numbers yet.

## Action items

- [x] Luciano: add more detail on the "three reports" for PG&E CFM — resolved: data team scope is 2 KHQ files (Remittance, Batch Post); the 3 outbound files (Origination, Remittance, Return) are the overall pipeline's client-facing output, built by iDoxs + Katalyst/DocWeb/eLockBox.
- [ ] Luciano + EM(s): size "New Best Case" / "New Worst Case" for PG&E CFM, scoped to the 2 KHQ files (Remittance, Batch Post) — this is the Remittance/Batch Post File v4 work already in progress.
- [x] Luciano + Phil Rubio: size Suffolk County Consumer reports — resolved as two workstreams: Data Analytics External ID column (1 sprint, ANALYTICS-4294) + Phil Rubio's verification-event bug investigate/fix (2 sprints sequential, ANALYTICS-4295/4296).
- [ ] Luciano: reply to Alfred by **August 4** with whichever estimates are ready (per-feature, no need to wait for both).
- [ ] Luciano: send Alfred a high-level overview once this doc is clarified.
- [ ] Luciano: raise the self-service-vs-legacy-schema question with Jaro — nobody currently owns driving this, and it affects scope for SCWA and likely other clients beyond just Suffolk.

## Related

- [[Consumer-Reports]] (if present in knowledge graph — ANALYTICS-4293 epic)
- [Remittance and Batch Post File v4](https://kubra.jira.com/wiki/spaces/AG/pages/2111504406/Remittance+and+Batch+Post+File+v4+-+draft+-+07+29+2026) — confirmed scope match for PG&E CFM's data-team deliverable
- [PGECFM - Middleware for Outbound File processing](https://docs.google.com/drawings/d/1gna6BPG1s6TzxmTgZYOtPb--fY8g2V1AAuDybCFk3vA/edit) (Jaro Leken)
- [PGECFM File Processing spreadsheet](https://docs.google.com/spreadsheets/d/1sklnHaMO6kUu2NSl_99C7nARAUlcjJ6fqWbIqD0YpPM/edit?gid=0#gid=0) (Jaro Leken) — file inventory; source of the conflicting "3 outbound files" framing
- [View Consumer Reports](https://kubra.jira.com/wiki/spaces/AG/pages/1783300149/View+Consumer+Reports) — Consumer Reports vs. Enrollment Report terminology
- [Consumer Reporting Requirements - PRD](https://kubra.jira.com/wiki/spaces/AG/pages/1360462111/Consumer+Reporting+Requirements+-+PRD)
- [FTS additions - Consumer and AutoPay Reports](https://kubra.jira.com/wiki/spaces/MIC/pages/1840152626/FTS+additions+-+Consumer+and+AutoPay+Reports) — legacy-to-new report consolidation
- [Client Deep-dive - REPORTS § SCWA](https://kubra.jira.com/wiki/spaces/AG/pages/2070544397/Client+Deep-dive+-+REPORTS#SCWA---Suffolk-County-Water-Authority) — Luciano's legacy-to-new report mapping analysis for Suffolk County Water Authority

## Draft response to Alfred (high-level)

**Status: DRAFT — for Luciano to review/edit before sending. Numbers below are traceable to this doc, but Feature 1's is Bhavik's read, not yet a formally confirmed EM sizing.**

---

Hi Alfred,

Thanks for the context — here's where we landed on both, high-level:

**Custom Reports for PG&E CFM**
High-level, here are the teams involved in getting these reports out to PG&E CFM:

- **Data team (KHQ files):**
  1. Create a v4 draft of the Remittance and Batch Post file for DocWeb ingestion — 1 sprint of effort, spread over 2 sprints (per Bhavik).
  2. Get those files into DocWeb for eLockBox transformation. *(Open question — see below.)*
    - Data team needs help into understanding where they need these file dropped. a potential Katalyst question as they will be doing the elockbox configuration?
- **Katalyst:** transforms the files — KHQ Remittance file, KHQ Batch Post file, Payment Notifier feed, and Remittance Generator feed — into the 3 outbound files (Origination, Remittance, Return).
- **Unknown team — Payment Notifier & Remittance Generator:** owning team(s) not yet identified; also unknown whether any additional work is needed on these applications themselves, versus just consuming their existing output.

Data Analytics team piece specifically is the KHQ Remittance file + KHQ Batch Post file (v4):
1. Create the v4 draft — 2 sprints
2. Get those files into DocWeb for eLockBox transformation — **Data Analytics open question**:  
  - Data team needs help into understanding where they need these file dropped. a potential Katalyst question as they will be doing the elockbox configuration?
    - remittance to schedule send at 5am EST.
    - Batch post file to schedule at 9:30pm EST.

- New Best Case: ----
- New Worst Case: ----

Cannot give estimates as there are still a couple of open questions.

**Consumer reports (Suffolk County Water Authority)**
Two independent workstreams surfaced here, with different owners:
- **Data Analytics:** add an External ID column to the Consumer Enrollment and Consumer Activity reports, so consumers who share the same email/phone can still be told apart — **1 sprint**.
- **Consumer platform (Phil Rubio's team):** investigate and fix a bug where a contact-verification event isn't firing, which is why verified contact info shows up blank in the reports — **2 sprints, sequential** (1 to investigate, 1 to implement).

One flag for prioritization purposes: SCWA's legacy reports (AllUsers, ChangedUser, DeletedUser, NewUser, RecurringDetail) map to our new BizHQ+ reports, but we don't yet know if SCWA needs their exact legacy column formatting preserved or can move to our standard schema. If they need legacy parity, that's additional engineering scope not reflected in the numbers above — nobody's currently driving that decision, so it's not sized yet.

Happy to break either of these down further if it'd help with prioritization.

Luciano
