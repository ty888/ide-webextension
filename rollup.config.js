// import { defineConfig } from 'vite';
// import { r } from './scripts/utils'
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [
//     react(),
//   ],
//   build: {
//     rollupOptions: {
//       input: {
//         index: r('src/contentScripts/main.tsx'),
//         injected: r('src/injected/main.tsx'),
//       },
//       output: {
//         // 为每个 UMD 格式指定输出
//         format: 'umd',
//       },
//     },
//   },
// });