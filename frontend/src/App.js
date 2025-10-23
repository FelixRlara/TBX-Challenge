import React, { useEffect, useState } from 'react'
import { Container, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FileFilter from './components/FileFilter'
import FileTable from './components/FileTable'
import LoadingSpinner from './components/LoadingSpinner'
import { fetchFilesData, fetchFilesList } from './store/filesSlice'

function App () {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.files)
  const [selectedFile, setSelectedFile] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    dispatch(fetchFilesList())
    dispatch(fetchFilesData())
  }, [dispatch])

  const handleFilterChange = (fileName) => {
    setSelectedFile(fileName)
    if (fileName) {
      dispatch(fetchFilesData(fileName))
    } else {
      dispatch(fetchFilesData())
    }
  }

  const handleSearchChange = (text) => {
    setSearchText(text)
  }

  const filterDataBySearch = (data, searchText) => {
    if (!searchText) return data

    const search = searchText.toLowerCase()
    const filtered = []

    data.forEach(fileData => {
      const matchingLines = fileData.lines.filter(line => {
        return (
          fileData.file.toLowerCase().includes(search) ||
          line.text.toLowerCase().includes(search) ||
          line.number.toString().includes(search) ||
          line.hex.toLowerCase().includes(search)
        )
      })

      if (matchingLines.length > 0) {
        filtered.push({
          file: fileData.file,
          lines: matchingLines
        })
      }
    })

    return filtered
  }

  const filteredData = filterDataBySearch(data, searchText)

  return (
    <Container className="py-4">
      <div style={{ 
        backgroundColor: '#e74c3c', 
        color: 'white', 
        padding: '15px 20px',
        marginBottom: '20px',
        borderRadius: '4px'
      }}>
        <h3 style={{ margin: 0, fontWeight: 'normal' }}>React Test App</h3>
      </div>
      
      <FileFilter 
        selectedFile={selectedFile}
        searchText={searchText}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {loading && <LoadingSpinner />}

      {error && (
        <Alert variant="danger">
          Error: {error}
        </Alert>
      )}

      {!loading && !error && filteredData.length === 0 && (
        <Alert variant="info">
          No files found
        </Alert>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <FileTable files={filteredData} />
      )}
    </Container>
  )
}

export default App