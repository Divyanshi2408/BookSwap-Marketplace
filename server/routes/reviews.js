const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {createReview,getReview} = require("../controllers/reviewController");


router.post("/", protect, createReview);
router.get("/:bookId",getReview);

module.exports = router;