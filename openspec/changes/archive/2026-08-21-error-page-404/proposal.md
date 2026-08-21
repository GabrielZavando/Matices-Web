## Why

El sitio web no tiene página de error 404. Cuando un usuario navega a una URL inexistente, no hay retroalimentación útil ni camino de regreso, lo que genera frustración y pérdida de visitantes potenciales. Es necesario crear una experiencia de usuario positiva que oriente al visitante y destaque los servicios principales de Matices Consultoría Integral.

## What Changes

- Crear página `404.astro` con estructura de hero, CTA de regreso y cards de servicios rápidos
- Agregar efectos decorativos (blobs animados + glass-panel) adaptados al sistema de diseño del proyecto
- Incluir Header y Footer para navegación consistente en todo el sitio
- Agregar metadata SEO optimizada para la página de error

## Capabilities

### New Capabilities
- `error-page-404`: Página de error con hero centrado, CTA de regreso y 3 cards de servicios rápidos con efectos visuales

### Modified Capabilities
- `brand-design-system`: Agregar tokens para glass-panel effect y blobs decorativos dentro del sistema de tokens canónicos
- `frontend-standards`: Implementar página siguiendo estándares Astro 6 + Tailwind CSS v4

## Impact

- Nuevo archivo: `src/pages/404.astro`
- Modificación: `src/styles/global.css` (nuevos tokens para glass-panel y blobs)
- Configuración Hostinger: Documentar página de error personalizada para el hosting
- SEO: Mejorar experiencia y metadata en URLs inexistentes

## Success Criteria

- Página 404 renderiza correctamente en desktop y mobile
- Todos los links (home, service cards) funcionan y apuntan a rutas reales
- Efectos visuales (glass-panel, blobs) usan tokens del proyecto sin romper consistencia
- SEO metadata presente y correcta (title, description, canonical)
- Accesibilidad: contraste WCAG AA, respeta prefers-reduced-motion
- Código tipado sin `any`, componentes con interfaces TypeScript

## Unlocks

Completar este artifact habilita: design, specs, apply (implementation)