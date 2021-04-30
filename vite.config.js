import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';

export default {
  plugins: [
    {
      ...importMetaAssets(),
      enforce: 'post',
      apply: 'build'
    }
  ]
}