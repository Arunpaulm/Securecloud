const router = require('express').Router()
const { createLogs, getAllLogs } = require('../services/logs')


router
    .route("/")
    .get(getAllLogs)
    .post(createLogs);


module.exports = router
