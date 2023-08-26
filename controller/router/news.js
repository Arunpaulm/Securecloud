const router = require('express').Router()
const { getAllNews } = require('../services/news')

router
    .route("/")
    .get(getAllNews)

module.exports = router
