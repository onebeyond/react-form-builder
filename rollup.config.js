import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json'

/**
 * Used for generating external dependencies
 * Credit: Mateusz BurzyĹ„ski (https://github.com/Andarist)
 * Source: https://github.com/rollup/rollup-plugin-babel/issues/148#issuecomment-399696316
 */
const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

const makeGlobalsPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return {};
  }

  return externalArr.reduce((acc, name) => {
    acc[name] = name;
    return acc;
  }, {});
}

export default commandLineArgs => ({
  input: pkg.source,
  output: {
    name: 'ReactFormBuilder',
    file: pkg.main,
    format: 'umd',
    sourcemap: true,
    globals: makeGlobalsPredicate([
      // Handles both dependencies and peer dependencies so we don't have to manually maintain a list
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      'react-select/async'
    ]),
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
    ...(commandLineArgs.configDebug === true
      ? []
      : [replace({ 'process.env.NODE_ENV': JSON.stringify('production') })]),
  ],

  external: makeExternalPredicate([
    // Handles both dependencies and peer dependencies so we don't have to manually maintain a list
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]),
});
