## ADDED Requirements

### Requirement: Default Open Graph Image Resolves
The site MUST provide a valid default Open Graph image at the path referenced by
`Layout.astro` (`/images/og-default.jpg`) so that social sharing does not yield a 404.
The image MUST be a 1200×630 JPEG using the corporate palette.

#### Scenario: Default OG image exists after build
- **Given** the project is built with `astro build`
- **When** the output `dist/` is inspected
- **Then** `dist/images/og-default.jpg` exists and `og:image`/`twitter:image` meta tags point to `/images/og-default.jpg`

#### Scenario: OG image uses corporate palette
- **Given** the generated `public/images/og-default.jpg`
- **When** its pixels are inspected
- **Then** the background is the corporate blue `#243B55` with the Matices logo centered
