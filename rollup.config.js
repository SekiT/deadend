import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  plugins: process.env.MINIFY ? [terser()] : [],
  output: {
    file: 'bundle.js',
    format: 'iife',
  },
};
