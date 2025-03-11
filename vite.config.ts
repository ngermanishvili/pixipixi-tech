import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// Reuse the same alias configuration from your vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@features': path.resolve('./src/features'),
      '@hooks': path.resolve('./src/hooks'),
      '@lib': path.resolve('./src/lib'),
      '@providers': path.resolve('./src/providers'),
      '@services': path.resolve('./src/services'),
      '@store': path.resolve('./src/store'),
      '@utils': path.resolve('./src/utils'),
      '@assets': path.resolve('./src/assets'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
})