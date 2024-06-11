export default function middleware(router) {
  router.get('/server-gestion-temoins', function (req, res) {
    res.send(`
    <!doctype>
    <html>
      <head>
        <script type="module" src="/@vite/client"></script>
      </head>
    <body class="sb-main-padded sb-show-main">
      <bib-gestion-temoins-server></bib-gestion-temoins-server>
      <script type="module" src="./sb-preview/runtime.js"></script>
      <script type="module" src="/virtual:/@storybook/builder-vite/vite-app.js"></script>
      <script type="module" src="/src/components/bib-gestion-temoins/bib-gestion-temoins-server.js"></script>
    </body>
    </html>
    `)
  })
}