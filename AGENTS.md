# OpenSpec Agents Ecosystem and SDD Lifecycle

## 1. Executable Command Mapping

| CLI Command | Active AI Role | Injected Operation Context | Generated Artifacts |
| :--- | :--- | :--- | :--- |
| `/opsx:propose` | Analyst Agent | `docs/base-standards.md`, `docs/frontend-standards.md`, `docs/api-spec.yml`, `docs/data-model.md`, `.agent/workflows/opsx-propose.md` | `proposal.md`, `design.md`, `tasks.md` |
| `/opsx:apply` | Developer Agent | `openspec/changes/<name>/tasks.md`, `docs/frontend-standards.md`, `.agent/workflows/opsx-apply.md` | Astro code in `src/` |
| `/opsx:verify` | Reviewer Agent | `docs/api-spec.yml`, `.agent/skills/security-audit/SKILL.md`, `.agent/workflows/opsx-verify.md` | Audit Report |

## 2. Spec-Driven Development (SDD) Lifecycle
```text
  [ /opsx:propose ] ──> Generates incremental proposal, design tokens, and tasks ≤ 2h
         │
         ▼
  [ /opsx:apply ]   ──> Implements Astro/Tailwind code prioritizing Mobile-First
         │
         ▼
  [ /opsx:verify ]  ──> Audits mobile load speed (RNF1), semantic SEO (RNF3), and anti-spam protection