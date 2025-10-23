import React from 'react'
import { render, screen } from '@testing-library/react'
import FileTable from './FileTable'

describe('FileTable Component', () => {
  const mockFiles = [
    {
      file: 'test1.csv',
      lines: [
        { text: 'TestText1', number: 123, hex: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6' },
        { text: 'TestText2', number: 456, hex: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6' }
      ]
    },
    {
      file: 'test2.csv',
      lines: [
        { text: 'TestText3', number: 789, hex: 'c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6' }
      ]
    }
  ]

  test('renders all lines in single table', () => {
    render(<FileTable files={mockFiles} />)
    
    // Verificar que los textos únicos están presentes
    expect(screen.getByText('TestText1')).toBeInTheDocument()
    expect(screen.getByText('TestText2')).toBeInTheDocument()
    expect(screen.getByText('TestText3')).toBeInTheDocument()
    
    // Para textos que aparecen múltiples veces, usar getAllByText
    const test1Elements = screen.getAllByText('test1.csv')
    expect(test1Elements).toHaveLength(2) 
    
    const test2Elements = screen.getAllByText('test2.csv')
    expect(test2Elements).toHaveLength(1) 
  })

  test('renders table headers', () => {
    render(<FileTable files={mockFiles} />)
    
    expect(screen.getByText('File Name')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
    expect(screen.getByText('Number')).toBeInTheDocument()
    expect(screen.getByText('Hex')).toBeInTheDocument()
  })

  test('shows total records count', () => {
    render(<FileTable files={mockFiles} />)
    
    expect(screen.getByText(/Total records:/)).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('formats numbers with locale string', () => {
    const filesWithBigNumbers = [
      {
        file: 'test.csv',
        lines: [
          { text: 'Test', number: 1234567, hex: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6' }
        ]
      }
    ]
    
    render(<FileTable files={filesWithBigNumbers} />)
    
    expect(screen.getByText('1,234,567')).toBeInTheDocument()
  })

  test('renders all data correctly', () => {
    render(<FileTable files={mockFiles} />)
    
    // Verificar que todos los números están presentes
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('456')).toBeInTheDocument()
    expect(screen.getByText('789')).toBeInTheDocument()
    
    // Verificar que todos los hex están presentes
    expect(screen.getByText('a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6')).toBeInTheDocument()
    expect(screen.getByText('b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6')).toBeInTheDocument()
    expect(screen.getByText('c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6')).toBeInTheDocument()
  })

  test('handles empty files array', () => {
    render(<FileTable files={[]} />)
    
    // Debería mostrar los headers pero sin filas
    expect(screen.getByText('File Name')).toBeInTheDocument()
    expect(screen.getByText('Total records:')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('handles single file with single line', () => {
    const singleFile = [
      {
        file: 'single.csv',
        lines: [
          { text: 'SingleText', number: 999, hex: 'd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6' }
        ]
      }
    ]
    
    render(<FileTable files={singleFile} />)
    
    expect(screen.getByText('single.csv')).toBeInTheDocument()
    expect(screen.getByText('SingleText')).toBeInTheDocument()
    expect(screen.getByText('999')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument() // Total count
  })
})