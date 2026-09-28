import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Fonts are only discovered once the CSS loads; preloading the Latin subsets
// lets them download alongside it so the title never swaps fonts on first paint.
const preloadLatinFonts = (): Plugin => ({
  name: 'preload-latin-fonts',
  apply: 'build',
  transformIndexHtml(_html, ctx) {
    return Object.keys(ctx.bundle ?? {})
      .filter(file => /-latin-wght-normal-[\w-]+\.woff2$/.test(file))
      .map(file => ({
        tag: 'link',
        attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${file}`, crossorigin: true },
        injectTo: 'head' as const,
      }))
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadLatinFonts()],
})
