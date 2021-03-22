const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');
const { title, nextTick } = require('process');

const router = express.Router();



// Main APIs

router.get('/home', (req, res) => {
    console.log('Call to Home' + Date.now());
    const sql = `SELECT
    seo.*,
    a.slider_images,
    b.slider_links,
    c.section
    FROM
    seo
    LEFT JOIN
    (SELECT
    'home' as id,
    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as slider_images
    FROM images WHERE type='home'
    GROUP BY images.type) AS a
    ON seo.reference_id = a.id
    LEFT JOIN
    (SELECT
    'home' as id,
    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS slider_links
    FROM link_list
    WHERE reference_id = 'home-slider'
    GROUP BY link_list.reference_id) AS b
    ON b.id = seo.reference_id
    LEFT JOIN
    (SELECT
    'home' as id,
    JSON_ARRAYAGG(JSON_OBJECT('id', section.id, 'title', section.title, 'subtitle', section.subtitle, 'contentType', section.content_type, 'displayType', section.display_type, 'position', section.position)) AS section
    FROM section
    WHERE section.reference_id='home') AS c
    ON c.id = seo.reference_id
    WHERE seo.reference_id='home'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});


// Admin APIs

router.get('/home/packages', (req, res) => {
    var sql = `SELECT
                    tour_packages.id,
                    tour_packages.title,
                    images.image_url AS image,
                    tour_packages.days,
                    tour_packages.nights,
                    tour_packages.price_with_tax,
                    tour_packages.price_unit,
                    AVG(review.review_points) as review_points,
                    COUNT(review.id) as review_count
                FROM tour_packages
                LEFT JOIN review
                ON review.reference_id = tour_packages.id
                LEFT JOIN images
                ON tour_packages.id = images.reference_id AND images.id = tour_packages.cover_image
                WHERE tour_packages.active = TRUE
                GROUP BY tour_packages.id`;
    db.query(sql, (error, result) => {
        console.log(error);
        if (error) throw error;
        res.status(201).send(result);
    });
});

router.get('/home/section/:secId', (req, res) => {
    const secId = req.params.secId;
    db.query(`SELECT * FROM section WHERE id = ?`, secId, (err, result) => {
        if (err) {
            throw err;
        }
        if(result[0].content_type === 'Link') {
            db.query(`SELECT * FROM link_list WHERE reference_id = ? AND type = 'section'`, secId, (e, r) => {
                if(e) {
                    throw error;
                }
                result[0].links = r;
                res.send(result[0]);
            });
        } else if(result[0].content_type === 'Package') {
            db.query(`SELECT
            section_packages.package_id,
            section_packages.position,
            tour_packages.title,
            tour_packages.price_with_tax,
            tour_packages.compared_price,
            tour_packages.days,
            tour_packages.nights,
            tour_packages.ribbon_tag,
            tour_packages.handle,
            AVG(review.review_points) as review_points,
            COUNT(review.id) as review_count
            FROM section_packages
            INNER JOIN tour_packages
            ON section_packages.package_id = tour_packages.id
            LEFT JOIN review
            ON review.reference_id = section_packages.package_id
            WHERE section_id = ${secId}
            GROUP BY section_packages.package_id`, (e, r) => {
                if(e) {
                    throw error;
                }
                result[0].packages = r;
                res.send(result[0]);
            });
        } else {
            res.send(result[0]);
        }
    });
});

router.post('/home/section', (req, res) => {
    db.query("INSERT INTO section SET ?", {
        reference_id: 'home',
        title: req.body.title,
        subtitle: req.body.subtitle,
        content_type: req.body.contentType,
        display_type: req.body.displayType,
        position: req.body.position
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.put('/home/section/position', (req, res) => {
    const promises = [];
    req.body.sections.forEach((sec, index) => {
        promises.push(new Promise((resolve, reject) => {
            db.query(`UPDATE section SET position = ${index + 1} WHERE id = ${sec.id}`,
                function (error, results) {
                    if (error) { reject(error); }
                    else { resolve(); }
                });
        }));
    });
    Promise.all(promises).then(() => res.send()).catch(err => res.status(400).send(err));

});

router.delete('/home/section/:sec', (req, res) => {
    const id = req.params.sec;
    db.query('DELETE FROM section WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/home/section/:sec', (req, res) => {
    const id = req.params.sec;
    db.query(`UPDATE section SET ? WHERE id = ${id}`, {
        title: req.body.title,
        subtitle: req.body.subtitle
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.post('/home/section/:secId/package', (req, res) => {
    const secId = req.params.secId;
    db.query(`INSERT INTO section_packages SET ?`, {
        section_id: secId,
        package_id: req.body.packageId,
        position: req.body.position
    }, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

router.put('/home/section/:secId/package/position', (req, res) => {
    const pageId = req.params.id;
    const secId = req.params.secId;
    const promises = [];
    req.body.packages.forEach((pkg, index) => {
        promises.push(new Promise((resolve, reject) => {
            db.query(`UPDATE section_packages SET position = ${index + 1} WHERE section_id = ${secId} AND packageId: ${pkg.id}`,
                function (error, results) {
                    if (error) { reject(error); }
                    else { resolve(); }
                });
        }));
    });
    Promise.all(promises).then(() => res.send()).catch(err => res.status(400).send(err));

});

router.post('/home/section/:secId/link', (req, res) => {
    const secId = req.params.secId;
    const bucket = new S3(
        {
            secretAccessKey: 'iSpTp41mJg7kJUb1KaJtftawAfMlkq3axK0+/Nf9',
            accessKeyId: 'AKIAJLXGSMNKDM5WJ4YQ',
            region: 'ap-south-1'
        }
    );
    var busboy = new Busboy({ headers: req.headers });
    var fileToUpload;
    var fileName;
    var contentType;
    var title;
    var url;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', function (data) {
            fileName = filename;
            fileToUpload = data;
        });
        file.on('end', function () {
        });
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        if (fieldname == 'title') {
            title = val;
        }
        if (fieldname == 'url') {
            url = val;
        }
    });
    busboy.on('finish', function () {
        if (fileToUpload) {
            const params = {
                Bucket: 'p2p-admin-angular-app',
                Key: 'home/section/' + secId + '/links/' + Date.now().toString() + fileName,
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
                    reference_id: secId,
                    title: title,
                    icon: data.Location,
                    url: url,
                    type: 'section'
                }, function (error, results) {
                    if (error) throw error;
                    res.status(201).send(results);
                })
            });
        } else {
            db.query("INSERT INTO link_list SET ?", {
                // id: id,
                reference_id: secId,
                title: title,
                icon: null,
                url: url,
                type: 'section'
            }, function (error, results) {
                if (error) throw error;
                res.status(201).send(results);
            });
        }
    });
    req.pipe(busboy);
});

router.delete('/home/section/:secId/link/:linkId', (req, res) => {
    const id = req.params.linkId;
    db.query('DELETE FROM link_list WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/home/section/:secId/link/:linkId', (req, res) => {
    const id = req.params.linkId;
    const bucket = new S3(
        {
            secretAccessKey: 'iSpTp41mJg7kJUb1KaJtftawAfMlkq3axK0+/Nf9',
            accessKeyId: 'AKIAJLXGSMNKDM5WJ4YQ',
            region: 'ap-south-1'
        }
    );
    var busboy = new Busboy({ headers: req.headers });
    var fileToUpload;
    var fileName;
    var contentType;
    var title;
    var url;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', function (data) {
            fileName = filename;
            fileToUpload = data;
        });
        file.on('end', function () {
        });
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        if (fieldname == 'title') {
            title = val;
        }
        if (fieldname == 'url') {
            url = val;
        }
    });
    busboy.on('finish', function () {
        if (fileToUpload != null) {
            const params = {
                Bucket: 'p2p-admin-angular-app',
                Key: 'home/section/' + secId + '/links/' + Date.now().toString() + fileName,
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
                db.query("UPDATE link_list SET ? WHERE id = ${id}", {
                    title: title,
                    icon: data.Location,
                    url: url
                }, function (error, results) {
                    if (error) throw error;
                    res.status(201).send(results);
                });
            });
        } else {
            db.query("UPDATE link_list SET ? WHERE id = ${id}", {
                title: title,
                url: url
            }, function (error, results) {
                if (error) throw error;
                res.status(201).send(results);
            });
        }

    });
    req.pipe(busboy);
});

router.post('/home/slider/image', (req, res) => {
    // const contentType = req.body.file.type;
    const bucket = new S3(
        {
            secretAccessKey: 'iSpTp41mJg7kJUb1KaJtftawAfMlkq3axK0+/Nf9',
            accessKeyId: 'AKIAJLXGSMNKDM5WJ4YQ',
            region: 'ap-south-1'
        }
    );
    var busboy = new Busboy({ headers: req.headers });
    var id = 'unknown';
    var fileToUpload;
    var fileName;
    var contentType;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', function (data) {
            fileName = filename;
            fileToUpload = data;
        });
        file.on('end', function () {
        });
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        id = val;
    });
    busboy.on('finish', function () {
        const params = {
            Bucket: 'p2p-admin-angular-app',
            Key: 'home/slider/' + Date.now().toString() + fileName,
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
            db.query('INSERT INTO images SET ?', { reference_id: 'home-slider', type: 'home', image_url: data.Location }, (err, result) => {
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

router.delete('/home/slider/images/:img', (req, res) => {
    const img = req.params.img;
    db.query('DELETE FROM images WHERE id = ?', img, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

module.exports = router;