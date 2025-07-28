const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { requestBook, getMyRequests, updateRequestStatus, getReceivedRequests } = require("../controllers/requestController");

router.post("/:bookId", protect, requestBook);
router.get("/my-requests", protect, getMyRequests);
router.patch("/:id", protect, updateRequestStatus);
router.get('/received', protect, getReceivedRequests);

module.exports = router;