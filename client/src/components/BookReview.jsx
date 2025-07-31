import React,{ useState, useEffect } from "react";
import API from "../services/api";

export default function BookReview({ bookId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/reviews", { bookId, rating, comment });
    setSubmitted(true);
  };

  return submitted ? (
    <p className="text-green-600">Thanks for your review!</p>
  ) : (
    <form onSubmit={handleSubmit} className="mt-4">
      <input type="number" value={rating} min={1} max={5} onChange={(e) => setRating(e.target.value)} className="input" required />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review..." className="input" required />
      <button className="btn">Submit Review</button>
    </form>
  );
}
