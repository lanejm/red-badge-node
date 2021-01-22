const router = require('express').Router();
const Gifts = require('../db').import('../models/gifts');
const {Op} = require('sequelize')

const validateSession = require('../middleware/validate-session');


//find all entries by individual, returns in alphabetical order by giftName
router.get('/:id', (req, res) => {
    Gifts.findAll({
        where:{owner:req.params.id}, 
        order: [['giftName']]
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

//create gift table entry
router.post('/create', validateSession, (req, res) => {
    const giftsFromRequest = {
        giftName: req.body.giftName,
        description: req.body.description,
        date: req.body.date,
        purchased: req.body.purchased,
        person: req.body.person,
        from: req.body.from,
        owner: req.user.id,
        price: req.body.price
    } 

    Gifts.create(giftsFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

//get gift by name
router.get('/name/:name', (req, res) => {
    Gifts.findAll({
        where: {
            giftName: {
                [Op.iLike]: '%' + req.params.name + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Gift not found"}))
});

//finds item by person 
router.get('/person/:person', (req, res) => {
    Gifts.findAll({
        where: {
            person: {
                [Op.iLike]: '%' + req.params.person + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Person not found"}))
});

//finds item by price
router.get('/price/:price', (req, res) => {
    Gifts.findAll({
        where: {
            price: {
                [Op.iLike]: '%' + req.params.price + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Price not found"}))
})

//find gift(s) by date
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

//find gift(s) by from
router.get('/from/:from', (req, res) => {
    Gifts.findAll({
        where: {
            from: {
                [Op.iLike]: '%' + req.params.from + '%'
            }
        }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Person not found"}))
});

//update table based off ID
router.put('/edit/:id', (req, res) => {
    Gifts.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(gifts => res.status(200).json(gifts))
    .catch(err => res.status(500).json({error: err}))
});


//delete entire entry - put in delete entry alert on front end
router.delete('/delete/:id', async (req, res) => {
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

//edit gift
//purchased from? 
//admin functionality 

//validate session for delete. 