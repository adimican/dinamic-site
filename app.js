const path = require("path");

const fs = require("fs");

const express = require("express");

const app = express();

const uuid = require('uuid');

const resData = require('./util/restaurant-data');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();//creat a id prprietate generand un id cu ajutorul uuid metoda v4
  const restaurants = resData.getStoredResataurants ();
 restaurants.push(restaurant);
 res.Data.storeRestaurants(restaurants);
  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredResataurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredResataurants();
  
  for (const restaurant  of storedRestaurants){
    if (restaurant.id === restaurantId){
       return res.render("restaurant-detail", { restaurant: restaurant });

    }
  }
 res.status(404).render('404');
});

app.use( function(req, res){
  res.status(404).render('404');
});

app.use(function(error, req, res, next) {
res.status(500).render('500');
});

app.listen(3000);
