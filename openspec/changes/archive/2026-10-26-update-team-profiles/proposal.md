# Propuesta de Cambio: Orden, LinkedIn y biografías del equipo

> **Ticket**: TICKET-006 (provisional; no se recibió ID explícito) | **Tag**: frontend | **Change**: `update-team-profiles`

## Why

La sección "Nuestro Equipo" de la home (`src/pages/index.astro`) debe reflejar el
orden y los perfiles profesionales acordados con la clienta. Hoy el orden es
María José, Catalina, Cristian y Lorenzo; se requiere María José, Cristian,
Catalina y Lorenzo. Además, cada integrante necesita un enlace visible a su
perfil de LinkedIn y una biografía actualizada que incluya sus estudios de
magíster. Los textos actuales están desactualizados y no permiten verificar la
trayectoria académica de cada consultor. El cambio es estático (Astro SSG +
Tailwind v4), sin backend ni dependencias nuevas: el ícono de LinkedIn se
resolverá con SVG inline reutilizando el trazo ya presente en
`src/components/global/Footer.astro`, evitando el PNG externo de pngtree por
licencia y hotlinking.

## What Changes

- **Orden**: reordenar el arreglo `team` de `src/pages/index.astro` a
  María José → Cristian → Catalina → Lorenzo. El orden del DOM (y por tanto el
  orden visual de izquierda a derecha en `lg:grid-cols-4`) debe respetarlo.
- **LinkedIn**: añadir a cada integrante un enlace junto a su nombre, con SVG
  inline (`aria-hidden="true"`), `href` exacto al perfil, `target="_blank"`,
  `rel="noopener noreferrer"` y nombre accesible (`aria-label` o texto
  `.sr-only`) que incluya el nombre de la persona. Prohibido usar el PNG externo
  de pngtree o cualquier `<img>` para el ícono.
- **Biografías**: reemplazar `description` por el texto literal entregado para
  cada persona (se preservan tildes, paréntesis, mayúsculas y puntuación). Se
  mantienen los `role` actuales.
- **Tests**: nuevo contrato `src/lib/homeTeamSection.spec.ts` (Vitest sobre
  `dist/index.html`, patrón de `src/lib/homeScouthemSection.spec.ts`) que
  verifica orden, enlaces, íconos inline, biografías exactas y contrato de
  imágenes.
- **OpenSpec**: nueva capability `home-team-section` (ADDED), porque la sección
  de equipo no tenía spec propia.
- **Fuera de alcance**: los binarios de imagen del equipo. El humano ya
  actualizó `src/assets/team/*` en el working tree (borrados `cata.jpg`,
  `cristian.jpg`, `lorenzo.traverso.jpg`; nuevos `catalina.jpeg`,
  `cristian.jpeg`, `lorenzo.jpeg`) y `src/pages/index.astro` ya referencia los
  nuevos archivos. Este change NO debe modificar, restaurar ni eliminar esos
  binarios ni hacer checkout de ellos. Tampoco toca infraestructura, CI/CD,
  dependencias ni otras secciones del sitio.

## Impacto

- Archivos: 1 edición en `src/pages/index.astro`, 1 test nuevo, artefactos
  OpenSpec. Sin dependencias nuevas, sin migraciones, sin cambios de API.
- Riesgo bajo: contenido estático; el único riesgo es que el test de contrato
  detecte divergencias de copy y obligue a corregir el texto antes de cerrar.
- El build sigue usando `<Image>` de `astro:assets` para los retratos; el ícono
  de LinkedIn es SVG inline, no una imagen.
