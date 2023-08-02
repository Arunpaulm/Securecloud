// Generate RSA key pair
const crypto = require('crypto');
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

// Function to encrypt data using the recipient's public key
function encryptData(data, publicKey) {
    const buffer = Buffer.from(data);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

// Function to decrypt data using the recipient's private key
function decryptData(encryptedData, privateKey) {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString();
}

// Example usage
const originalData = 'Hello, World!';
console.log('Original data:', originalData);

const encryptedData = encryptData(originalData, publicKey);
console.log('Encrypted data:', encryptedData);

const decryptedData = decryptData(encryptedData, privateKey);
console.log('Decrypted data:', decryptedData);