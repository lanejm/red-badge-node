const router = require('express').Router();
const Gifts = require('../db').import('../models/gifts');
const {Op} = require('sequelize')

const validateSession = require('../middleware/validate-session');


//find all entries
router.get('/', (req, res) => {
    Gifts.findAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

//create gift table entry
router.post('/create', validateSession, (req, res) => {
    const giftsFromRequest = {
        giftName: req.body.name,
        description: req.body.description,
        date: req.body.date,
        purchasedFrom: req.body.purchased,
        person: req.body.person,
        owner: req.user.id
    } 

    Gifts.create(giftsFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

//get gift by name
router.get('/name/:name', (req, res) => {
    Gifts.findOne({
        where: {
            giftName: {
                [Op.iLike]: '%' + req.params.name + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Gift not found"}))
});

router.get('/date/:date', (req, res) => {
    Gifts.findOne({
        where: {
            date: {
                [Op.iLike]: '%' + req.params.date + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Gift not found"}))
});

//update table
router.put('/:id', (req, res) => {
    Gifts.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(gifts => res.status(200).json(gifts))
    .catch(err => res.status(500).json({error: "Update not successful"}))
});


//delete entry - put in delete entry alert on front end
router.delete('/:id', async (req, res) => {
    try {
        const result = await Gifts.destroy({
            where: { id: req.params.id }
        })

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: "Review not deleted"});
    }
})

module.exports = router;

//get gift by person, add day/month/year to table?
//edit gift
//admin functionality 