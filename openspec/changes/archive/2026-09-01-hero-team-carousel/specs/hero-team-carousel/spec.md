## ADDED Requirements

### Requirement: Hero carousel renders team photos in an infinite loop
The hero graphic container on the home page (`src/pages/index.astro`) SHALL
render an infinite carousel of the two team photos `team.jpeg` and
`team-one.jpg` from `src/assets/team/`, displaying exactly one photo at a time
inside the existing `aspect-[4/5] rounded-[3rem] overflow-hidden` mask.

#### Scenario: Both team photos are present in the hero markup
- **GIVEN** the built home page (`dist/index.html`)
- **WHEN** its hero container markup is inspected
- **THEN** it contains two distinct image sources derived from `team.jpeg` and `team-one.jpg`

#### Scenario: One photo visible at a time via horizontal overflow mask
- **GIVEN** the hero carousel markup
- **WHEN** its track and mask are inspected
- **THEN** the mask has `overflow-hidden` and the track is wider than the mask (300% width), so only one photo is visible at a time

### Requirement: Carousel animation cycles every 5 seconds
The carousel SHALL advance to the next photo after the current one has been
visible for 5 seconds, using a short horizontal slide of AT MOST 0.5 seconds,
and SHALL loop infinitely. The animation SHALL be pure CSS (keyframes in a
scoped `<style>` in `src/pages/index.astro`) with no JavaScript.

#### Scenario: Animation keyframes define the 5s hold + fast slide cycle
- **GIVEN** the built stylesheet for the home page
- **WHEN** the carousel keyframes are inspected
- **THEN** each photo holds for exactly 5 seconds and the slide to the next photo takes at most 0.5 seconds

#### Scenario: Loop restarts seamlessly without abrupt jumps
- **GIVEN** the carousel track duplicates the first photo as its last slide (A-B-A layout)
- **WHEN** the animation reaches its final keyframe
- **THEN** the visual position matches the starting keyframe exactly, so the loop restarts with no visible jump

#### Scenario: Carousel runs without JavaScript
- **GIVEN** the home page markup
- **WHEN** the carousel track is inspected
- **THEN** its animation is applied via CSS keyframes and no script toggles its position

### Requirement: Reduced motion shows the first photo statically
Under `prefers-reduced-motion: reduce`, the carousel SHALL stop animating and
SHALL show the first team photo (`team.jpeg`) statically, consistent with the
site's global reduced-motion policy.

#### Scenario: Animation disabled under reduced motion
- **GIVEN** the compiled stylesheet
- **WHEN** the `prefers-reduced-motion: reduce` rules for the carousel track are inspected
- **THEN** the carousel animation is disabled (`animation: none`)