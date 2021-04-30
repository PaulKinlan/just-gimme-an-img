import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';

export default {
  build: {
    target: 'es2020',
    minify: 'esbuild',
    soucemap: false
  },
  plugins: [
    {
      //...importMetaAssets(),
      enforce: 'post',
    }
  ]
}