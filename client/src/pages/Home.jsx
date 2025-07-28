import React, { useEffect, useState } from "react";
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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Books</h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available at the moment.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {books.map((book) => (
            <div
              key={book._id}
              className="w-56 border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-40 h-[220px] object-cover rounded mb-3 mx-auto"
              />
              <h3 className="font-semibold text-md text-center">{book.title}</h3>
              <p className="text-sm text-gray-600 text-center">{book.author} | {book.condition}</p>
              <button
                className="mt-4 bg-[#FFE86F] text-black px-4 py-2 rounded w-full text-sm"
                onClick={() => handleRequest(book._id)}
              >
                Request Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
