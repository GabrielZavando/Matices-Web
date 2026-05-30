# Proposal: Rediseño B2B Matices (SSG)

## 1. Arquitectura Técnica (SSG)
La solución se basará en Astro v4.x+ operando estrictamente en modo SSG (Static Site Generation).
Esto permite generar HTML estático en tiempo de construcción, eliminando la necesidad de un servidor de Node.js en producción. 

### Justificación:
- **TCO de $0 USD:** El sitio generado puede ser alojado en Hostinger (o plataformas como Cloudflare Pages/Vercel) utilizando el plan compartido o gratuito.
- **Rendimiento:** El HTML pre-renderizado garantiza un Time to First Byte (TTFB) y First Contentful Paint (FCP) extremadamente rápidos.

## 2. Cumplimiento de Requerimientos No Funcionales (RNFs)
- **RNF1 (Velocidad Móvil <2s):** SSG, combinado con la directiva estricta de "cero JavaScript en cliente" para secciones que no lo requieran (gracias a la arquitectura Islands de Astro) garantizará métricas perfectas en PageSpeed Insights.
- **RNF2 (Colapso Responsivo):** Desarrollo basado en "Mobile-First" utilizando las clases base de Tailwind (por ejemplo, `p-4 md:p-8`), garantizando adaptabilidad fluida sin layouts quebrados en escritorio.
- **RNF3 (SEO Semántico):** Se integrará un `<Layout />` global con atributos de meta-tags consistentes y etiquetas HTML5 estandarizadas (`<main>`, `<article>`, `<section>`, `<h1>`).

## 3. Manejo de Formularios Backend (Serverless)
Los formularios de venta consultiva estarán desacoplados de la UI mediante **Formspree** o **Formbold**, capturando la data POST estáticamente sin servidor, garantizando seguridad y cero fricción en el despliegue SSG.
