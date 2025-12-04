import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  optimizeDeps: {
    include: ['primevue'],
    exclude: ['@primeuix/themes', 'primeicons']
  },

  server: {
    watch: {
      usePolling: true,
      interval: 2000,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/tsconfig*.json',
        '**/.vscode/**',
        '**/.DS_Store'
      ]
    }
  }
});
