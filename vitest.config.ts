import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  test: {
    globals: true, // describe, it, expect 글로벌 사용 가능
    environment: 'jsdom', // 브라우저 환경
    setupFiles: './vitest.setup.ts', // 테스트 전 setup 파일 실행
  },
});
