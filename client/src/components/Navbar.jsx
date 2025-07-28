import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#FFE86F] text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold">📚 BookApp</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/add-book" className="hover:underline">Add Book</Link>
          <Link to="/my-books" className="hover:underline">My Books</Link>
          <Link to="/my-requests" className="hover:underline">My Requests</Link>
          <Link to="/received-requests" className="hover:underline">Received Requests</Link>
          {isLoggedIn ? (
            <button onClick={logout} className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/add-book" className="block hover:underline" onClick={() => setMenuOpen(false)}>Add Book</Link>
          <Link to="/my-books" className="block hover:underline" onClick={() => setMenuOpen(false)}>My Books</Link>
          <Link to="/my-requests" className="block hover:underline" onClick={() => setMenuOpen(false)}>My Requests</Link>
          <Link to="/received-requests" className="block hover:underline" onClick={() => setMenuOpen(false)}>Received Requests</Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="w-full text-left bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block hover:underline" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
