const router = require('express').Router();
const User = require('../db').import('../models/user');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    })
    .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d"});
        
        res.status(200).json({
            user: user,
            message: 'user created successfully',
            sessionToken: token
        });
    })
    .catch(err => res.status(500).json({error: err}));
});

router.post('/login', (req, res) => {
    User.findOne({ where: { email: req.body.email }})
    .then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if (matches) {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h"});

                    res.status(200).json({
                        user: user,
                        message: "user login successful",
                        sessionToken: token
                    })
                } else {
                    res.status(500).json({ error: "incorrect password" })
                }
            })
        } else {
            res.status(500).json({ error: "user does not exist" })
        }
    })
    .catch(err => res.status(500).json({ error: "database error" }))
});

//find all users
router.get('/', (req, res) => {
    User.findAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});


//find user by id
router.get('/userInfo/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "User not found"}))
});

module.exports = router;