## User Story enriched: TICKET-005

**As a** visitante de la página de inicio de Matices
**I want** ver una nueva sección dedicada a la plataforma Scouthem justo debajo del hero, con el CTA a Scouthem movido desde el hero
**So that** el hero quede enfocado en su CTA principal ("Comenzar Proceso") y la propuesta de valor de Scouthem reciba un bloque propio y destacado

### Context

La home (`src/pages/index.astro`) hoy muestra dos CTAs en el hero "Reclutamiento y Selección Estratégica": "Comenzar Proceso" y "Conoce nuestra plataforma SCOUTHEM". El diseño aprobado (`docs/assets/design/nueva-seccion.jpeg`) contempla una sección nueva —panel visual navy a la izquierda, badge + titular a dos tintas + párrafo + CTA SCOUTHEM a la derecha— ubicada inmediatamente debajo del hero y encima de "Nuestros Servicios".

Decisiones acordadas con el cliente:

- El botón SCOUTHEM **se elimina del hero y queda en la nueva sección** (no hay CTA duplicado en la home).
- El visual del panel izquierdo **aún no existe como asset**: se reserva el espacio con el panel navy y la imagen se cargará cuando el diseñador la entregue.
- Panel navy con el **token canónico** `verde-bosque` (`#243B55`), sin hex hardcodeados.
- **Mobile-first**: texto y CTA arriba, visual abajo (consiste con `docs/frontend-standards.md` §2).
- **Copy literal** del mock, incluida la variación "Scouthem" (párrafo) / "SCOUTHEM" (botón).

### Diseño de Clases/Componentes

- **`ScouthemShowcase.astro`** (nuevo, en `src/components/ui/` — carpeta obligatoria según `docs/frontend-standards.md` §5, siguiendo el precedente de `EvidenceGallery.astro`, que también renderiza una sección de la home):
  responsabilidad única = renderizar la sección Scouthem como componente presentacional puro (grid mobile-first: bloque de texto + panel visual), sin lógica de negocio ni estado.
  - Depende de: `Reveal` (abstracción de animación) y `astro:assets` `<Image>`; NO del DOM/estilos del hero ni de datos externos.
  - Props: tipadas vía `interface Props` en el frontmatter (sin props dinámicas inicialmente; contenido estático).
  - Capa: **dumb** (presentacional).
- **Panel visual (slot de imagen pendiente)**: contenedor `bg-verde-bosque` con radio de contenedor (`rounded-[2rem]`, dentro del rango 1.5–3rem del estándar) y relación de aspecto reservada; dentro, la imagen se resuelve con `import.meta.glob('../assets/scouthem-dashboard.*', { eager: true })` → si existe el asset se renderiza `<Image>`; si no, el panel queda vacío reservando el espacio **sin romper el build**. El asset futuro se subirá como `src/assets/scouthem-dashboard.png`.
- **`index.astro`** (modificación): responsabilidad única = componer la home.
  - Eliminar el `<a>` "Conoce nuestra plataforma SCOUTHEM" del grupo de CTAs del hero (líneas ~124–130), dejando solo "Comenzar Proceso".
  - Montar `<ScouthemShowcase />` inmediatamente después de la sección hero y antes de "Nuestros Servicios".
  - Capa: **page/composition**.
- **Sin cambios**: `Layout.astro` (title/SEO), API, base de datos, estilos globales (solo se usan tokens existentes de `@theme`).

### Acceptance Criteria

### SC-001: La sección nueva queda justo debajo del hero
- Given la home compilada en `/`
- When se inspecciona el orden de las `<section>` dentro de `<main>`
- Then la sección Scouthem es la segunda, inmediatamente después del hero y antes de "Nuestros Servicios"

### SC-002: El hero ya no muestra el botón SCOUTHEM
- Given el hero "Reclutamiento y Selección Estratégica"
- When se inspecciona su grupo de CTAs
- Then solo queda "Comenzar Proceso" y el hero no contiene ningún enlace con texto "Conoce nuestra plataforma SCOUTHEM"

### SC-003: La home tiene exactamente un CTA SCOUTHEM, con label y destino correctos
- Given la home compilada
- When se buscan los enlaces con texto "Conoce nuestra plataforma SCOUTHEM"
- Then hay exactamente uno, dentro de la sección nueva, con `href="https://scouthem.com/es/pagina-de-inicio/"` y `target="_blank"`

### SC-004: El CTA preserva el requisito de la spec `home-hero`
- Given el CTA SCOUTHEM de la sección nueva
- When se inspecciona su `class`
- Then no contiene `link-underline` y mantiene `hover:bg-verde-bosque/5 transition-all`

### SC-005: Contenido del mock reproducido literalmente
- Given la sección nueva renderizada
- When se lee su contenido
- Then contiene el badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN", el H2 con "Revoluciona tu" y el span "Selección de Talento" en `text-verde-lima italic`, el párrafo "Scouthem es tu plataforma inteligente…" y el CTA, textualmente como en el mock

### SC-006: Layout mobile-first según el diseño y el estándar
- Given la sección en viewport <1024px
- When se renderiza
- Then es de una sola columna con el bloque de texto (badge, H2, párrafo, CTA) arriba y el panel visual abajo
- And en viewport ≥1024px es un grid de 2 columnas con el panel visual a la izquierda y el texto a la derecha
- And no hay desbordamiento horizontal en ningún breakpoint

### SC-007: Slot del visual reservado con el token canónico
- Given que el asset `src/assets/scouthem-dashboard.*` aún no existe
- When se renderiza la sección
- Then el panel navy se dibuja con la clase `bg-verde-bosque` (sin hex hardcodeados) y una relación de aspecto reservada
- And el build (`npm run build`) no falla por la ausencia de la imagen

### SC-008: Imagen del visual optimizada y accesible (cuando el asset exista)
- Given el asset `src/assets/scouthem-dashboard.*` presente
- When se inspecciona el HTML de la sección
- Then la imagen se sirve vía `<Image>` de `astro:assets` con `width`/`height`/`format`/`loading="lazy"`/`sizes` explícitos (nunca `<img>`) y `alt` descriptivo
- And el panel mantiene su relación de aspecto sin layout shift

### SC-009: Semántica y animación consistentes con el resto de la home
- Given la sección nueva
- When se inspecciona su marcado
- Then usa `<section>` con un único H2 (jerarquía h1 → h2 intacta), su contenido está envuelto en `Reveal` con `variant="fade-up"` y permanece visible con `prefers-reduced-motion: reduce`

### SC-010: Suite verde
- Given los comandos del proyecto
- When se ejecutan `npm run build`, `npm run lint` y `npm test`
- Then terminan sin errores (incluye `src/lib/sections.spec.ts`, que exige ≥7 `reveal--fade-up` en `dist/index.html`)

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Asset de imagen aún pendiente (estado inicial) | El panel navy se renderiza reservando el espacio y `npm run build` queda verde; no se publica una imagen placeholder sin aprobación |
| El diseñador entrega el asset después | Al subir `src/assets/scouthem-dashboard.*`, el `import.meta.glob` lo detecta y la imagen aparece sin tocar el componente |
| Duplicación accidental del CTA (hero + sección) | SC-003 falla: se exigirá exactamente 1 ocurrencia en la home |
| Usuario con `prefers-reduced-motion` | El contenido de la sección se muestra sin animación, nunca oculto (sistema `reveal` existente) |
| Viewport muy angosto (≤360px) | Badge, párrafo y botón envuelven sin desbordamiento horizontal; el botón conserva área táctil |
| Imagen pendiente/pesada en carga | `loading="lazy"` + AVIF/WebP evita competir con el LCP del hero |
| Enlace externo en nueva pestaña | `target="_blank"` con `rel="noopener"` y nombre accesible completo |

### Estimación
Complejidad: **S**
Justificación: sección presentacional estática (1 componente nuevo + 1 borrado en el hero + slot de asset pendiente), sin lógica JS, API ni datos; el esfuerzo extra está en el responsive mobile-first, el mecanismo de slot de imagen y los tests contra `dist/`.

### Riesgo
Nivel: **Bajo**
Motivo: cambio estático y localizado en la home. Riesgos principales: (1) el asset visual sigue pendiente — mitigado con el slot reservado que no rompe el build; (2) la spec `home-hero` describe el CTA SCOUTHEM sin fijar su sección — resoluble con un delta en `/plan-change`.

### Dependencias
Tickets relacionados: **ninguno**.

Specs tocadas (delta a evaluar en `/plan-change`):

- `home-hero` — requisito "SCOUTHEM CTA Without Link Underline": el botón se mantiene con label/href/hover, pero deja de estar en el hero → actualizar la redacción/ubicación de los escenarios.
- `brand-design-system` — solo lectura: tokens y tipografía (Antic, no Playfair) a respetar.

### Alternativas descartadas
- Alternativa: dejar el botón en el hero y crear la sección sin CTA
  Motivo del descarte: el diseño aprobado incluye el CTA en la sección nueva y el ticket pide eliminarlo del hero (quedaría duplicado).
- Alternativa: construir el mock de dashboards con HTML/CSS
  Motivo del descarte: altísimo esfuerzo y frágil; el diseño es una imagen composite, no un wireframe funcional.
- Alternativa: usar `src/assets/scouthem.jpg` como visual
  Motivo del descarte: es una foto de oficina, no coincide con el dashboard del mock.
- Alternativa: crear la carpeta `src/components/sections/`
  Motivo del descarte: `docs/frontend-standards.md` §5 obliga a `src/components/{global,ui}/`.
- Alternativa: usar un hex hardcodeado para el navy exacto del mock (#0F1E33)
  Motivo del descarte: el cliente eligió el token canónico `verde-bosque`; un hex nuevo divergiría de la paleta documentada en la spec `brand-design-system`.
- Alternativa: escribir la sección inline en `index.astro`
  Motivo del descarte: el archivo ya tiene ~407 líneas; el repo compone secciones de la home como componentes (`CompanyLogos`, `EvidenceGallery`).

### Technical Considerations

- **Tokens**: usar solo aliases canónicos de `@theme` (`verde-bosque`, `verde-lima`, `crema-calido`); el panel es `bg-verde-bosque` (#243B55). Prohibido hardcodear hex (spec `brand-design-system`).
- **Tipografía**: `font-heading` (**Antic**, peso único) + `<span class="text-verde-lima italic">` para "Selección de Talento", replicando el patrón del H1 actual. **No** introducir Playfair Display (prohibido por spec `brand-design-system`).
- **Mobile-first (RNF2)**: estructura por defecto una columna con texto arriba y visual abajo; `lg:` solo escala a escritorio, reordenando el panel a la izquierda con `order` (precedente: sección "Áreas de Especialización" en `index.astro`).
- **Imágenes (RNF1)**: jamás `<img>`; `<Image />` de `astro:assets` con `width`/`height`/`format="avif"`/`loading="lazy"`/`sizes` y `alt` descriptivo. Slot resuelto con `import.meta.glob(..., { eager: true })` para no romper el build sin asset.
- **Componentes (§5)**: `.astro` PascalCase en `src/components/ui/`, props tipadas con `interface Props`, sin `any`.
- **Animación**: envolver en el componente `Reveal` existente (`variant="fade-up"`), que ya respeta `prefers-reduced-motion`.
- **Formas**: radio del panel dentro del rango de contenedores (1.5rem–3rem), p.ej. `rounded-[2rem]`.
- **Spec `home-hero`**: exige conservar label, destino y ausencia de `link-underline` — se cumple al mover el botón; `/plan-change` debe generar el delta de ubicación.
- **Tests (TDD primero)**: specs de Vitest contra `dist/index.html` (patrón de `src/lib/*.spec.ts`): orden de secciones, ausencia del CTA en el hero, unicidad del CTA en la home y presencia del slot navy.
- **Sin cambios**: API, base de datos, SEO/`<Layout title>`, header/footer.

### Definition of Done

- [ ] Test fallido escrito primero (SC-001 a SC-004, SC-007) y luego en verde
- [ ] Sección implementada en `src/components/ui/ScouthemShowcase.astro` y montada en la home
- [ ] Botón SCOUTHEM eliminado del hero (queda solo "Comenzar Proceso")
- [ ] Slot del visual reservado con `bg-verde-bosque`, listo para `src/assets/scouthem-dashboard.*`
- [ ] `npm run build` + `npm run lint` + `npm test` sin errores
- [ ] `bash check-refs.sh` y `bash specboot.sh --ci` en 0 errores
- [ ] Spec `home-hero` sin regresión (delta generado en `/plan-change`)
- [ ] Artefactos OpenSpec actualizados vía `/plan-change`
- [ ] Code review aprobado

### Questions for Clarification

Todas resueltas con el cliente (quedan registradas como decisiones):

1. **Tag**: confirmado `[frontend]` → se aplicó `docs/frontend-standards.md`.
2. **TICKET-ID**: confirmado `TICKET-005`.
3. **Botón**: se elimina del hero y queda en la nueva sección.
4. **Visual izquierdo**: pendiente; se reserva el espacio y la imagen se cargará luego.
5. **Panel navy**: token canónico `verde-bosque`.
6. **Orden mobile**: texto arriba, visual abajo.
7. **Copy**: literal del mock.
