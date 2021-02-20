const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');

const router = express.Router();

router.get('/jobs' ,(req, res) => {

    var sql = `SELECT
       jobs.id,
       jobs.job_title,
       jobs.job_desc,
       jobs.job_overview,
       jobs.job_rnr,
       JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
     FROM jobs LEFT JOIN images
     ON jobs.id = images.reference_id
     GROUP BY jobs.id`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data);
        console.log(data);
    });
});

router.get('/jobs/:id', (req, res) => {
    let id = req.params.id;
    var sql = `SELECT
       jobs.id,
       jobs.job_title,
       jobs.job_desc,
       jobs.job_overview,
       jobs.job_rnr,
       JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
     FROM jobs LEFT JOIN images
     ON jobs.id = images.reference_id
      WHERE jobs.id=?`; 
    console.log(id);
    db.query(sql, id, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});

router.post('/jobs/image', (req, res) => {
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
    
    busboy.on('field', function(fieldname, val) {
        id = val;
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        // console.log(id);
        fileToUpload = file;
        fileName = filename;
        contentType = mimetype;

        const params = {
            Bucket: 'p2p-admin-angular-app',
            Key: 'categories/' + id + '/' + fileName,
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
            db.query('INSERT INTO images SET ?',{reference_id:id,type:'jobs',image_url:data.Location},(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                }
            })
            console.log(data.Location);
        });
    });
    busboy.on('finish', function() {
        console.log("A");
        // console.log(fileToUpload);
        const params = {
            Bucket: 'p2p-admin-angular-app',
            Key: 'jobs/' + id + '/' + fileName,
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

router.post('/jobs', (req, res) => {
    const {id, title, desc, overview, rnr } = req.body;
    db.query('INSERT INTO jobs SET ?', { id:id, job_title: title, job_desc: desc, job_overview: overview, job_rnr: rnr }, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.status(201).send(result);
        }
    });
});

router.put('/jobs/:id', (req, res) => {
    const { title, desc, description, overview, rnr} = req.body;
    const id = req.params.id;
    console.log(id)
    db.query('UPDATE jobs SET job_title=?, job_desc=?, job_overview=?, job_rnr=? WHERE id=?', [title, desc, overview, rnr, id], function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.delete('/jobs/image/:id',(req,res)=>{
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