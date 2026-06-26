import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true, // tự mở trình duyệt khi chạy npm run dev
    proxy: {
      // gọi /api/... từ FE sẽ forward sang Express backend lúc dev
      '/api': 'http://localhost:4244',
    },
  },
})
