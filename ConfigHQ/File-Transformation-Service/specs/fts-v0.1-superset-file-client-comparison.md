---
type: spec
platform: ConfigHQ
product: File-Transformation-Service
tags: [spec, fts, remittance-v4.01, client-comparison, superset-design]
source: "Remittance versions (column reference) Google Sheet, gid 1421882147: https://docs.google.com/spreadsheets/d/1Sty8jJoDwAuKE9f6zxxgNpLcjYEfopqwz_quIvOZCHY/edit?gid=1421882147 — could not fetch live (401, private); built from the local mirror + linked Confluence docs instead. Confirm nothing has changed on the live sheet since."
---

# FTS v0.1 — Superset Remittance/Batch Post File & Client Comparison

## Goal

Luciano's framing (2026-09-18): **v0.1 is the newest/latest file schema FTS receives, built wide enough to cover every current client's needs.** Going forward, new client-specific fields get *appended* to that superset rather than inserted or renamed in place, so existing clients' FTS configs never break. Service Delivery/Team Katalyst then just turns on the extra columns a given client needs via FTS's existing column filter/rename/reorder features — the data team stops maintaining N bespoke report definitions per client.

**This isn't a new proposal — it's already the decided direction.** The [Remittance and Batch Post File v4.01 doc](https://kubra.jira.com/wiki/spaces/AG/pages/2145190001/Remittance+and+Batch+Post+File+v4.01+-+draft) records the 2026-09-01 decision explicitly: *"this v4.01 schema is the single standard file that net-new clients adopt as-is... Existing/legacy clients... are not forced onto it — FTS excludes or reorders columns per client instead of the data team maintaining separate custom report versions."* What follows here is the client-by-client mapping check for that decision — confirming v4.01 actually is a superset of every legacy client's real column set, not just in intent.

## Client comparison (current custom-built reports)

Source: `BizHQPlus/Reports/remittance_bp_data_files/headers_comparison.csv` (local mirror of the linked Google Sheet tab) cross-checked against the v4.01 Confluence doc. Schedule times are only documented for PG&E CFM — the rest are **not found anywhere in the vault**; flagged below rather than guessed.

| Client | Schema version | File(s) | Columns | Known send schedule | Live today? |
|---|---|---|---|---|---|
| City of Scottsdale | v1 | Remittance (1 file) | 24 | **Not documented** — confirm with Luciano/Jaro | Yes |
| City of Stamford | v2 | Remittance **and** Batch Post — two *separately-shaped* files (flagged as a surprise finding when this comparison was first built — not previously realized) | 17 (Remit) / 12 (Batch Post) | **Not documented** — confirm with Luciano/Jaro | Yes |
| Port of Long Beach & Lorraine County (POLB & LCPH) | v3 | Remittance (share one schema) | 36 | **Not documented** — confirm with Luciano/Jaro | Yes |
| PG&E CFM | v4 | Remittance + Batch Post (KHQ-sourced; 2 other client-facing files — Origination/Memo, Returns — are built downstream in DocWeb/eLockBox by Katalyst, not by the data team) | 36 | **Remittance: 5:00 AM ET. Batch Post: 9:30 PM ET.** (per [2026-08-03 Alfred prioritization notes](../../../BizHQPlus/Reports/meeting-notes/2026-08-03-alfred-prioritization-pge-cfm-suffolk-consumer-reports.md)) | No — not yet live |
| City of Philadelphia | v4.01 (draft, finalized 2026-09-11) | Remittance & Batch Post, shared layout | 44 | Not yet scheduled — first go-live target for the new standard schema | No — first go-live target |

**Out of scope for this comparison:** Bear Valley and Stanford are also named in the v4.01 doc's "not forced onto v4.01" legacy list, but neither appears in the remittance/batch-post comparison sheet. Stanford's known FTS need is enrollment reports, not remittance (see the [2026-09-18 FTS meeting notes](../meeting-notes/2026-09-18-identifying-initial-fts-candidates.md)) — likely why it's absent here. Bear Valley's only remittance-adjacent ask on file is a net-new `bankAccountType`/`bankRoutingNumber` column request already folded into v4.01. Worth a separate pass if their full legacy schemas need mapping too.

## Is v4.01 actually a superset? (field-level check)

Walking each legacy version's column list against v4.01's 44 columns:

- **Scottsdale (v1), POLB & LCPH (v3), PG&E CFM (v4):** every column has a v4.01 equivalent. A few are straight renames that FTS's existing **column rename** feature already handles per-client (this isn't new engineering work): `status` → `transactionStatus`, `principleType`/`principleId` → `principalType`/`principalID`, `emailAddress`/`phoneNumber` → `notificationEmailAddress`/`notificationPhoneNumber`. `product`/`channel` are explicitly kept in v4.01 as **BACKWARD COMPATIBILITY** fields for exactly this reason (Scottsdale/Stanford).
- **Stamford (v2):** same pattern, **except one field — `paymentDate`** — appears in both Stamford outputs (Remit and Batch Post) with no obvious v4.01 counterpart. It's unclear whether it's a duplicate of `transactionDate` or `originalPaymentDate`, or something else entirely. **Open question — needs Luciano/Bhavik confirmation before Stamford can be mapped onto v4.01 with confidence.**

No other gaps found. This is a meaningful validation: **v4.01, as already scoped, does not need new columns to cover Scottsdale/POLB/LCPH/PG&E CFM** — the remaining work is FTS *configuration* (rename/exclude/reorder per client), not new *schema* work, aside from resolving the Stamford `paymentDate` question.

## The mechanism: how FTS actually does the per-client filtering

This is the same templating engine Thomas Gerlach walked through in the 2026-09-18 sync — it's what makes the "append to the superset, FTS filters the rest" model workable without new engineering per client:

- **Variables**: three kinds — `count()`, `sum(field)`, and `current_date(format)` (Java/C-style date formatting). Variables can be scoped with `groupBy` and `filter` clauses that read like a SQL `WHERE`/`GROUP BY` (e.g. an `amxCount` variable = `sum(amount)` where `cardType = AMX`, formatted to 2 decimal places). `groupBy` alone (no filter) produces one variable per distinct value automatically (e.g. one count per card type, or per business unit code).
- **Headers/footers**: fixed strings plus `${variable}` interpolation, e.g. `Total payments: ${totalPayments}`. Variables can be added/subtracted inline inside the `{{ }}` braces.
- **Sections**: output can be grouped by a field (e.g. business unit code); a `currentSection` reference is available inside the section to pull the right value out of a `groupBy`-produced variable map.
- **Fixed-width support**: each column can carry a padding/width config in addition to its output field, for clients needing fixed-width rather than delimited output.
- **"No body" reports**: a report can skip the data band entirely and emit only a header plus multiple footers — used for pure summary/aggregate output.
- Ties to Jira epic **FTS-379** ("FTS File Header, Footer & Fixed Width", In Progress) — this is the feature set landing to make column-level per-client exclusion/reorder/rename (today) plus header/footer/fixed-width (in progress) sufficient to serve every client in the table above off one superset file, without a bespoke report definition per client.
- Known gap raised in the same walkthrough: **file merging** (combining multiple input files into one output) is not yet supported — tracked separately as **FTS-443**, not part of this superset-file design.

## Related Jira / tracking

- **KUBRA-92** (Initiative) — "Origination (memo), Remittance and Return files for PGE CFM" → **ANALYTICS-4183** (Epic, In Progress) — "[Outbound File Pipeline] v4 remittance and batch post files to DocWeb". This is the actual PG&E CFM epic — **not FTS-370** (FTS-370 is Platform 1's own generic "migrate 4 KHQ clients off the DSO bucket onto SMM" epic; related infrastructure, but not this file-schema work).
  - Child story **ANALYTICS-4374** — "Send v4 Remittance File & Batch Post File to new SFTP mailbox (KHQ Sandbox/Live)" (**Blocked**) — this is the actual SFTP Mailbox Manager migration ticket for PG&E CFM's files.
  - v4.01-specific child stories (all **Groomed**, not started): **ANALYTICS-4497** (Data Engineering — source new/updated columns), **ANALYTICS-4498** (Data Quality validation), **ANALYTICS-4499** (Looker explore updates), **ANALYTICS-4500** (Product/Channel ↔ Payment Source mapping table), **ANALYTICS-4521** (push v4.01 changes to production).
- **FTS-379** — header/footer/fixed-width (templating engine work, see above).
- **FTS-443** — file merging (separate gap, not part of this design).

## Open items

- [ ] Confirm Stamford's `paymentDate` field mapping against v4.01 (Luciano/Bhavik).
- [ ] Get documented send schedules for Scottsdale, Stamford, POLB, LCPH, and City of Philadelphia — none found in the vault (Luciano/Jaro).
- [ ] Live Google Sheet (gid 1421882147) returned 401 when fetched directly — this doc is built from the local CSV mirror instead. Confirm the mirror is still current, or share an export/screenshot if the live sheet has moved on.
- [ ] Decide whether Bear Valley/Stanford need their own comparison pass for remittance/batch-post (see "Out of scope" note above).

## Related

- [[File-Transformation-Service]]
- [Remittance and Batch Post File v4.01 draft](https://kubra.jira.com/wiki/spaces/AG/pages/2145190001/Remittance+and+Batch+Post+File+v4.01+-+draft) — the superset schema itself
- `BizHQPlus/Reports/remittance_bp_data_files/headers_comparison.csv` — raw per-client column data this doc is built from
- [2026-09-18 FTS meeting notes](../meeting-notes/2026-09-18-identifying-initial-fts-candidates.md) — templating engine walkthrough source, FTS-443 file-merge gap
- [2026-08-03 Alfred prioritization notes](../../../BizHQPlus/Reports/meeting-notes/2026-08-03-alfred-prioritization-pge-cfm-suffolk-consumer-reports.md) — PG&E CFM schedule times, KUBRA-92/ANALYTICS-4183 scope history
