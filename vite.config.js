import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { glob } from 'glob'
import rollupPluginMinifyHtmlLiteralsModule from 'rollup-plugin-minify-html-literals'

const { default: minifyHTMLLiterals } = rollupPluginMinifyHtmlLiteralsModule
const mainEntry = fileURLToPath(new URL('src/index.js', import.meta.url))
const componentsEntries = (await glob('src/components/**/*.js', { ignore: '**/*.stories.*' })).map(entry => fileURLToPath(new URL(entry, import.meta.url)))

export default defineConfig({
  build: {
    target: 'es2021',
    sourcemap: true,
    lib: {
      entry: [mainEntry, ...componentsEntries],
    },
  },
  plugins: [
    minifyHTMLLiterals(),
  ],
  server: {
    host: true,
    port: 3001,
    open: "/",
  },
})