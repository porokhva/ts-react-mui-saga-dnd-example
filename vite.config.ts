import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { UserConfig } from 'vite'
import Checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'

const shouldAnalyze = process.env.ANALYZE

const manualChunks = id => {
  if (id.includes('node_modules')) {
    if (
      id.includes('@mui/material') ||
      id.includes('@mui/icons-material') ||
      id.includes('@emotion/react') ||
      id.includes('@emotion/styled')
    ) {
      console.log(id, 'id')
      return 'vendor_mui'
    }
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
