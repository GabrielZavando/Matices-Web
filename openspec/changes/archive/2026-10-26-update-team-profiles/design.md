# Diseño: update-team-profiles

> Change: TICKET-006 (provisional) | Frontend estático (Astro SSG + Tailwind v4).

## 1. Alcance técnico

- Archivo de producción: `src/pages/index.astro` (frontmatter `team` + markup de
  la tarjeta).
- Test nuevo: `src/lib/homeTeamSection.spec.ts` (Vitest, lee
  `dist/index.html`).
- Sin componentes nuevos, sin dependencias, sin scripts de cliente, sin cambios
  en `src/assets/team/`.

## 2. Modelo de datos del equipo

```ts
type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: ImageMetadata;
  linkedin: string;
};

const team: TeamMember[] = [mariaJose, cristian, cata, lorenzo];
```

- Orden del arreglo = orden del DOM = orden visual (grid `lg:grid-cols-4`).
- `linkedin` contiene la URL exacta entregada por la clienta; se renderiza en
  el `href` sin transformaciones.
- `description` es el texto literal del ticket; no se interpola ni se reescribe.
- `role` se conserva tal como está hoy.

## 3. Markup de la tarjeta (delta)

```astro
<article class="...">
  <div class="...">  <!-- retrato: <Image> existente, sin cambios --> </div>
  <div class="flex items-center gap-2 mb-2">
    <h3 class="font-heading text-xl font-bold text-verde-bosque">
      {member.name}
    </h3>
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Perfil de LinkedIn de ${member.name}`}
      class="text-verde-lima hover:text-verde-bosque transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-lima"
    >
      <svg class="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <!-- mismo trazo de LinkedIn que src/components/global/Footer.astro -->
      </svg>
    </a>
  </div>
  <p class="... role ...">{member.role}</p>
  <p class="... description ...">{member.description}</p>
</article>
```

Decisiones:

- **SVG inline** en vez de una librería: el proyecto no tiene `astro-icon`,
  `lucide` ni similar instalado (`package.json`), y el trazo ya existe en el
  Footer. Evita una dependencia nueva y el PNG externo de pngtree.
- **`aria-label` con el nombre** distingue los cuatro enlaces para lectores de
  pantalla; el `<svg>` es decorativo (`aria-hidden="true"`), así que no duplica
  texto.
- **Contenedor flex** junto al `<h3>` mantiene el nombre y el ícono en la misma
  línea sin alterar el layout de la tarjeta ni el tamaño de la grilla.
- **`mb-2` se mueve al contenedor** para conservar el ritmo vertical actual
  entre nombre y rol.

## 4. Contrato de imágenes (sin cambios)

Cada tarjeta mantiene el `<Image>` actual de `astro:assets`:

- `src={member.image}` (los imports ya apuntan a los `.jpeg` actualizados por el
  humano).
- `alt={`Retrato profesional de ${member.name}`}`.
- `width={400}`, `height={300}`, `format="avif"`, `loading="lazy"` y `sizes`.
- Prohibido `<img>` nativo escrito a mano.

Los binarios `src/assets/team/*` no se tocan: el change solo edita código.

## 5. Test de contrato

`src/lib/homeTeamSection.spec.ts` parsea `dist/index.html` con `happy-dom`
(patrón de `homeScouthemSection.spec.ts`) y localiza `#equipo`:

1. Orden de `<article>` y nombres (SC-001).
2. Un enlace por tarjeta con `href` exacto (SC-002).
3. `target` + `rel` seguros (SC-003).
4. `<svg aria-hidden="true">` inline, sin `<img>`/`pngtree` (SC-004).
5. Nombre accesible incluye el nombre (SC-005).
6. Biografías exactas con whitespace normalizado (SC-006).
7. Contrato de `<Image>` por tarjeta (SC-007).
8. SC-008 (binarios) y SC-009 (suite) se verifican en la fase de verificación
   con `git status` y los comandos del proyecto.

## 6. Riesgos

- **Copy con tildes/parentesis**: el test compara texto normalizado; cualquier
  divergencia falla y obliga a corregir antes de cerrar.
- **Working tree con binarios del humano**: prohibido `git add -A`, `git
  restore` o `git checkout -- src/assets/team/*` durante `/apply`.
- **Regresión de layout**: el contenedor flex del nombre debe probarse en
  mobile (1 columna) y `lg` (4 columnas); el ícono no debe empujar el texto
  fuera de la tarjeta.
