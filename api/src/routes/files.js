const express = require('express')
const router = express.Router()
const filesController = require('../controllers/filesController')

router.get('/data', filesController.getFilesData.bind(filesController))
router.get('/list', filesController.getFilesList.bind(filesController))

module.exports = router
