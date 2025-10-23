import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFilesData, getFilesList } from '../services/apiService'


//  Thunk asíncrono para obtener datos de archivos
//  Se puede llamar con o sin filtro de fileName
//   
//  Uso:
//  dispatch(fetchFilesData())           // Todos los archivos
//  dispatch(fetchFilesData('file1.csv')) // Solo file1.csv

export const fetchFilesData = createAsyncThunk(
  'files/fetchData',
  async (fileName = null) => {
    const data = await getFilesData(fileName)
    return data
  }
)


// Thunk asíncrono para obtener lista de archivos disponibles
// Se usa para popular el dropdown de filtro

export const fetchFilesList = createAsyncThunk(
  'files/fetchList',
  async () => {
    const files = await getFilesList()
    return files
  }
)


// Slice de Redux para manejo del estado de archivos
// Estado:
// data: Array con los archivos y sus líneas
// filesList: Array con nombres de archivos disponibles
// loading: Boolean indicando si hay una petición en curso
// error: String con mensaje de error o null


const filesSlice = createSlice({
  name: 'files',
  initialState: {
    data: [],
    filesList: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchFilesData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchFilesList.fulfilled, (state, action) => {
        state.filesList = action.payload
      })
  }
})

export default filesSlice.reducer