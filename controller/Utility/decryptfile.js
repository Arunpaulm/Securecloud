const fs = require('fs')
const path = require('path');
const crypto = require('crypto');
const { workerData } = require("worker_threads");

const bucket = process.env.BUCKETPATH
const algorithm = "aes-128-xts"



/**
 * 
 * @param {*} ciphertext 
 * @returns 
 */
const decrypt = (ciphertext, key) => {
    const iv = ciphertext.slice(0, 16);
    ciphertext = ciphertext.slice(16);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return decrypted
};

/**
 * 
 * @param {*} ciphertext 
 * @param {*} output 
 */
function decryptFile(ciphertext, key, output) {
    return new Promise((resolve, reject) => {
        const decrypted = decrypt(ciphertext, key);

        const data = Buffer.from(decrypted.toString("ascii"), "base64")
        console.log(data.toString())
        // console.log('Decrypted: ', decrypted)
        // return fs.writeFileSync(output, data, { flag: 'w+' })
        fs.writeFile(output, data, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log("The file is updated with the given data")
                resolve("The file is updated with the given data")
            }
        })
    })
}

/**
 * 
 * @param {*} { filename, key } 
 * @returns 
 */
function mainDecryptFile({ filename, archivefileName, key, userId }) {
    console.log("filename - ", filename)
    console.log("key - ", key)
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(bucket, userId, archivefileName), (err, inputD) => {
            if (err) {
                console.log(err)
                reject(err)
            };
            const data = JSON.parse(inputD)
            console.log(data)
            const content = Buffer.from(data.content, "base64")
            console.log(content)
            decryptFile(content, key, path.join(bucket, filename))
                .then(() => {
                    resolve(true)
                })
        })
    })
}

mainDecryptFile(workerData)
    .then(() => { })
