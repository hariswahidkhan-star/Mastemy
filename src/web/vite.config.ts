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
        // Server bundle only — never sent to browsers (dist-server is not served statically); the map keeps
        // SSR stack traces readable in logs.
        sourcemap: true,
        target: 'node22',
        outDir: 'dist-server',
        emptyOutDir: true,
        copyPublicDir: false,
      }
    : // Client build ships to browsers: emit no source maps so original sources are not exposed in production.
      { sourcemap: false, manifest: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
}));
