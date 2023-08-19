const router = require('express').Router()
const busboy = require('connect-busboy');
const { getFiles, uploadFile, downloadFile } = require('../services/files')

router.use(busboy())

router
    .route("/")
    .get(getFiles);

router
    .route("/upload")
    .post(uploadFile)

router
    .route("/download")
    .post(downloadFile)


module.exports = router
