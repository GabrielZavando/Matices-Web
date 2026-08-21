# Design: error-page-404

## Architecture

### File Structure
```
src/pages/404.astro          # Página principal de error 404
src/styles/global.css        # Nuevos tokens (glass-panel, blobs decorativos)
```

### Component Composition
The 404 page composes existing project components:
```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/global/Header.astro';
import Footer from '../components/global/Footer.astro';
import Reveal from '../components/ui/Reveal.astro';
---

<Layout 
  title="Página No Encontrada" 
  description="La página que buscas no está disponible o ha sido movida. Pero no te preocupes, estamos aquí para guiarte de vuelta hacia el crecimiento y el bienestar organizacional."
>
  <Header />
  <main class="flex-1 flex flex-col items-center justify-center py-20 px-4 md:px-16 relative overflow-hidden">
    
    <!-- Decorative Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-40">
      <div class="absolute top-[-10%] right-[-5%] w-96 h-96 bg-verde-bosque/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-azul-celeste/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </div>
    
    <!-- 404 Hero Section -->
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h1 class="font-display-lg text-display-lg text-verde-bosque mb-4 leading-none">404</h1>
      <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
        Parece que te has desviado del camino.
      </h2>
      <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">
        La página que buscas no está disponible o ha sido movida. Pero no te preocupes, estamos aquí para guiarte de vuelta hacia el crecimiento y el bienestar organizacional.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a class="bg-verde-bosque text-on-verde-bosque px-8 py-3 rounded-full font-label-md text-label-md hover:bg-verde-bosque-fixto transition-colors shadow-md hover:shadow-lg flex items-center gap-2" href="/">
          <span class="material-symbols-outlined text-[18px]">home</span>
          Volver al Inicio
        </a>
      </div>
    </div>
    
    <!-- Quick Links Section -->
    <div class="w-full max-w-container-max mx-auto">
      <div class="text-center mb-10">
        <h3 class="font-headline-md text-headline-md text-on-surface mb-2">Enlaces Rápidos</h3>
        <p class="font-body-md text-body-md text-on-surface-variant">Encuentra los servicios principales de Matices</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <!-- Card 1: Salud Laboral -->
        <a class="group glass-panel rounded-xl p-8 hover:glow-shadow transition-all duration-300 hover:-translate-y-1 relative overflow-hidden" href="/psicologia">
          <div class="absolute top-0 right-0 w-24 h-24 bg-verde-bosque/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div class="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-6 group-hover:bg-verde-bosque/10 transition-colors">
            <span class="material-symbols-outlined text-verde-bosque" data-icon="health_and_safety" data-weight="fill" style='font-variation-settings: "FILL" 1;'>health_and_safety</span>
          </div>
          <h4 class="font-label-md text-label-md text-on-surface mb-3 text-lg">Salud Laboral</h4>
          <p class="font-body-md text-body-md text-on-surface-variant text-sm">Programas integrales para el bienestar psicofísico y prevención de riesgos.</p>
        </a>
        <!-- Card 2: Reclutamiento y Selección -->
        <a class="group glass-panel rounded-xl p-8 hover:glow-shadow transition-all duration-300 hover:-translate-y-1 relative overflow-hidden" href="/talento">
          <div class="absolute top-0 right-0 w-24 h-24 bg-azul-celeste/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div class="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-6 group-hover:bg-azul-celeste/10 transition-colors">
            <span class="material-symbols-outlined text-azul-celeste" data-icon="group_add" data-weight="fill" style='font-variation-settings: "FILL" 1;'>group_add</span>
          </div>
          <h4 class="font-label-md text-label-md text-on-surface mb-3 text-lg">Reclutamiento y Selección</h4>
          <p class="font-body-md text-body-md text-on-surface-variant text-sm">Búsqueda estratégica y filtrado riguroso de perfiles idóneos.</p>
        </a>
        <!-- Card 3: Gestión del Talento -->
        <a class="group glass-panel rounded-xl p-8 hover:glow-shadow transition-all duration-300 hover:-translate-y-1 relative overflow-hidden" href="/formacion">
          <div class="absolute top-0 right-0 w-24 h-24 bg-verde-lima/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div class="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-6 group-hover:bg-verde-lima/10 transition-colors">
            <span class="material-symbols-outlined text-verde-lima" data-icon="psychology" data-weight="fill" style='font-variation-settings: "FILL" 1;'>psychology</span>
          </div>
          <h4 class="font-label-md text-label-md text-on-surface mb-3 text-lg">Gestión del Talento</h4>
          <p class="font-body-md text-body-md text-on-surface-variant text-sm">Evaluaciones de desempeño y desarrollo de planes de carrera.</p>
        </a>
      </div>
    </div>
    
  </main>
  <Footer />
</Layout>
```

## Design Tokens

### New Tokens Added to `src/styles/global.css`

```css
/* ============================================================
   404 Page Decorative Effects
   ============================================================ */

/* Glass Panel Effect - used on service cards */
.glass-panel {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(36, 59, 85, 0.1);
}

/* Animated Blobs - decorative background elements */
.animate-blob {
  animation: blob 7s infinite ease-in-out;
}
@keyframes blob {
  0%, 100% { 
    transform: translate(0, 0) scale(1); 
  }
  33% { 
    transform: translate(30px, -50px) scale(1.1); 
  }
  66% { 
    transform: translate(-20px, 20px) scale(0.9); 
  }
}

/* Animation delays */
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* Reduced motion - disable animations */
@media (prefers-reduced-motion: reduce) {
  .animate-blob {
    animation: none;
  }
}
```

### Color Mapping (Project Tokens)

| Elemento | Token Proyecto | Valor CSS | Uso |
|----------|----------------|-----------|-----|
| Texto hero "404" | `text-verde-bosque` | `#243B55` | Título principal |
| Subtítulo | `text-on-surface` | `#191c1c` | Texto descriptivo |
| Botón primario | `bg-verde-bosque` | `#243B55` | Botón "Volver al Inicio" |
| Tarjetas glass-panel | `rgba(36, 59, 85, 0.1)` | `#243B55/0.1` | Fondo con blur |
| Icono Salud Laboral | `text-verde-bosque` | `#243B55` | Icono health_and_safety |
| Icono Reclutamiento | `text-azul-celeste` | `#5A7FA3` | Icono group_add |
| Icono Gestión Talento | `text-verde-lima` | `#98C245` | Icono psychology |
| Blobs de fondo | `bg-verde-bosque/10`, `bg-azul-celeste/10` | Baja opacidad | Elementos decorativos |
| Grid gaps | `gutter: 24px` | `gap-gutter` | Espaciado entre cards |

### Typography
- **Display**: `font-heading` = Playfair Display (para "404")
- **Body**: `font-sans` = Plus Jakarta Sans (para texto descriptivo)
- **Labels**: `font-label-md` = Plus Jakarta Sans 14px

### Shapes & Elevation
- **Card radius**: `rounded-xl` = 0.75rem (compatible con diseño)
- **Border radius base**: `0.5rem` = 8px (estándar del proyecto)
- **Shadow**: `shadow-md` = sombra suave, compatible con `card-lift` pattern

### Accessibility
- `prefers-reduced-motion: reduce` desactiva blobs animados
- Contraste WCAG AA: `text-verde-bosque` sobre `#F4F7F9` cumple contraste
- Semantic HTML: `<h1>`, `<h2>`, `<p>`, `<a>` usados correctamente
- Todas las imágenes son SVG inline con `aria-label` implícito por el título

### Performance
- Solo propiedades `opacity` y `transform` en animations (protege LCP/CLS)
- Blobs usan `mix-blend-multiply` y `filter blur` (costos controlados)
- Sin JavaScript adicional - todo es CSS/Tailwind
- Imágenes: SVG inline (pesado mínimo)

### SEO Integration
```astro
<Layout 
  title="Página No Encontrada" 
  description="La página que buscas no está disponible o ha sido movida. Pero no te preocupes, estamos aquí para guiarte de vuelta hacia el crecimiento y el bienestar organizacional."
>
```
- Título H1 "404" no compete con title de Layout (title es "Página No Encontrada | Matices")
- Descripción en hero complementa la description del Layout
- Canonical URL hereda del Layout correctamente

## Responsive Behavior

### Mobile (< 640px)
- Hero: `max-w-full` en lugar de `max-w-2xl`
- Grid: 1 columna (`grid-cols-1`)
- Padding: `px-mobile` = 16px en lugar de `px-margin-desktop` = 64px
- Botones: tamaño completo width

### Tablet (640px - 1024px)
- Hero mantiene layout compacto
- Grid: 2 columnas en móvil se vuelve 3 en desktop

### Desktop (> 1024px)
- Hero: `max-w-2xl` centrado
- Grid: 3 columnas completas
- Padding: `px-margin-desktop` = 64px

## Integration Points

### Header.astro
- Header sticky con navegación principal
- Logo link a `/`
- CTA "Solicitar Asesoría" no necesario en 404 (hay link "Volver al Inicio")

### Footer.astro
- Footer completo con links de área
- Links quick-links duplicados no necesarios (ya están en 404)
- Footer sirve como camino adicional de navegación

### Layout.astro
- SEO metadata inyectadas via Astro.props
- Google Tag Manager heredado
- Favicon y meta tags base
- `initReveal()` para animaciones on-scroll

### global.css
- Tokens ya definidos en `src/styles/global.css`
- No inline styles - todo via Tailwind utilities
- `prefers-reduced-motion` media query para accesibilidad

## Validation Checklist

- [ ] Todos los tokens usados están definidos en `docs/DESIGN.md`
- [ ] No hay `any` en TypeScript (Astro TS strictest)
- [ ] `prefers-reduced-motion` respeta configuración de usuario
- [ ] Contraste WCAG AA verificado para todos los textos
- [ ] Links funcionales: /, /psicologia, /talento, /formacion
- [ ] Grid responsive en mobile/tablet/desktop
- [ ] Efectos visuales no rompen LCP/CLS
- [ ] SEO title y description presentes en head