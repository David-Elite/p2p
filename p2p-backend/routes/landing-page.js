const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');
const { title, nextTick } = require('process');

const router = express.Router();



// Main APIs

router.get('/landing_page/handle/:handle', (req, res) => {
    let handle = req.params.handle;
    const sql = `SELECT
                    landing_page.*,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords,
                    a.images,
                    b.section,
                    c.faq,
                    d.misc,
                    e.link
                    FROM landing_page
                    LEFT JOIN seo ON seo.reference_id = landing_page.id AND seo.handle = landing_page.handle
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
                    FROM landing_page
                    INNER JOIN images
                    ON images.reference_id = landing_page.id
                    WHERE landing_page.handle = '${handle}'
                    GROUP BY landing_page.id) AS a ON a.id = landing_page.id
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', section.id, 'title', section.title, 'subtitle', section.subtitle, 'contentType', section.content_type, 'displayType', section.display_type, 'position', section.position)) AS section
                    FROM landing_page
                    INNER JOIN section
                    ON section.reference_id = landing_page.id
                    WHERE landing_page.handle = '${handle}'
                    GROUP BY landing_page.id) AS b ON b.id = landing_page.id
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', faq.id, 'ques', faq.ques, 'ans', faq.ans)) AS faq
                    FROM landing_page
                    INNER JOIN faq
                    ON faq.reference_id = landing_page.id
                    WHERE landing_page.handle = '${handle}'
                    GROUP BY landing_page.id) AS c ON c.id = landing_page.id
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', package_misc.id, 'title', package_misc.title, 'content', package_misc.content)) AS misc
                    FROM landing_page
                    INNER JOIN package_misc
                    ON package_misc.package_id = landing_page.id
                    WHERE landing_page.handle = '${handle}'
                    GROUP BY landing_page.id) AS d ON d.id = landing_page.id
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS link
                    FROM landing_page
                    INNER JOIN link_list
                    ON link_list.reference_id = landing_page.id
                    WHERE landing_page.handle = '${handle}'
                    GROUP BY landing_page.id) AS e ON e.id = landing_page.id
                    WHERE landing_page.handle = '${handle}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});


// Admin APIs

router.get('/landing_page', (req, res) => {
    var sql = `SELECT
                    landing_page.id,
                    landing_page.title,
                    images.image_url AS image,
                    landing_page.subtitle,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords
                FROM landing_page
                LEFT JOIN seo
                ON landing_page.id = seo.reference_id AND landing_page.handle = seo.handle
                LEFT JOIN images
                ON landing_page.id = images.reference_id AND landing_page.cover_image = images.id`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(201).send(result);
    });
});

router.get('/landing_page/packages', (req, res) => {
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

router.get('/landing_page/:id', (req, res) => {
    let id = req.params.id;
    const sql = `SELECT
                    landing_page.*,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords,
                    a.images,
                    b.section,
                    c.faq,
                    d.misc
                    FROM landing_page
                    LEFT JOIN seo ON seo.reference_id = landing_page.id AND seo.handle = landing_page.handle
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
                    FROM landing_page
                    INNER JOIN images
                    ON images.reference_id = landing_page.id
                    WHERE landing_page.id = '${id}') AS a ON a.id = landing_page.id
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', section.id, 'title', section.title, 'subtitle', section.subtitle, 'contentType', section.content_type, 'displayType', section.display_type, 'position', section.position)) AS section
                    FROM landing_page
                    INNER JOIN section
                    ON section.reference_id = landing_page.id
                    WHERE landing_page.id = '${id}' ORDER BY section.position) AS b ON b.id = landing_page.id
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', faq.id, 'ques', faq.ques, 'ans', faq.ans)) AS faq
                    FROM landing_page
                    INNER JOIN faq
                    ON faq.reference_id = landing_page.id
                    WHERE landing_page.id = '${id}') AS c ON c.id = landing_page.id
                    LEFT JOIN
                    (SELECT
                    landing_page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', package_misc.id, 'title', package_misc.title, 'content', package_misc.content)) AS misc
                    FROM landing_page
                    INNER JOIN package_misc
                    ON package_misc.package_id = landing_page.id
                    WHERE landing_page.id = '${id}') AS d ON d.id = landing_page.id
                    WHERE landing_page.id = '${id}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});




router.post('/landing_page', (req, res) => {
    db.query('INSERT INTO landing_page SET ?',
        {
            id: req.body.id,
            title: req.body.title,
            handle: req.body.handle,
            subtitle: req.body.subtitle,
            description: req.body.description,
        }, (error, result) => {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(201).send(result);
            }
        });
});

router.put('/landing_page/:id', (req, res) => {
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
        db.query(`UPDATE landing_page SET ? WHERE id = '${id}'`,
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

router.get('/landing_page/:id/section/:secId', (req, res) => {
    const pageId = req.params.id;
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
                console.log(r);
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
                console.log(r);
                result[0].packages = r;
                console.log(result[0]);
                res.send(result[0]);
            });
        } else {
            res.send(result[0]);
        }
    });
});

router.post('/landing_page/:id/section', (req, res) => {
    const pageId = req.params.id;
    db.query("INSERT INTO section SET ?", {
        reference_id: pageId,
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

router.put('/landing_page/:id/section/position', (req, res) => {
    const pageId = req.params.id;
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

router.delete('/landing_page/:id/section/:sec', (req, res) => {
    const id = req.params.sec;
    db.query('DELETE FROM section WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/landing_page/:id/section/:sec', (req, res) => {
    const pageId = req.params.id;
    const id = req.params.sec;
    db.query(`UPDATE section SET ? WHERE id = ${id}`, {
        title: req.body.title,
        subtitle: req.body.subtitle
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.post('/landing_page/:id/section/:secId/package', (req, res) => {
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

router.put('/landing_page/:id/section/:secId/package/position', (req, res) => {
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

router.post('/landing_page/:id/faq', (req, res) => {
    const pageId = req.params.id;
    const { ques, ans } = req.body;
    db.query("INSERT INTO faq SET ?", {
        // id: id,
        reference_id: pageId,
        ques: ques,
        ans: ans
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.delete('/landing_page/:id/faq/:faqId', (req, res) => {
    const id = req.params.faqId;
    db.query('DELETE FROM faq WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/landing_page/:id/faq/:faqId', (req, res) => {
    const pageId = req.params.id;
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

router.post('/landing_page/:id/misc', (req, res) => {
    const pageId = req.params.id;
    const { title, content } = req.body;
    db.query("INSERT INTO package_misc SET ?", {
        // id: id,
        package_id: pageId,
        title: title,
        content: content
    }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    })
});

router.delete('/landing_page/:id/misc/:miscId', (req, res) => {
    const id = req.params.miscId;
    db.query('DELETE FROM package_misc WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/landing_page/:id/misc/:miscId', (req, res) => {
    const pageId = req.params.id;
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

router.post('/landing_page/:id/section/:secId/link', (req, res) => {
    const pageId = req.params.id;
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
                Key: 'landing_page/' + pageId + '/section/' + secId + '/links/' + Date.now().toString() + fileName,
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

router.delete('/landing_page/:id/section/:secId/link/:linkId', (req, res) => {
    const id = req.params.linkId;
    db.query('DELETE FROM link_list WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.put('/landing_page/:id/section/:secId/link/:linkId', (req, res) => {
    const pageId = req.params.id;
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
                Key: 'landing_page/' + pageId + '/links/' + Date.now().toString() + fileName,
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

router.post('/landing_page/image', (req, res) => {
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
            Key: 'landing_page/' + id + '/' + Date.now().toString() + fileName,
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

router.delete('/landing_page/:id/images/:img', (req, res) => {
    const img = req.params.img;
    db.query('DELETE FROM images WHERE id = ?', img, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.delete('/landing_page/:id/', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM landing_page WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

module.exports = router;