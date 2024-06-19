import { hasBooleanParam } from '../src/utils/url.js'

export default function middleware(router) {
  router.get('/server-gestion-temoins', function (req, res) {
    const url = new URL(req.url, 'http://localhost')
    const debug = hasBooleanParam(url, 'debug')

    res.send(`
    <!doctype>
    <html>
      <head>
        <script type="module" src="/@vite/client"></script>
      </head>
    <body style="margin: 0;">
      <bib-gestion-temoins-server${debug ? ' debug' : ''}></bib-gestion-temoins-server$>
      <script type="module" src="./sb-preview/runtime.js"></script>
      <script type="module" src="/virtual:/@storybook/builder-vite/vite-app.js"></script>
      <script type="module" src="/src/components/bib-gestion-temoins/bib-gestion-temoins-server.js"></script>
    </body>
    </html>
    `)
  })
}