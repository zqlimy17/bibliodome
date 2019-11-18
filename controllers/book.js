const express = require("express");
const Book = require("../models/books/Books");
const router = express.Router();
const request = require("request");

router.post("/:id/new", async (req, res) => {
  let url = await `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
  console.log(url);
  await request(url, { json: true }, async (error, response, data) => {
    if (error) console.log(error.message);
    let newRating = 0;
    // console.log(req.body.stars);
    let result = await Book.findOne({ id: req.params.id });
    // console.log("\n\n~~~~~~\n\n");
    // console.log(result);
    // console.log("\n\n~~~~~~\n\n");
    if (result) {
      console.log("\n\n CURRENT USER IS \n\n");
      console.log(req.session.currentUser);
      console.log("\n\n CURRENT USER IS \n\n");

      Book.findOne(
        {
          id: data.id
        },
        (err, book) => {
          //   console.log(req.body.stars);
          if (err) console.log(err.message);
          newRating =
            (parseFloat(req.body.stars) +
              parseFloat(book.rating) * parseFloat(book.ratingCount)) /
            (parseFloat(book.ratingCount, 16) + 1);
          Book.findOneAndUpdate(
            {
              id: data.id
            },
            {
              rating: newRating,
              $inc: { ratingCount: 1 },
              $push: {
                reviews: {
                  review: req.body.review,
                  reviewer: req.session.currentUser._id
                }
              }
            },
            errr => {
              if (errr) console.log(errr.message);
            }
          );
        }
      );
    } else {
      //   console.log("\n\n~~~~~~\n\n");
      //   console.log(`Creating New Book`);
      //   console.log("\n\n~~~~~~\n\n");
      Book.create({
        id: data.id,
        title: data.volumeInfo.title,
        description: data.volumeInfo.description,
        img: data.volumeInfo.imageLinks.small,
        rating: req.body.stars,
        ratingCount: 1,
        reviews: {
          review: req.body.review,
          reviewer: req.session.currentUser._id
        }
      });
    }
    res.redirect("/");
  });
});

router.post("/:id/rate", (req, res) => {
  if (req.session.currentUser) {
    let url = `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
    //   console.log(url);
    request(url, { json: true }, (err, response, data) => {
      if (err) console.log(err.message);
      res.render("../views/books/book.ejs", {
        data,
        currentUser: req.session.currentUser
      });
      // res.send(data);
    });
  } else {
    res.redirect("/sessions/login");
  }
});

router.post("/results/", (req, res) => {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}+inauthor:${req.body.author}`;
  //   console.log(url);
  request(url, { json: true }, (err, response, data) => {
    if (err) console.log(err.message);
    res.render("../views/books/searchresults.ejs", {
      data,
      currentUser: req.session.currentUser
    });
    // res.send(data);
  });
});

module.exports = router;
