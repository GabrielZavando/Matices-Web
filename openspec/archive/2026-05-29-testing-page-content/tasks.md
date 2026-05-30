# Plan de Trabajo: Contenido Central de Testing y Diagnóstico

Este plan detalla las tareas secuenciales y granulares necesarias para implementar la sección de contenido de Testing, respetando los estándares de diseño y rendimiento técnico. Ninguna tarea supera las 2 horas de duración.

---

## Fase 1: Componentes Globales e Infraestructura de Pruebas
Tareas de creación y validación de componentes modulares y reutilizables.

- [x] **Tarea 1.1: Crear Componente Reutilizable de Galería de Evidencia**
  - **Descripción:** Desarrollar el archivo `src/components/ui/EvidenceGallery.astro`. Este componente debe leer dinámicamente las imágenes de `src/assets/gallery/*.{jpeg,jpg,png,webp}` mediante `import.meta.glob`, organizarlas en un arreglo y renderizarlas en un mosaico denso (estilo *masonry*) usando clases puras de Tailwind v4 (`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6`). Cada imagen debe emplear el componente `<Image />` de Astro con `loading="lazy"`, `decoding="async"`, `alt` descriptivo y clases de diseño `rounded-2xl border-4 border-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300`.
  - **Duración estimada:** 1.5 horas.

- [x] **Tarea 1.2: Generar Suite de Pruebas Unitarias para la Galería de Evidencia**
  - **Descripción:** Crear el archivo de pruebas `src/components/ui/EvidenceGallery.spec.ts` utilizando Vitest. Escribir tests unitarios siguiendo el patrón AAA (Arrange, Act, Assert) para verificar:
    - Que el componente intente cargar imágenes del directorio de galería.
    - Que la estructura base de contenedores semánticos se renderice correctamente.
    - Que se maneje de forma segura un escenario donde no se encuentren imágenes.
  - **Duración estimada:** 1.5 horas.

---

## Fase 2: Enrutamiento y Navegación
Verificaciones del flujo de navegación y enlaces.

- [x] **Tarea 2.1: Validar Rutas y Enlaces del Menú de Navegación**
  - **Descripción:** Revisar y confirmar que el enlace `/testing` esté correctamente integrado en el menú principal (`src/components/global/Header.astro`) y que el estado activo se asigne correctamente al navegar a dicha sección.
  - **Duración estimada:** 0.5 horas.

---

## Fase 3: Páginas y Contenido Central
Implementación directa de la interfaz y bloques secuenciales en el cuerpo de la página.

- [x] **Tarea 3.1: Desarrollar Sección de Evaluación Psicométrica y los 4 Tipos de Test**
  - **Descripción:** Agregar la sección de cabecera informativa de Testing en `src/pages/testing.astro` justo debajo del Hero existente. Crear un grid responsivo (`grid grid-cols-1 md:grid-cols-2 gap-8`) para presentar de forma premium los 4 tipos de test:
    1. *Psicométricos* (Evaluación de aptitudes cognitivas e inteligencia).
    2. *Personalidad* (Encaje conductual y estilos de liderazgo B2B).
    3. *Neuropsicológicos* (Atención, memoria y funciones ejecutivas aplicadas).
    4. *Gráficos e Interpretación con IA* (Proyecciones y análisis de datos optimizados con inteligencia artificial).
    Cada tarjeta debe usar la tipografía `font-heading` para títulos, `font-sans` para texto secundario, bordes suaves y fondo `bg-crema-calido`.
  - **Duración estimada:** 2 horas.

- [x] **Tarea 3.2: Desarrollar Sección "Aplicaciones del Testing" y Soporte de Rigor Científico**
  - **Descripción:** Implementar la sección secundaria detallando las aplicaciones empresariales del testing (Selección, Promoción interna, Desarrollo de equipos, Detección de necesidades de formación). Maquetar en formato de dos columnas:
    - Columna izquierda: Título y texto explicativo del "Rigor Científico y Tecnología Avanzada" (soporte teórico y metodológico de Matices).
    - Columna derecha: Viñetas de verificación (checks) animadas con color verde lima (`text-verde-lima`) y fondo suave.
  - **Duración estimada:** 1.5 horas.

- [x] **Tarea 3.3: Integrar Prueba Social e Importar Galería de Evidencia**
  - **Descripción:**
    - Insertar el componente preexistente `<CompanyLogos />` inmediatamente después del bloque de aplicaciones.
    - Importar el nuevo componente `<EvidenceGallery />` y colocarlo al final del flujo de actividad, agregando un bloque de títulos introductorios al mosaico.
  - **Duración estimada:** 1 hora.

- [x] **Tarea 3.4: Construir Banner de Conversión Contextual (Cierre de Empatía)**
  - **Descripción:** Crear el bloque de cierre unificado "¿Listo para transformar tu ecosistema laboral?" con fondo `#2e3131` (o color compatible del tema), textos de empatía B2B en crema cálido y botones de acción comercial bien destacados:
    - Botón Principal: "Agendar Consultoría" (enlace directo hacia el formulario B2B/contacto).
    - Botón Secundario: "Descargar Dossier de Servicios" (enlace ancla o descarga).
  - **Duración estimada:** 1.5 horas.

---

## Fase 4: Aseguramiento de Calidad y Validación Técnica
Verificaciones automáticas y compilación final.

- [x] **Tarea 4.1: Ejecutar Suite de Tests Unitarios**
  - **Descripción:** Ejecutar las pruebas unitarias del proyecto mediante `pnpm test` (o el script configurado para Vitest) para asegurar que el nuevo test `EvidenceGallery.spec.ts` y los tests existentes pasen exitosamente sin errores de entorno.
  - **Duración estimada:** 0.5 horas.

- [x] **Tarea 4.2: Validar Compilación Estática (Build Check)**
  - **Descripción:** Ejecutar el comando de construcción en producción `pnpm build` para asegurar la compilación estática (SSG) de todas las páginas, verificar que las imágenes se compriman y optimicen adecuadamente sin generar excepciones o variables indefinidas en tiempo de compilación.
  - **Duración estimada:** 0.5 horas.
