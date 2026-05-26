import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            exclude: [...configDefaults.exclude, 'e2e/**'],
            // root: fileURLToPath(new URL('./', import.meta.url)),

            environment: 'jsdom',
            globals: true,
            // setupFiles: ['./tests/setup.ts'],
            include: ['tests/pages/*.spec.ts'],
            // include: ['tests/**/*.spec.ts'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
            },
            testTimeout: 10000,
        },
    }),
)
