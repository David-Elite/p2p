const express = require('express');
const db = require('../db');
const bucket = require('./s3bucket');
const Busboy = require('busboy');

const router = express.Router();

router.post('/link/:type/:referenceId', (req, res) => {
    const type = req.params.type;
    const referenceId = req.params.referenceId;
    var busboy = new Busboy({ headers: req.headers });
    var fileToUpload;
    var fileName;
    var contentType;
    var title;
    var subtitle;
    var url;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data) {
            if (fileToUpload == null) {
                fileToUpload = data;
            } else {
                fileToUpload = Buffer.concat([fileToUpload, data]);
            }
            fileName = filename;
            contentType = mimetype;
        });
        file.on('end', function() {
        })
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        if (fieldname == 'title') {
            title = val;
        }
        if (fieldname == 'subtitle') {
            subtitle = val;
        }
        if (fieldname == 'url') {
            url = val;
        }
    });
    busboy.on('finish', function () {
        if (fileToUpload) {
            const params = {
                Bucket: 'plans2pick-demo',
                Key: type + '/' + referenceId + '/links/' + Date.now().toString() + '-' + fileName,
                Body: fileToUpload,
                ACL: 'public-read',
                ContentType: contentType
            };
            bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    res.status(401).send(err);
                }
                console.log('Successfully uploaded file.');
                db.query("INSERT INTO link_list SET ?", {
                    // id: id,
                    reference_id: referenceId,
                    title: title,
                    subtitle: subtitle,
                    icon: data.Location,
                    url: url,
                    type: type
                }, function (error, results) {
                    if (error) throw error;
                    console.log('Inserted');
                    res.status(201).send(results);
                })
            });
        } else {
            db.query("INSERT INTO link_list SET ?", {
                // id: id,
                reference_id: referenceId,
                title: title,
                subtitle: subtitle,
                icon: null,
                url: url,
                type: type
            }, function (error, results) {
                if (error) throw error;
                console.log('Inserted');
                res.status(201).send(results);
            })
        }
    });
    req.pipe(busboy);
});

router.delete('/link/:linkId', (req, res) => {
    const id = req.params.linkId;
    db.query('DELETE FROM link_list WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/link/:type/:referenceId/:linkId', (req, res) => {
    const type = req.params.type
    const referenceId = req.params.referenceId;
    const linkId = req.params.linkId;
    var busboy = new Busboy({ headers: req.headers });
    var fileToUpload;
    var fileName;
    var contentType;
    var title;
    var url;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data) {
            if (fileToUpload == null) {
                fileToUpload = data;
            } else {
                fileToUpload = Buffer.concat([fileToUpload, data]);
            }
            fileName = filename;
            contentType = mimetype;
        });
        file.on('end', function() {
        })
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        if (fieldname == 'title') {
            title = val;
        }
        if (fieldname == 'subtitle') {
            subtitle = val;
        }
        if (fieldname == 'url') {
            url = val;
        }
    });
    busboy.on('finish', function () {
        if (fileToUpload != null) {
            const params = {
                Bucket: 'plans2pick-demo',
                Key: type + '/' + referenceId + '/links/' + Date.now().toString() + '-' + fileName,
                Body: fileToUpload,
                ACL: 'public-read',
                ContentType: contentType
            };
            bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    res.status(401).send(err);
                }
                console.log('Successfully uploaded file.');
                db.query(`UPDATE link_list SET ? WHERE id = ${linkId}`, {
                    title: title,
                    subtitle: subtitle,
                    icon: data.Location,
                    url: url
                }, function (error, results) {
                    if (error) throw error;
                    res.status(201).send(results);
                });
            });
        } else {
            db.query(`UPDATE link_list SET ? WHERE id = ${linkId}`, {
                title: title,
                subtitle: subtitle,
                url: url
            }, function (error, results) {
                if (error) throw error;
                res.status(201).send(results);
            });
        }

    });
    req.pipe(busboy);
});

module.exports = router;