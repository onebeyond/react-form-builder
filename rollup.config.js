import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    name: 'ReactFormBuilder',
    file: 'dist/index.js',
    format: 'umd',
    sourcemap: true,
    globals: { react: 'React', 'theme-ui': 'theme-ui' }
  },
  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    babel({ babelHelpers: 'bundled' })
  ],

  external: ['react']
}
