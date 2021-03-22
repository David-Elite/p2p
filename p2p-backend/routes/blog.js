const express = require('express');
const db = require('../db');

const router = express.Router();



// Main APIs

router.get('/blog/handle/:handle', (req, res) => {
    let handle = req.params.handle;
    const sql = `SELECT
                    blog.*,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords,
                    a.images,
                    b.comments,
                    c.link
                    FROM blog
                    LEFT JOIN seo ON seo.reference_id = blog.id AND seo.handle = blog.handle
                    LEFT JOIN
                    (SELECT
                    blog.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
                    FROM blog
                    INNER JOIN images
                    ON images.reference_id = blog.id
                    WHERE blog.handle = '${handle}'
                    GROUP BY blog.id) AS a ON a.id = blog.id
                    LEFT JOIN
                    (SELECT
                    blog.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', blog_comments.id, 'user_id', blog_comments.user_id, 'user_name', blog_comments.user_name, 'user_image', blog_comments.user_image, 'date', blog_comments.date, 'comment', blog_comments.comment, 'reply_to', blog_comments.reply_to)) AS faq
                    FROM blog
                    INNER JOIN blog_comments
                    ON blog_comments.blog_id = blog.id
                    WHERE blog.handle = '${handle}'
                    GROUP BY blog.id) AS b ON b.id = blog.id
                    LEFT JOIN
                    (SELECT
                    blog.id,
                    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS link
                    FROM blog
                    INNER JOIN link_list
                    ON link_list.reference_id = blog.id
                    WHERE blog.handle = '${handle}'
                    GROUP BY blog.id) AS c ON c.id = blog.id
                    WHERE blog.handle = '${handle}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});


// Admin APIs

router.get('/blog', (req, res) => {
    var sql = `SELECT
                    blog.id,
                    blog.title,
                    images.image_url AS image,
                    seo.title AS meta_title,
                    seo.description AS meta_description,
                    seo.keywords AS meta_keywords
                FROM blog
                LEFT JOIN seo
                ON blog.id = seo.reference_id AND blog.handle = seo.handle
                LEFT JOIN images
                ON blog.id = images.reference_id LIMIT 1`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(201).send(result);
    });
});

router.get('/blog/:id', (req, res) => {
    let id = req.params.id;
    const sql = `SELECT
    blog.*,
    seo.title AS meta_title,
    seo.description AS meta_description,
    seo.keywords AS meta_keywords,
    a.images,
    b.comments,
    c.link
    FROM blog
    LEFT JOIN seo ON seo.reference_id = blog.id AND seo.handle = blog.handle
    LEFT JOIN
    (SELECT
    blog.id,
    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) AS images
    FROM blog
    INNER JOIN images
    ON images.reference_id = blog.id
    WHERE blog.id = '${id}'
    GROUP BY blog.id) AS a ON a.id = blog.id
    LEFT JOIN
    (SELECT
    blog.id,
    JSON_ARRAYAGG(JSON_OBJECT('id', blog_comments.id, 'user_id', blog_comments.user_id, 'user_name', blog_comments.user_name, 'user_image', blog_comments.user_image, 'date', blog_comments.date, 'comment', blog_comments.comment, 'reply_to', blog_comments.reply_to)) AS comments
    FROM blog
    INNER JOIN blog_comments
    ON blog_comments.blog_id = blog.id
    WHERE blog.id = '${id}'
    GROUP BY blog.id) AS b ON b.id = blog.id
    LEFT JOIN
    (SELECT
    blog.id,
    JSON_ARRAYAGG(JSON_OBJECT('id', link_list.id, 'title', link_list.title, 'icon', link_list.icon, 'url', link_list.url)) AS link
    FROM blog
    INNER JOIN link_list
    ON link_list.reference_id = blog.id
    WHERE blog.id = '${id}'
    GROUP BY blog.id) AS c ON c.id = blog.id
    WHERE blog.id = '${id}'`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});




router.post('/blog', (req, res) => {
    db.query('INSERT INTO blog SET ?',
        {
            id: req.body.id,
            title: req.body.title,
            handle: req.body.handle,
            description: req.body.description,
            content: req.body.content,
            author: req.body.author,
            date: req.body.date,
            category: req.body.category.toString(),
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

router.put('/blog/:id', (req, res) => {

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
        db.query(`UPDATE blog SET ? WHERE id = '${id}'`,
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