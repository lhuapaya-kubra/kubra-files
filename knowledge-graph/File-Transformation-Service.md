---
type: product
name: File Transformation Service
platform: ConfigHQ
tags: [product]
jira_project_key: FTS
confluence_space: MIC
status:
---

# File Transformation Service

Part of [[ConfigHQ]].

## Overview

File Transformation Service (FTS) transforms per-client remittance/payment files between a utility's own lockbox export format and the formats KUBRA and downstream banks/processors need. Today this is implemented as bespoke per-client "apps" — either a "Standard Elockbox app" (shared template, e.g. Colorado Springs Utilities, Teco, Xcel Energy) or a "Custom Elockbox (Returns) app" (bespoke compiled program, e.g. PGE, SFPower) — each configured via a legacy Access database (`Setup.mdb`/`.accdb`) holding that client's field mappings and layout rules. Input files (comma/pipe-delimited or fixed-width) are converted to one or more outputs: Kubra-internal feeds, bank/processor reconciliation files, ACH/CCPD payment files, returns/rejects, and per-transaction "memo" files.

`sample-data/REMIT_SAMPLE_FILES_SUMMARY.md` is an existing, well-developed analysis of footer/trailer/reconciliation patterns across these formats (record-type schemes like H/D/T, delimiter styles, what clients can reconcile from each trailer) — written for FTS/FDS design discussions and likely feeding a future move toward a more generic, self-describing transformation service rather than one bespoke Access-configured app per client.

**PII flag:** `sample-data/Colarado Springs Utilities/.../Input/CR_coloradosprings_Remit_20240917.csv` appears to contain real, unmasked payer names alongside payment and bank routing data — not synthetic sample data. Treat as sensitive; needs scrubbing or access restriction before this file is referenced, excerpted, or shared outside this vault.

## Content

- Specs: `ConfigHQ/File-Transformation-Service/specs/`
- Sample data: `ConfigHQ/File-Transformation-Service/sample-data/` — per-client Input/Output examples + footer/trailer reconciliation summary (see PII flag above)
- Meeting notes: `ConfigHQ/File-Transformation-Service/meeting-notes/`
- Jira: `ConfigHQ/File-Transformation-Service/jira/`
- Confluence: `ConfigHQ/File-Transformation-Service/confluence/`
- Diagrams: `ConfigHQ/File-Transformation-Service/diagrams/`

## Related

- [[ConfigHQ]]
- [[index]]
