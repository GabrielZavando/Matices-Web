# syntax=docker/dockerfile:1
#
# Dockerfile — Matices Web (Astro 7 SSG) para despliegue en Coolify (VPS).
#
# Build secret requerido: NODE_AUTH_TOKEN — un PAT de GitHub con scope
# `read:packages`, usado SOLO en la etapa builder para instalar el paquete
# privado `@gabrielzavando/specboot` desde https://npm.pkg.github.com
# (ver .npmrc). El token se inyecta como build argument y nunca alcanza la
# imagen final: la etapa runner parte de nginx:alpine limpio y solo recibe
# el output estático /app/dist; la etapa builder se descarta.
# En Coolify: configurar NODE_AUTH_TOKEN como variable de build
# (Build Args / build secret). Ejemplo local:
#   docker build --build-arg NODE_AUTH_TOKEN=<pat> -t matices-web .
# No se requiere archivo .env (el sitio es 100% estático).

# Etapa 1: build estático
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@10

# Pasar el token como build argument
ARG NODE_AUTH_TOKEN
ENV NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}

# Copiar archivos de configuración
COPY .npmrc package.json pnpm-lock.yaml ./

# Añadir autenticación al .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >> .npmrc

# Instalar dependencias
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Etapa 2: servidor Nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]