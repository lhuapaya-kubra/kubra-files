---
type: meeting-note
date: 2026-09-18
attendees: [Thomas Gerlach, Luciano Huapaya, Jaro Leken]
platform: ConfigHQ
product: File-Transformation-Service
tags: [meeting-notes]
confluence_page: "2026-09-18 - Identifying Initial FTS Candidates"
---

# 2026-09-18 — File-Transformation-Service sync

Informal weekly sync, no fixed agenda. Google Meet + Gemini notes; this file is the corrected/condensed version — Gemini's transcript mislabeled several of Jaro Leken's own third-person references ("Yarao"/"Yara") as a separate person. Per the vault's terminology dictionary, those are STT mishearings of Jaro himself, corrected here.

## Agenda

- Identify low-hanging-fruit clients to start testing FTS against
- Consumer enrollment file merging gap
- Remittance v4.01 migration / SFTP bucket architecture
- FTS templating engine walkthrough
- UX design disagreement on the ConfigHQ interface
- AI-assisted config generation (floated idea)

## Notes

- **Pilot candidates**: Thomas wants to identify simple client use cases to start running FTS pipelines end-to-end. Jaro: current live clients don't have enrollment reports except Stanford, and enrollment reports aren't supported by FTS today anyway (FTS only handles batch and remit files). Sandbox testing could start with Stanford or any client already configured in sandbox, but Jaro's team has no bandwidth until after their QA push (~end of month, ~1.5 weeks out). Jaro will flag Thomas once someone frees up.

- **Two file-set problem**: Luciano distinguished EZ-PAY+/payment clients (daily remittance + batch post files) from consumer enrollment clients (daily files updating the client's CSI system). Data team has specs drafted for consumer enrollment files but is currently focused on data migration. Luciano walked through the end-to-end flow: client source data (owned by the data analytics team, fed from KUBRA HQ) → FTS (today: column rename/reorder/filter/value remap; upcoming: header/footer/fixed-width) → KUBRA-hosted SFTP / external SFTP / email.

- **Consumer enrollment file merge gap**: Enrollment clients often send/expect up to 4 related files (e.g. enrollment report, activity, autopay report) merged into one output — the legacy system injects recurring/autopay data into the main user file rather than doing a literal file merge. This isn't supported in FTS today. Thomas created **FTS-443** ("BE: Support for File Merging") during the call to track it, and asked Jaro for a client scenario with sample input/output files, plus the legacy merge code (any language) so he can look at it programmatically rather than reverse-engineering from samples alone. Jaro agreed to find both. Luciano will send Thomas a private doc with KHQ requirements/sample data he's been drafting with the data team.

- **Remittance v4.01 / SFTP architecture**: Each client currently has an almost bespoke remittance file format. Remittance v4.01 is meant to enable backward-compatible routing/migration without breaking existing client jobs or schemas — this is the top-priority next step for really putting FTS to use. Complication: today FTS replicates files from the DSO-hosted SFTP bucket into a separate FTS outbound SFTP bucket (both original and transformed copies are kept for debugging), so clients would have to access files in two places. Jaro's hard requirement: zero client-side config change (no new SSH keys/users). Moving SSH keys/users to the new system is controlled by DSO, not Platform 1 — Thomas and Luciano to have internal conversations on strategy here, likely also involving Colin. **Correction (confirmed via Jira 2026-09-18):** the actual tracking ticket for this thread is Initiative **KUBRA-92** ("Origination (memo), Remittance and Return files for PGE CFM") → Epic **ANALYTICS-4183** ("[Outbound File Pipeline] v4 remittance and batch post files to DocWeb") → child story **ANALYTICS-4374** ("Send v4 Remittance File & Batch Post File to new SFTP mailbox (KHQ Sandbox/Live)", Blocked) — not FTS-370, which is Platform 1's own generic SMM-migration epic and unrelated to this specific PG&E CFM file work. See `ConfigHQ/File-Transformation-Service/specs/fts-v0.1-superset-file-client-comparison.md` for the full client-by-client mapping this fed into.

- **Priority order Luciano proposed** (Thomas agreed, defers to whatever path makes sense): (1) migrate old remittance versions to v4.01 while preserving each client's existing schema, (2) start on consumer enrollment data files (one-in/one-out first), (3) file merging, (4) aggregate summary reports (payment summaries spanning products like IVR+, not tied to any one product).

- **Feature coverage check**: basic transforms + header/footer + fixed-width should cover most eLockbox scenarios; unique custom reports (via stored procedures against payment history) are a separate, harder problem. Jaro can't fully confirm coverage until he's actually run configs through FTS. Email as an output destination was explicitly deprioritized by Luciano — it's mostly used today for custom/aggregate rollup reports, and querying the data lake (e.g. via Looker) directly makes more sense than building email distribution for system-generated files. No Jira ticket exists yet for the aggregate-rollup-via-email idea specifically — open question whether it's in scope for FTS-439 or needs its own ticket.

- **FTS templating engine walkthrough** (Thomas): JSON config defines variables (`count`, `sum`, `current_date` with Java/C-style date formatting), file headers/footers with fixed strings + variable interpolation, sections grouped by a field (e.g. business unit code) with a `currentSection` reference usable throughout, arithmetic on variables inside `{{ }}`, and "no body" reports (header + multiple footers only, for pure summary output). Ties to **FTS-379** (Header, Footer & Fixed Width).

- **UX disagreement**: Thomas's back-end model is band-based (header → section header → data → section footer → file footer, top to bottom), but the UX team's current mockup buries headers/footers under "additional configuration," which Thomas and Jaro both think misreads how the data actually flows — the UX team lacks domain context here. Plan: Thomas builds a mockup of the interface he thinks should exist (using Claude Code), gets Jaro's buy-in via email, then Jaro (with Luciano) pushes it to UX (Vshack, Neil) citing the primary user's preference to help move the design. Luciano will distribute the reference screenshots Thomas already shared with UX.

- **AI-assisted config generation (floated, not pursued now)**: Luciano raised the idea of a Claude-driven skill that calls the FTS API directly to build configs instead of manual clicking in ConfigHQ. Thomas's pushback: Repay has a strong aversion to API/MCP endpoints (already hit this friction on Datafeed) — would need to clear security first — and it's unclear whether debugging AI-generated config output would be faster or slower than writing it by hand for Jaro's team. Both agreed: not worth pursuing while eLockbox replacement is the active priority. No action item, just parked.

## Action items

- [ ] **Jaro Leken** — find a client scenario for the 4-file merge case; provide sample input/output files to Thomas → **FTS-443**
- [ ] **Jaro Leken** — locate and send the existing legacy merge code (any language, e.g. lockbox C/C++) to Thomas for programmatic review
- [ ] **Luciano Huapaya** — send Thomas the KHQ/remittance file support documentation + potential sample data via DM
- [ ] **Thomas Gerlach / Luciano Huapaya** — internal conversation(s) on remittance v4.01 migration strategy and DSO-bucket routing without breaking existing client configs (likely needs Colin)
- [ ] **Thomas Gerlach** — build a mockup of the templating-based configuration interface, using Claude Code
- [ ] **Thomas Gerlach** — get Jaro's buy-in on the mockup via email
- [ ] **Jaro Leken / Luciano Huapaya** — push the approved mockup to UX (Vshack, Neil), citing primary-user preference
- [ ] **Luciano Huapaya** — distribute the referenced UX screenshots to the project team

## Related

- [[File-Transformation-Service]]
- [[SFTP-Mailbox-Manager]] — DSO-hosted bucket vs. SMM migration is the same underlying problem as ANALYTICS-4374 (see correction above)
- [[ConfigHQ]]
- Jira: [FTS-443](https://kubra.jira.com/browse/FTS-443) (created this meeting), [KUBRA-92](https://kubra.jira.com/browse/KUBRA-92) → [ANALYTICS-4183](https://kubra.jira.com/browse/ANALYTICS-4183) → [ANALYTICS-4374](https://kubra.jira.com/browse/ANALYTICS-4374) (PG&E CFM remittance v4.01/SFTP-mailbox migration — corrected from initial FTS-370 guess), [FTS-379](https://kubra.jira.com/browse/FTS-379), [FTS-403](https://kubra.jira.com/browse/FTS-403)
- Confluence: [Platform 1 — Meeting notes — 2026-09-18 - Identifying Initial FTS Candidates](https://kubra.jira.com/wiki/spaces/P1/pages/2189459532/2026-09-18+-+Identifying+Initial+FTS+Candidates)
- [[fts-v0.1-superset-file-client-comparison]] — client-by-client superset mapping this fed into
