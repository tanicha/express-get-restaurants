const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (request, response) => {
    const foundRestaurants = await Restaurant.findAll();
    response.json(foundRestaurants)
})

//get request route to endpoint with an id
app.get('/restaurants/:id', async (request, response) => {
    const idRestaurants = await Restaurant.findByPk(request.params.id)
    response.json(idRestaurants)
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})