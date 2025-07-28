import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    condition: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    setUploading(true);
    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.secure_url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return toast.error("Please upload an image first");

    try {
      await API.post("/books", form);
      toast.success("Book added successfully!");
      setForm({ title: "", author: "", condition: "", image: "" });
      setFile(null);
    } catch {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Book Title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Author Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Condition</label>
          <input
            type="text"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="e.g., New, Like New, Used"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload Book Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-2"
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="bg-[#FFE86F] text-black px-4 py-2 rounded text-sm"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          {form.image && (
            <img
              src={form.image}
              alt="Book"
              className="w-24 h-32 object-cover mt-3 rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#FFE86F] text-black font-medium py-2 px-4 rounded transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
