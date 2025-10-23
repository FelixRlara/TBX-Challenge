import axios from 'axios'


const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:3000'
  : ''  

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

export const getFilesData = async (fileName = null) => {
  const url = fileName ? `/files/data?fileName=${fileName}` : '/files/data'
  const response = await apiClient.get(url)
  return response.data
}

export const getFilesList = async () => {
  const response = await apiClient.get('/files/list')
  return response.data.files
}

export default {
  getFilesData,
  getFilesList
}