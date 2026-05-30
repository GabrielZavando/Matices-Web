---
name: openspec-apply-change
description: Executes tasks from tasks.md, applying Astro/Tailwind code while enforcing Mobile-First rules, anti-spam honeypots, and native image optimization.
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "1.0"
---

Implement the planned code changes for the Matices repository.

**Steps**

1. **Read Active Task**: 
   Parse `openspec/changes/<change-name>/tasks.md`. Identify the first incomplete task.

2. **Apply High-Fidelity Styles**: 
   Map classes exactly as prototyped in `docs/assets/design/code.html`. Use `.glass-card` with `backdrop-filter: blur(12px)`. Default all Tailwind classes to mobile views first[cite: 2, 5].

3. **Enforce Media Optimization (RNF1)**:
   Any image added MUST use Astro's `<Image src={...} alt="..." />` from `astro:assets`. Flat `<img>` tags are strictly forbidden[cite: 1, 2].

4. **Implement Security (Spam Mitigation)**:
   If building `FormB2B.astro`, inject `<input type="text" name="_honeypot" class="sr-only" autocomplete="off" tabindex="-1" />`[cite: 1, 2].

5. **Validate & Mark Complete**:
   Run `astro check` and ESLint. Update `tasks.md` changing `- [ ]` to `- [x]`[cite: 1].
