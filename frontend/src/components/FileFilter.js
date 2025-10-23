import React, { useEffect } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilesList } from '../store/filesSlice'

function FileFilter ({ selectedFile, searchText, onFilterChange, onSearchChange }) {
  const dispatch = useDispatch()
  const { filesList } = useSelector(state => state.files)

  useEffect(() => {
    if (filesList.length === 0) {
      dispatch(fetchFilesList())
    }
  }, [dispatch, filesList.length])

  // Ordenamiento natural usando localeCompare
  const sortedFilesList = [...filesList].sort((a, b) => 
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  )

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '4px',
      border: '1px solid #dee2e6'
    }}>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Filter by file name:
            </Form.Label>
            <Form.Select
              value={selectedFile}
              onChange={(e) => onFilterChange(e.target.value)}
              style={{ fontSize: '14px' }}
            >
              <option value="">All Files</option>
              {sortedFilesList.map(file => (
                <option key={file} value={file}>
                  {file}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Search:
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by file, text, number or hex..."
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ fontSize: '14px' }}
              />
              {searchText && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => onSearchChange('')}
                  style={{ fontSize: '14px' }}
                >
                  Clear
                </button>
              )}
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}

export default FileFilter