# Propuesta de Cambio: Reveal al Scroll en Secciones y Tarjetas (`anim-sections`)

Aplica el revelado al hacer scroll (vía `<Reveal>` + `initReveal`) a los
encabezados de sección, tarjetas de servicios/bento, listas de especialidades,
tarjetas de equipo y encabezados de los componentes reutilizables
(`CompanyLogos`, `EvidenceGallery`) en todas las páginas. Reutiliza la fundación
de `anim-foundation`.

## Alcance

* Encabezados de sección (`h2` + intro): entrada `fade-up`.
* Tarjetas de servicios / bento / equipo: cada `<article>`/`<li>` con `<Reveal>`
  y `delay` escalonado por índice (stagger).
* Lista "Áreas de Especialización" (`index.astro`): cada `<li>` revelado con
  stagger.
* `CompanyLogos` y `EvidenceGallery`: revelar el encabezado de su sección.
* Componentes globales: el cambio se hace una sola vez en el componente,
  beneficiando a todas las páginas que los usan.

## Justificación

El contenido bajo el primer viewport aparece "de golpe" sin feedback visual. El
reveal al scroll guía la atención de forma sutil y coherente con "Natural
Vitality", sin costo de rendimiento (solo `transform`/`opacity`, observer nativo).
Al centralizar los componentes reutilizables, se evita duplicación.

## Mapeo a RNF

* **RNF1**: `initReveal` usa `IntersectionObserver` (sin scroll listeners); solo
  `opacity`/`transform`. El observer hace `unobserve` tras revelar (one-shot).
* **RNF2**: independiente del breakpoint; el reveal funciona en mobile y desktop.
* **RNF3**: `prefers-reduced-motion` deja todo visible; enhancement progresivo
  (sin JS → visible).

## Dependencias

* Requiere `anim-foundation`.
* Es independiente de `anim-hero`, `anim-components`, `anim-ambient`,
  `anim-contact`.
