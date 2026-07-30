# FE UI Ticket — blank template

Transcribed from the ConfigHQ reference ticket `PLT1-152` ("FTS UI Template Story"). These are the guiding sub-questions to walk through for every section — answer "N/A" explicitly where a question doesn't apply rather than omitting it (see `example.md` for the calibration of how much detail/N/A is normal).

## User Story Statement

As a [role], I want [function] so that [business value].

## Screenshots

For changes to an existing UI, provide a screenshot/description of the **BEFORE (Currently in Prod)** state and the **AFTER (Design)** state. For new UIs, a description of the Design (Figma link) will suffice.

## Background Info

Links to documentation pertinent to the UI screen being developed. Examples could be concepts (e.g. "Build a screen for creating Pipelines. What is a Pipeline?").

## Stakeholders

- Who are/will be the users of this screen or screens?
- Who is the primary point of contact for the Design?
- Who needs to be informed about the release of this feature?
- Is the work for this ticket dependent on any other teams?
  - If so, what is the status and ETA for those dependencies to be resolved?
  - Examples: DSO, another Platform team, etc.

## Deviations from the Design

1. Are there any elements present in the design but outside of scope for this ticket?
2. Are there any elements NOT present in the design, but you want to see as part of this ticket?
   1. If so, what should it look like? Describe or show examples from other UIs.
3. List out the deviations and the reasons for why we shouldn't implement.
   1. Example: Screen X is not done, so don't include a button that takes the user to Screen X.
4. Have these deviations been approved by Design?
   1. If not, who is responsible for getting that approval or informing design of the deviation?

## UI Elements

1. If there is a table:
   1. What order should the data be displayed in by default?
   2. Which columns should be sortable?
2. If there is a button:
   1. Describe what you expect that button to do, as a user.
3. If there is a text input:
   1. What restrictions do we need to apply on the text input? (e.g. accepts numbers but not letters, or adheres to a specific format like a phone number or email address)
4. Errors:
   1. When should we display an error message? What is the exact criteria needed for displaying an error message?
   2. Are there any error messages that you would expect to see that are NOT part of the design? (e.g. permissions, bad inputs)
5. If there are multiple screens:
   1. How does the user transition from screen to screen?
   2. Do any of the designs conflict with one another? If so, which screenshot is the "right" answer?
6. Provide any examples of other UIs using similar controls.

## Optional Work/Nice-To-Haves/Stretch Goals

1. Are there any features/UI elements/functionalities that are not needed for MVP of this feature?

## Acceptance Criteria (separate Jira field, not part of Description)

1. What do you need to see as part of the demo to feel comfortable with releasing this to stakeholders?
2. Is there a hard deadline for this ticket? If so, when?
3. Does this ticket need to be handed off to another team member for completion?
