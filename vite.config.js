import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const finalEnv = { ...process.env, ...env };

    return {
        base: './',
        build: {
            outDir: 'dist',
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    projects: resolve(__dirname, 'projects.html'),
                    gdpr: resolve(__dirname, 'gdpr.html'),
                },
            },
        },
        plugins: [
            {
                name: 'html-transform',
                transformIndexHtml(html) {
                    return html.replace(/%(\w+)%/g, (match, p1) => {
                        return finalEnv[p1] || match;
                    });
                },
            },
        ],
    };
});
