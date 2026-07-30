# Looker Reporting Requirements — filled example (calibration reference)

Source: [AutoPay Activity Report](https://kubra.jira.com/wiki/spaces/AG/pages/2001862758) (live Confluence page, space AG, under BizHQ+ Report Requirements → Consumer). Use this to calibrate format, tone, and level of detail — including how PII columns are flagged and how the standard rule set reads.

## Overview

| Field | Value |
| --- | --- |
| Feature Name | AutoPay Activity Report |
| Report / Dashboard Purpose | Provides events regarding autopay profiles. |
| Functional Requirements | Provides events regarding autopay profiles. |

## Filters

| Filter Name | Variable (Type) | Default Operator / UI | Example Value / Format | Description |
| --- | --- | --- | --- | --- |
| Event Timestamp | event_timestamp_time (datetime) | is in the last → 1 → days | 2026-04-28 00:00:00 | Filter records by autopay event timestamp. |
| Email | email (string) | contains / text input | user@example.com | Filter by customer email address. |
| Account Number | payable_account_number (string) | is / text input | 1234567890 | Filter by payable account number. |
| Item Type | payable_type_name (string) | is any / dropdown multi-select | Utility Bill | Filter by payable type. |
| Profile Type | profile_type (enum) | is any / dropdown multi-select | AUTOPAY | Filter by autopay profile type. |
| Schedule Type | schedule_type (enum) | is any / dropdown multi-select | Fixed Monthly | Filter by schedule configuration type. |
| Funding Source Type | funding_source_type (enum) | is any / dropdown multi-select | Card | Filter by payment funding source type. |
| Autopay End Condition | autopay_end_condition (enum) | is any / dropdown multi-select | Never Ends | Filter by how the autopay profile ends. |
| Profile End Date | profile_end_date (date) | is on or after / date picker | 2026-12-31 | Filter profiles with a configured end date. |

## Columns

Note the `Format` column doubles as a trait tag: append `, PII` for anything customer-identifying (email, phone, name, PAN) and `, nullable` for optional fields. PII columns also get a masking/scope note in the Description (e.g. "Primary email only", "Full PAN must not be exposed").

| Field Name | Looker Column Name | Example Data | Format | Description |
| --- | --- | --- | --- | --- |
| Event Timestamp | Event Timestamp Time | 2026-04-28 13:45:22 | Datetime YYYY-MM-DD HH:MM:SS | Timestamp when the autopay profile or schedule event occurred. |
| Email | Email | user@example.com | String, PII | Customer email associated with the autopay profile. (Primary email only) |
| Account Number | Payable Account Number | 1234567890 | String, primary business identifier | Account number for the payable item. |
| Item Type | Payable Type Name | Electric Bill | String | Name of the payable type. |
| Profile Type | Profile Type | AUTOPAY | Enum | Type of payment profile. |
| Schedule Type | Schedule Type | MONTHLY | Enum | Schedule cadence or rule type for autopay. |
| Fixed Schedule Amount | Fixed Schedule Amount | 125.00 | Number, currency decimal | Fixed payment amount for fixed schedules. |
| Weekly Schedule Day | Weekly Schedule Day | MONDAY | Enum, nullable | Day of week used for weekly autopay schedules. |
| Funding Source Masked PAN | Funding Source Masked PAN | ************1234 | String, masked PAN | Masked payment account number. Full PAN must not be exposed. |
| Profile End After N Payments | Profile End After N Payments | 12 | Number, integer, nullable | Number of successful payments after which the profile ends. |

*(full column list on the live page has 18 rows — truncated here for brevity; the pattern above is what matters.)*

## Rules

| Rule Type | Description |
| --- | --- |
| Active Consumer Rule | Only consumers with active enrollment status should be included in the report output. |
| Null Handling | Blank email or phone values should display as null. |
| Timezone Handling | Enrolled On Time should display using the viewer-selected timezone. |
| PII Handling | Email and phone number fields are subject to masking/export permissions based on user role. |
| Duplicate Handling | Each consumer should appear only once in the snapshot report. |
| Account number | Account number should just be 1 — use the updated field. This is either for when the user linked the account number or deleted that account payable. |
| Primary Email | This should only be the main email linked to this consumer. Do not show additional emails or the phone number in this column. |

The first five rows (Active Consumer Rule → Duplicate Handling) recur near-verbatim across other reports in this space (e.g. Consumer Activity Report) — they're standing team defaults, not AutoPay-specific. Rows after that are report-specific clarifications that got folded into the table once resolved.

## Further Questions & Clarifications

Not present as a separate section on the live page today (clarifications there get folded straight into the Rules table once resolved) — but per Luciano's instructions, new drafts should keep an explicit open-questions table until each item is resolved:

| Question | Status | Notes |
| --- | --- | --- |
| *(example)* Should deleted/unlinked accounts still appear in historical rows? | Open | — |
