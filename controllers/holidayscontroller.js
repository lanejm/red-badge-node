const router = require('express').Router();
const Holidays = require('../db').import('../models/holidays');
const {Op} = require('sequelize')

const validateSession = require('../middleware/validate-session');


//get all holidays
router.get('/:id', (req, res) => {
    Holidays.findAll({
        where:{owner:req.params.id},
        order:[['holiday']]
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
} );


//get holiday by name
router.get('/holiday/:holiday', (req, res) => {
    Holidays.findAll({
        where: {
            holiday: {
                [Op.iLike]: '%' + req.params.holiday + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Holiday not found"}))
});

//find holiday by date
router.get('/date/:date', (req, res) => {
    Holidays.findAll({
        where: {
            date: {
                [Op.iLike]: '%' + req.params.date + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Date not found"}))
})

//put holiday into table
router.post('/create', validateSession, (req, res) => {
    const holidaysFromRequest = {
        holiday: req.body.holiday,
        date: req.body.date,
        owner: req.user.id,
        received: req.body.received
    }

    Holidays.create(holidaysFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});


//delete holiday(s)
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Holidays.destroy({
            where: { id: req.params.id }
        })

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: "Holiday not deleted"});
    }
});



module.exports = router;