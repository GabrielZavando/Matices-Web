# Requisitos: update-team-profiles

> Change: TICKET-006 (provisional) — Trazabilidad REQ ↔ SC. Frontend
> (`smart | dumb`), servicio raíz `.specboot.json` `services: ["."]`.
> Sin entidades de data model ni endpoints de API.

## REQ-001: Orden estricto de los integrantes

**Prioridad**: alta | **Escenarios**: SC-001

La sección `#equipo` DEBE renderizar las tarjetas en el orden María José Jimenez
→ Cristian Nova → Catalina Aguilera → Lorenzo Traverso, tanto en el DOM como en
el orden visual de izquierda a derecha (`lg:grid-cols-4`).

## REQ-002: Enlace de LinkedIn por integrante

**Prioridad**: alta | **Escenarios**: SC-002, SC-003

Cada tarjeta DEBE incluir exactamente un enlace de LinkedIn junto al nombre, con
el `href` exacto al perfil entregado, `target="_blank"` y
`rel="noopener noreferrer"`.

## REQ-003: Ícono de LinkedIn inline y libre de assets externos

**Prioridad**: alta | **Escenarios**: SC-004, SC-005

El ícono DEBE ser un `<svg>` inline decorativo (`aria-hidden="true"`), sin
`<img>`, sin el PNG externo de pngtree y sin URLs externas de imagen. El enlace
DEBE exponer un nombre accesible que incluya el nombre de la persona; el ícono
NO DEBE duplicar texto para lectores de pantalla.

## REQ-004: Biografías literales

**Prioridad**: alta | **Escenarios**: SC-006

La `description` de cada integrante DEBE ser exactamente el texto entregado en
el ticket, preservando tildes, paréntesis, mayúsculas y puntuación. El texto
anterior DEBE quedar reemplazado por completo. Los `role` actuales se mantienen.

## REQ-005: Retratos sin regresiones y binarios intocables

**Prioridad**: alta | **Escenarios**: SC-007, SC-008

Cada tarjeta DEBE conservar su retrato servido por `<Image>` de `astro:assets`
con `width`/`height`/`loading="lazy"`/`sizes` y `alt` descriptivo, sin `<img>`
nativo escrito a mano. Ningún binario de `src/assets/team/` DEBE ser modificado,
restaurado, eliminado ni sometido a checkout por el agente; este change solo
toca código (`src/pages/index.astro`) y el test nuevo.

## REQ-006: Semántica y suite del proyecto en verde

**Prioridad**: media | **Escenarios**: SC-005, SC-009

La sección DEBE mantener su estructura semántica (`<section id="equipo">`,
`<article>` por integrante, `<h3>` para el nombre) y su animación `Reveal` con
`variant="fade-up"`. `npm run build`, `npm run lint` y `npm test` DEBEN terminar
sin errores, y el resto de la home NO DEBE cambiar.
