const externalApiService = require('../services/externalApiService')
const csvParserService = require('../services/csvParserService')

// Controlador para los endpoints relacionados con archivos
// Maneja las peticiones HTTP y coordina los servicios

class FilesController {
// Obtiene la lista de archivos disponibles
//  Endpoint: GET /files/list

  async getFilesList (req, res, next) {
    try {
      const files = await externalApiService.getFilesList()
      res.json({ files })
    } catch (error) {
      next(error)
    }
  }

  // Obtiene y procesa los datos de los archivos CSV
  // Endpoint: GET /files/data
  async getFilesData (req, res, next) {
    try {
      // Extraer el parámetro opcional de query
      const { fileName } = req.query

      // Obtener lista completa de archivos del API externo
      const filesList = await externalApiService.getFilesList()

      // Si se especificó fileName, filtrar solo ese archivo
      // Si no, procesar todos los archivos
      const filesToProcess = fileName
        ? filesList.filter(file => file === fileName)
        : filesList

      const filesData = []

      // Procesar cada archivo
      for (const file of filesToProcess) {
        // Descargar contenido del archivo
        const csvContent = await externalApiService.downloadFile(file)

        // Si la descarga falló, continuar con el siguiente archivo
        if (!csvContent) {
          continue
        }

        // Parsear CSV y obtener solo líneas válidas
        const lines = csvParserService.parseCSV(csvContent, file)

        // Solo incluir archivos que tengan al menos una línea válida
        if (lines.length > 0) {
          filesData.push({
            file,
            lines
          })
        }
      }
      // Retornar datos formateados como JSON
      res.json(filesData)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FilesController()
