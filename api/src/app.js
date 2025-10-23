const express = require('express')
const cors = require('cors')
const filesRouter = require('./routes/files')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware: CORS - Permite peticiones desde otros dominios
app.use(cors())

// Middleware: Parser JSON - Parsea el body de las peticiones como JSON
app.use(express.json())

// Rutas: Archivos - Endpoints para manejo de archivos CSV
app.use('/files', filesRouter)

// Endpoint: Health Check - Verifica que el servicio esté activo
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'tbx-api' })
})

// Middleware: Error Handler - Maneja errores de forma centralizada
app.use(errorHandler)

// Iniciar servidor solo si este archivo es el punto de entrada
// Esto permite importar 'app' en los tests sin iniciar el servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
  })
}

module.exports = app
