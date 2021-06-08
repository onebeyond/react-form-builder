import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const minifyExtension = (pathToFile) => pathToFile.replace(/\.js$/, '.min.js')

export default {
  input: 'src/index.js',
  output: {
    name: 'ReactFormBuilder',
    file: minifyExtension('dist/index.js'),
    format: 'umd',
    sourcemap: true,
    globals: {
      react: 'React',
      'theme-ui': 'theme-ui',
      'react-markdown': 'react-markdown',
      'react-hook-form-input': 'react-hook-form-input',
      'react-phone-number-input': 'react-phone-number-input',
      'react-hook-form': 'react-hook-form',
      'react-datepicker': 'react-datepicker'
    }
  },

  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    commonjs(),
    uglify.uglify()
  ],

  external: ['react']
}
