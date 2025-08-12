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
      setError("❌ Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-green-600 font-medium bg-green-100 p-3 rounded-lg shadow-sm">
        ✅ Thanks for your review!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-5 bg-white shadow-md rounded-xl space-y-4 border border-gray-200"
    >
      {error && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">{error}</p>
      )}

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Rating (1–5)
        </label>
        <input
          type="number"
          value={rating}
          min={1}
          max={5}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FFE86F] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px] resize-none focus:ring-2 focus:ring-[#FFE86F] focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#FFE86F]  text-black py-2 rounded-lg font-medium shadow-md transition duration-200"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
