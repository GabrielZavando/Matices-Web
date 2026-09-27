// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://maticesconsultora.cl',
  devToolbar: {
    enabled: false
  },
  prefetch: {
    prefetchAll: true
  },
  // Mantener el comportamiento de v6: HTML-aware whitespace compression.
  // Astro 7 cambia el default a "jsx" y puede eliminar espacios
  // entre inline elements que los tests cubren.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
