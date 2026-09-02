# Plan de Tareas: Controles de navegación y estilo de logos en `CompanyLogos` (`company-logos-controls`)

Cumple SDD: cambios incrementales, TDD cuando aplica, sin `any`.

## 1. Pre-checks

- [x] 1.1 Build limpio: `npm run build` finaliza con 0 errores / 0 warnings,
      9 páginas generadas.
- [x] 1.2 `bash check-refs.sh` finaliza con 0 errores (19 referencias
      verificadas).
- [x] 1.3 `bash specboot.sh --ci` finaliza con 0 errores / 0 warnings.

## 2. Estructura y estilos del componente

- [x] 2.1 Wrapper `flex items-center` con flechas a izquierda y derecha.
- [x] 2.2 Botones `<` y `>` con `aria-label` y estilos circulares.
- [x] 2.3 Altura de logos: `height: 4.25rem` (68px) [+10px sobre el 3.5rem].
- [x] 2.4 Quitar `filter: grayscale(100%)` y `opacity: 0.7` (logos siempre
      en color y opacidad completa).

## 3. Lógica del carrusel

- [x] 3.1 `getItemStep()`: ancho de un item + gap (leído del computed style).
- [x] 3.2 `applyShift(next)`: aplica `--shift` + `data-manual="true"`.
- [x] 3.3 `resumeAuto()`: transfiere `--shift` a `--marquee-start` y libera
      `data-manual`.
- [x] 3.4 Listeners de click en `prev` / `next` con wrap
      `track.scrollWidth / 2` (preserva el loop).
- [x] 3.5 Pausa por hover: CSS `:has()` + clase `.is-paused` (doble
      estrategia).
- [x] 3.6 Reanudación automática al `mouseleave` / `blur` de la flecha.
- [x] 3.7 Soporte teclado (`focus` / `blur`).
- [x] 3.8 Reset del estado manual en `resize` (cambio de breakpoint).

## 4. Verificación

- [x] 4.1 Build limpio (`npm run build` → 9 páginas, 0 errores).
- [x] 4.2 Render HTTP 200 en las 6 páginas que usan `CompanyLogos`.
- [x] 4.3 Test E2E con Chrome headless (10/10 PASS):
      - T1: estructura HTML.
      - T2: estilos CSS de logos.
      - T3: marquee en movimiento inicial.
      - T4: hover pausa la animación.
      - T5: click en `<` aplica `--shift`.
      - T6: mouseleave reanuda (`--marquee-start` recibe el shift).
      - T7: marquee se mueve tras reanudar.
      - T8: click en `>` desplaza al otro lado.
      - T9: marquee se mueve tras click + hover off.
      - T10: múltiples clicks acumulan correctamente.

## 5. Delta-incremental

- [x] 5.1 `git status` muestra un único archivo modificado
      (`src/components/global/CompanyLogos.astro`).
- [x] 5.2 Sin cambios colaterales fuera del archivo objetivo.
