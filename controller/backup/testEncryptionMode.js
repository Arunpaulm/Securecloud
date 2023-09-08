const crypto = require('crypto');
const moment = require("moment")
const fs = require('fs')

function encrypt(data, { name, key, iv }) {

    const cipher = crypto.createCipheriv(name, key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return encrypted.toString('hex');
}

const encryptionTypes = [
    {
        name: "aes-128-xts",
        key: crypto.randomBytes(32),
        iv: crypto.randomBytes(16)
    },
    {
        name: "aes-128-cbc",
        key: crypto.randomBytes(16),
        iv: crypto.randomBytes(16)
    },
    {
        name: "aes-128-ctr",
        key: crypto.randomBytes(16),
        iv: crypto.randomBytes(16)
    },
    {
        name: "aes-128-cfb",
        key: crypto.randomBytes(16),
        iv: crypto.randomBytes(16)
    },
    {
        name: "aes-128-ofb",
        key: crypto.randomBytes(16),
        iv: crypto.randomBytes(16)
    },
    {
        name: "aes-128-ecb",
        key: crypto.randomBytes(16),
        iv: null
    },
];

const iterations = 5
const file = "./Free_Test_Data_1MB_PDF.pdf"

var stats = fs.statSync(file)
var fileSizeInBytes = stats.size;
// Convert the file size to megabytes (optional)
var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

fs.readFile(file, (err, data) => {
    if (err) {
        console.log(err)
        throw err
    };

    const plaintext = data.toString("base64")

    const results = {};

    encryptionTypes.map(en => results[`${en.name}`] = [])

    for (let i = 1; i <= iterations; i++) {

        for (const encryptionType of encryptionTypes) {

            const start = performance.now();
            const startTime = +new Date()

            const encryptedData = encrypt(plaintext, encryptionType);

            const endTime = +new Date()
            const end = performance.now()

            const latency = (end - start)
            const time = (endTime - startTime)
            const throughput = (plaintext.length / time) / (1024 * 1024)

            results[encryptionType.name].push({
                name: encryptionType.name,
                latency,
                throughput,
                time: moment(time).millisecond()
            });
        }

        // results.push(result)
    }

    // console.log(results)

    const finalResult = []
    for (const enType in results) {
        const name = enType
        let latency = 0
        let throughput = 0
        let time = 0
        results[enType].map(res => {
            latency = latency + res.latency
            throughput = throughput + res.throughput
            time = time + res.time
        })

        latency = latency / iterations
        throughput = throughput / iterations
        time = time / iterations

        finalResult.push({
            name, latency, throughput, time
        })
    }

    console.log(finalResult)

})

