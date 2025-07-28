const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { requestBook, getMyRequests, updateRequestStatus } = require("../controllers/requestController");

router.post("/:bookId", protect, requestBook);
router.get("/my-requests", protect, getMyRequests);
router.patch("/:id", protect, updateRequestStatus);

module.exports = router;