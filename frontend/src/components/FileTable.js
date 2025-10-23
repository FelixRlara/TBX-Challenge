import React from 'react'
import { Table } from 'react-bootstrap'

function FileTable ({ files }) {
  const allLines = []
  
  files.forEach(fileData => {
    fileData.lines.forEach(line => {
      allLines.push({
        fileName: fileData.file,
        text: line.text,
        number: line.number,
        hex: line.hex
      })
    })
  })

  // Ordenamiento natural
  const sortedLines = allLines.sort((a, b) => 
    a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: 'base' })
  )

  return (
    <div style={{ 
      backgroundColor: 'white',
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Table striped bordered hover responsive className="mb-0">
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={{ 
              fontWeight: '600', 
              fontSize: '14px',
              padding: '12px',
              borderBottom: '2px solid #dee2e6'
            }}>
              File Name
            </th>
            <th style={{ 
              fontWeight: '600', 
              fontSize: '14px',
              padding: '12px',
              borderBottom: '2px solid #dee2e6'
            }}>
              Text
            </th>
            <th style={{ 
              fontWeight: '600', 
              fontSize: '14px',
              padding: '12px',
              borderBottom: '2px solid #dee2e6'
            }}>
              Number
            </th>
            <th style={{ 
              fontWeight: '600', 
              fontSize: '14px',
              padding: '12px',
              borderBottom: '2px solid #dee2e6'
            }}>
              Hex
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedLines.map((line, index) => (
            <tr key={`${line.fileName}-${index}`}>
              <td style={{ fontSize: '13px', padding: '10px' }}>
                {line.fileName}
              </td>
              <td style={{ fontSize: '13px', padding: '10px' }}>
                {line.text}
              </td>
              <td style={{ fontSize: '13px', padding: '10px' }}>
                {line.number.toLocaleString()}
              </td>
              <td style={{ 
                fontSize: '13px', 
                padding: '10px',
                fontFamily: 'monospace',
                wordBreak: 'break-all'
              }}>
                {line.hex}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ 
        padding: '12px 15px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #dee2e6',
        fontSize: '13px',
        color: '#6c757d'
      }}>
        Total records: <strong>{sortedLines.length}</strong>
      </div>
    </div>
  )
}

export default FileTable