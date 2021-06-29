import ts from '@rollup/plugin-typescript'

const shared = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm'
    }
  ],
  plugins: [ts({ include: ['./src/**/*.ts'] })],
  external: ['http']
}

export default [
  {
    ...shared,
    external: [...shared.external, 'quick-lru']
  },
  {
    ...shared,
    input: 'src/redis.ts',
    external: [...shared.external, 'ioredis']
  }
]
