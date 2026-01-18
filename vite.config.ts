import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: Infinity, // Chunk size warning 제거
    rollupOptions: {
      onwarn(_warning) {
        // 모든 warning을 무시 (에러만 표시)
        // warning 처리는 필요 없으므로 무시
      },
    },
  },
  logLevel: 'error', // warning 로그 제거
})

