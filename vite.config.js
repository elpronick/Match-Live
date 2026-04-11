import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Match-Live/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
