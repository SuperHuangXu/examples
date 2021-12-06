import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import commonjs from '@rollup/plugin-commonjs'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.module.js',
      format: 'es',
    },
  ],
  plugins: [
    json(),
    // 若需要将第三方库直接打进 output ，则可以使用以下配置
    // nodeResolve({
    //   preferBuiltins: false,
    // }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    del({ targets: 'dist/*', verbose: true }),
  ],
}
