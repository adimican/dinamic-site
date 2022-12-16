const path = require("path");

const fs = require("fs");

const express = require("express");

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/about", function (req, res) {
  const pathFile = path.join(__dirname, "views", "about.html");
  res.sendFile(pathFile);
});

app.get("/confirm", function (req, res) {
  const pathFile = path.join(__dirname, "views", "confirm.html");
  res.sendFile(pathFile);
});

app.get("/", function (req, res) {
  const pathFile = path.join(__dirname, "views", "index.html");
  res.sendFile(pathFile);
});

app.get("/recommend", function (req, res) {
  const pathFile = path.join(__dirname, "views", "recommend.html");
  res.sendFile(pathFile);
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const filedata = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(filedata);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  const pathFile = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(pathFile);
});

app.listen(3000);
