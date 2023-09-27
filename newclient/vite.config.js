import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: 'React.createElement',
    // jsxInject: `import React from 'react'`,
  },
  server: {
    port: 80,
  },
  assetsInlineLimit: 0,
  optimizeDeps: {
    exclude: ['@fortawesome/fontawesome-svg-core'],
    // include: ['xlsx'],
  },
})
