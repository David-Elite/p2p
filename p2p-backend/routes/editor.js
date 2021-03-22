const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');

const router = express.Router();

const bucket = new S3(
    {
        secretAccessKey: '+saPvs5PPR6At6Adf6dHfWmJh6nAYOs9QHjMA40L',
        accessKeyId: 'AKIA2AFEKM2Z2U2TWRCE',
        region: 'ap-south-1'
    }
);

router.post('/editor/image', (req, res) => {
    // const contentType = req.body.file.type;
    var busboy = new Busboy({ headers: req.headers });
    var fileToUpload;
    var fileName;
    var contentType;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        // console.log(id);
        fileToUpload = file;
        fileName = filename;
        contentType = mimetype;

        const params = {
            Bucket: 'plans2pick-demo',
            Key: 'editor/' + fileName,
            Body: fileToUpload,
            ACL: 'public-read',
            ContentType: contentType
        };
        bucket.upload(params, function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                res.status(401).send(err);
            }
            console.log('Successfully uploaded file.', data);
            res.send(data);
        });
    });
    req.pipe(busboy);

});

module.exports = router;