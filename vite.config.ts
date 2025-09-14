import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { TSFilebasedRouter } from '@devwareng/vanilla-ts';


export default defineConfig({
    plugins: [
        tailwindcss(),
        TSFilebasedRouter()
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    build: {
        rollupOptions: {
            external: [
                'fs',
                'fs/promises',
                'os',
                'stream',
                'events',
                'node:path',
                'node:fs/promises',
                'node:stream',
                'path'
            ],
        },
    },
});
