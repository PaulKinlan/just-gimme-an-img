import { VitePWA } from 'vite-plugin-pwa'

export default {
  build: {
    target: 'es2020',
    minify: 'esbuild',
    soucemap: false
  },
  plugins: [
    VitePWA()
  ]
}