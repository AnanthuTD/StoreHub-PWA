/// <reference types="vitest" />
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      includeAssets: ['shopping.png', 'robots.txt'],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
      registerType: 'autoUpdate'
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:4000',
        // target: 'https://b10e-103-184-239-215.ngrok-free.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    root: path.resolve(__dirname, './src'),
  },
});
