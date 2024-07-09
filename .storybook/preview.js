import '../stories/css/global.css'

/** @type { import('@storybook/web-components').Preview } */
export const parameters = {
  actions: {
    argTypesReges: '^on.*'
  },
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
    removeComments: /^\?lit\$\d+\$$/,
    removeEmptyComments: true, // default: false
    highlighter: {
      showLineNumbers: true
    },
    transform: code => code.replace(/<button[^<]+<\/button>/g, '')
  },
}


