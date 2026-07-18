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
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
