const express = require('express');
const db = require('../db')
const jwt = require('jsonwebtoken')
const router = express.Router();


router.post('/user', (req, res) => {
    const { username, email, password,id } = req.body;
    db.query('SELECT email FROM user_table WHERE email = ?', [email], (err, results) => {
        if (results.length == 0) {
            db.query('INSERT INTO user_table SET ?', { user_name: username, email: email, password: password }, (error, result) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                } else {
                    console.log(result)
                    const ids = id;
                    const token = jwt.sign({ ids }, 'SECRET_KEY', {
                        expiresIn: '90d'
                    });
                    return res.send({token})
                }
            })
        }
        else if (results.length > 0) {
            return res.send('this email already in use')  
        }
    })
})
module.exports = router;