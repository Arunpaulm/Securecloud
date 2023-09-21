const router = require('express').Router()
const busboy = require('connect-busboy');
const { getFiles, uploadFile, downloadFile, deleteFile } = require('../services/files')

router
    .use(busboy())

router
    .route("/")
    .get(getFiles)
    .post(deleteFile)

router
    .route("/upload")
    .post(uploadFile)

router
    .route("/download")
    .post(downloadFile)


module.exports = router
