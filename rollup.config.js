import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import json from '@rollup/plugin-json'
import replace from 'rollup-plugin-replace'
import css from 'rollup-plugin-import-css'

export default {
  input: 'src/index.js',
  output: {
    name: 'ReactFormBuilder',
    file: 'dist/index.js',
    format: 'umd',
    sourcemap: true,
    globals: {
      react: 'React',
      'theme-ui': 'theme-ui',
      'react-markdown': 'react-markdown',
      'react-hook-form-input': 'react-hook-form-input',
      'react-phone-number-input': 'react-phone-number-input',
      'react-hook-form': 'react-hook-form',
      'react-datepicker': 'react-datepicker',
      'react-select': 'react-select',
      'react-tooltip': 'react-tooltip'
    }
  },

  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    commonjs(),
    json(),
    css(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    uglify.uglify()
  ],

  external: [
    'react',
    'theme-ui',
    'react-markdown',
    'react-hook-form',
    'react-hook-form-input',
    'react-phone-number-input',
    'react-datepicker',
    'react-scripts',
    'react-select',
    'react-tooltip'
  ]
}
