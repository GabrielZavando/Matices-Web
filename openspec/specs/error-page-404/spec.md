# error-page-404 Specification

## Purpose
Proporcionar una experiencia de usuario positiva cuando se accede a una URL inexistente, ofreciendo caminos claros de regreso y destacando servicios clave de Matices Consultoría Integral. La página se muestra sin Header ni Footer para mantener el foco en la recuperación de navegación.
## Requirements
### Requirement: Hero Section
La página MUST mostrar un hero centrado con:
- Número "404" en tipografía display usando `font-heading` (Playfair Display), tamaño grande (`text-8xl md:text-9xl`), peso `font-extrabold` y color `text-verde-lima` (#98C245)
- Subtítulo: "Parece que te has desviado del camino."
- Descripción con tono amigable y orientador: "La página que buscas no está disponible o ha sido movida. Pero no te preocupes, estamos aquí para guiarte de vuelta hacia el crecimiento y el bienestar organizacional."
- Botón "Volver al Inicio" con icono home (Material Symbols Outlined) y enlace a "/"

#### Scenario: Hero visible en desktop
- **Given** un usuario accede a una URL inexistente desde un dispositivo desktop
- **When** la página 404 carga
- **Then** el hero muestra "404" centrado con subtítulo y botón de regreso a inicio

#### Scenario: Hero responsive en móvil
- **Given** un usuario accede desde un dispositivo móvil
- **When** la página 404 carga
- **Then** el hero se apila verticalmente con tamaños de fuente adaptados (fuente base mobile-first)

### Requirement: Quick Links Section
La página MUST mostrar 3 cards de servicios principales dispuestas en grid:
- Salud Laboral → /psicologia (icono: health_and_safety)
- Reclutamiento y Selección → /talento (icono: group_add)
- Gestión del Talento → /formacion (icono: psychology)

#### Scenario: Cards muestran servicios reales
- **Given** la sección de enlaces rápidos
- **When** se renderizan las cards
- **Then** cada card tiene icono, título, descripción y enlaza a la página correcta

#### Scenario: Cards son interactivas
- **Given** un usuario pasa el mouse sobre una card
- **When** ocurre el hover
- **Then** la card muestra elevación usando token `card-lift` y cambio de color sutil

### Requirement: Decorative Effects
La página MUST incluir efectos decorativos sutiles adaptados al diseño:
- Blobs animados en fondo usando `animate-blob` y `animation-delay-*`
- Efecto glass-panel en cards usando `backdrop-blur` y `rgba` con opacidad baja

#### Scenario: Blobs animados no afectan rendimiento
- **Given** los blobs decorativos
- **When** la página carga
- **Then** usan solo propiedades compositor-only (opacity, transform) para proteger LCP/CLS

#### Scenario: Accesibilidad de movimiento
- **Given** un usuario con prefers-reduced-motion: reduce en configuración del sistema
- **When** carga la página 404
- **Then** los blobs no se animan y el contenido es estático (sin motion)

### Requirement: SEO Metadata
La página MUST incluir metadata SEO correcta:
- Title: "Página No Encontrada | Matices Consultoría Integral"
- Description: "La página que buscas no está disponible o ha sido movida. Matices Consultoría Integral - estrategia y desarrollo B2B en reclutamiento, selección y evaluación psicológica."
- Canonical URL: Debe apuntar a la propia URL de la página 404

#### Scenario: Metadata SEO presente
- **Given** la página 404
- **When** se inspecciona el HTML renderizado
- **Then** tiene title, description y canonical URL correctos

#### Scenario: Integración con Layout
- **Given** la página 404 dentro del Layout principal
- **When** se carga cualquier página del sitio
- **Then** hereda title base, Google Tag Manager y favicon del Layout

### Requirement: Standalone Layout (sin Header ni Footer)
La página 404 MUST renderizarse sin los componentes `Header` ni `Footer` del sitio,
manteniendo únicamente el contenido central de recuperación de navegación.

#### Scenario: Sin navegación global
- **Given** la página 404 construida en `dist/404.html`
- **When** se inspecciona el HTML renderizado
- **Then** no existen elementos `<header>` ni `<footer>`
- **And** el único camino de regreso es el botón "Volver al Inicio" y las cards de servicios

### Requirement: Static Hosting Error Handling

El sitio MUST servir la página 404 personalizada (`/404.html`) cuando el servidor
reciba una solicitud a una ruta inexistente en producción (Hostinger), mediante un
archivo `.htaccess` en la raíz del despliegue con la directiva
`ErrorDocument 404 /404.html`.

#### Scenario: Ruta inexistente en producción

- **Given** el sitio desplegado en Hostinger con `dist/.htaccess` incluido
- **When** un usuario accede a una URL que no corresponde a ningún archivo estático
- **Then** el servidor responde con estado HTTP 404 y el contenido de `/404.html`

#### Scenario: Build incluye .htaccess

- **Given** se ejecuta `pnpm build`
- **When** se inspecciona el directorio `dist/`
- **Then** existe `dist/.htaccess` y contiene la directiva `ErrorDocument 404 /404.html`

#### Scenario: Rutas existentes no afectadas

- **Given** el `.htaccess` desplegado
- **When** un usuario accede a `/psicologia`, `/contacto` u otra ruta válida
- **Then** el servidor entrega la página correspondiente sin interferencia (HTTP 200)

