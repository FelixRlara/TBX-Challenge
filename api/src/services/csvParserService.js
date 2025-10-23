const { parse } = require('csv-parse/sync')

class CsvParserService {
  parseCSV (csvContent, fileName) {
    if (!csvContent || csvContent.trim() === '') {
      return []
    }

    try {
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true 
      })

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

  isValidRecord (record) {
    if (!record.file || !record.text || !record.number || !record.hex) {
      return false
    }
    const number = parseInt(record.number, 10)
    if (isNaN(number)) {
      return false
    }

    const hexRegex = /^[a-f0-9]{32}$/i
    if (!hexRegex.test(record.hex)) {
      return false
    }

    return true
  }
}

module.exports = new CsvParserService()
