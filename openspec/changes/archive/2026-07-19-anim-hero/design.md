# Diseño: Entrada Animada del Hero (`anim-hero`)

Reutiliza el componente `<Reveal>` (`src/components/ui/Reveal.astro`) y el
sistema de `anim-foundation`. No se añade nuevo CSS ni JS: solo se envuelven
elementos existentes.

## Patrón de entrada escalonada

Para cada hero se aplica el siguiente esquema de `delay` (ms), todos con
`variant="fade-up"` salvo la imagen:

| Elemento | `variant` | `delay` |
| :--- | :--- | :--- |
| Badge / eyebrow (`span`) | `fade-up` | `0` |
| `h1` | `fade-up` | `80` |
| Párrafo(s) `p` | `fade-up` | `160` |
| Bloque de CTA (`div` o `<a>`) | `fade-up` | `240` |
| Imagen (`<Image>` dentro de `<Reveal as="div">`) | `scale-in` | `120` |
| Badge flotante (glassmorphism) | `fade-up` | `320` |

```astro
<Reveal as="span" variant="fade-up" delay={0} class="inline-block ...">Talento & Selección</Reveal>
<Reveal as="h1" variant="fade-up" delay={80} class="font-heading ...">...</Reveal>
<Reveal as="p" variant="fade-up" delay={160} class="font-sans ...">...</Reveal>
<Reveal as="div" variant="fade-up" delay={240} class="flex ...">
  <a href="/contacto" ...>Comenzar Proceso</a>
</Reveal>
<Reveal as="div" variant="scale-in" delay={120} class="lg:col-span-5 relative ...">
  <Image ... /> <!-- mantiene loading="eager" -->
  <Reveal as="div" variant="fade-up" delay={320} class="absolute ... hidden sm:block">98% Match</Reveal>
</Reveal>
```

## Notas de implementación por página

* **`index.astro`**: hero con badge "Talento & Evolución B2B", `h1`
  "Reclutamiento y Selección Estratégica", dos `p`, CTA (`div.flex`), imagen
  `hero-business` + badge "98% Match".
* **`talento.astro`**: badge "Talento & Selección Estratégica", `h1` "Gestión del
  Talento", un `p`, CTA, imagen `directora` + badge "98%".
* **`psicologia.astro`**: badge "Bienestar & Salud Mental", `h1` "Psicología
  Laboral Aplicada", un `p`, CTA, imagen `directoraMatices` + badge "+15 Años".
* **`testing.astro`**, **`id.astro`**, **`formacion.astro`**: misma estructura
  (badge → `h1` → `p` → CTA → imagen [+ badge en algunos]). Aplicar el mismo
  esquema de delays.

## Consideración de LCP

La imagen del hero usa `loading="eager"` y se envuelve con `scale-in` +
`delay={120}` (revelado casi inmediato). Si una auditoría de Lighthouse mostrara
regresión de LCP inaceptable, se puede dejar la imagen sin `<Reveal>` (visible
desde el primer paint) y animar solo el texto. Esta decisión se documenta aquí
como mitigación.

## Sin nuevos artefactos

No se crean tokens, keyframes ni helpers nuevos; todo proviene de
`anim-foundation`. La documentación de `docs/DESIGN.md` (sección *Motion*) ya
cubre el uso de `<Reveal>`.
