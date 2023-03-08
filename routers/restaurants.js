const express = require('express')
const router = express.Router();
const {Restaurant} = require("../models/index")
const seedRestaurant = require("../seedData");
const {check, validatorResult, validationResult} = require('express-validator')

//TODO: Create your GET Request Route Below: 
router.get('/', async (request, response) => {
    const foundRestaurants = await Restaurant.findAll();
    response.json(foundRestaurants)
})

//get request route to endpoint with an id
router.get('/:id', async (request, response) => {
    const idRestaurant = await Restaurant.findByPk(request.params.id)
    response.json(idRestaurant)
})

//post request route for adding a new restaurant (creating new restaurant)
router.post('/', [check("name").not().isEmpty().trim(), check("location").not().isEmpty().trim(), check("cuisine").not().isEmpty().trim()], async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()){
        response.json({errors: errors.array()})
    } else {
        const newRestaurant = await Restaurant.create({
            name: request.body.name,
            location: request.body.location,
            cuisine: request.body.cuisine
        })
        response.json(newRestaurant)
    }
})

//put request for updating a restaurant with specific id (updating restaurant)
router.patch('/:id', async (request, response) => {
    const foundRestaurant = await Restaurant.findByPk(request.params.id)
    const updatedRestaurant = await foundRestaurant.update({
        name: request.body.name,
        location: request.body.location,
        cuisine: request.body.cuisine
    })
    response.json(updatedRestaurant)
})

//delete request for deleting a restaurant with specific id (deleting #id restaurant)
router.delete('/:id', async (request, response) => {
    const foundRestaurant = await Restaurant.destroy({
        where: {
            id: request.params.id
        }
    })
    response.send('Restaurant is deleted!')
})


module.exports = router;