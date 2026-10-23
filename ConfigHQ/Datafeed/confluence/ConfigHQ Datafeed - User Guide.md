---
type: confluence-page
page_id: 2233204738
space: MIC
platform: ConfigHQ
product: Datafeed
tags: [confluence, draft]
---

<!-- Published 2026-10-19 as child of "Datafeed - Playbook" (1551827001): https://kubra.jira.com/wiki/spaces/MIC/pages/2233204738 -->


# ConfigHQ Datafeed - User Guide

## Summary

Plain-language guide to managing Datafeeds from the ConfigHQ UI (Manage Datafeeds page). DRAFT, not yet published.

## Content

### Overview

ConfigHQ Datafeed is the screen in ConfigHQ where you set up and manage Datafeeds without touching the API. Open **Datafeeds > Manage Datafeeds** in ConfigHQ (for example `https://abcenergy.confighq.kubra.io/configuration/datafeeds/`; the first part of the URL is your client's ConfigHQ site).

The Manage Datafeeds page lists every Datafeed by name and Datafeed type (for example Outage Feed, Planned Outage Feed, Delivery Node Feed, Additional Map Layer Feed). Use the search box (name, Datafeed ID or KRN ID) and the filter button to find one, then select it to view or edit it on the right.

> **Which Datafeed version?**
> - **Datafeed v3** is used by products on the platform: **KHQ, EZ-PAY+ and MyHQ+**.
> - **Datafeed v1** is used by older products: **Notifi and Storm Center**.
>
> In ConfigHQ, v1 feeds show a **Legacy** badge. For more technical detail see the Datafeed v3 Playbook and Datafeed v1/v2 Playbook (MIC).

### What you can do here

| Task | How |
|---|---|
| Create a Datafeed endpoint quickly | Select the **+** button at the top right of Manage Datafeeds and complete the form. [confirm steps] |
| View files uploaded in the past 24 hours | Select a Datafeed and open its recent files list. [confirm where] |
| Search for a previous day's file | Select a Datafeed and search or filter its file list by date. [confirm where] |
| Upload files directly to a Datafeed | Select a Datafeed and use the upload option, no API or SFTP needed. Requires upload permission (see FAQs). [confirm steps] |
| Create dependency queues | Set up a queue so files are processed in a defined order. [confirm steps] |

### FAQs

**I can't upload a file. Why?**
You likely don't have upload permission. Submit a ServiceNow ticket requesting it and include the client, the Datafeed name and your role. [ServiceNow catalog item link: pending]

**Where can I find technical details about Datafeed errorCode messages?**
See the technical documentation below. [links pending]

- [errorCode link 1: pending]
- [errorCode link 2: pending]

## Related

- [[Datafeed]]
- [[ConfigHQ]]
