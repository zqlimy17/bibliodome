const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, unique: true },
  ratingCount: { type: Number, default: 0 }
});

const Book = mongoose.model("Book", userSchema);
module.exports = Book;
