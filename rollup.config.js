import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

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
      'react-hook-form': 'react-hook-form'
    }
  },
  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    babel({ babelHelpers: 'bundled' }),
    commonjs()
  ],

  external: ['react']
}
