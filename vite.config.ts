import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { UserConfig } from 'vite'
import Checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'

const shouldAnalyze = process.env.ANALYZE
const publicUrl = '/ts-react-mui-saga-dnd-example/'
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
const manualChunks = id => {
  if (id.includes('node_modules')) {
    if (id.includes('msw')) {
      return 'vendor_msw'
    }

    return 'vendor' // all other package goes here
  }
}
const config: UserConfig = {
  build: {
    rollupOptions: {
      output: {
        manualChunks
      },
      plugins: shouldAnalyze ? [visualizer({ open: true, filename: './bundle-size/bundle.html' })] : []
    },
    sourcemap: !!shouldAnalyze,
    outDir: 'build'
  },
  base: process.env.NODE_ENV !== 'production' ? '/' : publicUrl,
  plugins: [
    react(),
    tsconfigPaths(),
    Checker({
      typescript: true,
      overlay: true,
      eslint: {
        files: 'src',
        extensions: ['.ts', '.tsx']
      }
    })
  ]
}

const getConfig = () => config

export default getConfig
