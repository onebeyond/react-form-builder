import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [peerDepsExternal(), babel()],
  external: ['react']
}
