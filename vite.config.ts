/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ '@'를 'src' 폴더로 지정
    },
  },
  base: '/',
  server: {
    proxy: {
      '/graphql': {
        target: 'https://bff-page.kakao.com',
        changeOrigin: true, // 호스트 헤더를 대상 URL로 변경
        // secure: false, // HTTPS 요청에 대한 SSL 인증서 검사를 비활성화 (개발용)
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'), // '/graphql'로 시작하는 경로를 그대로 전달
        headers: {
          Referer: 'https://page.kakao.com/',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', // 브라우저 User-Agent도 추가
          'Content-Type': 'application/json',
        },
      },
    },
  },
});
