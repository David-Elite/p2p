const express = require('express');
const db = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const PasswordPrompt = require('inquirer/lib/prompts/password');

const router = express.Router();

router.get('/verify', (req, res) => {
    if (!req.headers.authorization) {
        return res.send(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, 'SECRET_KEY');
    if (!payload) {
        return res.status(401).send('Unauthorized request') // if there is no token
    } else {
        db.query('SELECT * FROM admin_user WHERE id = ?', [payload.id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(401).send("unauthorized");
            } else if (result[0].id === payload.id) {
                return res.status(201).json({ email: result[0].email, id: result[0].id, name: result[0].user_name })
            } else {
                return res.status(401).send("unauthorized");
            }

        })
    }

});
router.get('/user', (req, res) => {
    res.send({ message: "sucessfully login" })
});

router.post('/login',(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json('plz provide email and password')
        }

        db.query('SELECT * FROM admin_user WHERE email= ?', [email], async (error, result) => {
            if(error) {
                console.log(error);
                res.status(401).send(error);
            } else  if (result && result[0]) {
                const matchPass = await bcrypt.compare(password, result[0].password);
                console.log(matchPass);
                if (matchPass && result[0].email) {
                    const id = result[0].id;
                    const token = jwt.sign({ id }, 'SECRET_KEY', {
                        expiresIn: '90d'
                    });
                    return res.status(201).json({ ...result[0], token })
                }
                else if(matchPass !== password){
                    return res.status(401).json('Email or Password is incorrect') 
                }
            } else if( result.length == 0) {
                    return res.status(401).json('Email or Password is incorrect')   
            }
        })
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;