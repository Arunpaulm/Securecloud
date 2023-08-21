const fs = require('fs')
const path = require('path');
const crypto = require('crypto');
const { parentPort, workerData } = require("worker_threads");

const algorithm = "aes-128-xts"
let key = crypto.randomBytes(32);
key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

const iv = crypto.randomBytes(16);
const bucket = process.env.BUCKETPATH

/**
 * 
 * @param {*} data 
 * @returns 
 */
const encrypt = (data) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([iv, cipher.update(data), cipher.final()]);
    return encrypted;
};

/**
 * 
 * @param {*} file 
 * @returns 
 */
async function encryptFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, inputD) => {
            if (err) {
                console.log(err)
                reject(err)
            };

            const plaintext = inputD.toString("base64")
            const ciphertext = encrypt(plaintext);
            resolve(ciphertext)
        })
    })

}

/**
 * 
 * @param {*} filename 
 */
async function mainEncryptfile(filename) {
    console.log("called")
    const encryptedFile = await encryptFile(path.join(bucket, "cache", filename.filename))
    console.log("encryptedFile - ", encryptedFile)
    const data = { ...filename, content: encryptedFile.toString("base64") }
    fs.writeFileSync(path.join(bucket, filename.filename) + ".arc", JSON.stringify(data, null, 1), { flag: 'w+' })
    parentPort.postMessage(key)
}

mainEncryptfile(workerData.filename)