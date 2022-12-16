const path = require("path");

const express = require("express");

const app = express();

app.use(express.static('public'));


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
  
app.get("/restaurants", function (req, res) {
  const pathFile = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(pathFile);
});

app.listen(3000);
