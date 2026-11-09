# Propuesta de Cambio: Reestructuración de contenido entre Inicio, Testing e I+D

> **Ticket**: TICKET-007 (provisional; no se recibió ID explícito) | **Tag**: frontend | **Change**: `restructure-page-content`

## Why

El flujo de información del sitio está desalineado con la narrativa comercial
acordada. La sección "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN" (Scouthem)
vive hoy en Inicio, mientras que la página Testing abre con una sección de
"Rigor Técnico & Diagnóstico" que ya no aporta valor y ocupa el primer impacto
visual. Además, I+D conserva una imagen de hero en formato 4/5 (no 3/2), una
caja flotante con copy desactualizado y un párrafo de "Plataforma de Talento
Inteligente" que describe Scouthem sin mencionar el programa ni la privacidad
europea, con un CTA que saca al visitante del sitio en lugar de conducirlo al
producto. El cambio es 100% estático (Astro SSG + Tailwind v4): reordena
secciones, actualiza copy y ajusta la proporción visual de una imagen.

## What Changes

### 1. Intercambio de secciones Inicio ↔ Testing

- **Inicio (`src/pages/index.astro`)**: se elimina el bloque
  `<ScouthemShowcase />` (badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN").
  Se retira también su `import` (el componente se conserva y se reutiliza en
  Testing; en `src/components/ui/ScouthemShowcase.astro` solo se actualiza el
  comentario obsoleto que alude al test de la home y se añade el atributo
  `id="scouthem"`, ver sección 5).
- **Testing (`src/pages/testing.astro`)**: el bloque `<ScouthemShowcase />`
  pasa a ser la **primera** sección de `<main>`, con su `import` agregado.
- **Testing**: se elimina por completo la sección inicial actual (badge
  "Rigor Técnico & Diagnóstico", bloque `<h1>` "Pruebas y Testing
  Organizacional", CTA "Solicita tu Demo" y su imagen `hero-business.webp`).
  El `<h1>` de la página no se pierde: se conserva como encabezado
  visualmente oculto (`sr-only`) para no romper la jerarquía h1 → h2 ni el
  SEO de `/testing` (decisión registrada en `design.md`, D-2).
- **Import de imagen**: `import heroBusiness from '../assets/hero-business.webp'`
  se elimina de `testing.astro` (deja de referenciarse). El archivo
  `src/assets/hero-business.webp` queda **huérfano** por esta eliminación: se
  lista a continuación y **no se borra sin aprobación previa**.

### 2. Reordenamiento en Inicio

- La sección "Empresas que han confiado en nosotros" (`<CompanyLogos />`) se
  mueve para quedar **justo debajo de la sección "Talento & Evolución B2B"**
  (el hero de Inicio), es decir, pasa a ser la segunda `<section>` de `<main>`.
  El resto de secciones de Inicio conserva su orden relativo actual.

### 3. Ajustes visuales y de copy en I+D (`src/pages/id.astro`)

- Sección "Innovación Científica & Futuro" (hero de I+D):
  - La imagen lateral cambia su contenedor de `aspect-[4/5]` + `max-w-md` a
    `aspect-[3/2]` ocupando **todo el ancho disponible** de su columna, con
    `width`/`height` de `<Image>` en proporción 3:2 y `sizes` actualizado.
  - El grid del hero se **rebalancea a 40/60** (Opción A): la columna de texto
    pasa de `lg:col-span-7` a `lg:col-span-5` (≈40 %) y la columna de la imagen
    de `lg:col-span-5` a `lg:col-span-7` (≈60 %), de modo que la imagen se vea
    mayor sin romper las dos columnas ni la proporción 3:2. Por debajo de `lg`
    el layout sigue en una sola columna.
  - La caja flotante animada sobre la imagen cambia su título a
    **"Proyecto FONDEF"** y su párrafo interior a **"Innova I+D"** (se
    conservan `animate-float` y el tratamiento `text-sm font-semibold
    text-verde-bosque/70` del párrafo, por `floating-badges`).
- Sección "Plataforma de Talento Inteligente":
  - El párrafo se reemplaza por el texto exacto acordado (menciona el programa
    Scouthem, la investigación científica y el respaldo de privacidad y manejo
    de datos europeo).
  - El CTA "CONOCER SCOUTHEM" pasa a apuntar a la ruta interna `/testing`
    (se retira `target="_blank"` por tratarse de navegación interna).

### 4. Tests de contrato (TDD)

- Se **retira** `src/lib/homeScouthemSection.spec.ts` (contrato del bloque
  Scouthem en la home) y se lo reemplaza por
  `src/lib/testingScouthemSection.spec.ts` (el bloque abre `/testing`).
- Nuevo `src/lib/homeSectionOrder.spec.ts` (orden de secciones de Inicio).
- Nuevo `src/lib/idPageSections.spec.ts` (proporción 3:2 y grid 40/60, caja
  flotante y copy/CTA de I+D).

### 5. Ancla `#scouthem` del showcase

- `src/pages/talento.astro` enlaza a `/testing#scouthem`, pero ningún elemento
  declaraba ese `id`: el ancla no tenía destino. Se añade `id="scouthem"` al
  `<section>` raíz de `src/components/ui/ScouthemShowcase.astro` (sin props
  nuevas ni cambios de copy, estilos o semántica de encabezados).

### 6. Carga eagerly de la imagen del showcase (LCP de `/testing`)

- La imagen del panel visual del showcase se servía con `loading="lazy"`
  (heredado de su vida en la home, por debajo del hero). Como el showcase es
  ahora la **primera** sección de `/testing`, esa imagen es el candidato a LCP
  de la página: se cambia a `loading="eager"`.
- Se actualiza primero el requirement de la spec `home-scouthem-section`
  ("Navy visual panel reserves space regardless of asset presence") mediante un
  delta MODIFIED, y después el test de contrato y el componente (RED → GREEN).
- El resto de atributos de la imagen (`width`, `height`, `format="webp"`,
  `sizes`, `alt`) y el copy del showcase no cambian.

### 7. Activos potencialmente huérfanos (requieren aprobación previa)

| Activo | Motivo | Acción propuesta |
|---|---|---|
| `src/assets/hero-business.webp` | Única referencia: `testing.astro` (hero "Rigor Técnico") que este change elimina | **NO borrar** en este change; queda listado para aprobación del human owner |

### Capabilities

#### New Capabilities

- `testing-page-structure`: estructura de apertura de `/testing` (hero "Rigor
  Técnico" eliminado, un único `<h1>` conservado) .
- `home-section-order`: orden de las secciones de `<main>` en Inicio.
- `id-page-innovation`: proporción de la imagen del hero de I+D, copy de la caja
  flotante y copy/enlace del CTA de "Plataforma de Talento Inteligente".

#### Modified Capabilities

- `home-scouthem-section`: el bloque Scouthem deja de renderizarse en Inicio y
  pasa a ser la primera sección de `/testing`; su imagen del panel se carga con
  `loading="eager"` por ser el LCP de esa página.
- `home-hero`: la página Inicio pasa a no renderizar ningún CTA de SCOUTHEM
  (el CTA vive en el bloque Scouthem de Testing).
- `floating-badges`: la cobertura de badges flotantes deja de exigir la
  presencia de al menos uno por página (el hero eliminado de `/testing` era su
  única stat badge); el requisito sigue aplicando a los badges que sí se
  renderizan.

### Fuera de alcance

- Configuración de infraestructura, CI/CD, dependencias y `package.json`.
- `src/assets/hero-business.webp` (no se borra; ver tabla anterior).
- Cualquier otra sección de Inicio, Testing, I+D u otras páginas.
- Restructuración del `nav` del `Header` (la ruta `/testing` ya existe).

## Impact

- **Código de producción**: `src/pages/index.astro`,
  `src/pages/testing.astro`, `src/pages/id.astro`,
  `src/components/ui/ScouthemShowcase.astro` (comentario, atributo
  `id="scouthem"` y `loading="eager"` de la imagen del panel).
- **Tests**: 1 archivo retirado, 3 archivos nuevos o reescritos, 1 ajustado
  (`src/lib/ambientAnimations.spec.ts`).
- **Artefactos OpenSpec**: 6 capabilities (3 nuevas, 3 modificadas).
- **Sin** migraciones, sin cambios de API, sin nuevas dependencias, sin
  cambios en `docs/`, `Makefile`, `.github/` ni `package.json`.
- **Riesgo principal**: el contrato `home-scouthem-section` y su test
  (`homeScouthemSection.spec.ts`) giran en torno a la home; si no se actualizan
  en el mismo change, la suite queda en rojo. Mitigación: el RED del nuevo
  test de Testing se escribe antes de tocar las páginas y el test viejo se
  retira en la misma tarea.
- **Riesgo secundario**: `/testing` pierde el CTA visible "Solicita tu Demo"
  (Google Forms) al eliminarse el hero. Es un cambio solicitado
  explícitamente y el human owner **confirma la retirada definitiva** del
  formulario (no se reubica); el CTA "AGENDAR CONSULTORÍA" del banner final de
  `/testing` se mantiene como vía de conversión.
