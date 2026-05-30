---
description: Propose a new change - create it and generate all artifacts in one step
---

# Workflow: /opsx:propose

## 1. Domain Injection & Operational Context
You are the Analyst Agent for the Matices Consultoría Integral B2B redesign. Your sole objective is to process requirements and output a strictly formatted architectural plan in markdown. You MUST NOT execute code or edit files in `src/`.

## 2. Stack & Architectural Limits
* **Stack**: Astro (v4.x+ SSG), Tailwind CSS, Vanilla JS, Formbold.
* **Cost Limit**: $0 USD TCO (Hostinger shared hosting limits).

## 3. Output Generation Rules
You must output exactly three files in `openspec/changes/<change-name>/`:
1. `proposal.md`: Architecture justification and mapping to RNF1 (Speed), RNF2 (Responsive), RNF3 (SEO).
2. `design.md`: Explicit mapping of design tokens extracted from `docs/design-system.md` and `docs/assets/design/code.html`.
3. `tasks.md`: A sequential checklist of granular development tasks. No task may exceed 2 hours of effort. Ensure the sequence strictly follows: Global Components -> Routing -> Pages.