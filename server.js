const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const seedRestaurant = require("./seedData");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (request, response) => {
    const foundRestaurants = await Restaurant.findAll();
    response.json(foundRestaurants)
})

//get request route to endpoint with an id
app.get('/restaurants/:id', async (request, response) => {
    const idRestaurant = await Restaurant.findByPk(request.params.id)
    response.json(idRestaurant)
})

//post request route for adding a new restaurant (creating new restaurant)
app.post('/restaurants', async (request, response) => {
    const newRestaurant = await Restaurant.create({
        name: request.body.name,
        location: request.body.location,
        cuisine: request.body.cuisine
    })
    response.json(newRestaurant)
})

//put request for updating a restaurant with specific id (updating restaurant)
app.put('/restaurant/:id', async (request, response) => {
    const foundRestaurant = await Restaurant.findByPk(request.params.id)
    const updatedRestaurant = await foundRestaurant.update({
        name: request.body.name,
        location: request.body.location,
        cuisine: request.body.cuisine
    })
    response.json(updatedRestaurant)
})

//delete request for deleting a restaurant with specific id (deleting #id restaurant)
app.delete('/restaurant/:id', async (request, response) => {
    const foundRestaurant = await Restaurant.destroy({
        where: {
            id: request.params.id
        }
    })
    response.send('Restaurant is deleted!')
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})