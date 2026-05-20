import { defineConfig } from 'vite';

export default defineConfig({
  // Cuando se despliega en GitHub Pages, la app vive bajo /speaker-c4s-radar/
  // En local (npm run dev) la base es '/' para que todo funcione sin cambios.
  base: process.env.GITHUB_ACTIONS ? '/speaker-c4s-radar/' : '/',
});
