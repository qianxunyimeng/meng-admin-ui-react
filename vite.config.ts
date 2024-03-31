import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import gzipPlugin from 'rollup-plugin-gzip'
import legacy from '@vitejs/plugin-legacy'
const BASE = '/meng-react-admin-preview/'
// https://vitejs.dev/config/
export default defineConfig((config) => {
  console.log(config)
  return {
    base: BASE,
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: config.mode === 'production', //生产环境删除console和debugger
          drop_debugger: config.mode === 'production',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router', 'react-router-dom'], // 将react和react-dom打包到vendor chunk中
            antd: ['antd', '@ant-design/icons'], // 将antd打包到antd chunk中
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),
      UnoCSS(),
      gzipPlugin(),
      legacy({
        targets: ['> 1%', 'last 2 versions and not dead'],
      }),
    ],
    define: {
      __PACKAGE_NAME__: JSON.stringify(process.env.npm_package_name),
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888', // 目标服务器的地址
          //changeOrigin: true, // 是否改变源地址
          //rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
        },
      },
    },
  }
})
