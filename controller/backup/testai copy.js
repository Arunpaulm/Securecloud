const { Nightfall } = require('nightfall-js/dist/nightfall.js')
const { Detector } = require("nightfall-js/dist/types/detectors.js")


const nfClient = new Nightfall();

const funa = async () => {
    // const response = await nfClient.scanFile('./FreeTestData1MBDOCX1.docx', {
    //     detectionRules: [
    //         {
    //             name: 'Secrets Scanner',
    //             logicalOp: 'ANY',
    //             detectors: [
    //                 {
    //                     // minNumFindings: 1,
    //                     minConfidence: Detector.Confidence.Possible,
    //                     displayName: 'File',
    //                     detectorType: Detector.Type.Nightfall,
    //                     nightfallDetector: '06bca5bd-b592-423b-b7f4-5f1d69d2ba04',
    //                 },
    //             ],
    //         },
    //     ],
    //     webhookURL: 'https://my-service.com/nightfall/listener',
    // });

    // if (response.isError) {
    //     console.log(response.getError());
    // }

    // // Save this ID to check for findings when you receive a webhook event from us
    // console.log(response.data);


    // const response = await nfClient.scanText(['My credit card number is  arerfer@gmail.com'], {
    //     detectionRuleUUIDs: ["ef554ad8-1a9a-403a-aaa8-74d252b452ad"],
    //     // detectionRules: [
    //     //     {
    //     //         name: 'Secrets Scanner 1',
    //     //         logicalOp: 'ANY',
    //     //         detectors: [
    //     //             {
    //     //                 minNumFindings: 1,
    //     //                 minConfidence: Detector.Confidence.Possible,
    //     //                 displayName: 'Credit Card Number',
    //     //                 detectorType: Detector.Type.Nightfall,
    //     //                 nightfallDetector: '74c1815e-c0c3-4df5-8b1e-6cf98864a454',
    //     //                 detectorUUID: "2caa8197-7e16-4c61-b1f9-a1ff3954a882"
    //     //             },
    //     //         ],
    //     //     },
    //     // ],
    // });

    // const response = await nfClient.scanText(['My credit card number is  arerfer@gmail.com'], {
    //     detectionRuleUUIDs: ["ef554ad8-1a9a-403a-aaa8-74d252b452ad"]
    // });

    if (response.isError) {
        console.log(response.getError());
    } else {
        console.log(JSON.stringify(response.data))
        response.data.findings.forEach((finding) => {
            if (finding.length > 0) {
                finding.forEach((result) => {
                    console.log(`Finding: ${result.finding}, Confidence: ${result.confidence}`);
                });
            }
        });
    }
}


funa()