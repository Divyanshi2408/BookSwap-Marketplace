import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    API.get("/books/my-books")
      .then((res) => setBooks(res.data))
      .catch(() => toast.error("Failed to fetch books"));
  };

  const handleDelete = (id) => {
    API.delete(`/books/${id}`)
      .then(() => {
        toast.success("Book deleted");
        fetchBooks();
      })
      .catch(() => toast.error("Delete failed"));
  };

  useEffect(fetchBooks, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Books</h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any books yet.</p>
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
              <p className="text-sm text-gray-600 text-center">
                {book.author} | {book.condition}
              </p>
              <button
                onClick={() => handleDelete(book._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full text-sm"
              >
                Delete Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
