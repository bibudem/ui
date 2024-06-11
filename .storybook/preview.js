import '../stories/css/global.css'

/** @type { import('@storybook/web-components').Preview } */
export const parameters = {
  controls: {
    expanded: false,
  },
  docs: {
    controls: {
      sort: 'requiredFirst'
    },
    canvas: {
      sourceState: 'shown'
    }
  },
  html: {
    root: '#root-inner',
    removeEmptyComments: true, // default: false
    highlighter: {
      showLineNumbers: true
    }
  },
}


