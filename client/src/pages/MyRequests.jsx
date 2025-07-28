import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests/my-requests")
      .then((res) => setRequests(res.data))
      .catch(() => console.error("Failed to fetch requests"));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Book Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">You haven't requested any books yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {requests.map((req) => (
            <div
              key={req._id}
              className="w-56 border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              {req.book?.image && (
                <img
                  src={req.book.image}
                  alt={req.book.title}
                  className="w-40 h-[220px] object-cover rounded mb-3 mx-auto"
                />
              )}
              <h3 className="font-semibold text-md text-center">
                {req.book?.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {req.book?.author} | {req.book?.condition}
              </p>
              <p
                className={`mt-3 text-sm text-center font-medium py-1 px-2 rounded-full ${
                  req.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : req.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Status: {req.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
