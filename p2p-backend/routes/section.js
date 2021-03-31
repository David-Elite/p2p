const express = require('express');
const db = require('../db');

const router = express.Router();


router.get('/sections/:refId', (req, res) => {
    const refId = req.params.refId;
    db.query(`SELECT * FROM section WHERE reference_id = ? and active = true`, refId, (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.send(result);
        }
    })
});

router.get('/section/:secId', (req, res) => {
    const secId = req.params.secId;
    db.query(`SELECT * FROM section WHERE id = ?`, secId, (err, result) => {
        if (err) {
            throw err;
        }
        if (result[0].content_type === 'Link') {
            db.query(`SELECT * FROM link_list WHERE reference_id = ? AND type = 'section'`, secId, (e, r) => {
                if (e) {
                    throw error;
                }
                result[0].links = r;
                res.send(result[0]);
            });
        } else if (result[0].content_type === 'Package') {
            db.query(`SELECT
            section_packages.package_id,
            section_packages.position,
            tour_packages.title,
            tour_packages.price_with_tax,
            tour_packages.compared_price,
            tour_packages.days,
            tour_packages.nights,
            tour_packages.ribbon_tag,
            tour_packages.handle,
            AVG(review.review_points) as review_points,
            COUNT(review.id) as review_count
            FROM section_packages
            INNER JOIN tour_packages
            ON section_packages.package_id = tour_packages.id
            LEFT JOIN review
            ON review.reference_id = section_packages.package_id
            WHERE section_id = ${secId}
            GROUP BY section_packages.package_id`, (e, r) => {
                if (e) {
                    throw error;
                }
                result[0].packages = r;
                res.send(result[0]);
            });
        } else if (result[0].content_type === 'Zone') {
            db.query(`
            SELECT
            section_zones.id,
            section_zones.zone_id as zoneId,
            section_zones.parent,
            zone.title,
            zone.handle,
            zone.zone_type as zoneType
            FROM section_zones
            INNER JOIN zone
            ON section_zones.zone_id = zone.id
            WHERE section_zones.section_id = ${secId}`, (e, r) => {
                if (e) {
                    throw e;
                }
                result[0].zones = r;
                res.send(result[0]);
            });
        }
    });
});

router.post('/section', (req, res) => {
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
        db.query("INSERT INTO section SET ?", {
            reference_id: 'home',
            title: req.body.title,
            subtitle: req.body.subtitle,
            content_type: req.body.contentType,
            display_type: req.body.displayType,
            position: req.body.position
        }, function (error, results) {
            if (error) throw error;
            res.status(201).send(results);
        })
    }
});

router.put('/section/position', (req, res) => {
    const promises = [];
    req.body.sections.forEach((sec, index) => {
        promises.push(new Promise((resolve, reject) => {
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
                db.query(`UPDATE section SET position = ${index + 1} WHERE id = ${sec.id}`,
                    function (error, results) {
                        if (error) { reject(error); }
                        else { resolve(); }
                    });
            }
        }));
    });
    Promise.all(promises).then(() => res.send()).catch(err => res.status(400).send(err));

});

router.delete('/section/:sec', (req, res) => {
    const id = req.params.sec;
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
        db.query('DELETE FROM section WHERE id = ?', id, function (error, results) {
            if (error) throw error;
            res.status(201).send(results);
        });
    }
});

router.put('/section/:sec', (req, res) => {
    const id = req.params.sec;
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
        db.query(`UPDATE section SET ? WHERE id = ${id}`, {
            title: req.body.title,
            subtitle: req.body.subtitle
        }, function (error, results) {
            if (error) throw error;
            res.status(201).send(results);
        })
    }
});

router.post('/section/:secId/package', (req, res) => {
    const secId = req.params.secId;
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
        db.query(`INSERT INTO section_packages SET ?`, {
            section_id: secId,
            package_id: req.body.packageId,
            position: req.body.position
        }, function (error, results) {
            if (error) throw error;
            res.send(results);
        });
    }
});

router.put('/section/:secId/package/position', (req, res) => {
    const secId = req.params.secId;
    const promises = [];
    req.body.packages.forEach((pkg, index) => {
        promises.push(new Promise((resolve, reject) => {
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
                db.query(`UPDATE section_packages SET position = ${index + 1} WHERE section_id = ${secId} AND packageId: ${pkg.id}`,
                    function (error, results) {
                        if (error) { reject(error); }
                        else { resolve(); }
                    });
            }
        }));
    });
    Promise.all(promises).then(() => res.send()).catch(err => res.status(400).send(err));

});

module.exports = router;