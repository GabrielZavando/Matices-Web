# opencode-layout Specification

## Purpose
TBD - created by archiving change upgrade-specboot-framework. Update Purpose after archive.
## Requirements
### Requirement: Agents live under `.opencode/agents/*.md` with frontmatter

Every agent the project exposes to OpenCode MUST be a single Markdown file
under `.opencode/agents/` with YAML frontmatter declaring `description`,
`mode` (primary or subagent), and `permission`. The body MUST be a
`{file:ai-specs/agents/<name>.md}` include that resolves to an existing
file.

Agents in this project (canonical list, version-locked to Specboot v0.11.1):
`sdd-plan`, `build`, `backend`, `frontend`, `reviewer`, `verify`, `archive`,
`commit`, `sync-specs`. The former `plan.md` is renamed to `sdd-plan.md`.

#### Scenario: each agent file has the required frontmatter
- **Given** the project's `.opencode/agents/` directory
- **When** each `*.md` file is inspected
- **Then** the file begins with `---` and contains the keys `description`, `mode`, `permission`
- **And** the body contains exactly one `{file:...}` reference that resolves to an existing file

#### Scenario: the sdd-plan agent replaces plan
- **Given** the project upgraded to Specboot v0.11.1
- **When** `.opencode/agents/` is listed
- **Then** `sdd-plan.md` exists and `plan.md` does not
- **And** `{file:ai-specs/agents/plan-agent.md}` resolves

#### Scenario: agent file with a broken include is rejected by check-refs.sh
- **Given** `.opencode/agents/sdd-plan.md` contains `{file:ai-specs/agents/nonexistent.md}`
- **When** `bash check-refs.sh` is run
- **Then** exit code is 1
- **And** the output reports "Referencia rota"

### Requirement: Commands live under `.opencode/commands/*.md` with frontmatter

Every custom command the project exposes to OpenCode MUST be a single
Markdown file under `.opencode/commands/` with YAML frontmatter declaring
`description` and `agent`. The body MUST reference a SKILL.md via
`{file:...}` or contain inline instructions.

Commands in this project (canonical list, version-locked to Specboot
v0.11.1): `plan-change`, `apply`, `verify`, `archive`, `commit`, `deploy`,
`enrich-us`, `adversarial-review`, `explain`, `show-spec-working`,
`sync-specs`.

#### Scenario: each command file has the required frontmatter
- **Given** the project's `.opencode/commands/` directory
- **When** each `*.md` file is inspected
- **Then** the file begins with `---` and contains the keys `description` and `agent`

#### Scenario: the sync-specs command is discoverable
- **Given** the project upgraded to Specboot v0.11.1
- **When** OpenCode discovers commands
- **Then** `/sync-specs` is invocable (filename without extension, kebab-case)

### Requirement: `opencode.json` contains only global settings

The `opencode.json` file MUST NOT contain `agent` or `command` keys. It MUST
contain: `$schema`, `autoupdate`, `provider` (OmniRoute vía
`{env:OMNIROUTE_API_KEY}` — FW-ENV), `instructions[]` (always including
`docs/base-standards.md` and `AGENTS.md`), and `permission` (global
edit/bash/webfetch rules, expanded in v0.11.1 with `bash scripts/*`,
`bash specboot.sh *`, `node *`, `mkdir *`, `date *`, `python3 *`, etc.).

The API key MUST NOT be committed as a literal; it is resolved from the
`OMNIROUTE_API_KEY` environment variable at OpenCode startup.

#### Scenario: opencode.json is valid JSON without agent or command keys
- **Given** the project's `opencode.json`
- **When** `node -e "JSON.parse(require('fs').readFileSync('opencode.json'))"` is run
- **Then** exit code is 0
- **And** `j.agent` and `j.command` are absent

#### Scenario: provider apiKey uses env interpolation
- **Given** the project's `opencode.json`
- **When** `provider.omniroute.options.apiKey` is inspected
- **Then** its value is `"{env:OMNIROUTE_API_KEY}"`
- **And** no literal key `sk-…` appears in the file

#### Scenario: opencode.json instructions always include base docs
- **Given** the project's `opencode.json`
- **When** its `instructions` array is inspected
- **Then** it contains `docs/base-standards.md` and `AGENTS.md`

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

