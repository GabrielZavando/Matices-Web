# Propuesta de Cambio: Carrusel Infinito de Logotipos Institucionales (`CompanyLogos`)

Esta propuesta describe el diseño y la justificación técnica para transformar el componente estático `<CompanyLogos />` de **Matices Consultoría Integral** en un carrusel interactivo horizontal de desplazamiento infinito. La solución se implementa mediante CSS nativo y Tailwind CSS v4, optimizando el rendimiento mediante hardware acceleration y garantizando la accesibilidad semántica.

---

## 1. Justificación Arquitectónica

El diseño original utiliza una cuadrícula (`grid`) estática que, en dispositivos móviles, tiende a extenderse verticalmente de manera excesiva, consumiendo valioso espacio visual (pantalla útil o "above the fold"). Al convertir este módulo en un **carrusel horizontal infinito**, logramos comprimir la altura del componente a una sola fila en todas las resoluciones y, simultáneamente, generamos una experiencia dinámica de "prueba social activa" de alto impacto estético.

### Alternativas Consideradas y Descartadas

*   **❌ Swiper.js / Keen-Slider (Librerías Externas):** Descartadas de inmediato debido a que inyectan scripts y estilos adicionales pesados en el bundle del cliente, violando el límite estricto de **$0 USD TCO** y comprometiendo el rendimiento móvil (RNF1).
*   **❌ JavaScript-driven Interval / Framer Motion:** Descartados por requerir hidratación excesiva en el lado del cliente. Toda animación cíclica lineal puede y debe resolverse de forma nativa mediante las capacidades declarativas de **CSS Animations**.

---

## 2. Alineación con Requerimientos No Funcionales (RNF)

| Requerimiento | Estrategia de Implementación | Impacto en Calidad |
| :--- | :--- | :--- |
| **RNF1: Rendimiento Móvil y Velocidad** | - Uso estricto de `translate3d` para mover el track, delegando el renderizado a la GPU.<br>- Declaración de `will-change: transform` para optimizar capas antes de la animación.<br>- Conservación de la carga diferida (`loading="lazy"`) en componentes `<Image />` de Astro. | Carga instantánea, animaciones fluidas a 60 FPS estables y nula penalización de bundle. |
| **RNF2: Responsividad Rigurosa** | - Uso de **Container Queries (CQ)** mediante la unidad `cqw` para calcular anchos exactos en base al contenedor padre.<br>- Distribución matemática exacta por pantalla:<br>&nbsp;&nbsp;• *Móvil (<640px):* Exactamente 2 logotipos.<br>&nbsp;&nbsp;• *Tablet (640px - 1024px):* Exactamente 4 logotipos.<br>&nbsp;&nbsp;• *Desktop (>1024px):* Exactamente 5 logotipos. | Eliminación de cortes visuales erráticos. Control absoluto sobre el espacio visible. |
| **RNF3: Accesibilidad y SEO Semántico** | - Preservación de la etiqueta de sección principal `<section>` con su respectivo `h2` descriptivo oculto o visible.<br>- Conservación de los atributos `alt` descriptivos originales de cada logotipo en el mapeo de imágenes. | Perfecta indexación por motores de búsqueda y compatibilidad con lectores de pantalla. |

---

## 3. Comportamiento y Micro-interacciones

La lógica de interacción se define con un enfoque de CSS declarativo puro:

1.  **Desplazamiento Continuo (Marquee):** Un bucle infinito de derecha a izquierda con velocidad constante y elegante.
2.  **Pausa Inteligente (Hover):** Al pasar el cursor sobre cualquier parte del carrusel, la animación de todo el track se pausa de manera instantánea pero fluida mediante `animation-play-state: paused`.
3.  **Foco Cromático e Impacto 3D:** Cada logotipo individual se muestra por defecto en escala de grises con opacidad reducida (`grayscale opacity-70`). Al hacer hover sobre su contenedor:
    *   Se apaga el filtro de grises (`grayscale-0`) y se eleva la opacidad a `opacity-100` para revelar sus colores corporativos originales de manera vívida.
    *   Se aplica una transformación tridimensional `scale3d(1.08, 1.08, 1)` para elevar sutilmente el logotipo sobre el plano de la pantalla, simulando profundidad y modernidad orgánica.
