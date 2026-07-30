# Datafeed Analytics Dashboard

A React-based analytics dashboard for visualizing Datafeed service metrics from a Product Management perspective.

## Purpose

This dashboard tracks key metrics for the Datafeed service, which is a mission-critical pipeline:

**Client file uploaded → Datafeed → Downstream consumers (KUBRA products & services)**

## Philosophy

> **"Datafeed should remain operationally simple, but analytically rich."**

Datafeed is intentionally designed as a dumb pipeline - it ingests files, processes them deterministically, and delivers them to downstream consumers without embedding business logic.

However, while the pipeline itself is dumb, the product decisions around it cannot be.

**Metrics are not about adding intelligence to the pipeline — they are about adding intelligence to our decisions.**

## Metric Principles

All metrics aim to be:
- **Actionable** – clearly indicate when intervention is needed
- **Understandable** – interpretable by non-engineering stakeholders
- **Segmentable** – filterable by client, feed, environment, and consumer
- **Trendable** – meaningful over time, not just point-in-time

## Quick Start

```bash
npm install
npm run dev
```

---

## Dashboard Sections

### 1. Client Insights
*"How much is Datafeed being used and by whom?"*

**Core Metrics by client_ID / client_krn:**
- Files processed per day / week / month
- Total records processed
- Active Datafeeds (unique feed definitions used)
- Active downstream consumers
- File Upload Size

**Upload Patterns:**
- When clients upload (by hour of day)
- Upload frequency distribution (hourly/daily/weekly/irregular)

**Segmentation:**
- By client (searchable by ID, KRN, name)
- By file type / feed type
- By downstream consumer
- By environment (prod / non-prod)

**PM Value:**
- Holistic overview of Datafeed and client usage
- Informs Datafeed decisions with data
- Identifies high-value or high-risk clients

---

### 2. Downstream Impact Metrics
*"What is the effect of Datafeed on KUBRA products?"*

**Core Metrics:**
- Delivery success rate per downstream consumer / feedtype
- Delivery error rate per downstream consumer / feedtype
- Consumer acknowledgment latency
- Consumer-reported errors linked to Datafeed inputs

**Cross-Product Metrics:**
- Incidents in downstream products traced to Datafeed
- Reprocessing requests initiated by downstream systems

**PM Value:**
- Connects Datafeed performance to real customer impact
- Enables better cross-product prioritization
- Prevents Datafeed from being a "black box" dependency

---

### 3. Most Common Exceptions & Errors (Learning Loop)
*"What goes wrong most often, and where should we focus?"*

**Core Metrics:**
- Exception count by error type (top N)
- Exception count by client
- Exception count by feed type / schema
- Exception count by downstream consumer
- Repeat exception rate (same client + same error over time)

**Classification Dimensions:**
- Validation errors (schema mismatch, missing fields, invalid values)
- File transport errors (corrupt files, encoding issues)
- Processing errors (timeouts, transformation failures)
- Downstream delivery errors

**PM Rationale (Learning Loop):**

| Goal | How Exceptions Help |
|------|---------------------|
| **Improve Documentation** | High-frequency errors indicate where docs are unclear, misleading, or incomplete. Exception trends inform FAQs and validation guidance. |
| **Prioritize Problems** | Focus engineering effort on issues affecting the most clients or volume. Avoid over-investing in rare edge cases. |
| **Identify Friction** | Repeated exceptions from same clients = onboarding/tooling gaps. Widespread errors = product or contract mismatches. |
| **Measure Fix Impact** | Exception count should trend down after documentation, validation, or tooling improvements. |

---

## Tech Stack

- **React 19** with TypeScript
- **Vite** for development
- **Recharts** for data visualization
- **Lucide React** for icons
- **date-fns** for date formatting

## Project Structure

```
src/
├── components/
│   ├── ChartCard.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── sections/
│   ├── Overview.tsx          # Summary of all three pillars
│   ├── ClientInsights.tsx    # Usage and client metrics
│   ├── DownstreamImpact.tsx  # Consumer delivery metrics
│   └── Exceptions.tsx        # Error tracking and learning loop
├── App.tsx
├── index.css
├── mockData.ts
├── types.ts
└── main.tsx
```

## Time Range Filtering

- **24h** – Hourly data
- **7d** – Daily data for the week
- **30d** – Daily data for the month
- **90d** – Daily data for the quarter

---

*This dashboard demonstrates the Datafeed philosophy: the pipeline remains operationally simple, but analytically rich.*
