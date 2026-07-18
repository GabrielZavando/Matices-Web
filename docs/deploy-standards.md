---
description: Flujo de despliegue para Matices (Astro SSG estático en Hostinger).
alwaysApply: false
---

# Deploy Standards — Matices Consultoría Integral

> Aplica al release (`/deploy`). Sitio estático (SSG) en Hostinger. Sin Docker ni
> contenedores: el build produce `dist/` que se sube por FTP/SSH.

## 1. Entornos

- **Staging**: rama `main` o despliegue manual (`workflow_dispatch`).
- **Production**: solo en tags `v*.*.*` (semver).

## 2. Versionado

- **Semver vía git tags** (`v0.1.0`, `v1.2.3`).
- Mantener `CHANGELOG.md` (formato Keep a Changelog) actualizado.
- Bump de versión en el tag; no versionar el sitio por release automático de npm.

## 3. Build

- Comando: `pnpm build` → `astro build` → genera `dist/`.
- Requerido Node `>=22.12.0` (pnpm como gestor).
- No se usan imágenes Docker (el `deploy.yml` de Specboot asume Docker; se
  reescribió a flujo estático FTP para Hostinger).

## 4. Despliegue a Hostinger (estático)

1. `pnpm build` y subir el contenido de `dist/` al directorio raíz del hosting
   vía FTP/SSH (p.ej. `lftp mirror -R dist/ <ftp_path>`).
2. Preservar `.htaccess`/redirecciones si las hubiera.
3. El sitio es 100% estático; no hay variables de entorno en runtime salvo las
   usadas en build (GTM, keys de analytics → vía `astro.config.mjs` / env).

## 5. Smoke tests

- `curl -f https://<dominio>/` debe responder 200.
- Verificar que el formulario (`/contacto`) carga y el honeypot está presente.
- Comprobar `sitemap-index.xml` y metadatos OG generados.

## 6. Rollback

- Staging: redeploy de un artifact `dist/` previo.
- Production: reapuntar al artifact del tag anterior; notificar vía Slack webhook.
- Sin base de datos que migrar (SSG puro).
