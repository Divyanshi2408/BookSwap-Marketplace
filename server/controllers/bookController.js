const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const { title, author, condition, image } = req.body;
    const book = await Book.create({ title, author, condition, image, postedBy: req.user.id });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add book" });
  }
};

exports.getAllBooks = async (req, res) => {
  const books = await Book.find()
    .populate("postedBy", "name")
    .sort({ createdAt: -1 }); 
  res.json(books);
};
exports.getMyBooks = async (req, res) => {
  const books = await Book.find({ postedBy: req.user.id });
  res.json(books);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ msg: "Book deleted" });
};
