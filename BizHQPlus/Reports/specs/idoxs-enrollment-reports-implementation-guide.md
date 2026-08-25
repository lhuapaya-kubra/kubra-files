---
type: spec
platform: BizHQPlus
product: Reports
tags: [spec, idoxs-legacy, enrollment-reports]
source: "KUBRA iDoxs Suite - Enrollment Reports - ImplementationGuide.pdf (CONFIDENTIAL - KUBRA Internal Use Only)"
---

# KUBRA iDoxs Suite — Enrollment Reports Implementation Guide

Transcribed from the internal PDF `KUBRA iDoxs Suite Enrollment Reports - ImplementationGuide.pdf`, shared 2026-08-24. Reproduced in full — this is schema/field-name documentation, not customer data, so no PII concern per the vault's PII rule.

## Overview

The enrollment reporting process runs **daily**, reporting on new enrollments, modifications, deactivations, recurring payment profiles, bank accounts, and the full list of i-doxs users.

- **Supported formats**: CSV and TXT (TXT is default, comma-delimited). XML also supported via `EnrollmentReportsFormat`.
- **Field configuration**: per-account, via the i-doxs database table `Subscriber_EnrollmentReportDefinition`. Only fields present in that table are included in the generated reports — it must be populated per account for reports to generate.
- **Enablement**: same mechanism as the Remittance Report — a KEIS property named `EnrollmentReports` must be set to `Yes` within the Daemon Website to include an account in the daily enrollment-report process.
- **Exception**: `i-doxsAccounts` (report type `DISTINCT`) is auto-generated for every account regardless of `Subscriber_EnrollmentReportDefinition` — it must be explicitly turned off via the ini file if not wanted.

## Default reports (used if not overridden in ini)

### AllUsers (`ALL`)
- `Subscriber_Profile`: all fields
- `Subscriber_KeyList`: `SubscriberKey`, `isActive` (as `KeyIsActive`), `DateAdded` (as `DateAccountAdded`), `TurnOffPaper` (as `AccountTurnOffPaper`), `AccountData`

### NewUsers (`NEW`)
`User_ID`, `EnrollDate`, `PaymentEnrollDate`, `Group_ID`, `Notify`, `Address1`, `Address2`, `Address3`, `Token`, `DistributionID` (multibiller only), `DistributionID2` (multibiller only), `City`, `Zip`, `State`, `IP_Last_Accessed_From`, `Fail_Account`, `Last_Accessed`, `Last_Forget_Password`, `Prefix`, `Lastname`, `Firstname`, `MiddleInitial`, `Turn_Off_Paper`, `Email`, `dayPhone`, `eveningPhone`, `Fax`, `BusinessName`, `SubscriberID`, `IsActive`, `PaymentNotify`, `Distributor`, `Gender`, `Country`, `DateOfBirth`, `SubscriberKey`, `ActionDate`, `DateAccountAdded`, `AccountTurnOffPaper`, `AccountData`

### DeletedUsers (`DELETED`)
Identical field list to `NewUsers` above (same ~39 fields, `User_ID` through `AccountData`).

### ChangedUsers (`CHANGED`)
- `Subscriber_Profile`: all fields
- `Subscriber_Activity`: `ActionDate`
- `Subscriber_KeyList`: `SubscriberKey`, `KeyIsActive`, `DateAccountAdded`, `AccountTurnOffPaper`, `AccountData`

### i-doxsAccounts (`DISTINCT`)
- `SubscriberKey` (distinct list only)
- Always created; no `Subscriber_EnrollmentReportDefinition` entries needed. To suppress it, must be explicitly disabled in the ini file.

### RecurringPaymentUsers (`RECURRING`)
- `Subscriber_Profile`: all fields
- `Subscriber_KeyList`: `SubscriberKey`, `DateAccountAdded`, `AccountTurnOffPaper`, `AccountData`

### RecurringDetail (`RECURRINGDETAIL`)
- `Subscriber_Profile`: all fields
- `RecurringPayment`: all fields
- `Subscriber_KeyList`: `SubscriberKey`, `AccountTurnOffPaper`, `AccountData`
- `Subscriber_Group`: `Group_Name`, `Description`
- `Payment_CreditCard`: `Expiry`, `CCNickName`
- `Payment_BankAccount`: `ACHNickName`

### ChangedUsersWithAccount (`CHANGEDWACCOUNT`)
- `Subscriber_Profile`: all fields
- `ActionDate`, `SubscriberKey`, `AccountTurnOffPaper`, `AccountData`

### ChangedRecurring (`CHANGEDRECURRING`) — .NET accounts only
Reports based on the `Subscriber_Activity` table over the last 24 hours, filtered to `RECURRING` or `AUTOPAY` activity:
`ActivityID`, `SubGUID`, `Activity`, `Activity_Date`, `URL`, `RecurringID`, `PaymentOption`, `PaymentAccountID`, `PaymentAccountType`, `AccountNumber`, `PaymentPeriodSetting`, `PaymentPeriod`, `PaymentAmountSetting`, `PaymentAmount`, `LastPaymentAmount`, `PaymentSchedule`, `PaymentFrequencySetting`, `PaymentFrequency`, `PaymentsRemaining`, `NumberOfPayments`, `StartPayment`, `LastPayment`, `LastPaymentCreated`, `Created`, `Status`, `PaymentData`

### CustomReports (`kcr_{CustomName}`)
Requires a custom stored procedure to exist per the linked internal custom-report article.

## Reports configured via ini (added under `[ACCOUNTS]`)

### BankAccounts (`BANKACCOUNT`)
`SubscriberKey`, `AccountNickname`, `AccountType`, `BankAccountNo`, `BankTransit`, `Description`, `FirstName`, `LastName`, `EntryDate`

### UndeliveredEmail (`BOUNCED`)
- `Email_Queue`: all fields
- `Subscriber_Profile`: all fields
- `Email_Queue_Detail` (if present in `Subscriber_EnrollmentReportDefinition`): all fields
- `Email_Queue_Event_Detail` (if present in definitions, table exists, and `SendGrid_EmailStatusUpdate_Enabled = YES`): all fields except `QueueId`, plus `EmailType` derived from `Type`

### SharedAccess (`SHAREDACCESS`)
`Distributor`, `User_ID`, `Firstname`, `Lastname`, `Email`, `EnrollDate`, `SubscriberKey`, `AccountData`

### NOCReport (`NOC`)
`PaymentID`, `ProcessDate`, `Correction`, `ReasonCode`, `Description`, `Processor`

## `i-doxsReports.ini` settings

- With no `[ACCOUNTS]` switch, **all** default reports are produced as long as their definitions exist.
- `i-doxsAccounts` is always generated — it has no on/off dependency on definitions, only on the ini switch.
- Reports can be selectively disabled per account via a positional flag list:

  ```
  [ACCOUNTS]
  //accountname=AllUsers, NewUsers, RemovedUsers, ChangedUsers, DistinctAccounts,
  RecurringUsers, BankAccounts, BouncedEmails, RecurringDetail, SharedAccess,
  ChangedUsersWithAccount, ChangedRecurring, NocReport, CustomReports

  CityOfCharlotte=1,1,1,1,0,0,0,0,1,0,0,1,0,0
  ADOXSDIRECTV5=1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ```

## Source properties

| Property | Usage |
|---|---|
| `EnrollmentReports` | Enables idoxsReports (Enrollment and Audit) for the account |
| `Enrollment_ReportFooterCount` | Prints `END DETAIL RECORDS = <count>` footer |
| `Enrollment_ReportHeaderDateFormat` | Date format used in the report header row (introduced for country-specific formatting) |
| `EnrollmentReports_Destination` | Overrides the default output path; `SourceID 0` = default path |
| `EnrollmentReports_FileName_Format` | Hard-codes the output filename. Caution: with multiple report types per account, a purely static name causes each report to overwrite the last one generated — combine the dynamic `{ReportType}` token with any hard-coded prefix (e.g. `ABC_{ReportType}`) to avoid collisions |
| `EnrollmentReports_Folder` | Overrides the folder used (default comes from the DocWeb cross-reference file) |
| `EnrollmentReportsFormat` | `XML` or `TXT` (default); TXT is comma-delimited |
| `EnrollmentReportsPrefix` | Prefixes the filename using this source property's value |
| `CheckFree_MultiBillerID` | Used in Users reports to surface Biller/Sponsor (`DistributionID1`/`DistributionID2`) for legacy multibiller accounts — needed explicitly for KubraDoc35 accounts; KubraDoc40 shows it by default |

## Reports routing

- Configured via the Daemon tool → **Reporting Options and Output File Routing**.
- All reports for a given account share a single `FilePrefix` — there's no way to set different prefixes per report type for the same account.
- Default destination: the account's `Transmissions` folder, as specified in DocWeb.
- Dynamic filename tokens available: `{DATE}`, `{REPORTTYPE}`, `{ACCNAME}`.

## Testing

Validation testing scripts were created and documented under Jira reference `PINT3-5541_Fortify-iDoxsReports-in-TEST`.

## Related

- [[Reports]]
