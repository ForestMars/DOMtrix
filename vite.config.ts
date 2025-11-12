// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // Need to install @types/node if you haven't yet

export default defineConfig({
    // CRITICAL: Ensures all paths are relative for extension loading
    base: './', 
    plugins: [react()],
    build: {
        // Output directory for your extension files
        outDir: 'dist', 
        rollupOptions: {
            // Define all three entry points for the different contexts
            input: {
                // 1. Popup UI (React app)
                popup: resolve(__dirname, 'src/popup/index.html'), 
                // 2. Service Worker (Background logic)
                serviceWorker: resolve(__dirname, 'src/background/service-worker.ts'), 
                // 3. Content Script (DOM manipulator)
                contentScript: resolve(__dirname, 'src/content/content-script.ts'),
            },
            output: {
                // This ensures separate, self-contained files are generated
                entryFileNames: '[name]/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
});
