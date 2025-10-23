import axios from 'axios'

// En Docker, webpack proxy redirige a http://api:3000
// En local, apunta a http://localhost:3000
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:3000'
  : ''  // En desarrollo usa el proxy de webpack

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

/**
 * Obtiene los datos procesados de los archivos CSV
 * @param {string|null} fileName - (Opcional) Nombre del archivo a filtrar
 * @returns {Promise<Array>} Array con los archivos y sus líneas válidas
 */
export const getFilesData = async (fileName = null) => {
  const url = fileName ? `/files/data?fileName=${fileName}` : '/files/data'
  const response = await apiClient.get(url)
  return response.data
}

/**
 * Obtiene la lista de archivos disponibles
 * @returns {Promise<Array<string>>} Array con los nombres de archivos
 */
export const getFilesList = async () => {
  const response = await apiClient.get('/files/list')
  return response.data.files
}

export default {
  getFilesData,
  getFilesList
}