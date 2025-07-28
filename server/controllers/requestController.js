const Request = require("../models/Request");

exports.requestBook = async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const request = await Request.create({ book: bookId, requestedBy: req.user.id });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ msg: "Request failed" });
  }
};

exports.getMyRequests = async (req, res) => {
  const requests = await Request.find({ requestedBy: req.user.id }).populate("book");
  res.json(requests);
};

exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  await Request.findByIdAndUpdate(req.params.id, { status });
  res.json({ msg: "Status updated" });
};
