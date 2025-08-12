import React, { useState } from "react";
import API from "../services/api";

export default function BookReview({ bookId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/reviews", { bookId, rating: Number(rating), comment });
      setSubmitted(true);
      setComment("");
      setRating(5);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <p className="text-green-600">✅ Thanks for your review!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      {error && <p className="text-red-500">{error}</p>}

      <label className="block">
        Rating (1–5):
        <input
          type="number"
          value={rating}
          min={1}
          max={5}
          onChange={(e) => setRating(Number(e.target.value))}
          className="input"
          required
        />
      </label>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="input w-full"
        required
      />

      <button
        type="submit"
        className="btn"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
