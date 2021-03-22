const express = require('express');
const db = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const hashKey = 'HASH_KEY';


router.get('/admin-user',(req,res)=>{
    var sql = 'SELECT * FROM admin_user';
    db.query(sql, (error, data) => {
        if (error) throw error;
        else {
            const result = data.map(d => {
                d.password = 'Encrypted Password';
                return d;
            });
            res.status(201).send(result);
        }
    });
});

router.get('/admin-user/:id', (req, res) => { 
    let id = req.params.id;
    var sql = 'SELECT * FROM admin_user WHERE id=?';
db.query(sql,id, (error, data) => {
    if (error) throw error;
    res.status(201).send(data[0]);
});
});


router.post('/admin-user', async (req,res)=>{
    const { userName, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, hashKey);
    db.query('INSERT INTO admin_user SET ?', { user_name:userName, email:email, password:hash, role:role }, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.status(201).send(result);
        }
    });
});

router.put('/admin-user/:id', async (req, res) => {
    const { userName, email, password, role } = req.body;
    const id = req.params.id;
    const hash = await bcrypt.hash(password, hashKey);
    console.log(id);
    db.query('UPDATE admin_user SET user_name=?, email=?, password=?, role=? WHERE id=?', [ userName, email, hash, role, id], function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});



module.exports = router;