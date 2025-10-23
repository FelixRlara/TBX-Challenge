const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')

const { expect } = chai
chai.use(chaiHttp)

describe('Files API - Integration Tests (Real Data)', () => {
  const TIMEOUT = 30000

  describe('GET /health', () => {
    it('should return health status', (done) => {
      chai.request(app)
        .get('/health')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('status', 'ok')
          expect(res.body).to.have.property('service', 'tbx-api')
          done()
        })
    })
  })

  describe('GET /files/list', () => {
    it('should return list of files from real API', function (done) {
      this.timeout(TIMEOUT)

      chai.request(app)
        .get('/files/list')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('files')
          expect(res.body.files).to.be.an('array')
          expect(res.body.files.length).to.be.greaterThan(0)

          // Verificar que son archivos CSV
          res.body.files.forEach(file => {
            expect(file).to.match(/\.csv$/)
          })

          done()
        })
    })
  })

  describe('GET /files/data', () => {
    it('should return formatted files data from real API', function (done) {
      this.timeout(TIMEOUT)

      chai.request(app)
        .get('/files/data')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')

          // Puede haber archivos sin líneas válidas
          // Solo verificamos los que tienen datos
          const filesWithData = res.body.filter(f => f.lines.length > 0)

          filesWithData.forEach(fileData => {
            // Verificar estructura
            expect(fileData).to.have.property('file')
            expect(fileData).to.have.property('lines')
            expect(fileData.file).to.match(/\.csv$/)
            expect(fileData.lines).to.be.an('array')

            // Verificar cada línea
            fileData.lines.forEach(line => {
              expect(line).to.have.property('text')
              expect(line).to.have.property('number')
              expect(line).to.have.property('hex')

              // Validaciones de negocio
              expect(line.text).to.be.a('string')
              expect(line.text).to.have.length.greaterThan(0)

              expect(line.number).to.be.a('number')
              // eslint-disable-next-line no-unused-expressions
              expect(line.number).to.be.finite

              expect(line.hex).to.be.a('string')
              expect(line.hex).to.match(/^[a-f0-9]{32}$/i)
            })
          })

          done()
        })
    })

    it('should filter by fileName query parameter with real data', function (done) {
      this.timeout(TIMEOUT)

      // Primero obtener lista de archivos reales
      chai.request(app)
        .get('/files/list')
        .end((_err, listRes) => {
          const files = listRes.body.files

          if (files.length === 0) {
            return done()
          }

          // Tomar el primer archivo
          const fileName = files[0]

          // Consultar datos de ese archivo específico
          chai.request(app)
            .get(`/files/data?fileName=${fileName}`)
            .end((_err, res) => {
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('array')

              // Si hay datos, verificar que son del archivo correcto
              if (res.body.length > 0) {
                res.body.forEach(item => {
                  expect(item.file).to.equal(fileName)
                })
              }

              done()
            })
        })
    })

    it('should return empty array for non-existent fileName', function (done) {
      this.timeout(TIMEOUT)

      chai.request(app)
        .get('/files/data?fileName=this-file-does-not-exist-999.csv')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(0)
          done()
        })
    })

    it('should validate CSV format correctly with real data', function (done) {
      this.timeout(TIMEOUT)

      chai.request(app)
        .get('/files/data')
        .end((_err, res) => {
          expect(res).to.have.status(200)

          res.body.forEach(fileData => {
            fileData.lines.forEach(line => {
              // Todas las líneas retornadas deben cumplir validaciones

              // Number debe ser un número válido
              expect(line.number).to.be.a('number')
              // eslint-disable-next-line no-unused-expressions
              expect(isNaN(line.number)).to.be.false

              // Hex debe ser exactamente 32 caracteres hexadecimales
              expect(line.hex).to.match(/^[a-f0-9]{32}$/i)

              // Text no debe estar vacío
              expect(line.text.trim()).to.have.length.greaterThan(0)
            })
          })

          done()
        })
    })

    it('should handle all files and skip invalid ones', function (done) {
      this.timeout(TIMEOUT)

      chai.request(app)
        .get('/files/data')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')

          // El API debe responder correctamente incluso si hay archivos con errores
          // Solo retorna archivos que tienen al menos una línea válida

          let totalLines = 0
          res.body.forEach(fileData => {
            totalLines += fileData.lines.length
          })

          console.log(`Total files processed: ${res.body.length}`)
          console.log(`Total valid lines: ${totalLines}`)

          // Si hay datos, verificar estructura
          if (res.body.length > 0) {
            expect(totalLines).to.be.greaterThan(0)
          }

          done()
        })
    })
  })

  describe('Error Handling with Real API', () => {
    it('should handle malformed fileName gracefully', function (done) {
      this.timeout(TIMEOUT)

      chai.request(app)
        .get('/files/data?fileName=../etc/passwd')
        .end((_err, res) => {
          // Debe responder correctamente, no crashear
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })
})
