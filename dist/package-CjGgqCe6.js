/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.15.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const o = "@bibudem/ui", e = { name: o, version: "0.15.0", description: "Librairie du system desing des Bibliothèques de l'Université de Montréal", author: "Christian Rémillard <christian.remillard@umontreal.ca>", homepage: "https://github.com/bibudem/ui", keywords: ["system design"], license: "ISC", repository: { type: "git", url: "https://github.com/bibudem/ui.git" }, type: "module", module: "src/index.js", main: "dist/index.js", scripts: { storybook: "storybook dev -p 6006 --no-open", "storybook-docs": "storybook dev --docs", build: "cross-env NODE_ENV=production vite build", "build:watch": "cross-env NODE_ENV=production vite build --watch", "build-storybook": "storybook build --output-dir build-storybook", chromatic: "npx chromatic", dev: "storybook dev -p 6006 --no-open", version: "npm run build", preview: "npm-run-all set-env:production --parallel preview:*", "preview:build": "vite build --watch", "preview:serve": "vite preview --no-open", "set-env:production": "cross-env NODE_ENV=production" }, dependencies: { "@auroratide/toggle-switch": "^0.2.3", "@lit/context": "^1.1.2", "@material/web": "^1.4.1", "@whitespace/storybook-addon-html": "^6.1.1", "boolify-string": "^2.0.2", express: "^4.19.2", idb: "^8.0.0", "lodash-es": "^4.17.21", "postmessage-promise": "^3.2.1" }, devDependencies: { "@babel/plugin-proposal-decorators": "^7.24.1", "@chromatic-com/storybook": "^1.4.0", "@lit/task": "^1.0.0", "@ljcl/storybook-addon-cssprops": "^4.0.0", "@rollup/plugin-terser": "^0.4.4", "@storybook/addon-a11y": "^8.2.4", "@storybook/addon-essentials": "^8.2.4", "@storybook/addon-links": "^8.2.4", "@storybook/addon-mdx-gfm": "^8.2.4", "@storybook/blocks": "^8.2.4", "@storybook/test": "^8.2.4", "@storybook/web-components": "^8.2.4", "@storybook/web-components-vite": "^8.2.4", chromatic: "^11.3.0", "cross-env": "^7.0.3", "cross-var": "^1.1.0", glob: "^10.3.12", lit: "^3.1.3", "npm-run-all": "^4.1.5", "rollup-plugin-minify-html-literals-v3": "^1.3.4", sass: "^1.75.0", storybook: "^8.2.4", "vite-plugin-banner": "^0.7.1" } };
export {
  o as n,
  e as p
};
//# sourceMappingURL=package-CjGgqCe6.js.map
