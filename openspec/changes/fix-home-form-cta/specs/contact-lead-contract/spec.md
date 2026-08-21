## MODIFIED Requirements

### Requirement: Canonical Lead Payload Contract
The contact form in `src/pages/contacto.astro` MUST submit a payload whose field `name`
attributes exactly match the documented `B2BLeadPayload` contract in `docs/api-spec.yml`
and `docs/data-model.md`. Required fields (`name`, `email`, `phone`) MUST be enforced.
The `message` field is OPTIONAL: the UI MUST NOT mark it as required (no asterisk, no
`required` attribute) and `getMissingRequired` MUST NOT report it when absent or blank.
The `contact_preference` field is OPTIONAL and MUST NOT be required in the UI.
The web3forms `access_key` MUST be injected from
`import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY` and MUST NOT be hardcoded in the repository.

#### Scenario: Form fields match the documented contract
- **Given** the contact form is rendered
- **When** a developer inspects the `name` attributes of its inputs/radios/checkboxes
- **Then** they equal `name`, `email`, `phone`, `company`, `role`, `services_of_interest`, `organizational_challenges`, `organization_size`, `contact_preference`, `message`, `_honeypot`

#### Scenario: Access key is not hardcoded
- **Given** the repository source of `contacto.astro`
- **When** it is searched for the web3forms access key literal
- **Then** the key is absent and instead read from `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY`

#### Scenario: Honeypot submitted empty
- **Given** the hidden honeypot field `_honeypot`
- **When** the form is submitted by a human
- **Then** the field is empty, and `isHoneypotClean` returns true

#### Scenario: Missing required fields block submission
- **Given** a submission missing `email` or `phone`
- **When** `getMissingRequired` is evaluated
- **Then** it returns the list of missing required field names and the warning modal is shown

#### Scenario: Message field is optional
- **Given** a submission with valid `name`, `email` and `phone`
- **When** the `message` field is absent or contains only whitespace
- **Then** `getMissingRequired` does not list `message` and the submission proceeds to web3forms

#### Scenario: Message UI shows no required indicator
- **Given** the rendered contact form
- **When** the `mensaje` textarea and its label are inspected
- **Then** the label has no error-colored asterisk span and the textarea has no `required` attribute
