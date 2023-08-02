const express = require('express')

const router = express.Router()

// router.use('/user', require('./users.js'))

router.use('/file', require('./file.js'))

router.get('/', (req, res) =>
    res.send({
        message: "Welcome to SecureCloud API",
        success: true,
        version: '1.0.0',
    })
)

module.exports = router