## Why

La página 404 (`src/pages/404.astro`) funciona en desarrollo pero no en producción.
El build genera `dist/404.html` correctamente, pero el servidor estático de
Hostinger (Apache/LiteSpeed) no tiene configuración para servirla ante rutas
inexistentes: responde con su página de error por defecto. El servidor dev de
Astro maneja este caso automáticamente, por lo que el problema solo se manifiesta
en el sitio desplegado. La tarea T7.1 del change `2026-08-21-error-page-404`
(documentar/configurar la error page en Hostinger) quedó pendiente.

## What Changes

- Agregar `public/.htaccess` con la directiva `ErrorDocument 404 /404.html`
- Verificar que `pnpm build` copia el archivo a `dist/.htaccess` (test automatizado)
- Sin cambios en código fuente (`src/`), sin cambios visuales ni de contenido

## Capabilities

### Modified Capabilities

- `error-page-404`: Agregar requirement de serving en hosting estático (Static
  Hosting Error Handling) para que la página 404 se muestre realmente en producción

## Impact

- Nuevo archivo: `public/.htaccess`
- Sin modificaciones a archivos existentes
- Coherente con `docs/deploy-standards.md` §4.2 ("Preservar `.htaccess`/redirecciones")

## Success Criteria

- Test automatizado verifica que tras `pnpm build` existe `dist/.htaccess` con `ErrorDocument 404 /404.html`
- Rutas existentes (`/`, `/psicologia`, `/contacto`, etc.) siguen respondiendo sin regresión
- Tras el próximo deploy, una URL inexistente responde HTTP 404 con el contenido de la página custom

## Unlocks

Completar este artifact habilita: design, specs, apply (implementation)
