# Escenarios: add-scouthem-section

> Change: TICKET-005 — Nueva sección Scouthem en la home y CTA movido desde el
> hero. Frontend puro (Astro + Tailwind v4): no hay entidades de data model ni
> endpoints de API involucrados. IDs `SC-{NNN}` mapeados 1:1 desde
> `openspec/tickets/TICKET-005-enriched.md` (SC-001…SC-010) + SC-011 como
> error case derivado de sus Edge Cases.

### SC-001: La sección nueva queda justo debajo del hero
- **Given** la home compilada en `/`
- **When** se inspecciona el orden de las `<section>` dentro de `<main>`
- **Then** la sección Scouthem es la segunda, inmediatamente después del hero y
  antes de "Nuestros Servicios"

### SC-002: El hero ya no muestra el botón SCOUTHEM
- **Given** el hero "Reclutamiento y Selección Estratégica"
- **When** se inspecciona su grupo de CTAs
- **Then** solo queda "Comenzar Proceso"
- **And** el hero no contiene ningún enlace con texto "Conoce nuestra
  plataforma SCOUTHEM"

### SC-003: La home tiene exactamente un CTA SCOUTHEM, con label y destino correctos
- **Given** la home compilada
- **When** se buscan los enlaces con texto "Conoce nuestra plataforma SCOUTHEM"
- **Then** hay exactamente uno, dentro de la sección nueva
- **And** su `href` es `https://scouthem.com/es/pagina-de-inicio/`
- **And** su `target` es `_blank` con `rel="noopener"`

### SC-004: El CTA preserva el requisito de la spec home-hero
- **Given** el CTA SCOUTHEM de la sección nueva
- **When** se inspecciona su atributo `class`
- **Then** no contiene `link-underline`
- **And** mantiene `hover:bg-verde-bosque/5 transition-all`

### SC-005: Contenido del mock reproducido literalmente
- **Given** la sección nueva renderizada
- **When** se lee su contenido
- **Then** contiene el badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN"
- **And** el H2 con "Revoluciona tu" y el span "Selección de Talento" en
  `text-verde-lima italic`
- **And** el párrafo "Scouthem es tu plataforma inteligente…" y el CTA,
  textualmente como en `docs/assets/design/nueva-seccion.jpeg`

### SC-006: Layout mobile-first según el diseño y el estándar
- **Given** la sección en viewport <1024px
- **When** se renderiza
- **Then** es de una sola columna con el bloque de texto (badge, H2, párrafo,
  CTA) arriba y el panel visual abajo
- **And** en viewport ≥1024px es un grid de 2 columnas con el panel visual a la
  izquierda y el texto a la derecha
- **And** no hay desbordamiento horizontal en ningún breakpoint

### SC-007: Slot del visual reservado con el token canónico
- **Given** la sección renderizada, con o sin el asset
  `src/assets/scouthem-section.*`
- **When** se inspecciona el panel visual
- **Then** el panel navy se dibuja con la clase `bg-verde-bosque` (sin hex
  hardcodeados) y una relación de aspecto reservada
- **And** la ausencia del asset no rompe `npm run build` (el glob queda vacío
  y el panel reserva el espacio igual)

### SC-008: Imagen del visual optimizada y accesible (asset entregado)
- **Given** el asset `src/assets/scouthem-section.*` presente
- **When** se inspecciona el HTML de la sección
- **Then** la imagen se sirve vía `<Image>` de `astro:assets` con
  `width`/`height`/`format`/`loading="lazy"`/`sizes` explícitos (nunca `<img>`)
- **And** tiene `alt` descriptivo
- **And** el panel mantiene su relación de aspecto sin layout shift

### SC-009: Semántica y animación consistentes con el resto de la home
- **Given** la sección nueva
- **When** se inspecciona su marcado
- **Then** usa `<section>` con un único H2 (jerarquía h1 → h2 intacta)
- **And** su contenido está envuelto en `Reveal` con `variant="fade-up"`
- **And** permanece visible cuando el agente reduce el movimiento
  (`prefers-reduced-motion: reduce`)

### SC-010: Suite verde
- **Given** los comandos del proyecto
- **When** se ejecutan `npm run build`, `npm run lint` y `npm test`
- **Then** terminan sin errores
- **And** `src/lib/sections.spec.ts` sigue exigiendo ≥7 `reveal--fade-up` en
  `dist/index.html`

### SC-011: Asset inválido falla el build de forma temprana (error case)
- **Given** existe `src/assets/scouthem-section.*` con un formato o archivo
  que `astro:assets` no puede procesar
- **When** se ejecuta `npm run build`
- **Then** el build termina con código distinto de 0 y un error claro de
  `astro:assets`
- **And** no se publica HTML con un `<img>` nativo ni roto
