const { Nightfall } = require('nightfall-js/dist/nightfall.js')
const { Detector } = require("nightfall-js/dist/types/detectors.js")


const nfClient = new Nightfall();

const funa = async () => {
    const response = await nfClient.scanText([
        `
        My credit card number is 4242-4242-4242-4242
        My Email is arerfer@gmail.com 
        The customer social security number is 458-02-6124
    `], {
        detectionRuleUUIDs: ["ef554ad8-1a9a-403a-aaa8-74d252b452ad"]
    });

    if (response.isError) {
        console.log(response.getError());
    } else {
        console.log(JSON.stringify(response.data))
        console.log()
        console.log()
        console.log()

        response.data.findings.forEach((finding) => {
            if (finding.length > 0) {
                finding.forEach((result) => {
                    console.log(`Found: ${result.detector.name}: Finding: ${result.finding}, Confidence: ${result.confidence}`);
                });
            }
        });
    }
}


funa()