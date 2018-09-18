import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

export default {
  input: 'index.js',
  plugins: process.env.MINIFY ? [terser()] : [serve()],
  output: {
    file: 'bundle.js',
    format: 'iife',
  },
};
