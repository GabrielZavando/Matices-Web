# Tasks: error-page-404

## Phase 1: Tokens & Foundation

### T1.1 - Agregar tokens glass-panel y blob animations a `src/styles/global.css`
- **Given** el archivo `src/styles/global.css` existente
- **When** se añaden las secciones de Glass Panel y Animated Blobs
- **Then** los tokens quedan consistentes con `docs/DESIGN.md` y `docs/frontend-standards.md`
- **Check**: Ejecutar `npm run astro check` sin errores

### T1.2 - Verificar `prefers-reduced-motion` en los nuevos tokens
- **Given** los tokens animation-blob y glass-panel añadidos
- **When** el usuario tiene `prefers-reduced-motion: reduce` activado
- **Then** los blobs no animan y el contenido es estático
- **Check**: Probar en devtools con emulación de reduced motion

## Phase 2: Core Page

### T2.1 - Crear `src/pages/404.astro` con estructura base
- **Given** no existe `src/pages/404.astro`
- **When** se crea el archivo con frontmatter Layout import
- **Then** archivo tiene estructura válida: imports, Layout wrapper, slot para contenido
- **Check**: `astro build` compiles sin errores

### T2.2 - Implementar Hero Section (404, subtítulo, descripción, botón)
- **Given** el structure del Layout
- **When** se agrega el hero con:
  - h1 "404" con `font-display-lg text-display-lg text-verde-bosque`
  - h2 subtítulo "Parece que te has desviado del camino."
  - p descripción con tono amigable
  - a botón "Volver al Inicio" con icono home linking a "/"
- **Then** hero se muestra centrado con estilo consistente
- **Check**: Visual inspection en desktop y mobile

### T2.3 - Implementar Quick Links Section (3 cards de servicios)
- **Given** el hero section creado
- **When** se agrega la sección de enlaces rápidos con grid de 3 cards:
  - Card 1: Salud Laboral → /psicologia (icono health_and_safety)
  - Card 2: Reclutamiento y Selección → /talento (icono group_add)
  - Card 3: Gestión del Talento → /formacion (icono psychology)
- **Each card incluye**: vidrio (glass-panel), icono, título, descripción
- **Then** cards tienen hover effects (glow-shadow, translate-y-1)
- **Check**: Todos los links apuntan a rutas que existen

### T2.4 - Agregar decorativos blobs animados en fondo
- **Given** la estructura principal
- **When** se añaden los divs absolutos con:
  - bg-verde-bosque/10 y bg-azul-celeste/10
  - rounded-full con mix-blend-multiply
  - filter blur-3xl y animate-blob
  - animation-delay-2000 para el segundo blob
- **Then** fondos tienen elementos decorativos sutiles
- **Check**: Los blobs se ven en desktop sin afectar rendimiento

## Phase 3: Components & Integration

### T3.1 - Integrar Header.astro con navegación consistente
- **Given** `src/pages/404.astro` creado
- **When** se incluye `<Header />` en el Layout
- **Then** header aparece sticky en top con navegación principal
- **Check**: Header muestra logo, menú y CTA consistentes con otras páginas

### T3.2 - Integrar Footer.astro
- **Given** la página 404 con header
- **When** se incluye `<Footer />` al final
- **Then** footer muestra links rápidos, contacto y créditos
- **Check**: Footer renderiza correctamente abajo del main

### T3.3 - Envolver contenido con Reveal.astro para animaciones de entrada
- **Given** el contenido de la página 404
- **When** se envuelve hero y cards con `<Reveal>` components
- **Then** animaciones fade-up se aplican en order apropiado
- **Check**: Las elementos aparecen con animación suave al scroll

## Phase 4: Content & Links

### T4.1 - Configurar cards con servicios reales y enlaces correctos
- **Given** las 3 cards creadas en T2.3
- **When** se verifica cada card:
  - Salud Laboral: `href="/psicologia"` y texto correcto
  - Reclutamiento: `href="/talento"` y texto correcto
  - Gestión Talento: `href="/formacion"` y texto correcto
- **Then** todos los enlaces funcionan al hacer click
- **Check**: `npm test` o verificación manual de cada href

### T4.2 - Verificar que todos los enlaces funcionan correctamente
- **Given** todos los href definidos
- **When** se hace click en cada link
- **Then** navega a la página destino correcta
- **Check**: Testing manual o script de validación

## Phase 5: SEO & Metadata

### T5.1 - Configurar title: "Página No Encontrada | Matices"
- **Given** el archivo 404.astro creado
- **When** el Layout recibe `title="Página No Encontrada"`
- **Then** el head title es "Página No Encontrada | Matices Consultoría Integral"
- **Check**: Inspeccionar `<title>` en el HTML renderizado

### T5.2 - Configurar description meta tag
- **Given** el frontmatter del Layout
- **When** `description="La página que buscas no está disponible..."`
- **Then** el meta description está presente y es significativa
- **Check**: `view-source:` muestra description correcta

### T5.3 - Configurar canonical URL
- **Given** la estructura Layout estándar
- **When** la página hereda canonical del sitio
- **Then** canonical URL es https://maticesconsultora.cl/404 (o ruta actual)
- **Check**: `view-source:` muestra link rel=canonical correcto

## Phase 6: Responsive & A11y

### T6.1 - Verificar responsive en mobile (1col grid en móvil)
- **Given** la página 404 en viewport móvil
- **When** el ancho de ventana es < 640px
- **Then** grid se colapsa a 1 columna (`grid-cols-1`)
- **Hero**: se apila verticalmente, botones width full
- **Check**: Abrir devtools en modo responsive, verificar layout

### T6.2 - Verificar accesibilidad (contraste, semántica, aria)
- **Given** el HTML de la página 404
- **When** se audita con herramientas (axe, lighthouse)
- **Then** no hay errores de contraste WCAG AA
- **Then** semantic HTML correcto: h1 > h2 > p > a structure
- **Then** todos los links tienen texto descriptivo
- **Check**: Ejecutar `npm run lint` o audit Lighthouse

### T6.3 - Probar con prefers-reduced-motion
- **Given** la página 404 con blobs animados
- **When** se simula reduced motion en browser
- **Then** blobs dejan de animarse (animation: none)
- **Then** contenido sigue siendo legible y funcional
- **Check**: Chrome DevTools > Three dots > Rendering > Emulate CSS media feature

## Phase 7: Deployment Config

### T7.1 - Documentar configuración requerida en Hostinger para página 404
- **Given** la nueva página 404.astro creada
- **When** se despliega al hosting Hostinger
- **Then** configurar el error page personalizado en panel de Hostinger
- **Then** probar que URLs inexistentes muestran la nueva 404
- **Check**: Deploy a staging y verificar behavior en dominio real

---

## Definition of Done

- [ ] `src/pages/404.astro` creado y compilando exitosamente
- [ ] `src/styles/global.css` tiene tokens nuevos sin errores de lint
- [ ] Todos los links funcionales: /, /psicologia, /talento, /formacion
- [ ] Efectos visuales (glass-panel, blobs) renderizan correctamente
- [ ] SEO metadata presente (title, description, canonical)
- [ ] Accesibilidad: contraste WCAG AA, prefers-reduced-motion respeta
- [ ] Responsive: mobile, tablet, desktop all layout correct
- [ ] Documentación en Hostinger para error page personalizada
- [ ] `npm run astro check` pasa sin errores
- [ ] `npm test` pasa (si hay tests relacionados)