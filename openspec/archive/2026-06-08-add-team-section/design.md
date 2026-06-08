# Diseño y Fichas de Estilo: Sección "Nuestro Equipo"

Este documento establece los tokens de diseño y clases de Tailwind CSS aplicadas a la nueva sección para asegurar total consistencia con la identidad visual de "Natural Vitality" de Matices.

## 1. Contenedor de la Sección
* **Fondo**: `bg-white` (para alternar con el fondo `bg-crema-calido/30` de la sección anterior de Especialización).
* **Espaciado vertical**: `py-20` en móviles, escalando a `py-24` en pantallas grandes.
* **Margen interno**: `max-w-[1280px] mx-auto px-4 md:px-16`.

## 2. Encabezado de la Sección
* **Título**: `Nuestro Equipo`
  * **Clases**: `font-heading text-3xl md:text-4xl font-bold text-verde-bosque text-center mb-16`.
  * **Tipografía**: *Playfair Display* (Serif).
  * **Color**: `#243B55` (`text-verde-bosque`).

## 3. Grilla de Tarjetas
* Grilla responsiva y adaptativa:
  * **Por defecto (Móvil)**: `grid grid-cols-1 gap-8`.
  * **Tablet/Mediano (`md:`)**: `md:grid-cols-2`.
  * **Escritorio (`lg:`)**: `lg:grid-cols-4`.

## 4. Tarjeta de Integrante (Card)
* **Contenedor**:
  * **Clases**: `bg-crema-calido p-5 rounded-[2rem] flex flex-col border border-verde-bosque/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`.
  * **Bordes**: Radio de esquina de `2rem` (`rounded-[2rem]`) para mantener consistencia con las tarjetas de la sección "Nuestros Servicios".
  * **Fondo**: `#F4F7F9` (`bg-crema-calido`).
* **Contenedor de Imagen**:
  * **Clases**: `w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-verde-bosque/5 relative`.
  * **Comportamiento**: La imagen tendrá un efecto de zoom suave al pasar el cursor sobre la tarjeta: `w-full h-full object-cover group-hover:scale-105 transition-transform duration-500`.
* **Nombre del Integrante**:
  * **Clases**: `font-heading text-xl font-bold text-verde-bosque mb-2`.
  * **Tipografía**: *Playfair Display*.
* **Descripción / Rol**:
  * **Clases**: `font-sans text-sm text-verde-bosque/75 leading-relaxed`.
  * **Tipografía**: *Plus Jakarta Sans*.
  * **Color**: `#243B55` con 75% de opacidad para establecer una jerarquía de lectura clara.
