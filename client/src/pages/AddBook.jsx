import React,{ useState } from "react";
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
      setForm({ ...form, image: data.secure_url });
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return toast.error("Upload an image first");

    try {
      await API.post("/books", form);
      toast.success("Book added");
      setForm({ title: "", author: "", condition: "", image: "" });
      setFile(null);
    } catch {
      toast.error("Failed to add book");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Title"
        className="input"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        className="input"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Condition"
        className="input"
        value={form.condition}
        onChange={(e) => setForm({ ...form, condition: e.target.value })}
        required
      />
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button type="button" className="btn" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {form.image && <img src={form.image} alt="Preview" className="w-24 mt-2" />}
      <button className="btn mt-4">Add Book</button>
    </form>
  );
}
