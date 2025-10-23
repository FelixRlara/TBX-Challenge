const axios = require('axios')

// Configuración del API externo de TBX
const API_BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const API_KEY = 'Bearer aSuperSecretKey'

// Servicio para interactual con el Api Externo de TBX
// maneja la obtencion de la lista de archivos y descarga de archivos csv 
class ExternalApiService {
  constructor () {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: API_KEY
      },
      timeout: 10000
    })
  }

  // Obtiene la lista de archivos disponibles desde el API externo

  async getFilesList () {
    try {
      const response = await this.client.get('/files')
      return response.data.files || []
    } catch (error) {
      console.error('Error fetching files list:', error.message)
      throw new Error('Failed to fetch files list from external API')
    }
  }

  // Descarga el contenido de un archivo CSV especifico

  async downloadFile (fileName) {
    try {
      const response = await this.client.get(`/file/${fileName}`)
      return response.data
    } catch (error) {
      console.error(`Error downloading file ${fileName}:`, error.message)
      return null
    }
  }
}

module.exports = new ExternalApiService()
