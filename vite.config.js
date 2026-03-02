// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/sleepwalkers/',
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        game:    resolve(__dirname, 'game.html'),
        guide:   resolve(__dirname, 'guide.html'),
        walker:  resolve(__dirname, 'walker.html'),
        preview: resolve(__dirname, 'preview.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    }
  }
});
