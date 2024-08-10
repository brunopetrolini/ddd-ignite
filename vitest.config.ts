import tsConfigPaths from 'vitest-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [tsConfigPaths()],
})
