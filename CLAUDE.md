# Repo conventions

This repo is a PM knowledge base for KUBRA – Data Analytics, organized as an Obsidian vault. Read this before adding or editing files here.

## Hierarchy

Platform > product > content folder:

- `ConfigHQ/` — Datafeed, SFTP-Mailbox-Manager, File-Transformation-Service
- `BizHQPlus/` — Reports

Each product folder always has the same five subfolders: `specs/`, `meeting-notes/`, `jira/`, `confluence/`, `diagrams/`. Keep new products consistent with this shape.

## Knowledge graph

`knowledge-graph/` holds one hub note per platform and per product, linked with Obsidian `[[wikilinks]]`, not relative markdown links. When adding a new product or platform:

1. Add its folders under `ConfigHQ/` or `BizHQPlus/` (or a new platform folder).
2. Add a hub note in `knowledge-graph/` using `templates/product-note-template.md`, wikilinked from its parent platform note and from `knowledge-graph/index.md`.

When adding a Jira ticket, Confluence page, or meeting note inside a product's content folders, prefer the matching template in `templates/` and fill in the front-matter (`jira_project_key`, `confluence_space`, etc.) rather than inventing new fields.

## What not to do

- Don't paste full Jira/Confluence content verbatim without checking for customer PII first — summarize instead.
- Don't create relative-path links between knowledge-graph notes; use `[[wikilinks]]` so Obsidian's graph view and backlinks work.
- Don't flatten the platform/product hierarchy — new content belongs under its product's existing subfolders, not at the repo root.
