import React, { useEffect, useState } from "react";
import API from "../services/api";
import BookReview from "../components/BookReview";

export default function Dashboard() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/requests/history")
      .then((res) => setSwaps(res.data))
      .catch((err) => console.error("Error fetching history:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">
        ⏳ Loading swap history...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Your Swap History
      </h2>

      {swaps.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          No past swaps found.
        </p>
      ) : (
        <div className="space-y-6">
          {swaps.map((swap) => (
            <div
              key={swap._id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
            >
              <p className="font-semibold text-xl text-blue-700">
                {swap.book?.title || "📖 Unknown Title"}
              </p>

              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium text-gray-600">Status: </span>
                <span
                  className={`font-semibold px-2 py-1 rounded ${
                    swap.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : swap.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {swap.status}
                </span>
              </p>

              {/* Show review form only for accepted swaps */}
              {swap.status === "accepted" && swap.book?._id && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-gray-800 font-medium mb-2">
                    ✍ Leave a Review
                  </p>
                  <BookReview bookId={swap.book._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
