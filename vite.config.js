import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/PriyanshuDandapath/' : './',
  server: {
    watch: {
      ignored: ['**/*.mov', '**/*.mp4', '**/*.m4v', '**/image/*.mov']
    }
  }
})
