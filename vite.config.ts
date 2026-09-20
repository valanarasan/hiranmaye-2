import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * The config runs in Node, but the project deliberately ships no @types/node —
 * it is a browser app, and those types would leak `process` into src/. This
 * reads the one variable the config needs without them.
 */
const nodeEnv =
  (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, a custom domain from /.
  // The deploy workflow sets VITE_BASE; local dev and custom domains use the root.
  base: nodeEnv.VITE_BASE ?? '/',
  plugins: [react(), tsconfigPaths()],
  css: { devSourcemap: true },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the WebGL payload in its own chunk so it can be lazily gated.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('react-router')) return 'router';
            if (id.includes('motion') || id.includes('framer')) return 'motion';
            return 'vendor';
          }
          return undefined;
        },
      },
    },
  },
});
