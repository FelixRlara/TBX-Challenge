const { parse } = require('csv-parse/sync')

// Servicio para parsear y validar archivos CSV
// Se encarga de convertir el contenido CSV en objetos JSON
// y filtrar líneas inválidas según los requisitos del negocio

class CsvParserService {
  parseCSV (csvContent, fileName) {
    // Validar que el contenido no esté vacío
    if (!csvContent || csvContent.trim() === '') {
      return []
    }

    try {
      // Parsear CSV usando csv-parse
      // columns: true -> convierte cada fila en objeto con keys del header
      // skip_empty_lines: true -> ignora líneas vacías
      // trim: true -> elimina espacios en blanco
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true // Permite filas con menos columnas
      })

      // Filtrar solo los registros válidos y transformarlos
      const validLines = records
        .filter(record => this.isValidRecord(record))
        .map(record => ({
          text: record.text,
          number: parseInt(record.number, 10),
          hex: record.hex
        }))

      return validLines
    } catch (error) {
      console.error(`Error parsing CSV for ${fileName}:`, error.message)
      return []
    }
  }

  // Validaciones aplicadas:
  //  Todos los campos requeridos deben existir (file, text, number, hex)
  //  El campo 'number' debe ser un número válido
  //  El campo 'hex' debe ser un hexadecimal de exactamente 32 dígitos

  isValidRecord (record) {
    // Validar que todos los campos existan
    if (!record.file || !record.text || !record.number || !record.hex) {
      return false
    }
    // Validar que 'number' sea un número válido
    const number = parseInt(record.number, 10)
    if (isNaN(number)) {
      return false
    }

    // Validar que 'hex' sea un hexadecimal de 32 dígitos
    // Regex: ^ inicio, [a-f0-9] caracteres hexadecimales, {32} exactamente 32, $ fin
    // Flag 'i' para case-insensitive

    const hexRegex = /^[a-f0-9]{32}$/i
    if (!hexRegex.test(record.hex)) {
      return false
    }

    return true
  }
}

module.exports = new CsvParserService()
