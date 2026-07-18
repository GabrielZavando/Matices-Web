# contact-form-a11y Specification

## Purpose
TBD - created by archiving change improve-contact-a11y-dry. Update Purpose after archive.
## Requirements
### Requirement: Screen-Reader Accessible Radio Inputs
The radio inputs in `src/pages/contacto.astro` MUST be exposed to assistive technology.
They MUST use the `sr-only` utility class (visually hidden but present in the
accessibility tree) and MUST NOT use `hidden`/`display:none`, which removes them from
the accessibility tree. Visual selection state is conveyed by CSS `:has()` styling on
the wrapping `<label>`.

#### Scenario: Radios remain in the accessibility tree
- **Given** the rendered contact form
- **When** the `type="radio"` inputs are inspected
- **Then** each has the class `sr-only` and none has the class `hidden`

### Requirement: Keyboard-Accessible Feedback Modal
The feedback modal (`#feedback-modal`, `role="dialog" aria-modal="true"`) MUST be
dismissable with the `Escape` key. When opened it MUST move focus to a focusable element
inside the dialog, trap `Tab` focus within the dialog, and restore focus to the previously
focused element (the submit button) when closed.

#### Scenario: Modal closes on Escape
- **Given** the feedback modal is open
- **When** the user presses the `Escape` key
- **Then** `closeModal()` is invoked and the dialog is hidden

#### Scenario: Focus is trapped and restored
- **Given** the feedback modal is open
- **When** the user tabs through focusable elements or closes the dialog
- **Then** focus cycles only within the dialog while open and returns to the previously focused element on close

### Requirement: Robust Collapsible Height Animation
The optional sections (`#content-requerimientos`, `#content-detalles`) MUST animate their
height without a hard-coded maximum. They MUST use the `grid-rows-[0fr]`/`grid-rows-[1fr]`
technique (single inner `overflow-hidden min-h-0` wrapper) instead of magic `max-h` values.

#### Scenario: Collapsible uses grid-rows instead of max-h
- **Given** the collapsible content wrappers
- **When** their classes are inspected
- **Then** they use `grid grid-rows-[0fr]` when collapsed and toggle to `grid-rows-[1fr]`, not `max-h-[1000px]`

### Requirement: Data-Driven Option Components
The repeated radio and checkbox option groups MUST be rendered from data via the
`RadioCard.astro` and `CheckboxCard.astro` components instead of copy-pasted markup, to
reduce duplication and drift. This covers organization size, contact preference,
services of interest and organizational challenges.

#### Scenario: Option groups render from arrays via components
- **Given** the source of `contacto.astro` and the `ui` components
- **When** the option groups are inspected
- **Then** each group maps over an array (`organizationSizes`, `contactPreferences`, `servicesOfInterest`, `organizationalChallenges`) rendering `RadioCard`/`CheckboxCard`

#### Scenario: Checkbox keeps consistent size in long-label rows
- **Given** the `organizational_challenges` group rendered via `CheckboxCard`, including the long-label "Cumplimiento" option that spans two columns
- **When** the form is viewed on a narrow viewport where that label's text wraps
- **Then** the checkbox input uses `flex-shrink-0` and keeps the same `h-5 w-5` size as the other checkboxes (no horizontal shrink)

