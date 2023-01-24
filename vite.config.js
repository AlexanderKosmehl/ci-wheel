/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  base: './',
  test: {
    environment: 'jsdom',
  },
});
