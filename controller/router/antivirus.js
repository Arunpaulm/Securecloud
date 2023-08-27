const router = require('express').Router()
const { getAntiVirusReport } = require('../services/antivirus')


router
    .route("/:file_id")
    .get(getAntiVirusReport)

module.exports = router
