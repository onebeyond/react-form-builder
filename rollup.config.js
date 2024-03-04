import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.js',
  output: {
    name: 'ReactFormBuilder',
    file: 'dist/index.js',
    format: 'umd',
    sourcemap: true,

    globals: {
      'react': 'React',
      'theme-ui': 'theme-ui',
      'react-markdown': 'react-markdown',
      'react-phone-number-input': 'react-phone-number-input',
      'react-hook-form': 'react-hook-form',
      'react-datepicker': 'react-datepicker',
      'react-select': 'react-select',
      'react-scripts': 'react-scripts',
      'react-dom': 'ReactDOM',
      'react-ymd-date-select': 'react-ymd-date-select',
      'countries-list': 'countries-list',
      'i18n-iso-countries': 'i18n-iso-countries',
    }
  },

  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    commonjs(),
    json(),
    postcss({
      extensions: ['.css']
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],

  external: [
    'react',
    'theme-ui',
    'react-markdown',
    'react-hook-form',
    'react-phone-number-input',
    'react-datepicker',
    'react-scripts',
    'react-select',
    'react-dom',
    'react-ymd-date-select',
    'countries-list',
    'i18n-iso-countries'
  ]
}