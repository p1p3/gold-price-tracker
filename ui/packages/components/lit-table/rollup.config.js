import typescript from '@rollup/plugin-typescript';
import command from 'rollup-plugin-command';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve'

export default {
  input: './index.ts',
  output: {
    dir: 'output',
    format: 'esm',
    plugins: [command(`npm run build:css`)],
  },
  plugins: [
    typescript({ outDir: 'output' }),
    resolve(),
    serve('./')
  ],
};
