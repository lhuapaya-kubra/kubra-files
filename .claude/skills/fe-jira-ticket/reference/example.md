# FE UI Ticket — filled example (calibration reference)

Source: `PLT1-153` "Sample Story: Metatag Popover", a real completed sub-task illustrating the `PLT1-152` template above. Use this to calibrate tone/detail — note how many answers are legitimately "N/A" or "No"; brevity is fine when a section genuinely doesn't apply, but every question still gets an explicit answer rather than being skipped.

## User Story Statement

As a Service Delivery User, I want the ability to view the meta tags and file name for an uploaded file so that our users can utilize the meta tag featureset when it is more widely available.

## Screenshots

**Current State – Upload history table** (existing, in prod today)
| File name | Date uploaded |
|---|---|
| singleAcct-1744128862073988.jsonl | 04/08/2025, 09:14 AM |
| singleAcct-1742129604706942.jsonl | 03/16/2025, 05:53 AM |
| dtfd-svc-agrmt-1730306211581604.jsonl | 10/30/2024, 09:36 AM |

*(table has a "View more" link for pagination)*

**Future State – Details popover** (Figma design)
Clicking a row opens a "Details" popover showing:
- File name: `abc-test-feed-2.json`
- Metatags: `Library1=Object`

## Background Info

- Feature involves **multi-metatag** display: a file can have multiple metatags, shown as a bulleted list (e.g. `Library1=Object`, `Library2=Object`, `Library3=Object`)
- **No-metatags** case: file may have zero metatags — popover should still show file name with an empty/omitted metatags list
- Metatag Restrictions: key limited to 24 characters, value limited to 128 characters, total metatags size cannot exceed 1 KB

## Stakeholders

- Who are/will be the users of this screen or screens? — Service Delivery, Storm Center users
- Who is the primary point of contact for the Design? — Ban N
- Who needs to be informed about the release of this feature? — Service Delivery, Storm Center users
- Is the work for this ticket dependent on any other teams? — No

## Deviations from the Design

1. Are there any elements present in the design but outside of scope for this ticket? — The Status tag in the Designs should not be implemented
2. Are there any elements NOT present in the design, but you want to see as part of this ticket? — No
3. List out the deviations and the reasons for why we shouldn't implement — N/A
4. Have these deviations been approved by Design? — N/A

## UI Elements

1. If there is a table:
   1. What order should the data be displayed in by default? — Date Uploaded
   2. Which columns should be sortable? — Date Uploaded only
2. If there is a button: N/A
3. If there is a text input: N/A
4. Errors: N/A
5. If there are multiple screens: N/A
6. Provide any examples of other UIs using similar controls: N/A

## Optional Work/Nice-To-Haves/Stretch Goals

1. N/A

## Acceptance Criteria

1. What do you need to see as part of the demo to feel comfortable with releasing this to stakeholders?
   1. File name appears in tool tip
   2. No metatag appears if none exist on record
   3. Single metatag appears if present on record
   4. Multiple metatags appear if present on the record
2. Is there a hard deadline for this ticket? If so, when? — N/A
3. Does this ticket need to be handed off to another team member for completion? — N/A
