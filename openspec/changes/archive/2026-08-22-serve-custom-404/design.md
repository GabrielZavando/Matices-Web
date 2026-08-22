# serve-custom-404 Design

## Contexto

Sitio 100% estático (Astro SSG) desplegado en Hostinger sobre Apache/LiteSpeed.
El build produce `dist/` con `404.html` en la raíz. El servidor de hosting solo
sirve una página de error custom si se le indica vía `.htaccess`.

## Diseño

Archivo único `public/.htaccess` (copiado tal cual a `dist/` por Astro):

```apache
# Serve the custom Astro 404 page for unknown routes
ErrorDocument 404 /404.html
```

- Alcance mínimo: solo la directiva `ErrorDocument`. Sin reglas HTTPS, caché ni
  rewrites (explícitamente fuera de alcance).
- Ruta absoluta `/404.html` desde la raíz del documento del hosting.

## Verificación (TDD aplicable)

No se puede testear el runtime de Apache desde el proyecto, pero sí el artefacto
del build: un test Vitest verifica que tras ejecutar `pnpm build` existe
`dist/.htaccess` y contiene la directiva `ErrorDocument 404 /404.html`.

## Riesgos

- Si Hostinger usa Nginx puro (sin Apache/LiteSpeed), `.htaccess` no aplica; en
  ese caso habría que configurar la error page desde hPanel. Se valida con el
  smoke test post-deploy (T2.2).
- Ninguna ruta existente se ve afectada: `ErrorDocument` solo actúa ante 404.
