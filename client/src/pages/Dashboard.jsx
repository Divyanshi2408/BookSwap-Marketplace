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

  if (loading) return <div className="p-4">Loading swap history...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Swap History</h2>

      {swaps.length === 0 ? (
        <p className="text-gray-500">No past swaps found.</p>
      ) : (
        <div className="space-y-4">
          {swaps.map((swap) => (
            <div
              key={swap._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="font-medium text-lg">
                <span className="text-gray-600">Book:</span> {swap.book?.title || "Unknown Title"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="text-gray-600">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    swap.status === "accepted"
                      ? "text-green-600"
                      : swap.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {swap.status}
                </span>
              </p>

              {/* Show review form only for accepted swaps */}
              {swap.status === "accepted" && swap.book?._id && (
                <BookReview bookId={swap.book._id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
