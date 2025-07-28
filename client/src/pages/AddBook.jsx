import React from "react";
import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function AddBook() {
  const [form, setForm] = useState({ title: "", author: "", condition: "", image: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/books", form);
      toast.success("Book added");
      setForm({ title: "", author: "", condition: "", image: "" });
    } catch {
      toast.error("Failed to add book");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input type="text" placeholder="Title" className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input type="text" placeholder="Author" className="input" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
      <input type="text" placeholder="Condition" className="input" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} required />
      <input type="text" placeholder="Image URL" className="input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
      <button className="btn">Add Book</button>
    </form>
  );
}
