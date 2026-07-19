# Diseño: Reveal al Scroll en Secciones y Tarjetas (`anim-sections`)

Reutiliza `<Reveal>` (`anim-foundation`). Se aplican las clases `reveal--fade-up`
(predeterminado) con `delay` por índice para el stagger.

## Patrones de aplicación

### Encabezado de sección
Envolver el bloque de título + subtítulo en `<Reveal as="div" variant="fade-up">`:
```astro
<Reveal as="div" variant="fade-up" class="text-center space-y-4 max-w-2xl mx-auto">
  <h2 class="font-heading ...">Nuestros Servicios</h2>
  <p class="font-sans ...">Soluciones estratégicas ...</p>
</Reveal>
```

### Grilla de tarjetas (mapeadas)
Dentro de `.map((item, i) => ...)`, envolver la tarjeta y calcular `delay`:
```astro
{team.map((member, i) => (
  <Reveal as="article" variant="fade-up" delay={i * 80} class="bg-crema-calido ...">
    ...
  </Reveal>
))}
```

### Lista "Áreas de Especialización" (`index.astro`, 7 `<li>` estáticos)
Envolver cada `<li>` en `<Reveal as="li" variant="fade-up" delay={i * 80}>` con
`i` manual (0, 80, 160, … 480).

### Componentes reutilizables
* `CompanyLogos.astro`: envolver el bloque de título (`h2` + `p`) en `<Reveal>`.
* `EvidenceGallery.astro`: envolver el bloque de título de la galería en
  `<Reveal>`.

## Elementos por página

* **`index.astro`**: header "Nuestros Servicios"; 6 tarjetas de servicio; header
  "Áreas de Especialización" + 7 `<li>`; header "Nuestro Equipo" + 4 tarjetas de
  equipo; headers de `CompanyLogos` y `EvidenceGallery`.
* **`talento.astro`**: header "Asesoría de Gestión del Talento"; subbloque
  Scouthem; header "Servicios de Talento" + 5 tarjetas; `CompanyLogos`.
* **`psicologia.astro`**: 3 tarjetas de servicios; secciones CTA (badges/stats).
* **`testing.astro`**, **`id.astro`**, **`formacion.astro`**: sus encabezados de
  sección y tarjetas/bloques correspondientes.
* **`contacto.astro`**: los reveals de formulario se cubren en `anim-contact`;
  aquí solo se considera el hero (en `anim-hero`).

## Stagger máximo

Para evitar delays excesivos, limitar `delay` a `≤ 480ms` (≈6 elementos). En
grillas grandes, reiniciar el contador por fila o usar `delay = (i % 3) * 80`.

## Sin nuevos artefactos

No se crean tokens, keyframes ni helpers: todo proviene de `anim-foundation`.
