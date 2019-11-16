// DEPENDENCIES
const express = require("express"),
  request = require("request"),
  mongoose = require("mongoose"),
  Book = require("./models/books/Books"),
  methodOverride = require("method-override"),
  apikey = "AIzaSyDoL5gz0KiFhLv23cCa2IrjI1F77cRtm6M",
  app = express(),
  PORT = 17000;

// Global configuration
const mongoURI = "mongodb://localhost:27017/" + "book";
const db = mongoose.connection;

// Mongoose Deprecation Warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//Connect to Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
  console.log("the connection with mongod is established");
});

// Connection Error/Success
// Define callback functions for various events
db.on("error", err => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  if (Book.count_documents({ id: req.body.id }, (limit = 1)) != 0) {
    res.send("apple");
  } else {
    res.send("orange");
  }

  // Book.create(req.body)
  // res.redirect("/")
});

app.post("/book/:id/rate", (req, res) => {
  let url = `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
  console.log(url);
  request(url, { json: true }, (err, response, data) => {
    if (err) console.log(err.message);
    res.render("book.ejs", {
      data
    });
    // res.send(data);
  });
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
