import * as Crypto from 'expo-crypto';

async function start() {
    const algorithm = "aes-128-xts"
    let key = Crypto.getRandomBytes(32);

    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        'GitHub stars are neat 🌟'
    );
    console.log('Digest: ', digest);
    /* Some crypto operation... */

}

export default start