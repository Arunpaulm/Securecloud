const fs = require('fs')
const path = require('path');
const crypto = require('crypto');
const axios = require('axios')
const { parentPort, workerData } = require("worker_threads");

const encryptionType = {
    level3: {
        algorithm: "aes-128-xts",
        key: crypto.createHash('sha256').update(String(crypto.randomBytes(32))).digest('base64').substr(0, 32),
        iv: crypto.randomBytes(16)
    },
    level2: {
        algorithm: "aes-128-ctr",
        key: crypto.randomBytes(16),
        iv: crypto.randomBytes(16)
    },
    level1: {
        algorithm: "aes-128-cbc",
        key: crypto.randomBytes(16),
        iv: crypto.randomBytes(16)
    },
}

const bucket = process.env.BUCKETPATH

/**
 * 
 * @param {*} data 
 * @returns 
 */
const encrypt = (data, { algorithm, key, iv }) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([iv, cipher.update(data), cipher.final()]);
    return encrypted;
};

/**
 * 
 * @param {*} file 
 * @returns 
 */
async function encryptFile(file, encryptionCreds) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, inputD) => {
            if (err) {
                console.log(err)
                reject(err)
            };

            const plaintext = inputD.toString("base64")
            const ciphertext = encrypt(plaintext, encryptionCreds);
            resolve(ciphertext)
        })
    })

}

/**
 * 
 * @param {*} filename 
 */
async function mainEncryptfile({ filename, userId }) {
    const encryptionCreds = encryptionType["level3"]
    console.log("called")
    const encryptedFile = await encryptFile(path.join(bucket, "cache", filename.filename), encryptionCreds)
    console.log("encryptedFile - ", encryptedFile)
    const data = { ...filename, content: encryptedFile.toString("base64") }
    fs.writeFileSync(path.join(bucket, userId, filename.filename) + ".arc", JSON.stringify(data, null, 1), { flag: 'w+' })
    parentPort.postMessage(encryptionCreds.key)
}

mainEncryptfile(workerData)