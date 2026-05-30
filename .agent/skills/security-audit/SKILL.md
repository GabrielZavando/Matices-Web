---
name: security-audit
description: Audits the serverless data flow security and checks DNS deployment configurations.
license: MIT
---

# Skill: security-audit

## 1. Operational Context
Equips the reviewer with critical guidelines to shield the serverless data flow towards `contacto@maticesconsultora.cl`.

## 2. Execution Steps
1. **Anti-Spam Trap Audit**: Scan `.astro` forms and verify the `_honeypot` input is present and lacks predictable identifiers in its `name` attribute.
2. **Secrets Exposure Inspection**: Examine client-side Vanilla JS scripts to ensure Formbold/Formspree production IDs are injected via `import.meta.env` and never hardcoded in plain text.
3. **DNS Directives Verification**: Review deployment artifacts to ensure SPF, DKIM, and DMARC record configurations for Hostinger are explicitly documented.