const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addBook, getAllBooks, getMyBooks, deleteBook } = require("../controllers/bookController");

router.post("/", protect, addBook);
router.get("/", getAllBooks);
router.get("/my-books", protect, getMyBooks);
router.delete("/:id", protect, deleteBook);

module.exports = router;