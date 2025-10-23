const express = require('express')
const cors = require('cors')
const filesRouter = require('./routes/files')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use('/files', filesRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'tbx-api' })
})

app.use(errorHandler)

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
  })
}

module.exports = app
