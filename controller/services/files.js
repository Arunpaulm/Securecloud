const fs = require('fs')
const path = require('path');
const moment = require("moment")
const { Worker } = require("worker_threads");



const decimals = 2
const bucket = process.env.BUCKETPATH
const THREAD_COUNT = 4
/**
 * 
 * @param {*} size 
 * @returns size (Number)
 */
function getSize(size) {
    const convert = 1024
    const nearDeci = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    const i = Math.floor(Math.log(size) / Math.log(convert))

    const sizeName = sizes[i]
    const sizeConvert = size / Math.pow(convert, i)
    const sizeConverted = parseFloat(sizeConvert).toFixed(nearDeci)
    return `${sizeConverted} ${sizeName}`
}

/**
 * 
 * @returns 
 */
function readDir() {
    return new Promise((resolve, reject) => {
        fs.readdir(bucket, (err, files) => {
            if (err) {
                console.log(err);
                return reject(err)
            } else {
                resolve(files)
            }

        })
    })
}

/**
 * 
 * @param {*} filePath 
 * @param {*} file 
 * @returns 
 */
function getFileStat(filePath, file) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, function (err, stats) {
            //Checking for errors
            if (err) {
                console.log(err)
                return reject(err)
            }
            else {
                //Logging the stats Object
                // console.log(file);
                const data = {}
                // data.uid = stats.uid
                data.name = file
                data.uri = filePath
                data.size = getSize(stats.size)
                data.createdAt = moment(stats.birthtime).format("MMM DD YYYY h:mm A")
                data.modifiedAt = moment(stats.mtimeMs).format("MMM DD YYYY h:mm A")
                // console.log(data)
                resolve(data)
            }
        });
    })
}

/**
 * 
 * @returns 
 */
function getDirInformation() {
    return new Promise(async (resolve, reject) => {
        const dirDetails = []
        const files = await readDir()

        let id = 1
        for (const file of files) {
            const filePath = path.join(bucket, file)
            const fileData = await getFileStat(filePath, file)
            fileData.id = id
            dirDetails.push(fileData)
            id += 1
        }

        resolve(dirDetails)

    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getFiles(req, res) {
    getDirInformation().then(dirDetails => {
        res.status(200).json({
            status: true,
            data: dirDetails,
        });
    }).catch(err => { res.status(500).send(err) })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function uploadFile(req, res) {
    try {
        let fstream;
        const encryptedKeys = []
        const processInThread = []

        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: ", filename);
            // console.log("Uploading: ", fieldname);
            fstream = fs.createWriteStream(path.join(bucket, "cache", filename.filename), { flags: "as+" });
            file.pipe(fstream);
            fstream.on('close', function () {
                const spawnThread = new Promise((resolve, reject) => {
                    const worker = new Worker("./Utility/encryptfile.js", {
                        workerData: { filename, THREAD_COUNT },
                    });

                    worker.on("message", result => {
                        const keyData = {
                            ...filename,
                            key: result
                        }
                        encryptedKeys.push(keyData)
                        console.log("worker encryptedKeys - ", encryptedKeys)
                        resolve(true)
                    });

                    worker.on("error", error => {
                        console.log(error);
                        reject(error)
                    });
                })

                processInThread.push(spawnThread)
            })
        })

        console.log("processInThread - count - ", processInThread.length)
        Promise.all([new Promise((resolve) => {
            setTimeout(resolve, 150, 'foo');
        }), ...processInThread])
            .then(result => {
                console.log("result - ", result)
                console.log("encryptedKeys - ", encryptedKeys)
                res.status(200).json({
                    status: true,
                    message: "File created",
                    encryptedKeys
                })
            })
    } catch (err) {
        res.status(500).send({
            status: false,
            error: err
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function downloadFile(req, res) {
    try {

        if (!req.body?.filename) {
            res.status(404).send({
                status: false,
                error: "invalid filename"
            })
        }

        const processInThread = []

        const worker = new Worker("./Utility/decryptfile.js", {
            workerData: {
                filename: req.body?.filename + ".arc",
                key: req.body?.key,
                THREAD_COUNT
            },
        });

        processInThread.push(worker)

        Promise.all([new Promise((resolve) => {
            setTimeout(resolve, 150, 'foo');
        }), ...processInThread])
            .then(() => {
                const file = path.join(bucket, req.body?.filename)
                res.download(file); // Set disposition and send it.
            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    error: err
                })
            })

    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getFiles,
    uploadFile,
    downloadFile
}