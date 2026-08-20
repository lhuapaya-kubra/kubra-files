# iDoxs → Databricks Pipeline — Cost Estimate

**Requested by:** Steve Ryan
**Status:** placeholder — not yet started

## Why this doc exists

New data pipeline to move legacy client data from iDoxs into the datalake (Databricks). Steve wants to know what it will cost to **gather** and **process** the data for this pipeline.

## Known data points (as of 2026-08-19)

Source: Teams thread, Prat Ragavan / Alankar Chakravorty / Luciano Huapaya.

| Client | Metric | Value |
|---|---|---|
| PG&E | Database size | 3.25 TB |
| PG&E | Monthly payment transaction volume | 3,498,600 |
| PG&E | Subscriber count | 9,910,323 |

This is one client (PG&E) as a hypothetical/reference sample — not yet a full accounting of all legacy clients in scope for the iDoxs → Databricks migration.

## Scope (for now)

**Data source in scope: Payments data only.** Other iDoxs data (billing, notifications, etc.) is out of scope for this pass — the 3.25 TB PG&E database figure above is the *whole* database, not just payments, so it isn't used directly below.

## Placeholder assumptions (to validate with engineering)

These are back-of-envelope numbers only, meant to give a rough order of magnitude ahead of an engineering discussion — not a committed estimate.

- Average payments-transaction record size (fields + metadata, no PAN/CVV): **~1.5 KB**
- PG&E monthly payments volume: 3,498,600 tx → **~5 GB/month** of new payments data
- Assumed history depth for one-time backfill: **5 years** → ~300 GB one-time backfill (PG&E only)
- All figures below are **PG&E-only** — total cost scales with however many legacy clients end up in scope (unknown today)

## Open questions

- [x] What data sources / tables in iDoxs are in scope? → Payments data only, for now
- [x] Volume estimate for one sample client (PG&E, above) — still need: full list of legacy clients in scope + their sizes, to extrapolate total volume
- [ ] One-time backfill vs. ongoing/incremental load? (assumed both, above)
- [x] Compute: placeholder below — needs engineering input on real cluster sizing
- [x] Storage costs — placeholder below
- [x] Egress/transfer costs — placeholder below

## Cost breakdown (placeholder — discussion topic with engineering)

All figures below are **PG&E-only**, rough order-of-magnitude guesses to seed the engineering conversation — not committed numbers.

### 1. Data gathering (iDoxs extraction)

Pulling payments records out of iDoxs.

- **Estimated cost:** not estimated
- **Why:** depends entirely on the iDoxs extraction method (API pull, DB export, file dump, etc.) — needs engineering input before this can even be roughed in

### 2. Data transfer / egress

Moving extracted data from iDoxs to the datalake.

- **One-time (backfill, ~300 GB):** ~$15–30
- **Recurring (~5 GB/month):** ~$1–5/month
- **Why:** assumes standard cloud egress rates (~$0.05–0.09/GB). Could drop to ~$0 if the transfer stays on an internal network rather than crossing a cloud egress boundary

### 3. Databricks compute (processing)

Small job cluster for daily incremental loads; a larger cluster for the one-time backfill.

- **Recurring:** ~$150–300/month
- **One-time (backfill):** ~$200–500
- **Why:** rough guess based on ~5 GB/month of incoming data on a small autoscaling cluster — the least confident number here, needs real cluster sizing from engineering

### 4. Storage (Databricks/datalake)

Delta Lake on cloud object storage, ~380 GB total (backfill + 1 year of growth).

- **Recurring:** ~$8–10/month
- **Why:** cloud storage is cheap relative to compute — lowest-risk part of this estimate

### Total (PG&E only, rough)

| | Estimate |
|---|---|
| **Recurring** | ~$160–315/month |
| **One-time load** | ~$215–530 | (everything in the DB.)

Scale by the number of legacy clients once that list exists.

## Related

- Datalake = Databricks
- Context: new pipeline to bring legacy clients' data into the datalake

---- redoing everything - things we need to account:


- databricks compute
- macie () 