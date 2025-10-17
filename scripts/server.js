import express from 'express'

const app = express()
const PORT = 9994

app.use(express.static('test-site', {
  extensions: ['html']
}))
app.use('/dist', express.static('dist'))

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})