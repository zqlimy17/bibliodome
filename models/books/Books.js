const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  id: String,
  title: { type: String, unique: true },
  description: String,
  img: String,
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  reviews: [String]
});

let Book = mongoose.model("Book", bookSchema);
module.exports = Book;
