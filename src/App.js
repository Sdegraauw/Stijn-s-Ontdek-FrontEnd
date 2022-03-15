import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";
import { nav, container, navbar } from "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Ontdekstation013
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/login"> Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/"> Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about"> About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <nav>
        <Link to="/"> Home</Link>
        <Link to="/login"> Login</Link>
        <Link to="/about"> About</Link>
      </nav> */}
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
