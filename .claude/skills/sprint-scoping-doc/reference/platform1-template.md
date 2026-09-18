# Platform 1 sprint scoping doc — structure

Space `P1` (spaceId `8257540`), folder `1893302372`. Title format: `Scoping Meeting - Sprint YYNN | MM.DD.YYYY` (e.g. `Scoping Meeting - Sprint 2619 | 09.08.2026` — `YYNN` = 2-digit year + 2-digit sprint-of-year, resets to `01` each January; occasionally `| async` replaces the date when the meeting was asynchronous). Most recent live example: page `2171338942`.

**Rank rule:** within each bucket below, top-to-bottom row order in the Discussion topics table *is* the priority rank — the first row in a bucket is that bucket's highest priority.

## Sections (in this order)

### 📅 Date
Heading followed by a Confluence date-node field.

### 👥 Participants
Heading only — left blank as a placeholder, filled in during/after the meeting.

### 🗣️ Discussion topics
A single table for the whole section:

| Item (Projects) | Presenter | Notes |
|---|---|---|

Rows are grouped under bold section-divider rows, in this order:
- **This sprint**
- **Future**
- **PAUSED**

- **Item (Projects)**: names a workstream/feature, often with an embedded Jira smartlink (e.g. `SMM-1`, `FTS-370`, `DF-1362`).
- **Presenter**: @mention of the item's owner.
- **Notes**: freeform — per-discipline status callouts (**UX**, **BE**, **UI**), background/ask/caveat framing, decisions, follow-up questions; pasted images are normal here too.

### ✅ Actions
A checklist of `[ ]` unchecked items, each tagging an @mention owner plus the action text.

### ✅ Down the pipeline to remember
Checklist heading — left blank as a placeholder.

### ⤴️ Decisions
Heading only — left blank as a placeholder.
