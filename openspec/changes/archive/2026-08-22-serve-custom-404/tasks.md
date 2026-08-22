# Tasks: serve-custom-404

## Phase 1: Implementation (TDD)

### T1.1 - Test fallido: build produce `dist/.htaccess` con ErrorDocument ✅
- **Given** el repositorio sin `public/.htaccess`
- **When** se ejecuta el build (`pnpm build`) y se corre el test de integración
- **Then** el test falla porque `dist/.htaccess` no existe o no contiene `ErrorDocument 404 /404.html`
- **Check**: `pnpm test` muestra el test en rojo — **OK**: `src/lib/staticErrorHandling.spec.ts` falló (1 failed) antes de crear el archivo

### T1.2 - Crear `public/.htaccess` ✅
- **Given** el test fallido de T1.1
- **When** se crea `public/.htaccess` únicamente con la directiva `ErrorDocument 404 /404.html` (+ comentario explicativo)
- **Then** el build copia el archivo a `dist/.htaccess` y el test pasa
- **Check**: `pnpm build && pnpm test` en verde — **OK**: 47/47 tests pasando, `dist/.htaccess` presente

## Phase 2: Verification

### T2.1 - Sin regresión en rutas existentes ✅
- **Given** el build actualizado
- **When** se sirve `dist/` localmente (`pnpm preview`) y se navega `/`, `/psicologia`, `/contacto`, `/formacion`, `/talento`, `/testing`, `/id`
- **Then** todas las rutas cargan normalmente, sin interferencia del `.htaccess`
- **Check**: smoke manual o script sobre el preview server — **OK**: las 7 rutas responden HTTP 200; `/ruta-inexistente` responde 404 con el contenido custom verificado

### T2.2 - Smoke test post-deploy (producción) ✅
- **Given** el próximo deploy a Hostinger incluye `dist/.htaccess`
- **When** se ejecuta `curl -I https://maticesconsultora.cl/ruta-inexistente`
- **Then** la respuesta es HTTP 404 y el body corresponde a la página custom
- **Check**: verificado en dominio real tras deploy — **OK**: confirmado por el usuario, el archivo fue subido y la 404 se muestra correctamente en producción

---

## Definition of Done

- [x] Test automatizado pasa (`pnpm test`)
- [x] `dist/.htaccess` presente tras `pnpm build` con la directiva correcta
- [x] Rutas existentes sin regresión (T2.1)
- [x] Verificado en producción tras el próximo deploy (T2.2)
