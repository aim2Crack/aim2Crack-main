import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: 'React.createElement',
  },
  assetsInlineLimit: 0,
  optimizeDeps: {
    exclude: ['@fortawesome/fontawesome-svg-core'],
  },
  build: {
    // Add the rollupOptions section for manualChunks
    minify: false,
    rollupOptions: {
      // Define manualChunks to customize chunk splitting
      manualChunks(id) {
        // Define your custom logic here to group modules into chunks.
        // For example:
        if (id.includes('node_modules')) {
          return 'vendor'; // Place modules from node_modules in a 'vendor' chunk.
        }
      },
    },
  },
});
