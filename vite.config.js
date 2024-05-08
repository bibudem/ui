import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { glob } from 'glob'
import terser from '@rollup/plugin-terser'
import banner from 'vite-plugin-banner'
import minifyHTMLLiterals from 'rollup-plugin-minify-html-literals-v3'
import pkg from './package.json'

const mainEntry = fileURLToPath(new URL('src/index.js', import.meta.url))
const componentsEntries = (await glob('src/components/**/*.js', { ignore: '**/*.stories.*' })).map(entry => fileURLToPath(new URL(entry, import.meta.url)))

export default defineConfig({
  build: {
    target: 'es2021',
    sourcemap: true,
    lib: {
      entry: [mainEntry, ...componentsEntries],
    },
    minify: 'terser',
    rollupOptions: {
      plugins: [
        terser({
          module: true,
          warnings: true,
          compress: {
            passes: 3
          }
        })
      ]
    }
  },
  plugins: [
    minifyHTMLLiterals(),
    banner(`/**\n * ${pkg.description}\n * @module ${pkg.name}\n * @version ${pkg.version}\n * @author ${pkg.author}\n * @license ${pkg.license}\n * @see ${pkg.homepage}\n */`)
  ],
  server: {
    host: true,
    port: 3001,
    open: "/",
  },
})