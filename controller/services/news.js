const axios = require('axios');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 200 failed 500
 */
async function getAllNews(req, res) {
    try {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.NEWSAPI + '?q=privacy&apiKey=' + process.env.NEWSAPIKEY,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const { articles } = response.data
                res.status(200).json({
                    status: true,
                    length: articles.length,
                    articles
                })
            }).catch((error) => {
                console.log(error);
            });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = {
    getAllNews
}