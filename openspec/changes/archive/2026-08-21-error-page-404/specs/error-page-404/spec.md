# error-page-404 Specification

## Purpose
Proporcionar una experiencia de usuario positiva cuando se accede a una URL inexistente, ofreciendo caminos claros de regreso y destacando servicios clave de Matices Consultoría Integral.

## ADDED Requirements

### Requirement: Hero Section
La página MUST mostrar un hero centrado con:
- Número "404" en tipografía display usando `font-heading` (Playfair Display)
- Subtítulo: "Parece que te has desviado del camino."
- Descripción con tono amigable y orientador: "La página que buscas no está disponible o ha sido movida. Pero no te preocupes, estamos aquí para guiarte de vuelta hacia el crecimiento y el bienestar organizacional."
- Botón "Volver al Inicio" con icono home y enlace a "/"

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
- Gestión del Talento → /talento (icono: psychology)

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