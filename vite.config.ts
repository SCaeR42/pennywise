// import {defineConfig} from 'vite';
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite';
// import { createHtmlPlugin } from 'vite-plugin-html'
// import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig({
    // base: '/',
    base: process.env.GITHUB_ACTIONS ? '/pennywise/' : '/',
    plugins: [
        vue(),
        tailwindcss(),
        // vueDevTools(),
        // createHtmlPlugin({})
    ],
    server: {
        watch: {
            // Использовать опрос вместо системных событий
            usePolling: true,
            // Интервал опроса в мс (опционально)
            interval: 100
        },
        host: "::",
        port: 8080,
        hmr: {
            overlay: false,
        },
    },
    build: {
        rolldownOptions: { // или rollupOptions, если rolldown прокинут как замена
            onwarn(warning, warn) {
                // Игнорируем специфический ворнинг с невалидными аннотациями в node_modules
                if (warning.code === 'INVALID_ANNOTATION' && warning.message.includes('node_modules')) {
                    return
                }
                // Все остальные предупреждения выводим как обычно
                warn(warning)
            }
        }
    },
    resolve: {
        alias: {
            // Актуальный способ задания алиаса @ для папки src
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },

    },
    // test: {
    //     environment: 'jsdom',
    //     globals: true,
    //     setupFiles: ['./tests/setup.ts'],
    //     include: ['tests/pages/*.spec.ts'],
    //     // include: ['tests/**/*.spec.ts'],
    //     coverage: {
    //         provider: 'v8',
    //         reporter: ['text', 'json', 'html'],
    //     },
    // },
})
