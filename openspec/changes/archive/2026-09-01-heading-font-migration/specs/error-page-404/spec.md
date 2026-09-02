# error-page-404 Specification (delta)

## Purpose

Este delta modifica el requisito "Hero Section" de la página 404: la
tipografía del número "404" pasa de Playfair Display a **Antic**, manteniendo
el uso de `font-heading`, tamaño, peso y color sin cambios.

## MODIFIED Requirements

### Requirement: Hero Section

La página MUST mostrar un hero centrado con:
- Número "404" en tipografía display usando `font-heading` (ahora **Antic**),
  tamaño grande (`text-8xl md:text-9xl`), peso `font-extrabold` y color
  `text-verde-lima` (#98C245)
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

#### Scenario: "404" usa la fuente de cabeceras Antic
- **Given** el token `--font-heading` migrado a Antic
- **When** se inspecciona el elemento del número "404"
- **Then** hereda `font-heading` (Antic) y mantiene `text-8xl md:text-9xl font-extrabold text-verde-lima`