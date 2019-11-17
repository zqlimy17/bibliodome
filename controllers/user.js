const express = require("express");
const User = require("../models/users/User");
const users = express.Router();
const request = require("request");

users.get("/signup", (req, res) => {
  res.render("../views/users/sign-up.ejs");
});

users.post("/", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) console.log(err.message);
    console.log(createdUser);
    res.redirect("/");
  });
});

module.exports = users;
