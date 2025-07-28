import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests/my-requests").then((res) => setRequests(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Requests</h2>
      {requests.map((req) => (
        <div key={req._id} className="border p-2">
          <h3>{req.book?.title}</h3>
          <p>Status: {req.status}</p>
        </div>
      ))}
    </div>
  );
}
