import path from 'path';
import { defineConfig, type PluginOption } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    appType: 'spa', // 'spa' | 'mpa' | 'custom'
    publicDir: 'public',
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: isProd }),
      react(),
      tailwindcss(),
      visualizer({
        //filename: 'stats.{ext based on template}',
        title: 'Build Bundle Stats',
        //open: true,
        //template: 'sunburst',
      }) as PluginOption,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      preserveSymlinks: true,
      dedupe: ['openseadragon'],
    },
    build: {
      target: ['es2022'],
      //minify: 'oxc',
      //cssMinify: 'lightningcss',
      sourcemap: false,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                test: /node_modules\/react-dom/,
                name: 'react-dom',
              },
              {
                test: /node_modules\/react/,
                name: 'react',
              },
              {
                test: /node_modules\/openseadragon/,
                name: 'openseadragon',
              },
              {
                test: /node_modules\/@openseadragon-imaging/,
                name: 'openseadragon-imaging',
              },
            ],
          },
        },
        external: [],
        checks: {
          pluginTimings: false,
        },
      },
    },
    optimizeDeps: {
      include: ['openseadragon'],
    },
  };
});
