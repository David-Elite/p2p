const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');
const { title, nextTick } = require('process');

const router = express.Router();

const bucket = new S3(
    {
        secretAccessKey: '+saPvs5PPR6At6Adf6dHfWmJh6nAYOs9QHjMA40L',
        accessKeyId: 'AKIA2AFEKM2Z2U2TWRCE',
        region: 'ap-south-1'
    }
);



// Main APIs
router.post('/image/:type/:reference', (req, res) => {
    // const contentType = req.body.file.type;
    const type = req.params.type;
    const reference = req.params.reference;
    var busboy = new Busboy({ headers: req.headers });
    var id = 'unknown';
    var fileToUpload;
    var fileName;
    var contentType;

    console.log("Enter");

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        // file.on('data', function (data) {
        //     fileName = filename;
        //     fileToUpload = data;
        //     contentType = mimetype;
        // });
        // file.on('end', function () {
        // });

        console.log('Here');

        fileToUpload = file;
        fileName = filename;
        contentType = mimetype;

        const params = {
            Bucket: 'plans2pick-demo',
            Key: type + '/' + reference + '/' + Date.now().toString() + '-' + fileName,
            Body: fileToUpload,
            ACL: 'public-read',
            ContentType: contentType
        };
        console.log(params);
        bucket.upload(params, function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                res.status(401).send(err);
            }
            console.log('Successfully uploaded file.');
            db.query('INSERT INTO images SET ?', { reference_id: reference, type: type, image_url: data.Location }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(401).send(err);
                } else {
                    console.log("DB Updated");
                    res.send(data);
                }
            });
        });

    });
    req.pipe(busboy);
});

router.delete('/image/:img', (req, res) => {
    const img = req.params.img;
    console.log(img);
    db.query('DELETE FROM images WHERE id = ?', img, function (error, results) {
        if (error) throw error;
        console.log('Deleted Successfully');
        res.status(201).send(results);
    });
});

module.exports = router;