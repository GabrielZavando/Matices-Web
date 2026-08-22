# serve-custom-404 Delta

## ADDED Requirements

### Requirement: Static Hosting Error Handling

El sitio MUST servir la página 404 personalizada (`/404.html`) cuando el servidor
reciba una solicitud a una ruta inexistente en producción (Hostinger), mediante un
archivo `.htaccess` en la raíz del despliegue con la directiva
`ErrorDocument 404 /404.html`.

#### Scenario: Ruta inexistente en producción

- **Given** el sitio desplegado en Hostinger con `dist/.htaccess` incluido
- **When** un usuario accede a una URL que no corresponde a ningún archivo estático
- **Then** el servidor responde con estado HTTP 404 y el contenido de `/404.html`

#### Scenario: Build incluye .htaccess

- **Given** se ejecuta `pnpm build`
- **When** se inspecciona el directorio `dist/`
- **Then** existe `dist/.htaccess` y contiene la directiva `ErrorDocument 404 /404.html`

#### Scenario: Rutas existentes no afectadas

- **Given** el `.htaccess` desplegado
- **When** un usuario accede a `/psicologia`, `/contacto` u otra ruta válida
- **Then** el servidor entrega la página correspondiente sin interferencia (HTTP 200)
