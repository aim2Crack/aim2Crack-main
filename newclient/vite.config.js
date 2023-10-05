import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // jsxFactory: 'React.createElement',
    // jsxInject: `import React from 'react'`,
  },
  build: {
    sourcemap: true,
  },

})