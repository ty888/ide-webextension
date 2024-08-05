import { sharedConfig } from './vite.config'
import { r, isDev } from './scripts/utils'
import packageJson from './package.json'
import { defineConfig } from 'vite'

const config = {
  injected: {
    entry: r('src/injected/main.tsx'),
    fileName: 'injected.global',
    outDir: r('extension')
  },
  index: {
    entry: r('src/contentScripts/main.tsx'),
    fileName: 'index.global',
    outDir: r('extension/dists/contentScripts')
  }
}

// @ts-ignore
const currentConfig = config[process.env.LIB]

export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    outDir: currentConfig.outDir,
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // target: 'esnext',
    lib: {
      // entry: r('src/contentScripts/main.tsx'),
      entry: currentConfig.entry,
      fileName: currentConfig.fileName,
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      // input: {
      //   index: r('src/contentScripts/main.tsx'),
      //   injected: r('src/injected/main.tsx'),
      // },
      output: {
        extend: true
        // entryFileNames: '[name].global.js',
      },
    },
  },
})
