const fs = require('fs')
const path = require('path');
require('dotenv').config()
const moment = require("moment")

console.log(__dirname)
const decimals = 2
const bucket = path.join(__dirname, process.env.BUCKETPATH)

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

const dirDetails = []
fs.readdir(bucket, (err, files) => {
    if (err)
        console.log(err);
    else {
        console.log("\nCurrent directory filenames:");
        files.forEach(file => {
            const filePath = path.join(bucket, file)
            fs.stat(filePath, function (err, stats) {

                //Checking for errors
                if (err) {
                    console.log(err)
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
                    console.log(data)
                    dirDetails.push(data)
                }
            });
        })
    }
})