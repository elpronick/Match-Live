import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // base: '/'  →  Vercel (raíz del dominio)
  // base: '/Match-Live/'  →  GitHub Pages (subdirectorio)
  // Controlado con la variable de entorno VITE_BASE_PATH.
  // Si no se define, Vite usa '/' por defecto (correcto para Vercel).
  base: process.env.VITE_BASE_PATH ?? '/',

  // ── Proxy (solo en desarrollo local) ──────────────────────────────────────
  // En producción el servidor de producción no pasa por Vite,
  // así que este bloque no afecta a los assets ni a las rutas del build.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
