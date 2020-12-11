const router = require('express').Router();
const Holidays = require('../db').import('../models/holidays');

const validateSession = require('../middleware/validate-session');


//get all holidays
router.get('/', (req, res) => {
    Holidays.findAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
} );

//put holiday into table
router.post('/create', validateSession, (req, res) => {
    const holidaysFromRequest = {
        holiday: req.body.holiday,
        date: req.body.date,
    }

    Holidays.create(holidaysFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

//get holiday by name
//get holiday by date

module.exports = router;