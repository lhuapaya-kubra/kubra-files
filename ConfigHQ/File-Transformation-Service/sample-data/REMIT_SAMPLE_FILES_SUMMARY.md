# Remittance sample files — content and footer summary

## Context

Clients rely on **footer/trailer records** to **verify and reconcile** reported totals and record counts against their own calculations and amounts deposited by CPD. Non-standard layouts (headers, footers, multi-line logical records) create gaps for **FDS** when clients need customizable parsing, summary reconciliation, and field-derived rules. This document summarizes seven sample files in this folder for FTS/FDS design discussions.

---

## Part 1 — Summary of file contents

### `be_remit_260505.csv`

- **Format:** CSV with a single header row and comma-separated fields.
- **Physical lines (sample):** 7,318 (includes header and footer lines).
- **Body:** One row per payment activity: CustomerID, PaymentDate, PaymentAmount, BillAmount, ConfirmationCode, PaymentType (ACH / CC / PD), PaymentStatus (APPROVED / REJECTED / RETURNED), Comment (processor return/decline codes), PayerName, PaySource.
- **Note:** Mix of approved, rejected, and returned items in one extract; amounts and statuses vary by row.

### `BV_BearValleyElectricService_Remit_20251009.csv`

- **Format:** CSV with quoted fields and trailing commas on the header row.
- **Physical lines (sample):** 848 (includes header and footer line).
- **Body:** One row per payment with richer attributes: masked PaymentAccount, CCExpireDate, CCZipCode, BankAccountType, BankRouteTransitNo, PayerName, ShortPaymentNote, BillAmount, PaymentAmount, PaymentDate, PaymentStatus, Comment, PaySource, ClientChannel, PayVia.

### `CM260505.txt`

- **Format:** Fixed-width text; record type implied by first character(s) on each line.
- **Physical lines (sample):** 1,138.
- **Body:** **Multi-line logical payments**: type `6` lines carry amount, instrument/reference, and literal `CHEC`; type `7` lines carry payee name. File opens with type `1` header (`CWD PAYMENT FILE…`). Detail blocks use prefixes such as `60954000…`.
- **Note:** Typical bank/lockbox-style layout where one payment spans multiple physical records.

### `CPSREMIT_20250918.txt`

- **Format:** First line is a comma-separated header naming columns; **detail rows use pipe (`|`) delimiters** (not commas).
- **Physical lines (sample):** 9,955.
- **Body:** CustomerID, PaymentDate, PaymentAmount, TotalDue, ConfirmationCode, PaymentMode, masked PaymentAccount, CC/card fields, bank fields, Status, Message, PayerName, PaySource, Donation, ClientChannel, CardSource.

### `KUBRA_IN_20251117_021147.csv`

- **Format:** Positional text using record-type prefixes; `.csv` extension does not imply comma-separated detail rows.
- **Physical lines (sample):** 12,602.
- **Body:** `H` header record; `D` detail records with comma-separated fields including internal account id, effective date (`MMDDYYYY`), integer amount (same unit as trailer sum), confirmation/trace-style id, rail (e.g. ACH, CCP, PDP), and processing bucket (e.g. OPW, MOP, CSR, FIS).

### `NR260505_034332074.dat`

- **Format:** Long fixed-width strings per line (often hundreds of characters); repeated embedded segments with codes such as `C` and `A` inside the line.
- **Physical lines (sample):** 1,380.
- **Body:** Consolidated payment/remittance-style data with monetary fields and sequence identifiers encoded by position; structure is not self-describing without a layout specification.

### `PAYMENTS_20260505.txt`

- **Format:** NACHA-like ACH formatted text (80-character logical records; sample lines may appear as raw concatenation depending on viewer).
- **Physical lines (sample):** 7,253.
- **Body:** Record type `1` file header (originator/receiver naming); many type `62` entry detail records (amount in cents in fixed field, individual name, DFI account, trace number); closes with type `9` batch/file control.

---

## Part 2 — Footers, trailers, and reconciliation

Footers support **automation and verification**: recipients recompute counts and dollar totals from detail rows and compare to the trailer, and tie totals to **deposit / settlement** expectations.

### Comparison at a glance

| File | Trailer style | What clients can reconcile |
|------|----------------|------------------------------|
| `be_remit_260505.csv` | Plain-text lines after last detail row | Approved total line; transaction counts by disposition; approved, returned, and net amounts |
| `BV_BearValleyElectricService_Remit_20251009.csv` | Single plain-text summary line | Total transactions; counts by APPROVED/REJECTED/RETURNED; approved, returned, net amounts |
| `CPSREMIT_20250918.txt` | Single plain-text summary line | Transaction count and approved amount only (minimal trailer) |
| `KUBRA_IN_20251117_021147.csv` | Typed `T` record | Explicit detail **record count** and **sum of amounts** (same integer unit as `D` rows) |
| `CM260505.txt` | Fixed-width `8954…` and `99999999999999…` lines | Batch/file-level totals encoded by position (standard for lockbox-style feeds) |
| `PAYMENTS_20260505.txt` | NACHA record type `9` | Entry/addenda counts and **10-digit control total** (ACH reconciliation pattern) |
| `NR260505_034332074.dat` | Embedded control sections within long lines | Requires layout spec; multi-section totals—not a single human-readable “END TRANSACTIONS” line |

### Recommended samples for footer-driven FDS design (2–3 files)

1. **Rich client-style summary:** `be_remit_260505.csv` or `BV_BearValleyElectricService_Remit_20251009.csv` — demonstrates **non-row footer text** and multi-metric reconciliation (counts + amounts + net).
2. **Compact typed trailer:** `KUBRA_IN_20251117_021147.csv` — **`H` / `D` / `T`** pattern with explicit count and sum.
3. **Industry control record:** `PAYMENTS_20260505.txt` — type **`9`** control total; alternatively `CM260505.txt` if fixed-width bank batch/file trailers are the priority.

---

## Appendix — Example footer lines (from samples)

Illustrative excerpts for reviewers; some long lines are truncated.

### `be_remit_260505.csv`

```
TOTAL PAYMENT AMOUNT-APPROVED: 1623748.99
END TRANSACTIONS = 7315, APPROVED = 7192, REJECTED = 76, RETURNED = 31, APPROVEDAMOUNT = 1623748.99, RETURNEDAMOUNT = 29418.62, NETAMOUNT = 1594330.37
```

### `BV_BearValleyElectricService_Remit_20251009.csv`

```
END TRANSACTIONS = 846, APPROVED = 839, REJECTED = 5, RETURNED = 2, APPROVEDAMOUNT = 155651.64, RETURNEDAMOUNT = 209.54, NETAMOUNT = 155442.10
```l

### `CPSREMIT_20250918.txt`

```
END TRANSACTIONS=9953, APPROVEDAMOUNT=2380834.92
```

### `KUBRA_IN_20251117_021147.csv`

```
T,12600,315886545
```

### `CM260505.txt`

```
8954L0000000010202605050567000003600994000567                                    
9999999999999920260505000567000003600994                                        
```

### `PAYMENTS_20260505.txt`

```
9000001000000000072510000000000000000000000000222838341                                        
```

*(Interpretation of positions within the type `9` record follows NACHA formatting rules.)*

### `NR260505_034332074.dat`

No single-line prose footer. Example from near end of file (truncated for readability):

```
0000C0000106861000000000000000000A000000000010953000010953010032026000326200370018050426000012344981330000003000005000000000007155806857068610200180505260100300000000000000000000000000000000000000000000000000
```

Design implication: FDS may need **documented field positions**, optional **multi-record-type** trailers, and validation hooks rather than assuming one delimiter or one summary row.
