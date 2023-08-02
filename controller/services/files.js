const fs = require('fs')

async function getFiles(request, response) {
    console.log(request)
    console.log(response)
    response.send('user ' + request.params.id)
}

function postFiles(request, response) {

    var fstream;
    request.pipe(request.busboy);
    request.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: ", filename);
        console.log("Uploading: ", fieldname);
        fstream = fs.createWriteStream('../files/' + filename.filename, { flags: "ax" });
        file.pipe(fstream);
        fstream.on('close', function () {
            response.redirect('back');
        });
    });
    // console.log(response)
    response.send('user ' + request.params.id)
}

module.exports = {
    getFiles,
    postFiles
}