# Diseño: restructure-page-content

> Change: TICKET-007 (provisional) — decisiones técnicas del traslado de
> secciones Inicio ↔ Testing, el reordenamiento de Inicio y los ajustes de I+D.
> Frontend puro (Astro 6 SSG + Tailwind v4), sin backend ni API.

## Contexto y restricciones

- **SSG estático**: todo se resuelve en build; los tests de contrato leen
  `dist/**` (patrón vigente en `src/lib/*.spec.ts`).
- **Mobile-first obligatorio** (`docs/frontend-standards.md` §2): los cambios de
  grid solo escalan con `lg:`; ninguna modificación introduce columnas múltiples
  por debajo de 1024px.
- **Tokens canónicos**: sin hex hardcodeados; se conservan
  `bg-verde-bosque`, `text-verde-lima`, `text-verde-bosque/70`.
- **Imágenes solo vía `astro:assets`** (`<Image>`), nunca `<img>` nativo.
- **Fuera de alcance**: infra, CI/CD, dependencias, `docs/`, nav del `Header`,
  y el borrado de `src/assets/hero-business.webp`.

## Decisiones

### D-1 — El showcase Scouthem se reutiliza, no se duplica

`ScouthemShowcase.astro` es un componente *dumb* (presentacional, sin estado ni
script). Se **traslada** el uso de `index.astro` a `testing.astro` en lugar de
copiar el markup: una sola fuente de verdad para badge, titular, párrafo, CTA y
panel navy, y cumplimiento automático de `home-scouthem-section` (mock literal,
mobile-first, panel `bg-verde-bosque`, `Reveal variant="fade-up"`).

Consecuencia: el componente deja de ser exclusivo de la home y pasa a ser
exclusivo de `/testing`. Se actualiza el comentario del bloque visual, que hoy
justifica `format="webp"` por el test de carrusel de la home — esa restricción
ya no aplica al showcase (que ahora vive en otra página), pero **se mantiene
`format="webp"`** para no tocar el comportamiento de imagen en este change.

### D-2 — `<h1>` visualmente oculto en `/testing`

Al eliminar el hero "Rigor Técnico & Diagnóstico" se elimina también el `<h1>`
"Pruebas y Testing Organizacional". Una página sin `<h1>` es un problema de
accesibilidad (RNF3) y de SEO, y el ticket no pide perder el encabezado de la
página: solo pide eliminar la sección visual.

Se optó por **conservar el `<h1>` con clase `sr-only`** en lugar de promover el
`<h2>` del showcase a `<h1>`:

| Opción | A favor | En contra |
|---|---|---|
| `sr-only` en la página (elegida) | El componente queda reutilizable sin props; el copy del `<h1>` ("Pruebas y Testing Organizacional") sigue siendo el titular de la página; el `<h2>` del showcase no cambia | Hay dos textos de titulo conceptuales en el DOM (uno oculto) |
| Promover el `<h2>` del showcase a `<h1>` | Un solo titular visible | Obliga al componente a parametrizar el nivel de encabezado (`Props` nueva) o a hardcodear `h1` en un componente reutilizable; cambia el copy de la página |

El texto visible del titular de la página se conserva intacto y la jerarquía
h1 → h2 queda válida. `sr-only` es una utilidad estándar de Tailwind v4.

### D-3 — `CompanyLogos` se mueve, no se reimplementa

`CompanyLogos.astro` ya es un componente *dumb* reutilizado por Inicio, Testing
e I+D. La reubicación es un simple cambio de posición de la etiqueta en el
`<main>` de `index.astro`: cero cambios de markup, cero duplicación, y el
componente sigue sirviendo a las otras dos páginas.

### D-4 — Proporción 3:2 con `object-cover`

`portada-id.jpg` es una imagen apaisada (≈768×512). El contenedor actual
`aspect-[4/5] max-w-md` la recorta en vertical y la encoge. El nuevo contenedor
`aspect-[3/2]` (sin `max-w-md`, dentro de la columna `lg:col-span-7`) usa todo el
ancho disponible y la proporción natural de la foto.

Los atributos `width`/`height` de `<Image>` pasan a la misma proporción 3:2
(p. ej. `width={768} height={512}`) para que no haya layout shift ni
distorsión: el `object-cover` recorta, no estira. `sizes` se ajusta al ancho
real de la columna.

### D-7 — El grid del hero de I+D se rebalancea a 40/60

Con la proporción 3:2 y la columna de imagen ensanchada, la imagen quedaba
pequeña dentro de una columna de 5/12 del grid. Se adoptó la **Opción A** del
ticket: rebalancear el grid del hero "Innovación Científica & Futuro" para dar
más ancho a la imagen sin tocar su proporción:

| Opción | A favor | En contra |
|---|---|---|
| A — Grid 40/60 (`lg:col-span-5` texto / `lg:col-span-7` imagen) (elegida) | La imagen crece ~20 % de ancho manteniendo las dos columnas y la proporción 3:2; el texto conserva un ancho de lectura razonable (≈40 %) | El párrafo del hero queda en un bloque más estrecho (el `max-w-xl` ya limitaba la línea de todos modos) |
| B — Imagen al 100 % del ancho, en columna propia | Máximo tamaño de imagen | Rompe el layout de dos columnas y la simetría del hero |

El cambio se limita a las clases `lg:col-span-*` de las dos columnas y al
atributo `sizes` de `<Image>` (`≈60 %` del viewport en `lg`). Mobile-first se
mantiene: por debajo de `lg` el grid sigue en una sola columna
(`grid-cols-1`).

### D-8 — El showcase expone el ancla `id="scouthem"`

`src/pages/talento.astro` enlaza a `/testing#scouthem`, pero ningún elemento
del sitio declaraba ese `id`: el ancla caía arriba de la página. Se añade
`id="scouthem"` al `<section>` raíz de `ScouthemShowcase.astro` (el componente
dumb, sin props nuevas ni estado). Es el cambio de markup mínimo posible: no
afecta la semántica de encabezados (sigue siendo una `<section>` con un único
`<h2>`) ni el contrato visual del showcase.

### D-9 — El formulario de Google Forms se retira definitivamente

El hero eliminado de `/testing` era el único portador del CTA "Solicita tu
Demo" (Google Forms) en todo el sitio. El human owner **confirma la retirada
definitiva** del formulario: no se reubica en otro punto de `/testing`. En
`/testing` queda como vía de conversión el banner final "AGENDAR CONSULTORÍA"
→ `/contacto`. No hay cambio de código: el CTA ya no existe tras T-005.

### D-10 — La imagen del showcase se carga de forma eagerly (LCP de `/testing`)

La imagen del panel visual del showcase se servía con `loading="lazy"` porque
vivía en la home, por debajo del hero. Con el showcase como PRIMERA sección de
`/testing`, esa imagen es el candidato a LCP (Largest Contentful Paint) de la
página: `loading="lazy"` retrasa la petición del elemento LCP. Se cambia a
`loading="eager"`.

- El contrato de la spec base `home-scouthem-section` (requirement "Navy visual
  panel reserves space regardless of asset presence") se actualiza primero
  (MODIFIED en el delta de este change) y después el componente y su test.
- El resto de atributos de la imagen (`width`, `height`, `format="webp"`,
  `sizes`, `alt`) no cambia: la resolución de assets ya era eager
  (`import.meta.glob(..., { eager: true })`), que es otro concepto y no se toca.
- `loading="eager"` no penaliza el resto de la página: la imagen es de la
  primera sección y pesa 28 KB.

### D-5 — Copy literal y enlace interno en I+D

- El párrafo de "Plataforma de Talento Inteligente" se reemplaza por el texto
  exacto del ticket (sin reescrituras): es copy comercial aprobado.
- El CTA "CONOCER SCOUTHEM" pasa de `https://scouthem.com/...` con
  `target="_blank"` a la ruta interna `/testing`. Al ser navegación interna se
  **eliminan** `target="_blank` y `rel` (evitar `noopener` sin sentido en un
  enlace del mismo sitio); el icono/estilo del botón se mantiene.

### D-6 — El asset huérfano no se borra

`src/assets/hero-business.webp` queda sin referencias. El requisito de
`code-correctness` ("no dead duplicate assets") apunta a duplicados `.png` de
`.webp`, no a webp huérfanos, así que no hay conflicto con el spec. Aun así,
borrar un binario del cliente sin aprobación es una decisión del human owner:
el change lo deja en disco y lo lista en `proposal.md` para aprobación.

## Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El contrato `homeScouthemSection.spec.ts` queda obsoleto (afirma que la sección es la 2ª de la home) | Suite en rojo | Se retira y se reemplaza por `testingScouthemSection.spec.ts` en la misma tarea RED |
| Umbrales de `sections.spec.ts` (home ≥7, testing ≥6 `reveal--fade-up`) | Falso rojo tras el intercambio | El showcase aporta 5 reveals a `/testing` y la home conserva ~21; ambos umbrales siguen satisfacibles. Verificado en la tarea de verificación |
| `heroCarousel.spec.ts` cuenta `.avif` antes de "Nuestros Servicios" | Falso rojo tras mover los logos | El spec `hero-team-carousel` exige inspeccionar **el contenedor del hero** ("it contains two distinct image sources"), no un rango proxy. El test usaba `html.slice(0, html.indexOf('Nuestros Servicios'))` como proxy del hero, rango que con los logos bajo el hero incluye ahora los ~19 `.avif` de los logos (21 fuentes únicas en vez de 2). El carrusel está intacto: acotando al hero real se obtienen 3 avif / 2 fuentes únicas. Corrección de alcance del test (tarea T-013), sin cambio de comportamiento ni de spec |
| Pérdida del CTA "Solicita tu Demo" (Google Forms) en `/testing` | Menos conversión en esa página | Resuelto por decisión del owner (D-9): el formulario se retira definitivamente y no se reubica. En `/testing` queda el banner final "AGENDAR CONSULTORÍA" → `/contacto` |
| Copy de I+D largo en el párrafo aprobado | Layout | El párrafo ya vive en un bloque de ancho medio con `leading-relaxed`; no requiere cambios de layout |
| El hero eliminado de `/testing` contenía su única stat badge, y `ambientAnimations.spec.ts` exigía ≥1 badge por página | Falso rojo en la suite | Detectado durante T-005. Se actualiza primero el spec `floating-badges` (el contrato exige legibilidad/movimiento de los badges renderizados, no su presencia por página) y después el test (tarea T-012), sin añadir un badge artificial a `/testing` |
| La imagen del showcase queda con `loading="lazy"` siendo la primera sección de `/testing` | LCP de `/testing` retrasado | Detectado en la auditoría adversarial (warning). Se actualiza primero el spec `home-scouthem-section` (requirement MODIFIED: `loading="eager"`) y después el test y el componente (tarea T-018) |

## Trazabilidad de specs

| Capability | Tipo | Requirements |
|---|---|---|
| `home-scouthem-section` | modificada | 1 REMOVED (la sección ya no es de la home) + 1 MODIFIED (la imagen del panel se carga con `loading="eager"` por ser el LCP de `/testing`) |
| `home-hero` | modificada | 1 MODIFIED (el CTA vive en `/testing`; la home no tiene CTA de SCOUTHEM) |
| `testing-page-structure` | nueva | 3 ADDED (showcase abre la página y expone el ancla `scouthem`, hero eliminado, un solo `<h1>`) |
| `home-section-order` | nueva | 1 ADDED (logos de clientes justo debajo del hero) |
| `id-page-innovation` | nueva | 3 ADDED (proporción 3:2 y grid 40/60, copy de la caja flotante, copy y CTA de "Plataforma de Talento Inteligente") |
| `floating-badges` | modificada | 1 MODIFIED (el contrato sigue aplicando a los badges renderizados, pero deja de exigir presencia por página: `/testing` ya no renderiza ninguno tras perder su hero) |

Total: 11 requirement-blocks (presupuesto ampliado de 10 a 11 por el fix de LCP
acordado con el owner en la Fase 7; el bloque añadido es el MODIFIED de
`home-scouthem-section` para `loading="eager"`).

## Fuera de alcance explícito

- Borrado de `src/assets/hero-business.webp` (pendiente de aprobación).
- Cualquier cambio en `src/components/ui/ScouthemShowcase.astro` más allá del
  comentario desactualizado, del atributo `id="scouthem"` (D-8) y del
  `loading="eager"` de la imagen del panel (D-10): no se toca copy, props ni
  estilos.
- Reubicar el formulario de Google Forms "Solicita tu Demo": el owner confirma
  su retirada definitiva (D-9).
- Cambios en el `Header`, el `Footer`, el `nav`, el `Layout` o los metadatos SEO.
- Reordenamientos internos de `/testing` o `/id` distintos de los descritos.
