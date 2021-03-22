const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');

const router = express.Router();

router.get('/review',(req,res)=>{
    var sql = `SELECT
    review.id,
    tour_packages.title AS package_name,
    review.reviewer_name,
    review.reviewer_image,
    review.review_title,
    review.review_points,
    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
    FROM review
    INNER JOIN tour_packages ON
    tour_packages.id = review.reference_id
    LEFT JOIN images
    ON review.id = images.reference_id
    GROUP BY review.id`;
db.query(sql, (error, data) => {
    if (error) throw error;
    res.status(201).send(data);
});
});

router.get('/review/packages', (req, res) => {
    db.query(`SELECT id, title FROM tour_packages`, (err, result) => {
        if (err) throw error;
        res.send(result);
    });
});

router.get('/review/users', (req, res) => {
    db.query(`SELECT id, user_name FROM admin_user`, (err, result) => {
        if (err) throw error;
        res.send(result);
    });
});

router.get('/review/:id', (req, res) => { 
    let id = req.params.id;
    var sql = `SELECT
    review.*,
    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
    FROM review LEFT JOIN images
    ON review.id = images.reference_id
    WHERE review.id=?`;
db.query(sql,id, (error, data) => {
    if (error) throw error;
    res.status(201).send(data[0]);
});
});


router.post('/review',(req,res)=>{
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
    
    var referenceId;
    var reviewTitle;
    var reviewContent;
    var reviewPoints;
    var reviewerId = 0;
    var reviewerName;
    var reviewerTitle;
    var reviewDate;
    var reviewerImage;


    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', function (data) {
            fileName = filename;
            fileToUpload = data;
        });
        file.on('end', function () {
        });
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        if (fieldname == 'reviewTitle') {
            reviewTitle = val;
        } else if (fieldname == 'reviewContent') {
            reviewContent = val;
        } else if (fieldname == 'reviewPoints') {
            reviewPoints = val;
        } else if (fieldname == 'reviewerId') {
            reviewerId = val || 0;
        } else if (fieldname == 'reviewerName') {
            reviewerName = val;
        } else if (fieldname == 'reviewerTitle') {
            reviewerTitle = val;
        } else if (fieldname == 'referenceId') {
            referenceId = val;
        } else if (fieldname == 'reviewDate') {
            reviewDate = val;
        }
    });
    busboy.on('finish', function () {
        if (fileToUpload) {
            const params = {
                Bucket: 'p2p-admin-angular-app',
                Key: 'review/' + referenceId + '/' + Date.now().toString() + fileName,
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
                console.log(data);
                db.query("INSERT INTO review SET ?", {
                    reference_id: referenceId,
                    review_date: reviewDate,
                    review_title: reviewTitle,
                    review_content: reviewContent,
                    review_points: reviewPoints,
                    reviewer_id: 0,
                    reviewer_name: reviewerName,
                    reviewer_title: reviewerTitle,
                    reviewer_image: data.Location,
                    upvote_count: 0
                }, function (error, results) {
                    if (error) throw error;
                    res.status(201).send(results);
                });
            });
        } else {
            db.query("INSERT INTO review SET ?", {
                reference_id: referenceId,
                review_title: reviewTitle,
                review_content: reviewContent,
                review_points: reviewPoints,
                reviewer_id: 0,
                reviewer_name: reviewerName,
                reviewer_title: reviewerTitle,
                upvote_count: 0
            }, function (error, results) {
                if (error) throw error;
                res.status(201).send(results);
            })
        }
    });
    req.pipe(busboy);
});


router.post('/review/reviewer-image', (req, res) => {
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
    
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        // console.log(id);
        fileToUpload = file;
        fileName = filename;
        contentType = mimetype;

        const params = {
            Bucket: 'p2p-admin-angular-app',
            Key: 'review/' + fileName,
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
            // res.send(data);
        });
    });
    busboy.on('finish', function() {
        console.log("A");
        // console.log(fileToUpload);
        const params = {
            Bucket: 'p2p-admin-angular-app',
            Key: 'review/reviewer_image/' + fileName,
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

router.delete('/review/reviewer-image/:id',(req,res)=>{
    const id = req.params/id;
    db.query("DELETE FROM images WHERE id=?",id,(err,result)=>{
     if(err){
         console.log(err)
     }else{
         console.log(result)
         res.status(201).send(result)
     }
    })
   })
module.exports = router;