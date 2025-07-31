import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import MyBooks from "./pages/MyBooks";
import MyRequests from "./pages/MyRequests";
import Navbar from "./components/Navbar";
import ReceivedRequests from "./pages/ReceivedRequests";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/received-requests" element={<ReceivedRequests />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;