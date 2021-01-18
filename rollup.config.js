import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [babel()],
  external: ['react']
}
