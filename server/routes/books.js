const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addBook, getAllBooks, getMyBooks, deleteBook, toogleAvailability } = require("../controllers/bookController");

router.post("/", protect, addBook);
router.get("/", getAllBooks);
router.get("/my-books", protect, getMyBooks);
router.delete("/:id", protect, deleteBook);
router.patch("/toogle/:id" , protect,toogleAvailability);

module.exports = router;