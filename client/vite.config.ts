import { defineConfig } from 'vite';
import { defineConfig as testConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});

const tstConfig = testConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
});

export default {
  ...config,
  ...tstConfig,
};
