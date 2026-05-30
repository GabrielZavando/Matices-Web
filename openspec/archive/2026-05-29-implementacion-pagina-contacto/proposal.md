# Propuesta Técnica: Página de Contacto y Calificación B2B

Este documento describe la propuesta arquitectónica y técnica para la creación e implementación de la página de contacto de **Matices Consultoría Integral** en `src/pages/contacto.astro`.

## 1. Justificación Arquitectónica

La página de contacto albergará exclusivamente el formulario de captura y calificación B2B de venta consultiva de Matices. Para garantizar un rendimiento óptimo, la solución se implementa mediante **Static Site Generation (SSG)** con Astro v4.x+, eliminando cualquier framework de JS en el cliente (como React o Vue) y delegando el procesamiento de datos directamente a la plataforma **Formbold** mediante atributos nativos de HTML.

### Mitigación de Spam (Riesgo 1 - Honeypot)
Para evitar el spam de bots sin degradar la experiencia de usuario (evitando captchas visuales complejos), se incorpora un campo **Honeypot** oculto mediante CSS. Los bots completan automáticamente este campo invisible, permitiendo que Formbold o el procesamiento del lado del servidor descarten la petición, mientras que los usuarios legítimos no lo verán ni lo completarán.

---

## 2. Alineación con Requisitos No Funcionales (RNFs)

### RNF1: Rendimiento Extremo de Carga (Speed)
* **Cero Scripts de Cliente**: No se importan frameworks SPA ni librerías pesadas de validación. La validación se gestiona de forma nativa utilizando los atributos HTML5 (`required`, `type="email"`, `pattern`, etc.).
* **Generación Estática (SSG)**: La página se pre-renderiza al 100% durante el proceso de build, permitiendo tiempos de carga instantáneos e indexación directa.
* **Procesamiento de Imágenes Nativo**: En caso de usar elementos gráficos, se usará estrictamente el componente `<Image />` de `astro:assets` para servir formatos optimizados de próxima generación (WebP/AVIF).

### RNF2: Diseño Responsivo Adaptable (Responsive)
* **Layout Fluido Mobile-First**: Por defecto, los contenedores y los bloques del formulario se estructuran en una sola columna (`grid-cols-1`) con espaciados y paddings óptimos para pantallas táctiles.
* **Escalado Controlado**: Se aplican selectivamente los modificadores responsivos de Tailwind CSS (`md:`, `lg:`) para expandir el formulario a rejillas de múltiples columnas en pantallas de escritorio.
* **Área de Interacción Táctil**: Los campos de entrada (`input`, `select`), checkboxes y radio buttons respetan dimensiones de interacción mínimas (44px de altura) para facilitar la usabilidad móvil.

### RNF3: SEO Técnico y Accesibilidad Semántica (SEO & A11y)
* **Marcado HTML5 Semántico**: El formulario se organiza con `<main>`, `<section>`, `<form>`, `<fieldset>`, `<legend>`, `<label>` e `<input>`, asegurando que los lectores de pantalla naveguen la estructura de manera lógica.
* **Asociación Explícita de Labels**: Cada campo tiene un `id` único perfectamente emparejado con el atributo `for` de su respectiva etiqueta `<label>`.
* **Metadatos Descriptivos**: Se inyectan títulos y metadescripciones de SEO optimizados únicos a través del layout base `Layout.astro`.

---

## 3. Flujo de Procesamiento y Destino de Datos

1. **Método de Envío**: `POST` a través de Formbold.
2. **Atributo Action**: Se prepara un string vacío o una variable de entorno placeholder (`import.meta.env.PUBLIC_FORMBOLD_ENDPOINT` o similar).
3. **Casilla de Destino**: Estructurado para que los envíos finalicen en la casilla corporativa `contacto@maticesconsultora.cl`.
