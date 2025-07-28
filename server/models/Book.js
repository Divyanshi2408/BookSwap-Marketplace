const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  condition: String,
  image: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true }); 


module.exports = mongoose.model("Book", bookSchema);