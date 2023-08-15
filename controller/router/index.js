const express = require('express')

const router = express.Router()

router.use('/user', require('./users.js'))

router.use('/file', require('./file.js'))

router.get('/health', (req, res) =>
    res.send({
        message: "Welcome to SecureCloud API",
        success: true
    })
)

router.all("*", (req, res) => {
    res.status(404).json({
        status: false,
        message: `Invalid Route or not found: ${req.originalUrl}`,
    });
});

module.exports = router