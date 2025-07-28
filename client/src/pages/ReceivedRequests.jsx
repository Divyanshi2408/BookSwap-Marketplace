import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function ReceivedRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests/received")
      .then((res) => setRequests(res.data))
      .catch(() => toast.error("Failed to fetch"));
  }, []);

  const handleStatusChange = (id, status) => {
    API.patch(`/requests/${id}`, { status })
      .then(() => {
        toast.success(`Marked as ${status}`);
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
        );
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Received Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests received yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {requests.map((r) => (
            <div
              key={r._id}
              className="w-56 border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              {r.book?.image && (
                <img
                  src={r.book.image}
                  alt={r.book.title}
                  className="w-40 h-[220px] object-cover rounded mb-3 mx-auto"
                />
              )}
              <h3 className="font-semibold text-md text-center">{r.book?.title}</h3>
              <p className="text-sm text-gray-600 text-center mb-1">
                Requested by: <span className="font-medium">{r.requestedBy?.name}</span>
              </p>
              <p
                className={`text-sm text-center font-medium py-1 px-2 rounded-full ${
                  r.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : r.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Status: {r.status}
              </p>

              {r.status === "pending" && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleStatusChange(r._id, "accepted")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(r._id, "declined")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-2 rounded"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
