---
name: openspec-propose
description: Analyzes requirements and generates a strict, incremental SDD plan (proposal.md, design.md, tasks.md) for the Matices project.
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "1.0"
---

Plan an architectural or UI change based on the Matices Consultoría Integral requirements.

**Steps**

1. **Absorb Design Tokens**: 
   Read `docs/design-system.md` and `docs/assets/design/code.html`. Extract exact hex codes (e.g., `#236c32`), border radii (`rounded-[3rem]`), and typography (Playfair Display / Plus Jakarta Sans)[cite: 4, 5].

2. **Structure Mobile-First Layouts**:
   Ensure `design.md` specifies that all grids and flex containers start with mobile configurations, applying breakpoints (`lg:`, `xl:`) only for desktop scaling[cite: 2].

3. **Enforce Incremental Hierarchy**:
   Structure `tasks.md` in the following strict order[cite: 2]:
   - *Phase 1:* Global Components (`Header.astro`, `Footer.astro`).
   - *Phase 2:* Page Routing in `src/pages/`.
   - *Phase 3:* Atomic Sections (Hero, Bento Grid, Form).

4. **Task Granularity**:
   Ensure no single task in `tasks.md` exceeds 2 hours. Break down complex components. 

5. **Generate Artifacts**:
   Create `proposal.md`, `design.md`, and `tasks.md` in `openspec/changes/<change-name>/`.
