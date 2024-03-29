const crypto = require('crypto');
const fs = require('fs')

// console.log(" All available algorithms - ", crypto.getCiphers().toString())

const algorithm = "aes-128-xts"
// key & iv - 128-bit (16 byte)
// Defining key
let key = crypto.randomBytes(32);

key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

// Defining iv
const iv = crypto.randomBytes(16);

console.log("key - ", key.toString('hex'))
console.log("iv - ", iv.toString('hex'))

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
 * @param {*} ciphertext 
 * @returns 
 */
const decrypt = (ciphertext) => {
    const iv = ciphertext.slice(0, 16);
    ciphertext = ciphertext.slice(16);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return decrypted
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

            console.log(" -- ", inputD)


            console.log("Buffer.byteLength - ", Buffer.byteLength(inputD))

            const plaintext = inputD.toString("base64")

            console.log("Buffer.byteLength - ", Buffer.byteLength(plaintext, "base64"))

            // console.log('Plaintext:', plaintext);

            const ciphertext = encrypt(plaintext);

            // console.log('Ciphertext:', ciphertext);

            resolve(ciphertext)
        })
    })

}

/**
 * 
 * @param {*} ciphertext 
 * @param {*} output 
 */
function decryptFile(ciphertext, output) {
    return new Promise((resolve, reject) => {
        const decrypted = decrypt(ciphertext);

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

async function index() {

    const file = "./inputfolder"
    const output = "./outputFolder"

    // const file = "./text.md"
    // const output = "./result.md"

    const ciphertext = await encryptFile(file)

    console.log(ciphertext)

    await decryptFile(ciphertext, output)
}

// index()


module.exports = {
    encryptFile,
    decryptFile
}