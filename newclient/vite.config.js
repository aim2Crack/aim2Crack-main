import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV || 'development'}` });

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