import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

// Fonts are only discovered once the CSS loads; preloading the Latin subsets
// lets them download alongside it so the title never swaps fonts on first paint.
const preloadLatinFonts = (): Plugin => {
  let base = '/';
  return {
    name: 'preload-latin-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml(_html, ctx) {
      return Object.keys(ctx.bundle ?? {})
        .filter(file => /-latin-wght-normal-[\w-]+\.woff2$/.test(file))
        .map(file => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: base + file,
            crossorigin: true,
          },
          injectTo: 'head' as const,
        }));
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at https://suiryuu-cmd.github.io/todo-list-react/
  base: '/todo-list-react/',
  plugins: [react(), preloadLatinFonts()],
});
