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
exports.getReceivedRequests = async (req, res) => {
  try {
    // Find requests where the book is posted by current user
    const requests = await Request.find()
      .populate({
        path: 'book',
        match: { postedBy: req.user.id },
      })
      .populate('requestedBy', 'name');

    // Filter out requests where book doesn't match
    const filtered = requests.filter((r) => r.book !== null);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch received requests' });
  }
};

exports.getSwapHistory = async(req,res) =>{
  try{
    const swaps =await Request.find({
      requestedBy:req.user.id,
      status: 'accepted'
    }).populate('book');

    res.json(swaps)
  }
  catch(err){
    res.status(500).json({msg:"failed to load"})

  }
};