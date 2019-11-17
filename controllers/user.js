const express = require("express");
const User = require("../models/users/User");
const users = express.Router();
const bcrypt = require("bcrypt");
const request = require("request");

users.get("/signup", (req, res) => {
  res.render("../views/users/sign-up.ejs", {
    currentUser: req.session.currentUser
  });
});

users.post("/", (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
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
