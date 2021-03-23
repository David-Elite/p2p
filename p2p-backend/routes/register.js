const express = require('express');
const db = require('../db')
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require('bcryptjs');

const hashK = 'HASH_KEY';


router.post('/register', (req, res) => {
    console.log('Here');
    db.query('SELECT email FROM user WHERE email = ?', [req.body.email], async (err, results) => {
        if (err) {
            console.log(err);
            res.status(401).send(err);
        } else if (results.length == 0) {
            const hash = bcrypt.hashSync(req.body.password);
            db.query('INSERT INTO user SET ?', { name: req.body.name, email: req.body.email, password: hash, mobile: req.body.mobile }, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(401).send(error);
                } else {
                    const ids = result.insertId;
                    const token = jwt.sign({ ids }, 'SECRET_KEY', {
                        expiresIn: '90d'
                    });
                    return res.send({token});
                }
            })
        }
        else if (results.length > 0) {
            console.log('User Exists');
            return res.send('The User is already registered!!')  
        } else {
            console.log('Something Happened');
        }
    })
})
module.exports = router;