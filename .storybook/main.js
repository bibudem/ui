/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    // '../stories/**/*.mdx',
    // '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@ljcl/storybook-addon-cssprops'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    disableWhatsNewNotifications: true
  }
}
export default config
