import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url'
import tailwindcss from '@tailwindcss/vite';
// import { createHtmlPlugin } from 'vite-plugin-html'
// import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig(({mode}) => {
    // Загружаем переменные окружения из .env файлов и системного окружения
    // Третий параметр '' позволяет загружать ВСЕ переменные, а не только с префиксом VITE_
    const env = loadEnv(mode, process.cwd(), '')

    // base: '/',
    return {
        base: env.GITHUB_ACTIONS ? '/pennywise/' : '/',
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

        resolve: {
            alias: {
                // Актуальный способ задания алиаса @ для папки src
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },

        }
    }
})

