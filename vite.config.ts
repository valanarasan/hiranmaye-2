import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
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
