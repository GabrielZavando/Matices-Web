## ADDED Requirements

### Requirement: Canonical Lead Payload Contract
The contact form in `src/pages/contacto.astro` MUST submit a payload whose field `name`
attributes exactly match the documented `B2BLeadPayload` contract in `docs/api-spec.yml`
and `docs/data-model.md`. Required fields (`name`, `email`, `phone`, `contact_preference`,
`message`) MUST be enforced. The web3forms `access_key` MUST be injected from
`import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY` and MUST NOT be hardcoded in the repository.

#### Scenario: Form fields match the documented contract
- **Given** the contact form is rendered
- **When** a developer inspects the `name` attributes of its inputs/radios/checkboxes
- **Then** they equal `name`, `email`, `phone`, `company`, `role`, `services_of_interest`, `organizational_challenges`, `organization_size`, `contact_preference`, `message`, `_honeypot` (no Spanish-ish keys like `nombre`/`servicios[]`/`botcheck`)

#### Scenario: Access key is not hardcoded
- **Given** the repository source of `contacto.astro`
- **When** it is searched for the web3forms access key literal
- **Then** the key is absent and instead read from `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY`

#### Scenario: Honeypot submitted empty
- **Given** the hidden honeypot field `_honeypot`
- **When** the form is submitted by a human
- **Then** the field is empty, and `isHoneypotClean` returns true

#### Scenario: Missing required fields block submission
- **Given** a submission missing `email` or `contact_preference`
- **When** `getMissingRequired` is evaluated
- **Then** it returns the list of missing required field names and the warning modal is shown
