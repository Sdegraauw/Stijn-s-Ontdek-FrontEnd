import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/"> Home</Link>
        <Link to="/login"> Login</Link>
        <Link to="/about"> About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
