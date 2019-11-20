const express = require("express");
const Review = require("../models/reviews/Reviews");
const Book = require("../models/books/Books");
const reviews = express.Router();
const request = require("request");

reviews.put("/:id/new", async (req, res) => {
  let url = await `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
  console.log(url);
  await request(url, { json: true }, async (error, response, data) => {
    let newRating;
    Book.findOne({ id: req.params.id }, async (err, result) => {
      if (err) console.log(err.message);
      console.log("\n\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n");
      console.log("\n\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n");
      console.log("THE RESULT IS" + result);
      console.log("\n\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n");
      console.log("\n\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n");
      if (err) console.log(err.message);
      if (result) {
        newRating =
          (parseFloat(req.body.stars) +
            parseFloat(result.rating) * parseFloat(result.ratingCount)) /
          (parseFloat(result.ratingCount) + 1);
      }
    });

    console.log(`######################\n######################`);
    console.log("REQ BODY STARS IS " + req.body.stars);
    console.log("NEW RATING IS " + newRating);
    console.log(`######################\n######################`);

    Book.findOneAndUpdate(
      {
        id: req.params.id
      },
      {
        id: data.id,
        id: data.id,
        title: data.volumeInfo.title,
        description: data.volumeInfo.description,
        img: data.volumeInfo.imageLinks.thumbnail,
        author: data.volumeInfo.authors,
        $set: { rating: newRating },
        $inc: {
          ratingCount: 1
        }
      },
      {
        upsert: true,
        new: true
      },
      (err, book) => {
        // console.log(`######################\n######################`);
        // console.log(book);
        // console.log(`######################\n######################`);
        Review.create({
          rating: req.body.stars,
          review: req.body.review,
          reviewer: req.session.currentUser._id,
          book: book._id
        });
      }
    );
  });

  res.redirect("/");
});

module.exports = reviews;
