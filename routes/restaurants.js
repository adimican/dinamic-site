const express = require('express');

const resData = require("../util/restaurant-data");

const uuid = require("uuid");


const router = express.Router();



router.get("/confirm", function (req, res) {
    res.render("confirm");
  });
  
  
  router.get("/recommend", function (req, res) {
    res.render("recommend");
  });
  
  router.post("/recommend", function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();//creat a id prprietate generand un id cu ajutorul uuid metoda v4
    const restaurants = resData.getStoredResataurants ();
   restaurants.push(restaurant);
   resData.storeRestaurants(restaurants);
    res.redirect("/confirm");
  });
  
  router.get("/restaurants", function (req, res) {
    const storedRestaurants = resData.getStoredResataurants();
    res.render("restaurants", {
      numberOfRestaurants: storedRestaurants.length,
      restaurants: storedRestaurants,
    });
  });
  
  router.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;
    const storedRestaurants = resData.getStoredResataurants();
    
    for (const restaurant  of storedRestaurants){
      if (restaurant.id === restaurantId){
         return res.render("restaurant-detail", { restaurant: restaurant });
  
      }
    }
    res.status(404).render('404');
});

module.exports = router;
