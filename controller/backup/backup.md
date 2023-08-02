function xts_aes_128(data, key, iv) {
    // Encrypt the data using AES-128.
    var cipher = CryptoJS.AES.encrypt(data, key);

    // Create the XTS tweak.
    var tweak = iv.concat(cipher.iv);

    // Encrypt the ciphertext using XTS.
    var encrypted = cipher.ciphertext.map(function (byte) {
        return byte ^ tweak[byte % tweak.length];
    });

    return encrypted;
}

// Decrypt the data using XTS-AES-128.
function xts_aes_128_decrypt(data, key, iv) {
    // Decrypt the ciphertext using XTS.
    var decrypted = data.map(function (byte) {
        return byte ^ tweak[byte % tweak.length];
    });

    // Create the ciphertext from the decrypted data.
    var ciphertext = new Uint8Array(decrypted);
    ciphertext.iv = iv;

    // Decrypt the ciphertext using AES-128.
    var plaintext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

    return plaintext;
}


npm install crypto - js
