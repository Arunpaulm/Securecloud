const LogsModel = require('../database/model/logs')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 201 failed 500
 */
async function createLogs(req, res) {
    try {
        console.log(" create logs ")
        const userId = req.headers["x-api-key"]
        const { fileId, filename, size, archivefileName, mimeType, encoding } = req.body;

        const Log = await LogsModel.create({
            file_id: fileId,
            user_id: userId,
            filename,
            size,
            archivefileName,
            mimeType,
            encoding
        });
        console.log("here user - ", Log)
        res.status(201).json({
            status: "success",
            data: {
                Log,
            },
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: false,
                message: "Log already exist",
            });
        }

        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 200 failed 500
 */
async function getAllLogs(req, res) {
    try {
        const userId = req.headers["x-api-key"]

        console.log(" getall logs ")
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;

        const Logs = await LogsModel.findAll({ where: { user_id: userId }, limit, offset: skip });

        res.status(200).json({
            status: true,
            length: Logs.length,
            Logs,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = {
    createLogs, getAllLogs
}