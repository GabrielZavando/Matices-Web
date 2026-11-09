# Escenarios: restructure-page-content

> Change: TICKET-007 (provisional) — Reestructuración del contenido entre las
> páginas Inicio (`/`), Testing (`/testing`) e I+D (`/id`). Frontend puro
> (Astro SSG + Tailwind v4): sin entidades de data model ni endpoints de API.
> El ticket no trajo `openspec/tickets/TICKET-007-enriched.md`, por lo que los
> escenarios se derivan del título y de los requerimientos entregados. Los
> binarios de imagen quedan explícitamente fuera de alcance (no se borra
> `src/assets/hero-business.webp` sin aprobación previa).

### SC-001: La sección Scouthem sale de la página de Inicio

- **Given** la home compilada (`dist/index.html`)
- **When** se inspecciona el contenido de `<main>`
- **Then** no existe ninguna sección que contenga el badge "PLATAFORMA DE
  RECLUTAMIENTO Y SELECCIÓN" ni el titular "Revoluciona tu Selección de Talento"
- **And** la home no contiene ningún enlace con el label "Conoce la plataforma
  SCOUTHEM"
- **And** el resto de las secciones de la home (hero, servicios, banner,
  especialistas, equipo, galería) se mantiene sin cambios de copy

### SC-002: La sección Scouthem abre la página de Testing

- **Given** la página de testing compilada (`dist/testing/index.html`)
- **When** se leen los `<section>` hijos de `<main>` en orden del DOM
- **Then** la primera sección es la del showcase Scouthem (badge "PLATAFORMA DE
  RECLUTAMIENTO Y SELECCIÓN", titular "Revoluciona tu Selección de Talento",
  párrafo de la plataforma y CTA)
- **And** a continuación viene la sección "Psicometría Científica de Vanguardia
  Potenciada por Inteligencia Artificial"
- **And** el orden relativo de las secciones restantes de `/testing` (tipos de
  test, aplicaciones, logos, galería, banner final) no cambia
- **And** la imagen del panel visual del showcase se sirve con
  `loading="eager"`, por ser la primera sección de la página y su imagen el
  candidato a LCP

### SC-003: Desaparece el hero "Rigor Técnico & Diagnóstico" de Testing

- **Given** la página de testing compilada
- **When** se busca el contenido del hero eliminado
- **Then** no aparece el badge "Rigor Técnico & Diagnóstico"
- **And** no aparece el párrafo "Garantizamos la precisión y el encaje en la
  selección mediante evaluaciones y pruebas psicométricas avanzadas…"
- **And** no aparece el CTA "Solicita tu Demo" (formulario de Google Forms)
- **And** no se sirve ninguna imagen procedente de
  `src/assets/hero-business.webp` en `dist/testing/index.html`

### SC-004: La página de Testing conserva un único `<h1>`

- **Given** la página de testing compilada
- **When** se cuentan los encabezados `<h1>` del documento
- **Then** existe exactamente un `<h1>` con el texto "Pruebas y Testing
  Organizacional"
- **And** dicho `<h1>` es visualmente oculto (clase `sr-only`), por lo que la
  jerarquía h1 → h2 de la página se mantiene
- **And** el showcase Scouthem conserva exactamente un `<h2>` (su titular
  "Revoluciona tu Selección de Talento")

### SC-005: Existe un único CTA de SCOUTHEM en todo el sitio

- **Given** las páginas compiladas de Inicio, Testing e I+D
- **When** se cuentan los enlaces con el label "Conoce la plataforma SCOUTHEM"
- **Then** hay exactamente uno en total y vive dentro del showcase Scouthem de
  `/testing`
- **And** su `href` sigue siendo `https://scouthem.com/es/pagina-de-inicio/`
  con `target="_blank"` y `rel` que incluye `noopener`
- **And** su clase no incluye `link-underline` y conserva
  `hover:bg-verde-bosque/5` y `transition-all`

### SC-006: Los logos de clientes quedan justo debajo del hero de Inicio

- **Given** la home compilada (`dist/index.html`)
- **When** se leen los `<section>` hijos de `<main>` en orden del DOM
- **Then** la segunda sección es la de "Empresas que han confiado en nosotros"
  (componente `CompanyLogos`)
- **And** la precede el hero "Talento & Evolución B2B" ("Reclutamiento y
  Selección Estratégica")
- **And** la sección de logos ya NO aparece entre la sección "Nuestro Equipo" y
  la galería

### SC-007: El resto del orden de secciones de Inicio se preserva

- **Given** la home compilada
- **When** se recorre el orden de las secciones de `<main>`
- **Then** el orden resultante es: hero "Talento & Evolución B2B" → logos de
  clientes → "Nuestros Servicios" → banner de empatía → sección de
  especialistas → "Nuestro Equipo" → "Galeria de imágenes"
- **And** ninguna de esas secciones cambia su copy, sus clases de layout ni sus
  animaciones

### SC-008: La imagen lateral del hero de I+D usa proporción 3:2 a ancho completo

- **Given** la página de I+D compilada (`dist/id/index.html`)
- **When** se inspecciona el contenedor de la imagen del hero "Innovación
  Científica & Futuro"
- **Then** el contenedor declara la clase `aspect-[3/2]`
- **And** ya no declara `aspect-[4/5]` ni `max-w-md` en ese contenedor
- **And** la imagen sigue servida por `<Image>` de `astro:assets` con `width`,
  `height`, `format`, `loading="eager"` y `sizes` explícitos
- **And** la proporción declarada en `width`/`height` es 3:2
- **And** el grid del hero reparte el ancho 40/60: la columna de texto declara
  `lg:col-span-5` y la columna de la imagen declara `lg:col-span-7` sobre un
  `lg:grid-cols-12` (la imagen ocupa ≈60 % del ancho disponible)

### SC-009: La caja flotante del hero de I+D muestra el proyecto FONDEF

- **Given** la página de I+D compilada
- **When** se lee la caja flotante glassmorphism sobre la imagen del hero
- **Then** su título es "Proyecto FONDEF"
- **And** su párrafo es "Innova I+D"
- **And** no quedan el título "I+D" ni el párrafo "Diseño de metodologías de
  vanguardia." en esa caja
- **And** la caja conserva `animate-float`, `max-w-[200px]` y el párrafo con
  `text-sm font-semibold text-verde-bosque/70`

### SC-010: El párrafo de "Plataforma de Talento Inteligente" usa el texto acordado

- **Given** la página de I+D compilada
- **When** se lee el párrafo de la sección "Plataforma de Talento Inteligente"
- **Then** su texto es exactamente "Contamos con una solución tecnológica para
  la gestión del talento. Diseñada en base a las necesidades organizacionales
  y metodologías en investigación científica, validadas bajo el respaldo de
  privacidad y manejo de datos europeo. El programa Scouthem automatiza el
  reclutamiento, integrando la inteligencia artificial y psicometría avanzada
  para procesos de evaluación y predicción del desempeño organizacional."
- **And** no queda el párrafo anterior ("La solución tecnológica para la gestión
  del talento. Diseñada en base a las necesidades…")

### SC-011: El CTA "CONOCER SCOUTHEM" de I+D es un enlace interno a `/testing`

- **Given** la página de I+D compilada
- **When** se inspecciona el enlace con el texto "CONOCER SCOUTHEM"
- **Then** su `href` es `/testing`
- **And** no declara `target="_blank"` ni atributos `rel` de apertura externa
- **And** conserva sus clases visuales actuales

### SC-012: El asset `hero-business.webp` no se borra sin aprobación

- **Given** el working tree con el change implementado
- **When** se revisa el estado del repositorio
- **Then** `src/assets/hero-business.webp` sigue existiendo en disco
- **And** ningún archivo binario de `src/assets/` es modificado, eliminado ni
  restaurado por el agente
- **And** `src/pages/testing.astro` ya no importa ese asset

### SC-013: Build, lint y suite en verde

- **Given** el change implementado
- **When** se ejecutan `npm run build`, `npm run lint` y `npm test`
- **Then** los tres terminan sin errores
- **And** el contrato obsoleto `src/lib/homeScouthemSection.spec.ts` ya no
  existe (fue reemplazado por `src/lib/testingScouthemSection.spec.ts`)
- **And** `src/lib/sections.spec.ts` sigue exigiendo ≥7 `reveal--fade-up` en
  `dist/index.html` y ≥6 en `dist/testing/index.html`

### SC-014: La cobertura de badges flotantes no exige presencia por página

- **Given** la página de testing compilada tras la eliminación de su hero
- **When** se buscan contenedores glassmorphism con `max-w-[200px]`
- **Then** `/testing` ya no renderiza ninguno (su única stat badge estaba en el
  hero eliminado)
- **And** el contrato de badges flotantes sigue exigiendo que TODA stat badge
  renderizada por cualquier página lleve `animate-float` y el párrafo con
  `text-sm font-semibold text-verde-bosque/70`
- **And** ninguna página está obligada a renderizar al menos una stat badge
  (una página sin badges cumple el contrato)

### SC-015: El contrato del carrusel sigue acotado al hero

- **Given** la home compilada con los logos de clientes bajo el hero
- **When** se inspecciona el markup del HERO (primera `<section>` de `<main>`)
- **Then** contiene al menos 3 imágenes `.avif` resueltas a exactamente 2
  fuentes únicas (las dos fotos del equipo, con track A-B-A)
- **And** el rango inspeccionado NO incluye la sección de logos de clientes
  (que aporta fuentes de imagen propias)
- **And** el carrusel mantiene su máscara `overflow-hidden`, su `aspect-[4/5]`
  y su animación CSS de 11 s

### SC-016: El showcase expone el ancla `#scouthem`

- **Given** la página de testing compilada (`dist/testing/index.html`)
- **When** se inspecciona el `<section>` raíz del showcase Scouthem
- **Then** declara `id="scouthem"`
- **And** el enlace interno `/testing#scouthem` de la página `/talento`
  (`src/pages/talento.astro`) tiene por tanto un destino existente en `/testing`
- **And** el showcase conserva su markup de una sola `<section>` con un único
  `<h2>` (el `id` no altera la semántica de encabezados)
