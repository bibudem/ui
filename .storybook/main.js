/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@ljcl/storybook-addon-cssprops',
    '@chromatic-com/storybook',
    '@whitespace/storybook-addon-html'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {},
  core: {
    disableWhatsNewNotifications: true
  },
  staticDirs: ['../public']
}
export default config
