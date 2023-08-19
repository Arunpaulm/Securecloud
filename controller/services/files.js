const fs = require('fs')
const path = require('path');
const moment = require("moment")

const decimals = 2
const bucket = process.env.BUCKETPATH

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

        console.log("\nCurrent directory filenames:");
        for (const file of files) {
            const filePath = path.join(bucket, file)
            const fileData = await getFileStat(filePath, file)
            dirDetails.push(fileData)
        }

        console.log(dirDetails)
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

function uploadFile(request, response) {

    var fstream;
    request.pipe(request.busboy);
    request.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: ", filename);
        console.log("Uploading: ", fieldname);
        fstream = fs.createWriteStream('../files/' + filename.filename, { flags: "ax" });
        file.pipe(fstream);
        fstream.on('close', function () {
            response.redirect('back');
        });
    });
    // console.log(response)
    response.send('user ' + request.params.id)
}

function downloadFile(request, response) {

    var fstream;
    request.pipe(request.busboy);
    request.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: ", filename);
        console.log("Uploading: ", fieldname);
        fstream = fs.createWriteStream('../files/' + filename.filename, { flags: "ax" });
        file.pipe(fstream);
        fstream.on('close', function () {
            response.redirect('back');
        });
    });
    // console.log(response)
    response.send('user ' + request.params.id)
}

module.exports = {
    getFiles,
    uploadFile,
    downloadFile
}