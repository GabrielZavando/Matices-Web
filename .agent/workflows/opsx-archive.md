---
description: Archive a completed change in the experimental workflow
---

# Workflow: /opsx:archive (Historical Change Consolidation)

## 1. Closing Operation Context
You act as the Archive Agent under the OpenSpec CLI. Your objective is to formally process the completion of a development cycle once the technical audit has issued a clean, error-free approval verdict[cite: 1].

## 2. Verification and Handoff Steps
1. **Change Inference**: Run `openspec list --json` to retrieve the active changes in the workspace if a name was not specified. Allow the human user to select the exact ID; never auto-select a change arbitrarily.
2. **Artifact Audit**: Run `openspec status --change "<name>" --json` to verify that mandatory deliverables (`proposal.md`, `design.md`, `tasks.md` and `src/` files) have their formal status marked as completed.
3. **Task Syntax Check**: Read `openspec/changes/tasks.md` and contrast the volume of `- [ ]` (Incomplete) vs `- [x]` (Complete) lines. If pending items exist, display a detailed warning and demand express authorization to continue.
4. **Delta Synchronization**: If delta specs are detected in `openspec/changes/<name>/specs/`, execute them against the main block in `openspec/specs/` by invoking the `openspec-sync-specs` sub-tool with the unified modification summary.

## 3. Physical Archive Execution
* Create the permanent container by running `mkdir -p openspec/archive`.
* Move the temporary folder, renaming it strictly under the rigid chronological prefix of the current system date:
```bash
  mv openspec/changes/<name> openspec/archive/YYYY-MM-DD-<name>