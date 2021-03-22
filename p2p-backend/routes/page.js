const express = require('express');
const db = require('../db');

const router = express.Router();



// Main APIs

router.get('/page/handle/:handle', (req, res) => {
    let handle = req.params.handle;
    const sql = `SELECT
                    page.*,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords,
                    a.images,
                    b.link
                    FROM page
                    LEFT JOIN seo ON seo.reference_id = page.id AND seo.handle = page.handle
                    LEFT JOIN
                    (SELECT
                    page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
                    FROM page
                    INNER JOIN images
                    ON images.reference_id = page.id
                    WHERE page.handle = '${handle}'
                    GROUP BY page.id) AS a ON a.id = page.id
                    LEFT JOIN
                    (SELECT
                    page.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS link
                    FROM page
                    INNER JOIN link_list
                    ON link_list.reference_id = page.id
                    WHERE page.handle = '${handle}'
                    GROUP BY page.id) AS b ON b.id = page.id
                    WHERE page.handle = '${handle}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});


// Admin APIs

router.get('/page', (req, res) => {
    var sql = `SELECT
                    page.id,
                    page.title,
                    images.image_url AS image,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords
                FROM page
                LEFT JOIN seo
                ON page.id = seo.reference_id AND page.handle = seo.handle
                LEFT JOIN images
                ON page.id = images.reference_id LIMIT 1`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(201).send(result);
    });
});

router.get('/page/:id', (req, res) => {
    let id = req.params.id;
    const sql = `SELECT
    page.*,
    seo.title AS meta_title,
    seo.description AS meta_description,
    seo.keywords AS meta_keywords,
    a.images,
    b.link
    FROM page
    LEFT JOIN seo ON seo.reference_id = page.id AND seo.handle = page.handle
    LEFT JOIN
    (SELECT
    page.id,
    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
    FROM page
    INNER JOIN images
    ON images.reference_id = page.id
    WHERE page.id = '${id}'
    GROUP BY page.id) AS a ON a.id = page.id
    LEFT JOIN
    (SELECT
    page.id,
    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS link
    FROM page
    INNER JOIN link_list
    ON link_list.reference_id = page.id
    WHERE page.id = '${id}'
    GROUP BY page.id) AS b ON b.id = page.id
    WHERE page.id = '${id}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});




router.post('/page', (req, res) => {
    db.query('INSERT INTO page SET ?',
        {
            id: req.body.id,
            title: req.body.title,
            handle: req.body.handle,
            content: req.body.content,
            tags: req.body.tags.toString(),
            active: req.body.active
        }, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.status(201).send(result);
            }
        });
});

router.put('/page/:id', (req, res) => {

    const id = req.params.id;
    const data = {};
    const seoData = {};
    for (const key in req.body) {
        if (key == 'metaTitle') {
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
        console.log(data);
        console.log(id);
        db.query(`UPDATE page SET ? WHERE id = '${id}'`,
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

module.exports = router;