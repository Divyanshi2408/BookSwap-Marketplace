// 📁 client/src/pages/ReceivedRequests.jsx
import React,{ useEffect, useState } from "react";
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
          prev.map((r) =>
            r._id === id ? { ...r, status } : r
          )
        );
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Received Requests</h2>
      {requests.map((r) => (
        <div key={r._id} className="border p-2 mb-2">
          <h3 className="font-semibold">{r.book?.title}</h3>
          <p>Requested by: {r.requestedBy.name}</p>
          <p>Status: {r.status}</p>
          {r.status === "pending" && (
            <div className="flex gap-2 mt-2">
              <button className="btn" onClick={() => handleStatusChange(r._id, "accepted")}>Accept</button>
              <button className="btn" onClick={() => handleStatusChange(r._id, "declined")}>Decline</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
