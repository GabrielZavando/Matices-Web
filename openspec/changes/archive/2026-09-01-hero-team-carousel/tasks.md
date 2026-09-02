# Plan de Tareas: Carrusel de fotos del equipo en el hero (`hero-team-carousel`)

Cumple SDD: specs antes de código, TDD (test fallido primero), sin `any`.

## 1. Test TDD (fallido primero)

- [x] 1.1 Crear `src/lib/heroCarousel.spec.ts` (patrón de `ambientAnimations.spec.ts`):
      - `dist/index.html` contiene al menos 2 fuentes AVIF distintas derivadas de `team.jpeg`
        y `team-one.jpg` en el hero (track con 3 slides: A-B-A).
      - El contenedor del hero tiene máscara `overflow-hidden`.
      - El CSS compilado contiene el keyframe del carrusel, la clase del track
        con `width: 300%`, y la duración `11s` (ciclo 5 s hold + 0.5 s slide).
      - El CSS de build desactiva la animación bajo `prefers-reduced-motion: reduce`.
- [x] 1.2 Ejecutar `pnpm test src/lib/heroCarousel.spec.ts` y confirmar que FALLA
      (rojo) porque el build aún no tiene el carrusel.

## 2. Implementación

- [x] 2.1 Frontmatter de `src/pages/index.astro`:
      - Quitar `import heroBusiness from '../assets/hero-business.webp';`
      - Añadir `import teamPhoto from '../assets/team/team.jpeg';` e
        `import teamPhotoTwo from '../assets/team/team-one.jpg';`
- [x] 2.2 Reemplazar el `<Image src={heroBusiness}>` del hero (líneas 135-146)
      por el track A-B-A con 3 slides:
      ```
      <div class="hero-carousel-track">
        <Image src={teamPhoto} ... class="hero-carousel-slide" />        <!-- A -->
        <Image src={teamPhotoTwo} ... class="hero-carousel-slide" />     <!-- B -->
        <Image src={teamPhoto} ... class="hero-carousel-slide" />        <!-- A (copia) -->
      </div>
      ```
      La tercera imagen (copia de A) permite el bucle infinito sin salto visible.
      Conservando `width={640} height={800} format="avif" loading="eager"`,
      `sizes` y `object-cover`; manteniendo la máscara `aspect-[4/5]
      rounded-[3rem] overflow-hidden` y el `Reveal scale-in delay={120}` y el
      badge "98% Match" intactos.
- [x] 2.3 Añadir `<style>` scoped al final de `src/pages/index.astro` (no existe
      hoy): `.hero-carousel-track` (flex, `width: 300%`, `height: 100%`,
      `will-change: transform`, animación 11s con `ease-in-out`), `.hero-carousel-slide`
      (`width: 33.3333%`, `flex-shrink: 0`, `object-fit: cover`), keyframes con:
      - 0%→45.45%: A visible (5 s)
      - 45.45%→50%: slide a B (0.5 s)
      - 50%→95.45%: B visible (5 s)
      - 95.45%→100%: slide a la copia A (0.5 s, sin salto al reiniciar)
      Regla `@media (prefers-reduced-motion: reduce) { animation: none; }`.

## 3. Verificación

- [x] 3.1 `pnpm build` exitoso; `dist/index.html` contiene el carrusel y
      `dist/_astro/*.css` el keyframe y la guarda de reduced motion.
- [x] 3.2 `pnpm test` pasa (incluye el nuevo `heroCarousel.spec.ts` y los
      existentes `sections`, `ambientAnimations`, `animations`).
- [x] 3.3 `pnpm lint` (`astro check`) sin nuevos errores.
- [x] 3.4 Inspección visual en dev/preview: primera foto visible al cargar,
      cambio suave cada 5 s, bucle sin salto, una sola imagen a la vez, y con
      `prefers-reduced-motion` la primera foto estática.
- [x] 3.5 `openspec validate hero-team-carousel` pasa.