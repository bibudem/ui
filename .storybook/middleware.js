import { hasBooleanParam } from '../src/utils/url.js'

export default function middleware(router) {
  router.get('/consent-server', function (req, res) {
    const url = new URL(req.url, 'http://localhost')
    const debug = hasBooleanParam(url, 'debug')

    res.send(`
    <!doctype>
    <html>
      <head>
        <script type="module" src="/@vite/client"></script>
      </head>
    <body style="margin: 0;">
      <bib-consent-server${debug ? ' debug' : ''}></bib-consent-server$>
      <script type="module" src="./sb-preview/runtime.js"></script>
      <script type="module" src="/virtual:/@storybook/builder-vite/vite-app.js"></script>
      <script type="module" src="/src/components/bib-consent/bib-consent-server.js"></script>
    </body>
    </html>
    `)
  })
}