# Escenarios: update-team-profiles

> Change: TICKET-006 (provisional) — Orden, enlaces de LinkedIn y biografías de
> la sección "Nuestro Equipo". Frontend puro (Astro + Tailwind v4): no hay
> entidades de data model ni endpoints de API involucrados. El ticket no trajo
> `openspec/tickets/TICKET-006-enriched.md`, por lo que los escenarios se
> derivan del título y de los requerimientos entregados. Los binarios de imagen
> quedan explícitamente fuera de alcance.

### SC-001: Orden visual estricto de izquierda a derecha

- **Given** la home compilada (`dist/index.html`) con la sección `#equipo`
- **When** se leen las tarjetas de integrantes en el orden del DOM
- **Then** el orden es María José Jimenez, Cristian Nova, Catalina Aguilera,
  Lorenzo Traverso
- **And** en `lg:grid-cols-4` ese orden del DOM se traduce en el orden visual
  de izquierda a derecha

### SC-002: Cada integrante tiene su enlace de LinkedIn junto al nombre

- **Given** la tarjeta de un integrante de la sección `#equipo`
- **When** se inspecciona el bloque del nombre
- **Then** existe exactamente un enlace a LinkedIn asociado a esa persona
- **And** el `href` coincide exactamente con el perfil entregado:
  - María José: `https://www.linkedin.com/in/mar%C3%ADa-jos%C3%A9-jim%C3%A9nez-520a8823/`
  - Cristian: `https://www.linkedin.com/in/cristiannova/`
  - Catalina: `https://www.linkedin.com/in/catalinaaguileradorrhhconsultoriasotalentobienestargestionorganizacionalreclutamientoyseleccion/`
  - Lorenzo: `https://www.linkedin.com/in/lorenzotraverso/`

### SC-003: Los enlaces externos son seguros y abren en pestaña nueva

- **Given** un enlace de LinkedIn de cualquier integrante
- **When** se inspeccionan sus atributos
- **Then** tiene `target="_blank"`
- **And** su `rel` incluye `noopener` y `noreferrer`

### SC-004: El ícono es SVG inline y no usa el PNG externo

- **Given** el enlace de LinkedIn renderizado
- **When** se inspecciona su contenido
- **Then** contiene un `<svg>` inline con `aria-hidden="true"` como ícono
  decorativo
- **And** no contiene `<img>`, ni referencias a `pngtree`, ni URLs externas de
  imagen
- **And** el `href` del enlace es el perfil de la persona, no el asset del ícono

### SC-005: Nombre accesible del enlace

- **Given** un enlace de LinkedIn de cualquier integrante
- **When** se calcula su nombre accesible
- **Then** incluye el nombre de la persona (por `aria-label` o texto
  `.sr-only`), de modo que un lector de pantalla distingue los cuatro enlaces
- **And** el ícono decorativo no aporta texto redundante al nombre accesible

### SC-006: Biografías reemplazadas por el texto literal entregado

- **Given** la tarjeta de un integrante
- **When** se normaliza el espacio en blanco y se lee su descripción
- **Then** es exactamente el texto entregado para esa persona:
  - María José: `Psicóloga y Magister en Neurociencias (c) (Universidad internacional de la Rioja), con más de 20 años de experiencia asesorando organizaciones en materias de gestión del talento, ex Gerente General de editora multinacional de test en Chile, directora de Matices Consultora.`
  - Cristian: `Psicólogo laboral y Magíster en Políticas Sociales, Trabajo y Bienestar (Universidad Autónoma de Barcelona), con trayectoria en estudios territoriales, ciencia de datos y gestión de proyectos. Ha trabajado en procesos de reclutamiento y selección de personal en diversas organizaciones, contando con experiencia en investigación académica.`
  - Catalina: `Psicóloga Organizacional y Gestora de Inclusión, con Magíster en Psicología de las Organizaciones (Universidad Adolfo Ibáñez). Más de 15 años de experiencia en el área de gestión de personas, desarrollo organizacional y salud ocupacional.`
  - Lorenzo: `Ingeniero Comercial, con Magíster en Innovación y Emprendimiento (Universidad Adolfo Ibáñez), con más de 6 años de experiencia en áreas de desarrollo comercial, análisis de mercado, optimización de procesos y gestión de canales digitales.`
- **And** se preservan tildes, paréntesis, mayúsculas y puntuación
- **And** no queda el texto anterior de ninguna biografía

### SC-007: Los retratos siguen servidos por astro:assets

- **Given** la sección `#equipo` renderizada
- **When** se inspeccionan las imágenes de las tarjetas
- **Then** cada tarjeta conserva exactamente una imagen servida por `<Image>`
  de `astro:assets` (serializada como `<img>` en el build)
- **And** mantiene `width`, `height`, `loading="lazy"`, `sizes` y `alt`
  descriptivo con el nombre de la persona
- **And** no se introduce ningún `<img>` nativo escrito a mano

### SC-008: Los binarios de imagen no se modifican en este change

- **Given** el working tree con los retratos actualizados manualmente por el
  humano (`src/assets/team/catalina.jpeg`, `cristian.jpeg`, `lorenzo.jpeg`;
  bajas de `cata.jpg`, `cristian.jpg`, `lorenzo.traverso.jpg`)
- **When** se implementa y verifica el change
- **Then** ningún binario de `src/assets/team/` es modificado, restaurado,
  eliminado ni sometido a checkout por el agente
- **And** el único archivo de producción tocado es `src/pages/index.astro`
  (más el test nuevo)

### SC-009: Build, lint y suite en verde

- **Given** el change implementado
- **When** se ejecutan `npm run build`, `npm run lint` y `npm test`
- **Then** terminan sin errores
- **And** `src/lib/sections.spec.ts` sigue exigiendo ≥7 `reveal--fade-up` en
  `dist/index.html`
- **And** el resto de las secciones de la home no cambia
