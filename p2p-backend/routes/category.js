const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');

const router = express.Router();

router.get('/category' ,(req, res) => {

    var sql = `SELECT
        category.id,
        category.name,
        category.handle,
        category.description,
        category.tags,
        JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
     FROM category LEFT JOIN images
     ON category.id = images.reference_id
     GROUP BY category.id`;
    db.query(sql, (error, data) => {
        if (error) throw error;
        res.status(201).send(data);
    });
});

// router.post('/category/images', (req, res) => {
//     const file = req.body.file;
//     const id = req.body.id;
//     console.log(file);
//     console.log(id);
//     res.send();
// });

router.post('/category/image', (req, res) => {
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
            db.query('INSERT INTO images SET ?',{reference_id:id,type:'category',image_url:data.Location},(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                }
            })
        });
    });
    busboy.on('finish', function() {
        // console.log(fileToUpload);
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
            res.send(data);
        });
    });
    req.pipe(busboy);

});

router.get('/category/:id', (req, res) => {
    let id = req.params.id;
    var sql = `SELECT
        category.id,
        category.name,
        category.handle,
        category.description,
        category.tags,
        JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
     FROM category LEFT JOIN images
     ON category.id = images.reference_id
      WHERE category.id=?`
    db.query(sql, id, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});

router.post('/category', (req, res) => {
    const { id, name, handle, description, tags } = req.body;
    db.query(`INSERT INTO category VALUES ('${id}', '${name}', '${handle}', '${description}', '${tags}')`, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.status(201).send(result);
        }
    });
});

router.put('/category/:id', (req, res) => {
    const { name, handle, description, tags } = req.body;
    const id = req.params.id;
    db.query('UPDATE category SET name=?, handle=?,description=?,tags=? where id=?', [name, handle, description, tags, id], function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.delete('/category/images/:id',(req,res)=>{
 const id = req.params.id;
 db.query("DELETE FROM images WHERE id=?",id,(err,result)=>{
  if(err){
      console.log(err)
  }else{
      res.status(201).send(result)
  }
 })
})

module.exports = router;