import { sharedConfig } from './vite.config'
import { r, isDev } from './scripts/utils'
import packageJson from './package.json'
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  // plugins: [
  //   react(),
  // ],
  build: {
    watch: isDev ? {} : undefined,
    outDir: r('extension/dists/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    target: 'esnext',
    lib: {
      entry: r('src/contentScripts/main.tsx'),
      name: packageJson.name,
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        index: r('src/contentScripts/main.tsx'),
        injected: r('src/injected/main.tsx'),
      },
      output: {
        // format: 'cjs',
        entryFileNames: '[name].global.js',
      },
    },
  },
})
