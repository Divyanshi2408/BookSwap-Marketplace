import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="p-4 flex justify-between bg-[#FFE86F] text-black">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/add-book" className="mr-4">Add Book</Link>
        <Link to="/my-books" className="mr-4">My Books</Link>
        <Link to="/my-requests" className="mr-4">My Requests</Link>
        <Link to="/received-requests">Received Requests</Link>

      </div>
      <div>
        {localStorage.getItem("token") ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}