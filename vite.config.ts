import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 1. Обязательно указываем путь к репозиторию
  base: '/virtual-teams/', 
  
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  
  build: {
    // 2. Отключаем sourcemap, чтобы избежать блокировки скриптов (ошибка eval)
    sourcemap: false, 
  },

  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
