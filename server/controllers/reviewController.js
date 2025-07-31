const Review = require("../models/Review");

exports.createReview = async (req,res) =>{
    const {bookId, rating, comment} = req.body;
    const review = await Review.create({
        book: bookId,
        reviewer: req.user.id,
        rating,
        comment,
    });
    res.status(201).json(review);
};

exports.getReview = async (req,res) =>{

    const review = await Review.find({book:req.params.bookId})
    .populate("reviewer","name");
    res.json(reviews);
}