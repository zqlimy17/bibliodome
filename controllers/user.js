const express = require("express");
const User = require("../models/users/User");
const users = express.Router();
const request = require("request");

users.get("/signup", (req, res) => {
  res.render("../views/users/sign-up.ejs");
});

users.post("/", (req, res) => {
  console.log(req.body);
  User.create(
    {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    },
    (err, createdUser) => {
      if (err) console.log(err.message);
      console.log(createdUser);
      res.redirect("/");
    }
  );
});

module.exports = users;
