import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/my-repo/',

})
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
})
