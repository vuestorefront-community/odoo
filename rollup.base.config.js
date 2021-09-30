import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'];

export function generateBaseConfig(pkg) {
  return {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      nodeResolve({
        extensions
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        // eslint-disable-next-line global-require
        typescript: require('typescript')
      })
    ]
  };
}
