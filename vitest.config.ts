import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Coverage is enforced at 100% across everything a test can meaningfully
 * exercise. The exclusions below are deliberate and each has a reason — see
 * docs/testing.md. Adding a file to `exclude` is a decision, not a shortcut.
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    css: false,
    restoreMocks: true,
    clearMocks: true,
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // Test scaffolding itself.
        'src/test/**',
        'src/**/*.test.{ts,tsx}',
        // Type-only modules: erased at compile time, nothing to execute.
        'src/types/**',
        'src/vite-env.d.ts',
        // Data, not behaviour. A test here would assert that a string equals
        // itself; the content is verified by the components that render it.
        'src/content/**',
        // Barrel files: re-exports with no logic of their own.
        'src/**/index.ts',
        // The WebGL layer. Driving react-three-fiber under jsdom means mocking
        // a GPU, and the assertions degrade to "this maths returned a number".
        // The scene is verified visually in a headless browser instead.
        'src/components/three/**',
        // Composition roots: wiring with no branches worth asserting.
        'src/main.tsx',
        'src/app/router.tsx',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
