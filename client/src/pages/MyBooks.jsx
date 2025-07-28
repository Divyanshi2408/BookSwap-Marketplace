import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    API.get("/books/my-books")
      .then((res) => setBooks(res.data))
      .catch(() => toast.error("Failed to fetch"));
  };

  const handleDelete = (id) => {
    API.delete(`/books/${id}`)
      .then(() => {
        toast.success("Deleted");
        fetchBooks();
      })
      .catch(() => toast.error("Delete failed"));
  };

  useEffect(fetchBooks, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Books</h2>
      <div className="grid gap-4">
        {books.map((book) => (
          <div key={book._id} className="border p-2">
            <h3>{book.title}</h3>
            <button className="btn" onClick={() => handleDelete(book._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
