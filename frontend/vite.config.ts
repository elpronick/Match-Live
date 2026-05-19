import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Match-Live/',

  // ── Proxy (solo en desarrollo local) ──────────────────────────────────────
  // En producción, VITE_BACKEND_URL apunta al backend remoto y este bloque
  // no aplica (el servidor de producción no pasa por Vite).
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // No reescribimos la ruta: /api/auth/login → http://localhost:5000/api/auth/login
      },
    },
  },
})
