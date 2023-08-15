/**
 * HTTP API Gateway to serve data and services
 * to libra clients such as web, mobile and 3rd party clients
 */
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./router')
const morgan = require("morgan");
const cors = require("cors");

require('dotenv').config()

const app = express()

console.log('Started')
const port = process.env.API_PORT || 2021 // setting default port


const { dbConnect, sequelize } = require("./database/index");

app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'docs')))


/* landing request handler */
app.use("/", router)


/* all other invalid traffics are ignored */
app.all('*', (req, res) => {
    const error = `${req.url} - requested resource is not available`
    console.warn(error)
    return res.status(500).send({
        result: false,
        error,
    })
})

/* Start listening to port */
app.listen(port, async () => {
    console.info(`Listening on port ${port} in '${process.env.NODE_ENV}'`)
    await dbConnect();
})
