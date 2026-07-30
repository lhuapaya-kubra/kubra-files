---
type: product
name: Datafeed
platform: ConfigHQ
tags: [product]
jira_project_key:
confluence_space:
status: Active — Swift UI → ConfigHQ V3 migration in progress
---

# Datafeed

Part of [[ConfigHQ]].

## Overview

Datafeed is ConfigHQ's client-facing file-ingestion API: clients push account/balance/invoice files into KUBRA via the Datafeed v3 REST API (`https://api.kubra.io/datafeed/v3/{datafeedType}/{spaceKrn}/files`), authenticating with an OAuth2 client-credentials grant and identifying feeds/spaces by KRN (Kubra Resource Name). Requests are scoped by realm (sandbox/live) and can carry optional metatags. Once a file is uploaded, downstream KUBRA services (accounts, balances, etc.) process it automatically — Datafeed itself has no business logic.

The product is mid-migration off the legacy Swift UI onto ConfigHQ, targeting full decommission of Swift UI for feed setup. The underlying V3 architecture is the real win: it replaces a per-feed-type duplicated codebase (multi-day setup) with centralized, config-driven feed setup (~30 minutes). V1 feeds are not auto-migrated to V3 — they must be recreated. There's also an active backlog of ConfigHQ UI/UX gaps (e.g. showing the feed name in the upload popup, searchable file lists) tracked as an internal feedback log, several already shipped.

`tools/` holds two reference artifacts, not production systems: a React/Vite analytics dashboard prototype (`Datafeed_metrics/`, 100% mock data) sketching a future PM-facing view of client usage, downstream delivery health, and exception trends; and a working Python CLI (`UploadSampleFile/`) that exercises the real Datafeed API end-to-end (auth → multipart upload) as a runnable companion to the spec in `specs/`.

## Content

- Specs: `ConfigHQ/Datafeed/specs/` — API reference PDF, Swift UI migration/V3 rationale, UI feedback log
- Tools: `ConfigHQ/Datafeed/tools/` — metrics dashboard prototype, sample upload script
- Meeting notes: `ConfigHQ/Datafeed/meeting-notes/`
- Jira: `ConfigHQ/Datafeed/jira/`
- Confluence: `ConfigHQ/Datafeed/confluence/`
- Diagrams: `ConfigHQ/Datafeed/diagrams/`

## Related

- [[ConfigHQ]]
- [[index]]
