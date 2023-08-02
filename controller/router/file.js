const router = require('express').Router()
const busboy = require('connect-busboy');
const fileServices = require('../services/files')

router.get('/', fileServices.getFiles)

router.use(busboy())

router.post('/', fileServices.postFiles)

module.exports = router
