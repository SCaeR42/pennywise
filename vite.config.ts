import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        tailwindcss(),
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
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
