// DEPENDENCIES
const express = require("express"),
  request = require("request"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  apikey = "AIzaSyDoL5gz0KiFhLv23cCa2IrjI1F77cRtm6M",
  app = express(),
  PORT = 17000;

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/results/", (req, res) => {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}+inauthor:${req.body.author}`;
  console.log(url);
  request(url, { json: true }, (err, response, data) => {
    if (err) console.log(err.message);
    res.render("searchresults.ejs", {
      data
    });
    // res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Flipping to Page: ${PORT}`);
});
