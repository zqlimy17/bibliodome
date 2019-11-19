const express = require("express");
const Review = require("../models/reviews/Reviews");
const Book = require("../models/books/Books");
const reviews = express.Router();
const request = require("request");

reviews.post("/:id/new", async (req, res) => {
  let result = await Book.findOne({ id: req.params.id }, (err, book) => {
    if (err) console.log(err.message);
    return book;
  });
  if (!result) {
    let url = await `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
    console.log(url);
    await request(url, { json: true }, async (error, response, data) => {
      Book.create({
        id: data.id,
        title: data.volumeInfo.title,
        description: data.volumeInfo.description,
        img: data.volumeInfo.imageLinks.thumbnail,
        author: data.volumeInfo.authors,
        rating: req.body.stars,
        ratingCount: 1
      });
    });
  } else {
    newRating =
      (parseFloat(req.body.stars) +
        parseFloat(result.rating) * parseFloat(result.ratingCount)) /
      (parseFloat(result.ratingCount) + 1);
    Book.findOneAndUpdate(
      { id: req.params.id },
      {
        rating: newRating,
        $inc: { ratingCount: 1 }
      }
    ),
      errr => {
        if (errr) console.log(errr.message);
      };
  }

  Book.findOne({ id: req.params.id }, (err, book) => {
    if (err) console.log(err.message);
    Review.create({
      rating: req.body.stars,
      review: req.body.review,
      reviewer: req.session.currentUser._id,
      book: book._id
    });
  });

  res.redirect("/");
});

module.exports = reviews;
