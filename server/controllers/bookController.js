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
  const books = await Book.find({available:true})
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

exports.toogleAvailability = async (req, res)=>{
  const book = await Book.findById(req.params.id);
  if(!book) return res.status(404).json({msg:"book not found"});
  if(book.postedBy.toString() !== req.user.id) return res.status(403).json({msg:unauthorized});

  book.available = !book.available;
  await book.save();
  res.json({available:book.available});
};