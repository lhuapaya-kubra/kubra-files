---
type: confluence-page
page_id: 2163900486
space: AG
platform:
product: KHQ Billing
tags: [confluence, report, sms, billing]
---

# SMS Notification Volume — Legacy Clients (for Todd)

## Summary

Legacy clients send **~2.08M SMS notifications/month** combined, or an estimated **~24.9M/year** at the current run-rate — concentrated in a handful of large accounts (PGE alone accounts for roughly a third of total volume). This report answers Todd's question on "messages sent" volume using the `SMS_Notifications` billing column, ranked by client.

## A note on "legacy" vs. "KHQ Billing"

Worth flagging so this isn't confused with the newer product of the same name: the SMS volume below comes from the **legacy billing pipeline** — `iDoxs` (data) → `DocWeb` (formatting/mapping) → `Epicor` (finance invoicing) — which has been running for the ~150+ established clients covered here.

This is a *different* thing from the newer **KHQ Billing** product line (see *Platform billing (KHQ) - PRD*), which today has only 4 clients (City of Scottsdale, City of Stamford, Port of Long Beach, Lorain County Public Health) — all currently billing **zero** activity, since they use a convenience-fee-only model with no line-item invoicing. City of Stamford is the first of these expected to go live on real KHQ billing, starting **October 1, 2026**. So "what does this look like on legacy clients" and "what does this look like on KHQ Billing" are, today, two different (and very differently-sized) datasets — Todd's question is about the former, which is what's reported below.

## Where the number comes from

The billing column is `IX1600` (`SMS_Notifications`) — one of ~150-200 billing codes in the legacy Epicor billing file structure. It counts distinct SMS notification messages sent per client per month.

Data pulled from the three most recent legacy billing exports available locally (an April 2026 export exists, but that data wasn't available to pull in for this report):

- `BillingCollector_i-doxsBilling_202601.csv` (Jan 2026)
- `BillingCollector_i-doxsBilling_202602.csv` (Feb 2026)
- `BillingCollector_i-doxsBilling_202603.csv` (Mar 2026)

For context: the same `IX1600` code is preserved going forward as `sms_notifications` in KHQ's in-progress Databricks replacement view (`bizhq.gold.khq_billing`), so this metric carries through from the legacy system into the new platform rather than disappearing.

## Top 20 legacy clients — SMS notifications sent, ranked highest to lowest

_Estimated yearly volume (3-month avg × 12), Jan–Mar 2026 sample:_

```
PGE                      ██████████████████████████████   7,174,596 /yr
XcelEnergy               ███████                          1,737,128 /yr
CPSEnergy                ██████                           1,457,664 /yr
TampaElectric            ████                               974,124 /yr
LakelandElectric         ███                                811,972 /yr
CityOfCharlotte          ███                                770,188 /yr
CityOfPhiladelphiaWRB    ███                                677,596 /yr
IPLPower                 ███                                675,908 /yr
LUSAPBF                  ███                                644,100 /yr
SoutheastToyotaFinance   ██                                 574,200 /yr
DaytonPowerLight         ██                                 564,412 /yr
PGWorks                  ██                                 541,864 /yr
JEA                      ██                                 489,868 /yr
SAWS                     ██                                 486,400 /yr
AquarionWater            ██                                 478,336 /yr
TEP                      █                                  322,352 /yr
NEORSD                   █                                  301,984 /yr
LUSAPCF                  █                                  294,508 /yr
EMWD                     █                                  278,372 /yr
ClevelandWater           █                                  242,596 /yr
```

| Rank | Client (Account) | Jan 2026 | Feb 2026 | Mar 2026 | Avg / month | Est. yearly |
|---|---|---|---|---|---|---|
| 1 | PGE | 591,479 | 563,492 | 638,678 | 597,883 | 7,174,596 |
| 2 | XcelEnergy | 142,295 | 138,672 | 153,315 | 144,761 | 1,737,128 |
| 3 | CPSEnergy | 113,128 | 119,871 | 131,417 | 121,472 | 1,457,664 |
| 4 | TampaElectric | 80,809 | 78,217 | 84,505 | 81,177 | 974,124 |
| 5 | LakelandElectric | 69,201 | 62,087 | 71,705 | 67,664 | 811,972 |
| 6 | CityOfCharlotte | 63,979 | 61,201 | 67,367 | 64,182 | 770,188 |
| 7 | CityOfPhiladelphiaWRB | 55,251 | 54,406 | 59,742 | 56,466 | 677,596 |
| 8 | IPLPower | 53,078 | 56,455 | 59,444 | 56,326 | 675,908 |
| 9 | LUSAPBF | 51,341 | 51,924 | 57,760 | 53,675 | 644,100 |
| 10 | SoutheastToyotaFinance | 47,237 | 45,124 | 51,189 | 47,850 | 574,200 |
| 11 | DaytonPowerLight | 45,399 | 46,758 | 48,946 | 47,034 | 564,412 |
| 12 | PGWorks | 43,157 | 42,392 | 49,917 | 45,155 | 541,864 |
| 13 | JEA | 41,932 | 39,642 | 40,893 | 40,822 | 489,868 |
| 14 | SAWS | 40,778 | 40,118 | 40,704 | 40,533 | 486,400 |
| 15 | AquarionWater | 38,766 | 39,474 | 41,344 | 39,861 | 478,336 |
| 16 | TEP | 27,856 | 25,999 | 26,733 | 26,863 | 322,352 |
| 17 | NEORSD | 25,181 | 24,080 | 26,235 | 25,165 | 301,984 |
| 18 | LUSAPCF | 23,382 | 22,932 | 27,313 | 24,542 | 294,508 |
| 19 | EMWD | 22,678 | 22,841 | 24,074 | 23,198 | 278,372 |
| 20 | ClevelandWater | 19,895 | 19,708 | 21,046 | 20,216 | 242,596 |

## Full list — all 156 clients with nonzero SMS volume (appendix)

| Rank | Client (Account) | Jan 2026 | Feb 2026 | Mar 2026 | Avg / month | Est. yearly |
|---|---|---|---|---|---|---|
| 1 | PGE | 591,479 | 563,492 | 638,678 | 597,883 | 7,174,596 |
| 2 | XcelEnergy | 142,295 | 138,672 | 153,315 | 144,761 | 1,737,128 |
| 3 | CPSEnergy | 113,128 | 119,871 | 131,417 | 121,472 | 1,457,664 |
| 4 | TampaElectric | 80,809 | 78,217 | 84,505 | 81,177 | 974,124 |
| 5 | LakelandElectric | 69,201 | 62,087 | 71,705 | 67,664 | 811,972 |
| 6 | CityOfCharlotte | 63,979 | 61,201 | 67,367 | 64,182 | 770,188 |
| 7 | CityOfPhiladelphiaWRB | 55,251 | 54,406 | 59,742 | 56,466 | 677,596 |
| 8 | IPLPower | 53,078 | 56,455 | 59,444 | 56,326 | 675,908 |
| 9 | LUSAPBF | 51,341 | 51,924 | 57,760 | 53,675 | 644,100 |
| 10 | SoutheastToyotaFinance | 47,237 | 45,124 | 51,189 | 47,850 | 574,200 |
| 11 | DaytonPowerLight | 45,399 | 46,758 | 48,946 | 47,034 | 564,412 |
| 12 | PGWorks | 43,157 | 42,392 | 49,917 | 45,155 | 541,864 |
| 13 | JEA | 41,932 | 39,642 | 40,893 | 40,822 | 489,868 |
| 14 | SAWS | 40,778 | 40,118 | 40,704 | 40,533 | 486,400 |
| 15 | AquarionWater | 38,766 | 39,474 | 41,344 | 39,861 | 478,336 |
| 16 | TEP | 27,856 | 25,999 | 26,733 | 26,863 | 322,352 |
| 17 | NEORSD | 25,181 | 24,080 | 26,235 | 25,165 | 301,984 |
| 18 | LUSAPCF | 23,382 | 22,932 | 27,313 | 24,542 | 294,508 |
| 19 | EMWD | 22,678 | 22,841 | 24,074 | 23,198 | 278,372 |
| 20 | ClevelandWater | 19,895 | 19,708 | 21,046 | 20,216 | 242,596 |
| 21 | PNM | 19,375 | 18,862 | 20,551 | 19,596 | 235,152 |
| 22 | LUBBOCK | 18,782 | 17,459 | 19,275 | 18,505 | 222,064 |
| 23 | Florida | 18,764 | 17,879 | 18,841 | 18,495 | 221,936 |
| 24 | SCWA | 18,194 | 15,439 | 20,340 | 17,991 | 215,892 |
| 25 | CLBUtilities | 17,567 | 16,307 | 17,977 | 17,284 | 207,404 |
| 26 | ChesapeakeDNG | 16,513 | 15,078 | 17,637 | 16,409 | 196,912 |
| 27 | Primerica_US | 14,571 | 14,751 | 15,611 | 14,978 | 179,732 |
| 28 | Riverside | 14,028 | 13,689 | 14,383 | 14,033 | 168,400 |
| 29 | EPCOREnergyAlberta | 13,474 | 12,642 | 14,601 | 13,572 | 162,868 |
| 30 | GCWW | 13,059 | 13,205 | 14,049 | 13,438 | 161,252 |
| 31 | Rumpke | 12,685 | 12,305 | 14,155 | 13,048 | 156,580 |
| 32 | Middlesex | 12,548 | 12,208 | 14,151 | 12,969 | 155,628 |
| 33 | EBMUD | 12,086 | 11,430 | 12,861 | 12,126 | 145,508 |
| 34 | snopud | 12,242 | 11,159 | 12,420 | 11,940 | 143,284 |
| 35 | CityOfOklahoma | 11,074 | 11,501 | 11,689 | 11,421 | 137,056 |
| 36 | CityOfRichmond | 10,805 | 10,887 | 11,718 | 11,137 | 133,640 |
| 37 | Enbridge | 11,120 | 9,915 | 12,014 | 11,016 | 132,196 |
| 38 | CoPG_Revenue | 6,953 | 8,639 | 15,284 | 10,292 | 123,504 |
| 39 | BangorHydro | 9,031 | 9,806 | 10,489 | 9,775 | 117,304 |
| 40 | coloradosprings | 9,544 | 9,204 | 9,536 | 9,428 | 113,136 |
| 41 | WaterOne | 9,152 | 8,284 | 9,956 | 9,131 | 109,568 |
| 42 | CPP | 8,644 | 8,859 | 9,790 | 9,098 | 109,172 |
| 43 | UESElectric | 7,516 | 7,280 | 7,565 | 7,454 | 89,444 |
| 44 | UESGAS | 7,014 | 6,963 | 7,474 | 7,150 | 85,804 |
| 45 | AnaheimPUC | 7,275 | 6,274 | 7,303 | 6,951 | 83,408 |
| 46 | WashingtonGas | 7,089 | 7,013 | 5,758 | 6,620 | 79,440 |
| 47 | Roanoke | 6,127 | 6,411 | 6,486 | 6,341 | 76,096 |
| 48 | SeattleUtilities | 6,033 | 5,782 | 6,294 | 6,036 | 72,436 |
| 49 | CityOfSacramento | 6,051 | 5,781 | 5,983 | 5,938 | 71,260 |
| 50 | NYSIF | 5,761 | 5,259 | 6,312 | 5,777 | 69,328 |
| 51 | GoldenStateWater | 5,694 | 5,363 | 6,147 | 5,735 | 68,816 |
| 52 | CoPG_LandI | 4,903 | 5,773 | 6,028 | 5,568 | 66,816 |
| 53 | FortisBC | 5,609 | 5,217 | 5,680 | 5,502 | 66,024 |
| 54 | Dakota | 9,356 | 6,322 | 0 | 5,226 | 62,712 |
| 55 | MSD | 4,342 | 4,806 | 5,219 | 4,789 | 57,468 |
| 56 | ROP | 4,206 | 3,933 | 5,888 | 4,676 | 56,108 |
| 57 | SFPUC | 4,108 | 4,067 | 4,441 | 4,205 | 50,464 |
| 58 | GRU | 4,154 | 3,859 | 4,319 | 4,111 | 49,328 |
| 59 | CentralHudson | 4,020 | 3,748 | 4,389 | 4,052 | 48,628 |
| 60 | PGH2O | 3,758 | 3,639 | 4,073 | 3,823 | 45,880 |
| 61 | MDC | 3,604 | 3,405 | 3,870 | 3,626 | 43,516 |
| 62 | Anchorage | 1,600 | 4,733 | 3,781 | 3,371 | 40,456 |
| 63 | Epcor | 3,118 | 3,110 | 3,407 | 3,212 | 38,540 |
| 64 | SunsetScavenger | 2,873 | 2,896 | 3,774 | 3,181 | 38,172 |
| 65 | SeattleSMC | 3,145 | 2,762 | 3,563 | 3,157 | 37,880 |
| 66 | WillmutGas | 2,874 | 2,896 | 2,927 | 2,899 | 34,788 |
| 67 | SantaRosaCounty | 2,771 | 2,653 | 2,246 | 2,557 | 30,680 |
| 68 | CasellaRCS | 2,164 | 2,238 | 2,329 | 2,244 | 26,924 |
| 69 | CARMA | 2,158 | 1,988 | 2,345 | 2,164 | 25,964 |
| 70 | VERTEXLEECOUNTY | 2,016 | 2,029 | 2,036 | 2,027 | 24,324 |
| 71 | Unitil | 1,859 | 1,729 | 2,093 | 1,894 | 22,724 |
| 72 | MidWest | 1,656 | 1,642 | 1,669 | 1,656 | 19,868 |
| 73 | SanMateoCounty | 2,318 | 1,445 | 1,051 | 1,605 | 19,256 |
| 74 | SouthValley | 2,176 | 1,576 | 914 | 1,555 | 18,664 |
| 75 | AuburnPlacer | 2,690 | 750 | 1,132 | 1,524 | 18,288 |
| 76 | CasellaWaste | 1,338 | 1,157 | 1,979 | 1,491 | 17,896 |
| 77 | WesternOregon | 1,633 | 1,610 | 1,201 | 1,481 | 17,776 |
| 78 | UPPCO | 1,277 | 1,275 | 1,428 | 1,327 | 15,920 |
| 79 | FortisBCElectric | 1,332 | 1,136 | 1,337 | 1,268 | 15,220 |
| 80 | Elexicon | 1,218 | 1,119 | 1,238 | 1,192 | 14,300 |
| 81 | MetergySolutions | 0 | 1,474 | 1,810 | 1,095 | 13,136 |
| 82 | CasellaWSS | 1,011 | 949 | 961 | 974 | 11,684 |
| 83 | NSpower | 871 | 938 | 1,013 | 941 | 11,288 |
| 84 | energienbpower | 831 | 820 | 1,019 | 890 | 10,680 |
| 85 | Eureka | 1,145 | 585 | 446 | 725 | 8,704 |
| 86 | MidContinent | 699 | 627 | 621 | 649 | 7,788 |
| 87 | SolutionsMetergy | 1,841 | 0 | 0 | 614 | 7,364 |
| 88 | PrimericaDebitBalance_US | 505 | 572 | 609 | 562 | 6,744 |
| 89 | CLBInfor | 626 | 437 | 521 | 528 | 6,336 |
| 90 | VertexBullhead | 441 | 454 | 551 | 482 | 5,784 |
| 91 | BearValleyElectricService | 442 | 450 | 489 | 460 | 5,524 |
| 92 | ROTC | 570 | 420 | 272 | 421 | 5,048 |
| 93 | CoPG_Streets | 327 | 371 | 491 | 396 | 4,756 |
| 94 | GoldenGate | 427 | 403 | 269 | 366 | 4,396 |
| 95 | Unitil_CallCenter | 333 | 411 | 347 | 364 | 4,364 |
| 96 | CoPG_PublicHealth_EHS | 401 | 241 | 356 | 333 | 3,992 |
| 97 | LosAltos | 107 | 430 | 405 | 314 | 3,768 |
| 98 | SFPower | 318 | 323 | 287 | 309 | 3,712 |
| 99 | SanBruno | 305 | 225 | 228 | 253 | 3,032 |
| 100 | Ashland | 318 | 72 | 100 | 163 | 1,960 |
| 101 | Curi | 140 | 118 | 133 | 130 | 1,564 |
| 102 | Primerica_CAN | 133 | 111 | 142 | 129 | 1,544 |
| 103 | CityofWaterloo | 122 | 117 | 138 | 126 | 1,508 |
| 104 | DelNorte | 243 | 64 | 46 | 118 | 1,412 |
| 105 | Clackamas | 123 | 103 | 112 | 113 | 1,352 |
| 106 | WasteConnectionsCanada | 115 | 113 | 102 | 110 | 1,320 |
| 107 | CARMAUS | 122 | 109 | 98 | 110 | 1,316 |
| 108 | CityofPeterborough | 106 | 107 | 90 | 101 | 1,212 |
| 109 | CityOfCharlotteFire | 76 | 102 | 120 | 99 | 1,192 |
| 110 | CLBRescueNet | 101 | 82 | 98 | 94 | 1,124 |
| 111 | YubaSutter | 108 | 67 | 96 | 90 | 1,084 |
| 112 | CoPG_Records | 88 | 73 | 84 | 82 | 980 |
| 113 | energienbpermis | 84 | 59 | 96 | 80 | 956 |
| 114 | TAMPAELECTRICCIAC | 71 | 76 | 82 | 76 | 916 |
| 115 | PacificNorthernGas | 60 | 52 | 54 | 55 | 664 |
| 116 | PrimericaDebitBalance_CAN | 38 | 38 | 33 | 36 | 436 |
| 117 | MariposaCounty | 51 | 33 | 25 | 36 | 436 |
| 118 | pnminterconnection | 28 | 38 | 29 | 32 | 380 |
| 119 | COPG_Procurement | 32 | 18 | 34 | 28 | 336 |
| 120 | CoPG_PublicHealth_AMS | 18 | 33 | 31 | 27 | 328 |
| 121 | CLBINFORRFC | 23 | 22 | 35 | 27 | 320 |
| 122 | battleriver | 0 | 5 | 68 | 24 | 292 |
| 123 | CPSEnergySD | 26 | 20 | 22 | 23 | 272 |
| 124 | LUSAPCanCf | 23 | 15 | 20 | 19 | 232 |
| 125 | CLBGarageSale | 11 | 16 | 27 | 18 | 216 |
| 126 | PNMLineExtension | 13 | 25 | 12 | 17 | 200 |
| 127 | SMUD | 7 | 9 | 18 | 11 | 136 |
| 128 | WesternOregonAltar | 8 | 8 | 11 | 9 | 108 |
| 129 | StevensCreek | 13 | 6 | 1 | 7 | 80 |
| 130 | COPG_MDO | 5 | 9 | 5 | 6 | 76 |
| 131 | SanBrunoAltar | 5 | 8 | 3 | 5 | 64 |
| 132 | COSFilmApp | 4 | 3 | 8 | 5 | 60 |
| 133 | AdoxsdirectV5Can | 0 | 0 | 12 | 4 | 48 |
| 134 | GoldenGateAltar | 5 | 2 | 4 | 4 | 44 |
| 135 | EnbridgeMerchantServices | 3 | 6 | 0 | 3 | 36 |
| 136 | CLBTyler | 3 | 1 | 5 | 3 | 36 |
| 137 | RPortland | 2 | 4 | 3 | 3 | 36 |
| 138 | VallejoGarbage | 7 | 2 | 0 | 3 | 36 |
| 139 | COPG_Law | 4 | 4 | 0 | 3 | 32 |
| 140 | ROTCAltar | 1 | 3 | 3 | 2 | 28 |
| 141 | HGL | 4 | 2 | 0 | 2 | 24 |
| 142 | MAWSS | 3 | 2 | 1 | 2 | 24 |
| 143 | CoPG_BoardOfEthics | 3 | 1 | 1 | 2 | 20 |
| 144 | COPG_POS | 0 | 0 | 4 | 1 | 16 |
| 145 | CLBAnimalCare | 1 | 1 | 1 | 1 | 12 |
| 146 | GCWWSundry | 0 | 0 | 3 | 1 | 12 |
| 147 | Vacaville | 2 | 0 | 1 | 1 | 12 |
| 148 | AshlandAltar | 0 | 0 | 2 | 1 | 8 |
| 149 | COPG_WRB_POS | 0 | 1 | 1 | 1 | 8 |
| 150 | LosAltosAltar | 1 | 1 | 0 | 1 | 8 |
| 151 | Reliance | 0 | 0 | 1 | 0 | 4 |
| 152 | TorontoHydro | 0 | 0 | 1 | 0 | 4 |
| 153 | AuburnPlacerAltar | 0 | 0 | 1 | 0 | 4 |
| 154 | Dixon | 0 | 0 | 1 | 0 | 4 |
| 155 | EurekaAltar | 0 | 0 | 1 | 0 | 4 |
| 156 | SouthValleyAltar | 0 | 0 | 1 | 0 | 4 |
| **Total** | **156 clients** | **2,047,423** | **1,986,431** | **2,196,049** | **2,076,632** | **24,919,612** |

## Methodology & caveats

- **Sample size**: 3 months (Jan–Mar 2026), the most recent legacy billing exports available locally. An April 2026 export exists, but that data wasn't available to pull in for this report.
- **"Estimated yearly"** = 3-month average × 12. This is a run-rate projection, not a trailing-12-month actual, and doesn't capture seasonality (e.g. utility billing cycles can spike around weather events or rate changes).
- **Client set will shift** as clients migrate from the legacy iDoxs pipeline to the new KHQ Billing platform over the course of 2026 — this snapshot reflects the legacy side only.
- Account codes shown are the raw billing-system identifiers (e.g. `PGE`, `XcelEnergy`, `CPSEnergy`) rather than formal client names, to match how they appear in the source files.

## Related

- [[KHQ-Billing]]
