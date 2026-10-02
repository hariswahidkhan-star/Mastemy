/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: process.env.API_PROXY_TARGET ?? 'http://localhost:5080', changeOrigin: true },
      '/health': { target: process.env.API_PROXY_TARGET ?? 'http://localhost:5080', changeOrigin: true },
    },
  },
  // The SSR server bundle is self-contained so the runtime image needs no node_modules.
  ssr: isSsrBuild ? { noExternal: true, target: 'node' as const } : undefined,
  build: isSsrBuild
    ? {
        sourcemap: true,
        target: 'node22',
        outDir: 'dist-server',
        emptyOutDir: true,
        copyPublicDir: false,
      }
    : { sourcemap: true, manifest: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
}));
