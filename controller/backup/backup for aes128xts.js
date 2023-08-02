// const CryptoJS = require('crypto-js')

// function xts_aes_128(data, key, iv) {
//     // Encrypt the data using AES-128.
//     var cipher = CryptoJS.AES.encrypt(data, key);

//     // Create the XTS tweak.
//     var tweak = iv.concat(cipher.iv);

//     // console.log(cipher)

//     // Encrypt the ciphertext using XTS.
//     var encrypted = cipher.ciphertext.words.map(function (byte) {
//         return byte ^ tweak[byte % tweak.length];
//     });

//     return encrypted;
// }

// // Decrypt the data using XTS-AES-128.
// function xts_aes_128_decrypt(data, key, iv) {

//     // Create the XTS tweak.
//     var tweak = iv.concat(iv);

//     // Decrypt the ciphertext using XTS.
//     var decrypted = data.map(function (byte) {
//         return byte ^ tweak[byte % tweak.length];
//     });

//     // Create the ciphertext from the decrypted data.
//     var ciphertext = new Uint8Array(decrypted);
//     ciphertext.iv = iv;

//     // Decrypt the ciphertext using AES-128.
//     var plaintext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

//     return plaintext;
// }

// try 2 

// const CryptoJS = require("crypto-js");


// function xtsAes128Encrypt(plaintext, key, iv) {
//     // Check the lengths of the input parameters
//     // if (plaintext.length % 16 != 0) {
//     //     throw new Error("The plaintext must be a multiple of 16 bytes");
//     // }
//     // if (key.length != 32) {
//     //     throw new Error("The key must be 32 bytes long");
//     // }
//     // if (iv.length != 16) {
//     //     throw new Error("The IV must be 16 bytes long");
//     // }

//     // Create the AES cipher object
//     // var cipher = CryptoJS.AES(key);

//     // Encrypt the plaintext using XTS mode
//     var ciphertext = CryptoJS.AES.encrypt(plaintext, key, {
//         iv: iv,
//         mode: "xts-aes-128",
//     });

//     return ciphertext;
// }

// function xtsAes128Decrypt(ciphertext, key, iv) {
//     // Check the lengths of the input parameters
//     // if (ciphertext.length % 16 != 0) {
//     //     throw new Error("The ciphertext must be a multiple of 16 bytes");
//     // }
//     // if (key.length != 32) {
//     //     throw new Error("The key must be 32 bytes long");
//     // }
//     // if (iv.length != 16) {
//     //     throw new Error("The IV must be 16 bytes long");
//     // }

//     // Create the AES cipher object
//     // var cipher = CryptoJS.AES(key);

//     // Decrypt the ciphertext using XTS mode
//     var plaintext = CryptoJS.AES.decrypt(ciphertext, key, {
//         iv: iv,
//         mode: "xts"
//     });

//     return plaintext;
// }


// try 3 

// function xtsAes128Encrypt(plaintext, key, iv) {
//     // Generate the key schedule
//     var keySchedule = aes128.generateKeySchedule(key);

//     // Create the XTS cipher
//     var cipher = new XTSCipher(keySchedule, iv);

//     // Encrypt the plaintext
//     var ciphertext = cipher.encrypt(plaintext);

//     return ciphertext;
// }

// function xtsAes128Decrypt(ciphertext, key, iv) {
//     // Generate the key schedule
//     var keySchedule = aes128.generateKeySchedule(key);

//     // Create the XTS cipher
//     var cipher = new XTSCipher(keySchedule, iv);

//     // Decrypt the ciphertext
//     var plaintext = cipher.decrypt(ciphertext);

//     return plaintext;
// }

// const key = "11A1764225B11AA1"
// const iv = "11A1764225B11AA1"

// const crypto = require('crypto');

// // Calling the getCiphers() method
// // const cipher = crypto.getCiphers();

// // console.log("The list of all cipher algorithm are as follows: ", cipher.toString());

// const en = xts_aes_128("some,     data", key, iv)

// console.log(en)

// const de = xts_aes_128_decrypt(en, key, iv)

// console.log(de)

const crypto = require('crypto');

const algorithm = 'aes-128-xts';
// key & iv - 128-bit (16 byte)
// Defining key
const key = crypto.randomBytes(32);

// Defining iv
const iv = crypto.randomBytes(16);

console.log("key - ", key)
console.log("iv - ", iv)

const encrypt = (data) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return encrypted.toString('hex');
};

const decrypt = (ciphertext) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(ciphertext, 'hex')), decipher.final()]);
    return decrypted.toString();;
};

const plaintext = 'This is some plaintext data.';
const ciphertext = encrypt(plaintext);
const decrypted = decrypt(ciphertext);

console.log('Plaintext:', plaintext);
console.log('Ciphertext:', ciphertext);
console.log('Decrypted:', decrypted.toString("utf8"));