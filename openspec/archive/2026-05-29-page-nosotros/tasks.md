# Listado de Tareas: Página "Nosotros" - Matices

Este checklist detalla los pasos secuenciales para implementar la sección institucional bajo la arquitectura estática de Astro y las directivas estrictas de diseño.

---

- [x] **Task 1: Routing & Base Document Structure (1h)**
  - Crear el archivo de página física en `src/pages/nosotros.astro`.
  - Importar `Layout.astro`, `Header.astro`, `Footer.astro` y el módulo `{ Image }` de `astro:assets`.
  - Definir la estructura base de componentes envolventes y setear los Props del Layout (título, descripción detallada para indexación SEO y ogImage).
  - Validar ruteo local navegando a `/nosotros`.

- [x] **Task 2: Institutional Hero Section Implementation (1.5h)**
  - Construir maquetado semántico con `<section>` y grilla responsiva (`grid-cols-1 lg:grid-cols-12`).
  - Colocar el bloque textual de propuesta de valor a la izquierda (`lg:col-span-7`), priorizándolo arriba en móviles.
  - Implementar botones de conversión B2B principal ("Solicitar Asesoría") y secundario ("Conoce Nuestra Metodología" apuntando a `#pilares`).
  - Agregar imagen del Hero local optimizada mediante `<Image />` con dimensiones restringidas y máscara curvada orgánica (`rounded-[3rem]`).

- [x] **Task 3: History & Evolution Section (1.5h)**
  - Diseñar bloque semántico con `<section>` y `<article>` para la narrativa histórica de psicología y consultoría.
  - Crear una composición asimétrica (side-by-side) de dos columnas en escritorio (`lg:grid-cols-2`), que colapse verticalmente en smartphones.
  - Utilizar un fondo suave crema teñido (`bg-crema-calido/50`) para dar dinamismo a la lectura.
  - Mapear trayectoria internacional e hitos con tarjetas de relieve sutil y bordes asimétricos Flat 2.0.

- [x] **Task 4: Pilares Metodológicos Section (1.5h)**
  - Añadir ID `pilares` al contenedor para soporte de scroll suave nativo.
  - Crear una grilla de tres columnas (`grid-cols-1 md:grid-cols-3`) de pilares metodológicos: Rigor Científico, Bienestar Integral y Excelencia Ejecutiva.
  - Estructurar listas con marcadores tipo "leaf" (hojas cruzadas) codificados en SVG limpio (cero imágenes tradicionales).
  - Diseñar tarjetas tipo contenedor suave con un radio curvado de pétalo (`rounded-[2rem]`) y sombreado teñido con el color secundario de la marca.

- [x] **Task 5: Contextual B2B Conversion Block & Link Sync (1h)**
  - Implementar bloque final de empatía en color verde bosque profundo (`bg-verde-bosque`) con texto claro (`text-crema-calido`).
  - Vincular botones de conversión directamente a la página principal de contacto (`/contacto` o `/#contacto`).
  - Sincronizar enlaces y verificar la fluidez de navegación entre la página principal y la sección Nosotros.

- [x] **Task 6: Automated Verification & Quality Gate Audit (1h)**
  - Ejecutar el compilador y validador de tipos en segundo plano: `pnpm exec astro check`.
  - Asegurar 0 errores sintácticos, 0 advertencias y 0 hints de TypeScript.
  - Auditar la ausencia absoluta de etiquetas de imágenes crudas `<img>` y confirmar que todos los `alt` estén redactados detalladamente en español.
