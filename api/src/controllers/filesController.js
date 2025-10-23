const externalApiService = require('../services/externalApiService')
const csvParserService = require('../services/csvParserService')

class FilesController {
  async getFilesList (req, res, next) {
    try {
      const files = await externalApiService.getFilesList()
      res.json({ files })
    } catch (error) {
      next(error)
    }
  }

  async getFilesData (req, res, next) {
    try {
      const { fileName } = req.query

      const filesList = await externalApiService.getFilesList()

      const filesToProcess = fileName
        ? filesList.filter(file => file === fileName)
        : filesList

      const filesData = []

      for (const file of filesToProcess) {
        const csvContent = await externalApiService.downloadFile(file)

        if (!csvContent) {
          continue
        }

        const lines = csvParserService.parseCSV(csvContent, file)

        if (lines.length > 0) {
          filesData.push({
            file,
            lines
          })
        }
      }
      res.json(filesData)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FilesController()
