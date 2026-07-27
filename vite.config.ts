import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})