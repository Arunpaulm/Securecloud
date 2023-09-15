const fs = require('fs')
const path = require('path');
const moment = require("moment")
const { Worker } = require("worker_threads");
const axios = require("axios")
const FormData = require('form-data');

const AntiVirusModel = require('../database/model/antivirus')

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
function readDir(userId) {
    return new Promise((resolve, reject) => {
        const folderName = path.join(bucket, userId)
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        fs.readdir(folderName, (err, files) => {
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
function getDirInformation(userId) {
    return new Promise(async (resolve, reject) => {
        const dirDetails = []
        const files = await readDir(userId)

        let id = 1
        for (const file of files) {
            const filePath = path.join(bucket, userId, file)
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
    const userId = req.headers["x-api-key"]
    getDirInformation(userId).then(dirDetails => {
        res.status(200).json({
            status: true,
            data: dirDetails,
        });
    }).catch(err => { res.status(500).send(err) })
}

async function createAntiVirusReport({ id: fileId, userId, filename, avfileid, analysisId, size, status }) {
    const antiVirusModel = await AntiVirusModel
        .findOne({ where: { user_id: userId, file_id: fileId, } })
        .then(function (obj) {
            if (obj) {
                return obj.update({
                    file_id: fileId,
                    user_id: userId,
                    avfile_id: avfileid,
                    analysisId,
                    filename,
                    size,
                    status
                });
            } else {
                return AntiVirusModel.create({
                    file_id: fileId,
                    user_id: userId,
                    avfile_id: avfileid,
                    analysisId,
                    filename,
                    size,
                    status
                });
            }

        })
}

function scanFile(inputFile, keyData) {
    const axiosInstance = axios.create({
        baseURL: process.env.ANTIVIRUSAPI,
        timeout: 1000,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            'accept': 'application/json',
            "x-apikey": process.env.ANTIVIRUSAPIKEY
        }
    });

    const form = new FormData();
    form.append("file", fs.createReadStream(inputFile))

    axiosInstance.post("/files", form, {
        headers: { ...form.getHeaders() }
    }).then(filesresponse => {
        const analysisId = filesresponse.data?.data?.id
        axiosInstance.get("/analyses/" + analysisId).then(analysesresponse => {
            console.log("analysesresponse - ", analysesresponse.data)
            const size = analysesresponse.data?.meta?.file_info?.size
            const sha256 = analysesresponse.data?.meta?.file_info?.sha256

            const status = analysesresponse.data?.data?.attributes?.status
            const payload = { ...keyData, size, avfileid: sha256, analysisId, status }
            return createAntiVirusReport(payload)

        }).catch(anerr => {
            console.log("anti virus analyses api  ", anerr)
        })
    }).catch(err => {
        console.log("anti virus files api  ", err)
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function uploadFile(req, res) {
    try {
        const userId = req.headers["x-api-key"]
        console.log("userId - ", userId)
        let fstream;
        const encryptedKeys = []
        const processInThread = []
        const allInputFiles = []
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {

            console.log("Uploading fieldname: ", fieldname);

            console.log("Uploading file: ", file);

            console.log("Uploading filename: ", filename);
            // console.log("Uploading: ", fieldname);
            // const [inputFileName, inputFileType] = filename?.filename?.split(".")
            const generatedFileName = [filename?.filename, "[" + fieldname + "]"].join("")
            const inputFile = path.join(bucket, "cache", generatedFileName)
            allInputFiles.push(inputFile)
            fstream = fs.createWriteStream(inputFile, { flags: "as+" });
            file.pipe(fstream);
            fstream.on('close', function () {
                const spawnThread = new Promise((resolve, reject) => {
                    const worker = new Worker("./Utility/encryptfile.js", {
                        workerData: { filename: { ...filename, filename: generatedFileName }, THREAD_COUNT, userId },
                    });

                    worker.on("message", async result => {
                        const keyData = {
                            ...filename,
                            archivefileName: generatedFileName + ".arc",
                            key: result,
                            id: fieldname
                        }

                        await scanFile(inputFile, { ...keyData, userId })
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
                setTimeout(() => {
                    allInputFiles.map(aIf => {
                        fs.unlink(aIf, (err) => {
                            console.log(err)
                        })
                    })
                }, 2000)
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
        const userId = req.headers["x-api-key"]

        if (!req.body?.filename) {
            res.status(404).send({
                status: false,
                error: "invalid filename"
            })
        }

        const processInThread = []

        const worker = new Worker("./Utility/decryptfile.js", {
            workerData: {
                ...req.body,
                userId,
                THREAD_COUNT
            },
        });

        processInThread.push(worker)

        Promise.all([new Promise((resolve) => {
            setTimeout(resolve, 200, 'foo');
        }), ...processInThread])
            .then(() => {
                const file = path.join(bucket, req.body?.filename)
                res.download(file); // Set disposition and send it.
                setTimeout(() => {
                    fs.unlink(file, (err) => {
                        console.log(err)
                    })
                }, 2000)
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