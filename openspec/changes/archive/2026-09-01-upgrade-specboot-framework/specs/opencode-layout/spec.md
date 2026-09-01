# opencode-layout Specification

## Purpose

Define the layout of the `.opencode/` directory used by OpenCode to
discover agents and commands. The layout uses frontmatter YAML on each
file to declare metadata (`description`, `agent`, `mode`, `permission`)
and references body content via `{file:...}` includes. The
`opencode.json` root configuration is reduced to global settings
(`instructions[]`, `permission`, `autoupdate`).

## ADDED Requirements

### Requirement: Agents live under `.opencode/agents/*.md` with frontmatter

Every agent the project exposes to OpenCode MUST be a single Markdown
file under `.opencode/agents/` with YAML frontmatter declaring
`description`, `mode` (primary or subagent), and `permission` (edit/bash
allow/deny rules). The body MUST be a `{file:ai-specs/agents/<name>.md}`
include that resolves to an existing file.

Agents in this project (canonical list, version-locked to Specboot
v0.1.2): `plan`, `build`, `backend`, `frontend`, `reviewer`, `verify`,
`archive`.

#### Scenario: each agent file has the required frontmatter
- **Given** the project's `.opencode/agents/` directory
- **When** each `*.md` file is inspected
- **Then** the file begins with `---` and contains the keys `description`, `mode`, `permission`
- **And** the body (after the closing `---`) contains exactly one `{file:...}` reference that resolves to an existing file

#### Scenario: agent file with a broken include is rejected by check-refs.sh
- **Given** `.opencode/agents/build.md` contains `{file:ai-specs/agents/nonexistent.md}`
- **When** `bash check-refs.sh` is run
- **Then** exit code is 1
- **And** the output reports "Referencia rota: {file:ai-specs/agents/nonexistent.md}"

### Requirement: Commands live under `.opencode/commands/*.md` with frontmatter

Every custom command the project exposes to OpenCode MUST be a single
Markdown file under `.opencode/commands/` with YAML frontmatter declaring
`description` and `agent` (which agent OpenCode should use to execute
the command). The body MUST reference a SKILL.md via `{file:...}` or
contain inline instructions.

Commands in this project (canonical list, version-locked to Specboot
v0.1.2): `plan-change`, `apply`, `verify`, `archive`, `commit`,
`deploy`, `enrich-us`, `adversarial-review`, `explain`,
`show-spec-working`.

#### Scenario: each command file has the required frontmatter
- **Given** the project's `.opencode/commands/` directory
- **When** each `*.md` file is inspected
- **Then** the file begins with `---` and contains the keys `description` and `agent`

#### Scenario: command name matches its filename
- **Given** `.opencode/commands/plan-change.md` exists
- **When** OpenCode discovers commands
- **Then** the command is invocable as `/plan-change` (filename without extension, kebab-case)

### Requirement: `opencode.json` contains only global settings

The `opencode.json` file MUST NOT contain `agent` or `command` keys
(those have been migrated to `.opencode/agents/*.md` and
`.opencode/commands/*.md` respectively). The file MUST contain:
`$schema`, `autoupdate`, `instructions[]` (always including
`docs/base-standards.md` and `AGENTS.md`), and `permission` (global
edit/bash/webfetch rules).

#### Scenario: opencode.json is valid JSON without agent or command keys
- **Given** the project's `opencode.json`
- **When** `node -e "JSON.parse(require('fs').readFileSync('opencode.json'))"` is run
- **Then** exit code is 0 (valid JSON)
- **And** `node -e "const j=JSON.parse(require('fs').readFileSync('opencode.json'));process.exit(j.agent||j.command?1:0)"` exits 0 (no `agent` or `command` keys)

#### Scenario: opencode.json instructions always include base docs
- **Given** the project's `opencode.json`
- **When** its `instructions` array is inspected
- **Then** it contains `docs/base-standards.md` and `AGENTS.md` (always loaded)

### Requirement: Skill folder names are registered in AGENTS.md

Every folder under `ai-specs/skills/*/` MUST be mentioned by name
(folder basename) somewhere in `AGENTS.md`. This is because OpenCode
loads `AGENTS.md` automatically and matches skill names by substring;
a skill whose folder name does not appear in `AGENTS.md` has no
trigger and is silently broken. The `check-refs.sh` script verifies
this invariant.

#### Scenario: check-refs.sh verifies skill registration
- **Given** the project has skill folders `ai-specs/skills/{archive,commit,deploy,enrich-us,...}`
- **When** `bash check-refs.sh` is run
- **Then** each folder basename appears at least once in `AGENTS.md`
- **And** a missing registration causes exit 1 with "Skill '<name>' no aparece en AGENTS.md"

#### Scenario: new skill added without AGENTS.md registration fails CI
- **Given** a developer creates `ai-specs/skills/new-skill/SKILL.md` but forgets to mention `new-skill` in `AGENTS.md`
- **When** `bash check-refs.sh` is run
- **Then** exit code is 1
- **And** the output includes "Skill 'new-skill' (ai-specs/skills/new-skill) no aparece en AGENTS.md"
