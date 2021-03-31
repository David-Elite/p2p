const express = require('express');
const db = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const hashKey = 'HASH_KEY';

router.get('/admin-user/verify', (req, res) => {
    if (!req.headers.authorization) {
        return res.send(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request')
    }

    let payload = jwt.verify(token, 'SECRET_KEY');
    if (!payload) {
        return res.status(401).send('Unauthorized Request'); // if there is no token
    } else {
        db.query('SELECT * FROM admin_user WHERE id = ?', [payload.id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(401).send("Unauthorized Request");
            } else if (result.length !== 0 && result[0].id === payload.id) {
                return res.status(201).json(result[0]);
            } else {
                return res.status(401).send("Unauthorized Request");
            }

        })
    }

});

router.post('/admin-user/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json('plz provide email and password')
        }

        db.query('SELECT * FROM admin_user WHERE email= ?', [email], async (error, result) => {
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
    } catch (error) {
        console.log(error);
    }
});

router.get('/admin-user', (req, res) => {
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
    db.query(sql, id, (error, data) => {
        if (error) throw error;
        res.status(201).send(data[0]);
    });
});


router.post('/admin-user', async (req, res) => {
    const { userName, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, hashKey);
    if (!req.headers.authorization) {
        return res.send(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    
    let payload = jwt.verify(token, 'SECRET_KEY');
    if (!payload && payload.role!= 'admin' && payload.role != 'superadmin') {
        return res.status(401).send('Unauthorized Request'); // if there is no token
    } else{
    db.query('INSERT INTO admin_user SET ?', { name: userName, email: email, password: hash, role: role }, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.status(201).send(result);
        }
    });
    }
});

router.put('/admin-user/:id', async (req, res) => {
    const { userName, email, password, role } = req.body;
    const id = req.params.id;
    const hash = await bcrypt.hash(password, hashKey);
    console.log(id);
    if (!req.headers.authorization) {
        return res.send(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    
    let payload = jwt.verify(token, 'SECRET_KEY');
    if (!payload && payload.role!= 'admin' && payload.role != 'superadmin') {
        return res.status(401).send('Unauthorized Request'); // if there is no token
    } else{
    db.query('UPDATE admin_user SET name=?, email=?, password=?, role=? WHERE id=?', [userName, email, hash, role, id], function (error, results) {
        if (error) throw error;
        res.status(201).send(results);
    });
    }
});



module.exports = router;