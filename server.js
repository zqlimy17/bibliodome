// DEPENDENCIES
const express = require("express"),
  mongoose = require("mongoose"),
  // User = require("./models/users/User"),
  bookController = require("./controllers/book.js"),
  userController = require("./controllers/user.js"),
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

// CONTROLLERS
app.use(bookController);
app.use(userController);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`Flipping to Page: ${PORT}`);
});
