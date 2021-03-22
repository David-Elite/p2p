const express = require('express');
const db = require('../db');
const S3 = require('aws-sdk/clients/s3');
const Busboy = require('busboy');

const router = express.Router();

router.get('/zone',(req,res)=>{
    var sql = `SELECT
    zone.id,
    zone.zone_type,
    zone.title,
    zone.handle,
    zone.tags,
    zone.continent,
    zone.country,
    zone.state,
    zone.city,
    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
 FROM zone LEFT JOIN images
 ON zone.id = images.reference_id
 GROUP BY zone.id`;
db.query(sql, (error, data) => {
    if (error) throw error;
    res.status(201).send(data);
});
});

router.get('/zone/:id', (req, res) => { 
    let id = req.params.id;
    var sql = `SELECT
    zone.id,
    zone.zone_type,
    zone.title,
    zone.handle,
    zone.tags,
    zone.continent,
    zone.country,
    zone.state,
    zone.city,
    JSON_ARRAYAGG(JSON_OBJECT('id', images.id, 'url', images.image_url)) as images
 FROM zone LEFT JOIN images
 ON zone.id = images.reference_id
 WHERE zone.id=?`;
db.query(sql,id, (error, data) => {
    if (error) throw error;
    res.status(201).send(data[0]);
});
});


router.post('/zone',(req,res)=>{
    const { id, zoneType, title, handle, tags, continent, country, state, city} = req.body;
    db.query('INSERT INTO zone SET ?', { id:id, zone_type:zoneType, title:title, handle:handle, tags:tags, continent:continent, country:country, state:state, city:city }, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.status(201).send(result);
        }
    });
});

router.put('/zone/:id',(req,res)=>{
    const { zoneType, title, handle, tags, continent, country, state, city} = req.body;
    const id = req.params.id;
    db.query(`UPDATE zone SET ? where id= '${id}'`,{ id:id, zone_type:zoneType, title:title, handle:handle, tags:tags, continent:continent, country:country, state:state, city:city }, function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});

router.post('/zone/image', (req, res) => {
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

router.delete('/zone/image/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM images WHERE id=?",id,(err,result)=>{
     if(err){
         console.log(err)
     }else{
         res.status(201).send(result)
     }
    })
   });

router.post('/zone/section/title/:sectionId/:zoneId', (req, res) => {
    const sectionId = req.params.sectionId;
    const zoneId = req.params.zoneId;
    db.query("INSERT INTO section_zones SET ?", {section_id: sectionId, zone_id: zoneId}, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err);
        }else{
            res.status(201).send(result);
        }
    })
});

router.post('/zone/section/child/:sectionId/:gridId', (req, res) => {
    const sectionId = req.params.sectionId;
    const gridId = req.params.gridId;
    const insert = req.body.zoneList.map(z => ([sectionId, z, gridId]));
    console.log(insert);
    db.query("INSERT INTO section_zones (section_id, zone_id, parent) VALUES ?", [insert], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err);
        }else{
            res.status(201).send(result);
        }
    })
});

router.put('/zone/section/child/:sectionId/:gridId', (req, res) => {
    const sectionId = req.params.sectionId;
    const gridId = req.params.gridId;
    const zoneList = req.body.zoneList;
    const insert = [];
    const del = [];
    db.query("SELECT * FROM section_zones WHERE parent = ?", gridId, (e, r) => {
        if (e) {
            console.log(e);
            res.status(500).send(e);
        }
        r.forEach(z => {
            if (zoneList.findIndex( a => a === z.zone_id) === -1) {
                del.push(z.id);
            }
        });
        zoneList.forEach(z => {
            if (r.findIndex(a => a.zone_id === z) === -1) {
                insert.push([sectionId, z, gridId]);
            }
        })
        db.query("INSERT INTO section_zones (section_id, zone_id, parent) VALUES ?", [insert], (er, result) => {
            if(er){
                console.log(er);
                res.status(500).send(er);
            }else{
                db.query("DELETE FROM section_zones WHERE id = ?", [del], (err, re) => {
                    if(err){
                        console.log(err);
                        res.status(500).send(err);
                    }else{
                        res.send(re)
                    }
                })
            }
        })
    });
    
});

router.delete('/zone/section/:gridId', (req, res) => {
    const gridId = req.params.gridId;
    db.query(`DELETE FROM section_zones WHERE id = ${gridId} OR parent = ${gridId}`, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err);
        }else{
            res.status(201).send(result);
        }
    })
})
module.exports = router;