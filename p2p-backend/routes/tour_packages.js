const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');
const { title, nextTick } = require('process');

const router = express.Router();

// Main APIs

router.get('/tour_packages/handle/:handle', (req, res) => {
    const handle = req.params.handle;
    const sql = `SELECT
                    tour_packages.*,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords,
                    a.images,
                    b.itinerary,
                    c.faq,
                    d.misc,
                    e.link
                    FROM tour_packages
                    LEFT JOIN seo ON seo.reference_id = tour_packages.id AND seo.handle = tour_packages.handle
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
                    FROM tour_packages
                    INNER JOIN images
                    ON images.reference_id = tour_packages.id
                    WHERE tour_packages.handle = '${handle}') AS a ON a.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', itinerary.id, 'title', itinerary.title, 'details', itinerary.details)) AS itinerary
                    FROM tour_packages
                    INNER JOIN itinerary
                    ON itinerary.package_id = tour_packages.id
                    WHERE tour_packages.handle = '${handle}') AS b ON b.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', faq.id, 'ques', faq.ques, 'ans', faq.ans)) AS faq
                    FROM tour_packages
                    INNER JOIN faq
                    ON faq.reference_id = tour_packages.id
                    WHERE tour_packages.handle = '${handle}') AS c ON c.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', package_misc.id, 'title', package_misc.title, 'content', package_misc.content)) AS misc
                    FROM tour_packages
                    INNER JOIN package_misc
                    ON package_misc.package_id = tour_packages.id
                    WHERE tour_packages.handle = '${handle}') AS d ON d.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS link
                    FROM tour_packages
                    INNER JOIN link_list
                    ON link_list.reference_id = tour_packages.id
                    WHERE tour_packages.handle = '${handle}') AS e ON e.id = tour_packages.id
                    WHERE tour_packages.handle = '${handle}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});

// Admin APIs
router.get('/tour_packages', (req, res) => {
    var sql = `SELECT
                    tour_packages.id,
                    tour_packages.title,
                    images.image_url AS image,
                    tour_packages.days,
                    tour_packages.nights,
                    category.name AS category,
                    z1.title as continent,
                    z2.title as country,
                    z3.title as state,
                    z4.title as city,
                    z5.title as region,
                    tour_packages.price_with_tax,
                    tour_packages.price_unit,
                    tour_packages.active,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords
                FROM tour_packages
                LEFT JOIN category
                ON tour_packages.category = category.id
                LEFT JOIN zone as z1
                ON tour_packages.continent = z1.id
                LEFT JOIN zone as z2
                ON tour_packages.country = z2.id
                LEFT JOIN zone as z3
                ON tour_packages.state = z3.id
                LEFT JOIN zone as z4
                ON tour_packages.city = z4.id
                LEFT JOIN zone as z5
                ON tour_packages.region = z5.id
                LEFT JOIN seo
                ON tour_packages.id = seo.reference_id AND tour_packages.handle = seo.handle
                LEFT JOIN images
                ON tour_packages.id = images.reference_id AND images.cover = 1`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(201).send(result);
    });
});

router.get('/tour_packages/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT
                    tour_packages.*,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords,
                    a.images,
                    b.itinerary,
                    c.faq,
                    d.misc,
                    e.link
                    FROM tour_packages
                    LEFT JOIN seo ON seo.reference_id = tour_packages.id AND seo.handle = tour_packages.handle
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
                    FROM tour_packages
                    INNER JOIN images
                    ON images.reference_id = tour_packages.id
                    WHERE tour_packages.id = '${id}') AS a ON a.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', itinerary.id, 'title', itinerary.title, 'details', itinerary.details)) AS itinerary
                    FROM tour_packages
                    INNER JOIN itinerary
                    ON itinerary.package_id = tour_packages.id
                    WHERE tour_packages.id = '${id}') AS b ON b.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', faq.id, 'ques', faq.ques, 'ans', faq.ans)) AS faq
                    FROM tour_packages
                    INNER JOIN faq
                    ON faq.reference_id = tour_packages.id
                    WHERE tour_packages.id = '${id}') AS c ON c.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', package_misc.id, 'title', package_misc.title, 'content', package_misc.content)) AS misc
                    FROM tour_packages
                    INNER JOIN package_misc
                    ON package_misc.package_id = tour_packages.id
                    WHERE tour_packages.id = '${id}') AS d ON d.id = tour_packages.id
                    LEFT JOIN
                    (SELECT
                    tour_packages.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS link
                    FROM tour_packages
                    INNER JOIN link_list
                    ON link_list.reference_id = tour_packages.id
                    WHERE tour_packages.id = '${id}') AS e ON e.id = tour_packages.id
                    WHERE tour_packages.id = '${id}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});


router.post('/tour_packages', (req, res) => {
    // const { id, title, subtitle, handle, description, days, nights, content, category, zone, price, taxPercent,
    //     priceWithTax, comparedPrice, priceUnit, tags, metaTitle, metaDescription, metaKeywords } = req.body;
    db.query('INSERT INTO tour_packages SET ?',
        {
            id: req.body.id,
            title: req.body.title,
            handle: req.body.handle,
            days: req.body.days,
            nights: req.body.nights,
            description: req.body.description,
            category: req.body.category,
            continent: req.body.continent,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            region: req.body.region,
            price: req.body.price,
            tax_percent: req.body.taxPercent,
            price_with_tax: req.body.priceWithTax,
            compared_price: req.body.comparedPrice,
            price_unit: req.body.priceUnit,
            tags: req.body.tags,
            highlights: req.body.highlights,
            ribbon_tag: req.body.ribbonTag,
            booking_form: req.body.bookingForm,
            inquiry_form: req.body.inquiryForm,
            active: req.body.active,
            aminities: req.body.aminities
        }, (error, result) => {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(201).send(result);
            }
        });
});

router.put('/tour_packages/:id', (req, res) => {
    // const { title, subtitle, description, days, nights, content, category, zone, price, taxPercent,
    //     priceWithTax, comparedPrice, priceUnit, tags, metaTitle, metaDescription, metaKeywords } = req.body;


    const id = req.params.id;
    const data = {};
    const seoData = {};
    for (const key in req.body) {
        if (key == 'taxPercent') {
            data.tax_percent = req.body[key] || 0;
        } else if (key == 'priceWithTax') {
            data.price_with_tax = req.body[key];
        } else if (key == 'comparedPrice') {
            data.compared_price = req.body[key];
        } else if (key == 'priceUnit') {
            data.price_unit = req.body[key];
        } else if (key == 'ribbonTag') {
            data.ribbon_tag = req.body[key];
        } else if (key == 'bookingForm') {
            data.booking_form = req.body[key];
        } else if (key == 'inquiryForm') {
            data.inquiry_form = req.body[key];
        } else if (key == 'coverImage') {
            data.cover_image = req.body[key];
        } else if (key == 'tags') {
            data.tags = req.body[key].toString();
        } else if (key == 'highlights') {
            data.highlights = req.body[key].toString();
        } else if (key == 'handle') {
            data.handle = req.body[key];
        } else if (key == 'metaTitle') {
            seoData.title = req.body[key];
        } else if (key == 'metaDesc') {
            seoData.description = req.body[key];
        } else if (key == 'metaKeywords') {
            seoData.keywords = req.body[key].toString();
        } else {
            data[key] = req.body[key];
        }
    }
    if (Object.keys(data).length == 0) {
        if (Object.keys(seoData).length > 0) {
            db.query(`UPDATE seo SET ? WHERE reference_id = '${id}'`,
                        seoData, function (error, seoR) {
                            if (error) throw error;
                            res.status(201).send(seoR);
                        });
        }
    } else {
        db.query(`UPDATE tour_packages SET ? WHERE id = '${id}'`,
            data, function (error, results) {
                if (error) throw error;
                if (Object.keys(seoData).length == 0) {
                    res.status(201).send(results);
                } else {
                    db.query(`UPDATE seo SET ? WHERE reference_id = '${id}'`,
                        seoData, function (error, seoR) {
                            if (error) throw error;
                            res.status(201).send(seoR);
                        });
                }
            });
    }
});

router.post('/tour_packages/:id/itinerary', (req, res) => {
    const packageId = req.params.id;
    const { id, title, details } = req.body;
    db.query("INSERT INTO itinerary SET ?", {
        // id: id,
        package_id: packageId,
        title: title,
        details: details
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.delete('/tour_packages/:id/itinerary/:iti', (req, res) => {
    const id = req.params.iti;
    db.query('DELETE FROM itinerary WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/tour_packages/:id/itinerary/:iti', (req, res) => {
    const packageId = req.params.id;
    const id = req.params.iti;
    const { title, details } = req.body;
    db.query(`UPDATE itinerary SET ? WHERE id = ${id}`, {
        title: title,
        details: details
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.post('/tour_packages/:id/faq', (req, res) => {
    const packageId = req.params.id;
    const { ques, ans } = req.body;
    db.query("INSERT INTO faq SET ?", {
        // id: id,
        reference_id: packageId,
        ques: ques,
        ans: ans
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.delete('/tour_packages/:id/faq/:faqId', (req, res) => {
    const id = req.params.faqId;
    db.query('DELETE FROM faq WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/tour_packages/:id/faq/:faqId', (req, res) => {
    const packageId = req.params.id;
    const id = req.params.faqId;
    const { ques, ans } = req.body;
    db.query(`UPDATE faq SET ? WHERE id = ${id}`, {
        ques: ques,
        ans: ans
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.post('/tour_packages/:id/misc', (req, res) => {
    const packageId = req.params.id;
    const { title, content } = req.body;
    db.query("INSERT INTO package_misc SET ?", {
        // id: id,
        package_id: packageId,
        title: title,
        content: content
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.delete('/tour_packages/:id/misc/:miscId', (req, res) => {
    const id = req.params.miscId;
    db.query('DELETE FROM package_misc WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/tour_packages/:id/misc/:miscId', (req, res) => {
    const packageId = req.params.id;
    const id = req.params.miscId;
    const { title, content } = req.body;
    db.query(`UPDATE package_misc SET ? WHERE id = ${id}`, {
        title: title,
        content: content
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.post('/tour_packages/:id/link', (req, res) => {
    const packageId = req.params.id;
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
                Key: 'tour_packages/' + packageId + '/links/' + Date.now().toString() + fileName,
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
                    reference_id: packageId,
                    title: title,
                    icon: data.Location,
                    url: url
                }, function (error, results) {
                    if (error) throw error;
                    res.status(201).send(results);
                })
            });
        } else {
            db.query("INSERT INTO link_list SET ?", {
                // id: id,
                reference_id: packageId,
                title: title,
                icon: null,
                url: url
            }, function (error, results) {
                if (error) throw error;
                res.status(201).send(results);
            });
        }
    });
    req.pipe(busboy);
});

router.delete('/tour_packages/:id/link/:linkId', (req, res) => {
    const id = req.params.linkId;
    db.query('DELETE FROM link_list WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/tour_packages/:id/link/:linkId', (req, res) => {
    const packageId = req.params.id;
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
                Key: 'tour_packages/' + packageId + '/links/' + Date.now().toString() + fileName,
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

router.post('/tour_packages/image', (req, res) => {
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
            Key: 'tour_packages/' + id + '/' + Date.now().toString() + fileName,
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
            db.query('INSERT INTO images SET ?', { reference_id: id, type: 'package', image_url: data.Location }, (err, result) => {
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

router.delete('/tour_packages/:id/images/:img', (req, res) => {
    const img = req.params.img;
    db.query('DELETE FROM images WHERE id = ?', img, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.delete('/tour_packages/:id/', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM tour_packages WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

module.exports = router;