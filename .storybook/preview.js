import '../stories/css/global.css'

/** @type { import('@storybook/web-components').Preview } */
export default {
  parameters: {
    controls: {
      expanded: false,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


