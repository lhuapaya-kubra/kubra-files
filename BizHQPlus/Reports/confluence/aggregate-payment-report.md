---
type: confluence
title: Aggregate Payment Report
confluence_space: AG
confluence_page_id: 2216198340
confluence_url: https://kubra.jira.com/wiki/spaces/AG/pages/2216198340/Aggregate+Payment+Report
parent: Drafts (2112455035)
status: draft
created: 2026-10-08
---

# Aggregate Payment Report

Part of [[Reports]]. Live draft: [Confluence](https://kubra.jira.com/wiki/spaces/AG/pages/2216198340/Aggregate+Payment+Report) (under BizHQ+ Report Requirements → Drafts; to be filed into a category folder).

## Overview

- **Purpose:** Aggregate payment totals by grouping dimensions so clients don't total transactions manually; also the standard base report Service Delivery uses for client aggregate-report requests.
- **Functional requirements:** One standard report for all clients. Legacy clients needing a specific layout get the same output sent to DocWeb for file transformation.

## Filters

| Filter | Variable (Type) | Default |
| --- | --- | --- |
| Transaction Date | transaction_date (date) | is in the last 1 months |
| Funding Source Type | funding_source_type (enum) | is any |
| Funding Method of Payment Code | funding_method_of_payment_code (string) | is any |
| Payment Processor Code | payment_processor_code (string) | is any |
| Response Code | response_code (string) | is any |

## Columns

Payment Processor Code, Funding Source Type, Method of Payment, Payment Source, Transaction Status, Business Unit Code, Transaction Amount, Count of Payment ID, Original Consumer Fee Amount, Original Client Funded Fee Amount, plus a Grand Total row.

## Rules

Null Handling, Timezone Handling, PII Handling (none in report), Duplicate Handling (distinct Payment ID), Aggregation Level, **Terminal States Only** (Transaction Status is not a user filter), Repeated Values (no blank-fill in exports), Legacy Client Output (via DocWeb).

## Open questions

1. Date basis for Transaction Date (initiation / authorization / settlement)?
2. Add a Transaction Date or day/month grain column?
3. Net-amount / total-fees column needed?
4. Is payment count unique across statuses?
5. DocWeb delivery: Looker scheduled delivery vs. File Transformation Service (check FTS-439 vs. new epic)?
6. Which statuses count as terminal?
7. How is data scoped to client and live data without Client Name / Realm filters?
