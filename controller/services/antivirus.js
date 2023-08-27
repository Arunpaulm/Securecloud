const axios = require("axios")

const AntiVirusModel = require('../database/model/antivirus')


function getAVreport(analysisId) {
    return new Promise((resolve, reject) => {
        const axiosInstance = axios.create({
            baseURL: process.env.ANTIVIRUSAPI,
            timeout: 1000,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                'accept': 'application/json',
                "x-apikey": process.env.ANTIVIRUSAPIKEY
            }
        });

        axiosInstance.get("/analyses/" + analysisId).then(analysesresponse => {
            console.log("analysesresponse - ", analysesresponse.data)
            resolve(analysesresponse.data)

        }).catch(anerr => {
            console.log("anti virus analyses api  ", anerr)
            reject(anerr)
        })
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 200 failed 500
 */
async function getAntiVirusReport(req, res) {
    try {
        const userId = req.headers["x-api-key"]

        const fileId = req.params["file_id"]

        if (!fileId) res.status(500).json({
            status: false,
            message: "File id is empty",
        });

        console.log(" getall Anti Virus Report ")
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;

        const [AntiVirus] = await AntiVirusModel.findAll({ where: { user_id: userId, file_id: fileId }, limit, offset: skip });

        console.log(AntiVirus)

        const report = await getAVreport(AntiVirus.dataValues?.analysisId)

        res.status(200).json({
            status: true,
            ...report
            // length: logs.length,
            // logs,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = { getAntiVirusReport }