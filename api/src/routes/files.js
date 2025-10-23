const express = require('express')
const router = express.Router()
const filesController = require('../controllers/filesController')

router.get('/data', filesController.getFilesData)
router.get('/list', filesController.getFilesList)

module.exports = router
