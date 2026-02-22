import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 5173,
    open: true
  },
  preview: {
    host: true,
    port: 4173,
  },
  base: mode === 'production' ? '/codenames/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mini: resolve(__dirname, 'mini.html'),
        controller: resolve(__dirname, 'controller.html'),
      },
    },
  },
}));