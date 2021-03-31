const express = require('express');
const db = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
// const PasswordPrompt = require('inquirer/lib/prompts/password');

const router = express.Router();

router.use(bodyParser.json());

router.get('/verify', (req, res) => {
    
        if (!req.headers.authorization) {
            return res.send(401).send('Unauthorized Request')
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized Request')
        }

        let payload = jwt.verify(token, 'SECRET_KEY');
        if (!payload && payload.role != 'admin' && payload.role != 'superadmin') {
            return res.status(401).send('Unauthorized Request'); // if there is no token
        } else {
            db.query('SELECT * FROM user WHERE id = ?', [payload.id], (err, result) => {
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('plz provide email and password')
    }
    if (!req.headers.authorization) {
        return res.send(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request')
    }

    let payload = jwt.verify(token, 'SECRET_KEY');
    if (!payload && payload.role != 'admin' && payload.role != 'superadmin') {
        return res.status(401).send('Unauthorized Request'); // if there is no token
    } else {
        db.query('SELECT * FROM user WHERE email= ?', [email], async (error, result) => {
            if (error) {
                console.log(error);
                res.status(401).send(error);
            } else if (result && result[0]) {
                const matchPass = await bcrypt.compare(password, result[0].password);
                console.log(matchPass);
                if (matchPass && result[0].email) {
                    const id = result[0].id;
                    const token = jwt.sign({ id }, 'SECRET_KEY', {
                        expiresIn: '90d'
                    });
                    return res.status(201).json({ ...result[0], token })
                }
                else if (matchPass !== password) {
                    return res.status(401).json('Email or Password is incorrect')
                }
            } else if (result.length == 0) {
                return res.status(401).json('Email or Password is incorrect')
            }
        })
    }
});

router.get('/user', (req, res) => {
    var sql = 'SELECT * FROM user';
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

router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    var sql = 'SELECT * FROM user WHERE id=?';
    db.query(sql, id, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});


router.post('/user', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, hashKey);
    if (!req.headers.authorization) {
        return res.send(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request')
    }

    let payload = jwt.verify(token, 'SECRET_KEY');
    if (!payload && payload.role != 'admin' && payload.role != 'superadmin') {
        return res.status(401).send('Unauthorized Request'); // if there is no token
    } else {
        db.query('INSERT INTO user SET ?', { name: req.body.userName, email: req.body.email, mobile: req.body.mobile, gender: req.body.gender, country: req.body.country, password: hash }, (error, result) => {
            if (error) {
                res.send(error);
            } else {
                res.status(201).send(result);
            }
        });
    }
});

router.put('/user/:id', (req, res) => {
    const id = req.params.id;
    // const hash = await bcrypt.hash(req.body.password, hashKey);
    console.log(id);
    if (!req.headers.authorization) {
        return res.send(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request')
    }

    let payload = jwt.verify(token, 'SECRET_KEY');
    if (!payload && payload.role != 'admin' && payload.role != 'superadmin') {
        return res.status(401).send('Unauthorized Request'); // if there is no token
    } else {
        db.query('UPDATE user SET name=?, email=?, mobile=?, gender=?, country=? WHERE id=?', [req.body.userName, req.body.email, req.body.mobile, req.body.gender, req.body.country, id], function (error, results) {
            if (error) throw error;
            res.status(201).send(results);
        });
    }
});


module.exports = router;