# Analytics sprint scoping doc — structure

Space `AG` (spaceId `74252399`), folder `1885798463`. Title format: `YYYY-MM-DD; Sprint YYNN` (e.g. `2026-09-10; Sprint 2619` — `YYNN` = 2-digit year + 2-digit sprint-of-year, resets to `01` each January). Most recent live example: page `2176221293`.

**Rank rule:** within each tier below, top-to-bottom row order *is* the priority rank — the first row in a tier is that tier's highest priority, not just "in this tier."

## Sections (in this order)

### Sprint Goals
H2 heading, no table — a short prose placeholder, typically left blank until filled in during the sprint kickoff.

### Top Priorities
Table, columns in this order:

| Project | priority | Notes | Owners |
|---|---|---|---|

- **Project**: bold initiative/item title. Embed the Jira issue smartlink (`kubra.jira.com/browse/ANALYTICS-XXXX`) and, if there's a supporting doc, a Confluence page smartlink too.
- **priority**: a status chip — `HIGH`, `MEDIUM`, or `LOW`.
- **Notes**: free text. Common sub-labels seen in practice: **purpose**, **status**, **next steps**. Inline @mentions, due-date macros, and links to related tickets/pages are normal here.
- **Owners**: @mention of each assignee, annotated with story points in parentheses — `@Name (2 pt)`. Multiple owners/mentions per row are fine.

### Medium Things
Same 4-column shape as Top Priorities. Holds mid-tier backlog items — historically the largest section by row count.

### Low Priorities (when we have bandwidth)
Same 4-column shape. Typically sparse — a handful of rows or empty.

### On Hold
Different column set — long-running/paused initiatives:

| Project | High-Level Progress | Notes | Owners |
|---|---|---|---|

Same Project/Notes/Owners conventions as above; "High-Level Progress" replaces "priority" with a short progress description instead of a HIGH/MEDIUM/LOW chip.
