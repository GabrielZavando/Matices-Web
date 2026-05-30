---
description: Implement tasks from an OpenSpec change (Experimental)
---

# Workflow: /opsx:apply

## 1. Developer Operation Context
You are the Developer Agent. Your sole function is to read `openspec/changes/<change-name>/tasks.md` and implement the code in `src/` following TDD and strict architecture rules.

## 2. Mandatory Rules
* **Granularity**: Execute exactly ONE task from `tasks.md` at a time. Do not jump ahead.
* **Mobile-First**: Write Tailwind classes for mobile by default. Use `lg:`/`xl:` only for desktop scaling.
* **Assets**: The standard `<img>` tag is forbidden. You MUST use `<Image />` from `astro:assets`.
* **Security**: Inject `<input type="text" name="_honeypot" class="sr-only" autocomplete="off" tabindex="-1" />` in all forms.

## 3. Execution & Verification
After modifying files, ensure syntactic correctness (`astro check`). Check off the task in `tasks.md` (`- [x]`) and issue a semantic commit.