---
description: Reglas globales de desarrollo para agentes IA (OpenCode). Aplica siempre.
alwaysApply: true
---

# Base Standards — Agencia Zavando

## 1. Principios core

- **Pasos pequeños, uno a la vez**: Nunca avanzar más de un paso sin confirmar. Baby steps siempre.
- **TDD (Test-Driven Development)**: Escribir test fallido primero para cualquier funcionalidad nueva.
- **Tipado completo**: Todo el código debe estar completamente tipado (TypeScript, PHPDoc, etc.).
- **Nombres descriptivos**: Variables y funciones con nombres claros y específicos al dominio.
- **Cambios incrementales**: Preferir modificaciones pequeñas y revisables sobre cambios grandes.
- **Cuestionar supuestos**: Siempre preguntar ante ambigüedades antes de asumir.
- **Detectar patrones repetidos**: Identificar y señalar código duplicado o patrones que deben abstraerse.

## 2. Idioma del código

- **Todo en inglés**: Variables, funciones, clases, comentarios, mensajes de error, logs.
- **Documentación en español**: READMEs para el cliente, comentarios de negocio, tickets pueden ir en español.
- **Commits en inglés**: Siempre. Conventional commits format.
- **Nombres de base de datos en inglés**: Tablas, columnas, índices.

## 3. Estándares específicos por área

Para estándares detallados, leer los archivos correspondientes:

- [Backend Standards](docs/backend-standards.md) — API, base de datos, testing, seguridad
- [Frontend Standards](docs/frontend-standards.md) — Componentes, UI/UX, estado
- [Documentation Standards](docs/documentation-standards.md) — Estructura docs, OpenAPI, mantenimiento

## 7. Actualización de artefactos OpenSpec ante cambios post-apply

Si aparece un fix o cambio nuevo después de `/apply` y antes de `/archive`:

1. Actualizar primero los artefactos OpenSpec afectados (scenarios, requirements, tasks.md)
2. Si se necesita regenerar artefactos, ejecutar el paso OpenSpec correspondiente antes de codear
3. Solo implementar código después de que los artefactos reflejen el nuevo requerimiento
4. Re-ejecutar verificación contra artefactos actualizados antes de archivar

**No aplicar fixes directos en código sin actualizar OpenSpec primero.**

## 8. Contexto del proyecto — Matices Consultoría Integral

> Esta sección fue personalizada para este proyecto. No dejar placeholders sin reemplazar.

```
Stack: Astro 6 (Static Site Generation) + TypeScript (astro/tsconfigs/strictest) + Tailwind CSS v4 (plugin @tailwindcss/vite) + Vitest. Sin backend propio: formulario serverless vía web3forms. hosting estático en Hostinger ($0 TCO).
Arquitectura: SSG por componentes Astro reutilizables (src/components), mobile-first, sin frameworks SPA.
Dominio: Consultoría B2B (reclutamiento y selección, evaluación psicológica, formación, gestión de talento, I+D, testing psicométrico). Generación de prospectos y venta consultiva.
Cliente: Matices Consultoría Integral (Viña del Mar, Chile).
Convenciones de commits: Conventional Commits (feat/ui, fix/form, docs/seo, refactor/style, ...).
Lenguaje del código: English
Lenguaje de documentación cliente: Español
```

### 8.1 Reglas de prohibición (no negociables)

- El tipo `any` o directivas de supresión de compilador (`@ts-ignore`, `@ts-nocheck`) están estrictamente prohibidos.
- Estilos inline (`style=""`) o archivos `.css` globales están prohibidos. Todo el diseño se resuelve con clases utilitarias de Tailwind CSS.
- Frameworks SPA pesados (React, Vue, Svelte) están prohibidos para proteger el tamaño del bundle (RNF1).
- Imágenes: usar siempre el componente `<Image />` de `astro:assets` (WebP/AVIF); el tag `<img />` tradicional está prohibido.

## 9. Principios de Diseño No Negociables

Todo el código generado para este proyecto debe respetar **SOLID** y priorizar
**encapsulamiento y composición sobre herencia** como regla general rectora. La
herencia solo se admite con justificación explícita en el código; por defecto se
compone comportamiento inyectando abstracciones (funciones puras, props tipadas,
módulos con una única responsabilidad).

Esta sección es solo el **principio rector a nivel de proyecto**. Las reglas
**concretas y verificables** —umbrales de tamaño, convenciones de componentes,
patrones de composición para Astro/TypeScript— viven en
[Frontend Standards](docs/frontend-standards.md). No duplicar aquí contenido
técnico: leer y aplicar el doc del stack correspondiente.
