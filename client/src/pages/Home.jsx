import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books")
      .then((res) => setBooks(res.data))
      .catch(() => toast.error("Failed to fetch books"));
  }, []);

  const handleRequest = (bookId) => {
    API.post(`/requests/${bookId}`)
      .then(() => toast.success("Request sent"))
      .catch(() => toast.error("Request failed"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Books</h2>
      <div className="grid gap-4">
        {books.map((book) => (
          <div key={book._id} className="border p-2">
            <h3 className="font-bold">{book.title}</h3>
            <p>{book.author} | {book.condition}</p>
            <img src={book.image} alt="Book" className="w-24 h-24 object-cover" />
            <button className="btn mt-2" onClick={() => handleRequest(book._id)}>Request</button>
          </div>
        ))}
      </div>
    </div>
  );
}