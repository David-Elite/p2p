const express = require('express');
const db = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();


router.get('/admin-user',(req,res)=>{
    var sql = 'SELECT * FROM admin_user';
db.query(sql, (error, data) => {
    if (error) throw error;
    res.status(201).send(data);
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
    const hash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO admin_user SET ?', { user_name:userName, email:email, password:hash, role:role }, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.status(201).send(result);
        }
    });
});

router.put('/admin-user/:id', (req, res) => {
    const { userName, email, password, role } = req.body;
    const id = req.params.id;
    console.log(id)
    db.query('UPDATE admin_user SET user_name=?, email=?, password=?, role=? WHERE id=?', [ userName, email, password, role, id], function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
});



module.exports = router;